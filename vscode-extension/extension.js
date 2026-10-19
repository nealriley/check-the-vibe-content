'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { randomBytes } = require('node:crypto');
const vscode = require('vscode');
const { emptyFeed, validFeed, pieceForSlug, groupsFor, isStale, findProjectRootFromFolders } = require('./model');

const FEED = '.cache/work-graph.json';

function findProjectFolder() {
  return (vscode.workspace.workspaceFolders || []).find((folder) =>
    findProjectRootFromFolders([folder.uri.fsPath])) || null;
}

class PiecesTree {
  constructor() {
    this.feed = emptyFeed();
    this.changed = new vscode.EventEmitter();
    this.onDidChangeTreeData = this.changed.event;
  }

  update(feed) {
    this.feed = feed;
    this.changed.fire();
  }

  getChildren(item) {
    const groups = groupsFor(this.feed);
    if (!item) return groups.map((group) => ({ kind: 'group', ...group }));
    if (item.kind === 'group' && item.id === 'series') return item.series.map((series) => ({ kind: 'series', ...series }));
    if (item.kind === 'group' || item.kind === 'series') {
      return item.pieces.map((piece) => ({ kind: 'piece', ...piece }));
    }
    return [];
  }

  getTreeItem(item) {
    if (item.kind === 'piece') {
      const tree = new vscode.TreeItem(item.title, vscode.TreeItemCollapsibleState.None);
      tree.description = item.slug;
      tree.iconPath = new vscode.ThemeIcon('file-text');
      tree.command = { command: 'ctv.openIndex', title: 'Open index.md', arguments: [item.slug] };
      return tree;
    }
    const count = item.kind === 'series' ? item.pieces.length
      : item.id === 'series' ? item.series.length : item.pieces.length;
    const tree = new vscode.TreeItem(`${item.title} (${count})`, vscode.TreeItemCollapsibleState.Collapsed);
    tree.iconPath = new vscode.ThemeIcon(item.kind === 'series' ? 'symbol-namespace' : 'folder');
    return tree;
  }
}

function webviewHtml(webview, extensionUri, extensionRoot) {
  const assets = vscode.Uri.joinPath(extensionUri, 'dist', 'webview');
  const nonce = randomBytes(18).toString('base64');
  const uri = (name) => webview.asWebviewUri(vscode.Uri.joinPath(assets, name)).toString();
  const csp = `default-src 'none'; img-src ${webview.cspSource} data:; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource};`;
  return fs.readFileSync(path.join(extensionRoot, 'dist', 'webview', 'index.html'), 'utf8')
    .replace('<head>', `<head>\n  <meta http-equiv="Content-Security-Policy" content="${csp}">`)
    .replace('href="/style.css"', `href="${uri('style.css')}"`)
    .replace('src="/vendor/cytoscape.js"', `nonce="${nonce}" src="${uri('vendor/cytoscape.js')}"`)
    .replace('src="/app.js"', `nonce="${nonce}" src="${uri('app.js')}"`);
}

function activate(context) {
  let root = null;
  let projectFolder = null;
  let feed = emptyFeed();
  let panel = null;
  let panelReady = false;
  let watchers = [];
  let refreshTimer = null;
  const tree = new PiecesTree();
  const view = vscode.window.createTreeView('ctvPieces', { treeDataProvider: tree });
  context.subscriptions.push(view, tree.changed);

  function showStatus() {
    if (!root) view.message = 'Open the Check the Vibe workspace.';
    else if (feed.error) view.message = `Graph sync error: ${feed.error}`;
    else if (feed.stale) view.message = 'Source changed. Ask your agent to rebuild the graph.';
    else if (feed.warnings.length) view.message = `${feed.warnings.length} graph warning(s).`;
    else view.message = undefined;
  }

  function sendFeed() {
    if (panel && panelReady) void panel.webview.postMessage({ type: 'snapshot', payload: feed });
  }

  function loadFeed() {
    if (!root) feed = { ...emptyFeed(), stale: true };
    else {
      try {
        const parsed = JSON.parse(fs.readFileSync(path.join(root, FEED), 'utf8'));
        if (!validFeed(parsed)) throw new Error('Invalid graph snapshot');
        feed = { ...parsed, stale: isStale(root, parsed) };
      } catch (error) {
        feed = { ...emptyFeed(), stale: true,
          error: error.code === 'ENOENT' ? null : `Cannot read graph snapshot: ${error.message}` };
      }
    }
    tree.update(feed);
    showStatus();
    sendFeed();
  }

  function scheduleRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(loadFeed, 150);
  }

  function useWorkspace() {
    for (const watcher of watchers) watcher.dispose();
    watchers = [];
    const previousRoot = root;
    projectFolder = findProjectFolder();
    root = projectFolder?.uri.fsPath || null;
    if (previousRoot && previousRoot !== root && panel) panel.dispose();
    void vscode.commands.executeCommand('setContext', 'ctv.workspace', Boolean(root));
    if (root) {
      const feedWatcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(projectFolder, FEED));
      const indexes = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(projectFolder, 'pieces/*/index.md'));
      for (const watcher of [feedWatcher, indexes]) {
        watcher.onDidCreate(scheduleRefresh);
        watcher.onDidChange(scheduleRefresh);
        watcher.onDidDelete(scheduleRefresh);
        watchers.push(watcher);
      }
    }
    loadFeed();
  }

  async function openIndex(slug) {
    if (!root) return vscode.window.showInformationMessage('Open the Check the Vibe workspace first.');
    if (!slug) {
      const pieces = feed.graph.nodes.filter((node) => node.type === 'piece')
        .sort((a, b) => a.title.localeCompare(b.title));
      const picked = await vscode.window.showQuickPick(pieces.map((piece) => ({ label: piece.title, description: piece.slug })));
      if (!picked) return;
      slug = picked.description;
    }
    const piece = pieceForSlug(feed, slug);
    if (!piece || !/^[a-z0-9][a-z0-9-]*$/.test(slug)
      || piece.indexPath !== `pieces/${slug}/index.md`) {
      return vscode.window.showErrorMessage('The selected piece is not in this graph.');
    }
    try {
      const document = await vscode.workspace.openTextDocument(vscode.Uri.joinPath(projectFolder.uri, piece.indexPath));
      await vscode.window.showTextDocument(document, { preview: false });
    } catch (error) {
      void vscode.window.showErrorMessage(`Cannot open ${piece.indexPath}: ${error.message}`);
    }
  }

  function openGraph() {
    if (!root) return vscode.window.showInformationMessage('Open the Check the Vibe workspace first.');
    if (panel) return panel.reveal();
    const assets = vscode.Uri.joinPath(context.extensionUri, 'dist', 'webview');
    panel = vscode.window.createWebviewPanel('ctvGraph', 'Check the Vibe · Work Graph', vscode.ViewColumn.One, {
      enableScripts: true,
      localResourceRoots: [assets],
    });
    panelReady = false;
    panel.webview.onDidReceiveMessage((message) => {
      if (message?.type === 'ready') { panelReady = true; sendFeed(); }
      if (message?.type === 'openIndex') void openIndex(message.slug);
    }, null, context.subscriptions);
    panel.onDidDispose(() => { panel = null; panelReady = false; }, null, context.subscriptions);
    try { panel.webview.html = webviewHtml(panel.webview, context.extensionUri, context.extensionPath); }
    catch (error) { void vscode.window.showErrorMessage(`Graph webview unavailable: ${error.message}`); panel.dispose(); }
  }

  context.subscriptions.push(
    vscode.commands.registerCommand('ctv.openGraph', openGraph),
    vscode.commands.registerCommand('ctv.openIndex', openIndex),
    vscode.commands.registerCommand('ctv.refreshGraph', loadFeed),
    vscode.workspace.onDidChangeWorkspaceFolders(useWorkspace),
    { dispose() {
      clearTimeout(refreshTimer);
      for (const watcher of watchers) watcher.dispose();
    } },
  );
  useWorkspace();
}

module.exports = { activate };

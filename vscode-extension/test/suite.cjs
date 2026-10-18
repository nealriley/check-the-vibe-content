'use strict';

const assert = require('node:assert/strict');
const vscode = require('vscode');

async function run() {
  assert.ok(vscode.workspace.workspaceFolders?.some((folder) => folder.uri.fsPath.endsWith('check-the-vibe')),
    'project workspace is open');
  await vscode.commands.executeCommand('ctv.refreshGraph');
  await vscode.commands.executeCommand('ctv.openGraph');
  await new Promise((resolve) => setTimeout(resolve, 400));
  const tabs = vscode.window.tabGroups.all.flatMap((group) => group.tabs);
  assert.ok(tabs.some((tab) => tab.label.includes('Work Graph')), 'graph panel opens');

  await vscode.commands.executeCommand('ctv.openIndex', 'how-to-talk-about-ai');
  assert.ok(vscode.window.activeTextEditor, 'index opens in text editor');
  assert.match(vscode.window.activeTextEditor.document.uri.fsPath, /pieces\/how-to-talk-about-ai\/index\.md$/);
}

module.exports = { run };

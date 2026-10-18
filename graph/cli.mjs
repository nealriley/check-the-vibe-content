import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';
import { openGraph } from './store.mjs';
import { readGraphFeed, syncGraph } from './sync.mjs';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectRoot = path.resolve(process.env.CTV_GRAPH_ROOT ?? appRoot);
const databasePath = path.join(projectRoot, '.cache', 'work-graph.lbdb');
const feedPath = path.join(projectRoot, '.cache', 'work-graph.json');
const uiRoot = path.join(appRoot, 'graph', 'ui');
const command = process.argv[2];

function report(error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

function build() {
  const store = openGraph(databasePath);
  try {
    const { state, source } = syncGraph(projectRoot, store, feedPath);
    if (state.error) throw new Error(state.error);
    console.log(`Built ${source.pieces.length} pieces, ${source.series.length} series, and ${source.pieceLinks.length} piece links.`);
    for (const warning of source.warnings) console.warn(`Warning: ${warning}`);
  } finally {
    store.close();
  }
}

function send(response, status, type, body, headOnly = false) {
  response.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(headOnly ? undefined : body);
}

function serve() {
  const rawPort = process.env.CTV_GRAPH_PORT ?? '4317';
  const port = Number(rawPort);
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error(`Invalid CTV_GRAPH_PORT: ${rawPort}`);
  const store = openGraph(databasePath);
  let state = readGraphFeed(feedPath) ?? {
    graph: store.snapshot(), revision: 'unbuilt', lastIndexedAt: null, warnings: [], error: null,
  };

  function refresh() {
    try {
      const result = syncGraph(projectRoot, store, feedPath, state);
      state = result.state;
      if (state.error) throw new Error(state.error);
      console.log(`Graph refreshed: ${result.source.pieces.length} pieces, ${result.source.series.length} series, ${result.source.pieceLinks.length} links.`);
    } catch (error) {
      console.error(`Graph refresh failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  refresh();

  const staticFiles = new Map([
    ['/', [path.join(uiRoot, 'index.html'), 'text/html; charset=utf-8']],
    ['/app.js', [path.join(uiRoot, 'app.js'), 'text/javascript; charset=utf-8']],
    ['/style.css', [path.join(uiRoot, 'style.css'), 'text/css; charset=utf-8']],
    ['/vendor/cytoscape.js', [path.join(appRoot, 'node_modules', 'cytoscape', 'dist', 'cytoscape.umd.js'), 'text/javascript; charset=utf-8']],
  ]);

  const server = createServer((request, response) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      send(response, 405, 'text/plain; charset=utf-8', 'Read-only viewer.');
      return;
    }
    const headOnly = request.method === 'HEAD';
    let url;
    try {
      url = new URL(request.url, 'http://localhost');
    } catch {
      send(response, 400, 'text/plain; charset=utf-8', 'Bad request.', headOnly);
      return;
    }
    if (url.pathname === '/api/graph') {
      send(response, 200, 'application/json; charset=utf-8', JSON.stringify(state), headOnly);
      return;
    }
    const sourceMatch = url.pathname.match(/^\/source\/([a-z0-9][a-z0-9-]*)$/);
    if (sourceMatch) {
      const piece = state.graph.nodes.find((node) => node.type === 'piece' && node.slug === sourceMatch[1]);
      if (!piece) {
        send(response, 404, 'text/plain; charset=utf-8', 'Piece not found.', headOnly);
        return;
      }
      try {
        const content = readFileSync(path.join(projectRoot, piece.indexPath));
        send(response, 200, 'text/plain; charset=utf-8', content, headOnly);
      } catch {
        send(response, 404, 'text/plain; charset=utf-8', 'Index file not found.', headOnly);
      }
      return;
    }
    const file = staticFiles.get(url.pathname);
    if (!file) {
      send(response, 404, 'text/plain; charset=utf-8', 'Not found.', headOnly);
      return;
    }
    try {
      send(response, 200, file[1], readFileSync(file[0]), headOnly);
    } catch {
      send(response, 500, 'text/plain; charset=utf-8', 'Viewer asset unavailable.', headOnly);
    }
  });

  let refreshTimer;
  const watcher = chokidar.watch(path.join(projectRoot, 'pieces'), {
    ignoreInitial: true,
    depth: 2,
    awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 50 },
  });
  watcher.on('all', (event, changedPath) => {
    if (path.basename(changedPath) !== 'index.md' && event !== 'addDir' && event !== 'unlinkDir') return;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refresh, 250);
  });
  watcher.on('error', (error) => console.error(`File watcher error: ${error.message}`));

  server.on('error', async (error) => {
    report(error);
    clearTimeout(refreshTimer);
    await watcher.close();
    store.close();
  });
  server.listen(port, process.env.CTV_GRAPH_HOST ?? '127.0.0.1', () => {
    const address = server.address();
    console.log(`Check the Vibe graph: http://127.0.0.1:${address.port}`);
  });

  let closing = false;
  const shutdown = async () => {
    if (closing) return;
    closing = true;
    clearTimeout(refreshTimer);
    await watcher.close();
    await new Promise((resolve) => server.close(resolve));
    store.close();
  };
  process.once('SIGINT', () => void shutdown());
  process.once('SIGTERM', () => void shutdown());
}

try {
  if (command === 'build') build();
  else if (command === 'serve') serve();
  else throw new Error('Use npm run graph or npm run graph:build.');
} catch (error) {
  report(error);
}

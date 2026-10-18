import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const cli = fileURLToPath(new URL('./cli.mjs', import.meta.url));

async function until(callback, timeoutMs = 6000) {
  const untilTime = Date.now() + timeoutMs;
  while (Date.now() < untilTime) {
    const result = await callback();
    if (result) return result;
    await delay(100);
  }
  throw new Error('Timed out waiting for viewer update');
}

test('viewer watches indexes and preserves its last good graph after an error', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'ctv-viewer-'));
  const pieceDir = path.join(root, 'pieces', 'one');
  mkdirSync(pieceDir, { recursive: true });
  const index = path.join(pieceDir, 'index.md');
  writeFileSync(index, `---\ntitle: Initial\n---\n`);
  const child = spawn(process.execPath, [cli, 'serve'], {
    env: { ...process.env, CTV_GRAPH_ROOT: root, CTV_GRAPH_PORT: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', (chunk) => { output += chunk.toString(); });
  child.stderr.on('data', (chunk) => { output += chunk.toString(); });
  t.after(async () => {
    if (child.exitCode === null) {
      child.kill('SIGTERM');
      await once(child, 'exit');
    }
    rmSync(root, { recursive: true, force: true });
  });

  const url = await until(() => output.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0]);
  const getGraph = async () => (await fetch(`${url}/api/graph`)).json();
  let graph = await getGraph();
  const firstRevision = graph.revision;
  const feedFile = path.join(root, '.cache', 'work-graph.json');
  assert.equal(graph.graph.nodes.find((node) => node.id === 'piece:one').title, 'Initial');
  assert.deepEqual(JSON.parse(readFileSync(feedFile, 'utf8')), graph);
  assert.equal(graph.graph.edges.length, 0);
  assert.equal((await fetch(url)).status, 200);
  assert.equal((await fetch(`${url}/api/graph`, { method: 'POST' })).status, 405);

  writeFileSync(index, `---\ntitle: Updated\nseries: Sequence\nplanning: [active, published]\n---\n`);
  graph = await until(async () => {
    const current = await getGraph();
    return current.revision !== firstRevision ? current : null;
  });
  assert.equal(graph.graph.nodes.find((node) => node.id === 'piece:one').title, 'Updated');
  assert.equal(graph.graph.edges.filter((edge) => edge.type === 'HAS_STATE').length, 2);
  assert.equal(graph.graph.edges.filter((edge) => edge.type === 'IN_SERIES').length, 1);
  assert.deepEqual(JSON.parse(readFileSync(feedFile, 'utf8')), graph);

  writeFileSync(index, `---\ntitle: Broken\nplanning: [queued]\n---\n`);
  graph = await until(async () => {
    const current = await getGraph();
    return current.error ? current : null;
  });
  assert.match(graph.error, /planning accepts only active and published/);
  assert.equal(graph.graph.nodes.find((node) => node.id === 'piece:one').title, 'Updated');
  assert.deepEqual(JSON.parse(readFileSync(feedFile, 'utf8')), graph);
});

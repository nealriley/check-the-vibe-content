import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const cli = fileURLToPath(new URL('./cli.mjs', import.meta.url));

test('one-off build keeps the last graph and exposes an index error', (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'ctv-cli-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const pieceDir = path.join(root, 'pieces', 'one');
  mkdirSync(pieceDir, { recursive: true });
  const index = path.join(pieceDir, 'index.md');
  const feedFile = path.join(root, '.cache', 'work-graph.json');
  const build = () => spawnSync(process.execPath, [cli, 'build'], {
    env: { ...process.env, CTV_GRAPH_ROOT: root }, encoding: 'utf8',
  });

  writeFileSync(index, '---\ntitle: First\n---\n');
  assert.equal(build().status, 0);
  const good = JSON.parse(readFileSync(feedFile, 'utf8'));
  assert.equal(good.graph.nodes.find((node) => node.id === 'piece:one').title, 'First');

  writeFileSync(index, '---\ntitle: Broken\nplanning: [queued]\n---\n');
  const failed = build();
  assert.equal(failed.status, 1);
  assert.match(failed.stderr, /planning accepts only active and published/);
  const retained = JSON.parse(readFileSync(feedFile, 'utf8'));
  assert.deepEqual(retained.graph, good.graph);
  assert.equal(retained.revision, good.revision);
  assert.match(retained.error, /planning accepts only active and published/);
});

test('one-off build reports the lock held by a running viewer', async (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'ctv-lock-'));
  const pieceDir = path.join(root, 'pieces', 'one');
  mkdirSync(pieceDir, { recursive: true });
  writeFileSync(path.join(pieceDir, 'index.md'), '---\ntitle: First\n---\n');

  const child = spawn(process.execPath, [cli, 'serve'], {
    env: { ...process.env, CTV_GRAPH_ROOT: root, CTV_GRAPH_PORT: '0' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(async () => {
    if (child.exitCode === null) {
      child.kill('SIGTERM');
      await once(child, 'exit');
    }
    rmSync(root, { recursive: true, force: true });
  });
  let output = '';
  child.stdout.on('data', (chunk) => { output += chunk.toString(); });
  child.stderr.on('data', (chunk) => { output += chunk.toString(); });
  for (let attempt = 0; attempt < 60 && !output.includes('Check the Vibe graph:'); attempt++) await delay(100);
  assert.match(output, /Check the Vibe graph:/);

  const blocked = spawnSync(process.execPath, [cli, 'build'], {
    env: { ...process.env, CTV_GRAPH_ROOT: root }, encoding: 'utf8',
  });
  assert.equal(blocked.status, 1);
  assert.match(blocked.stderr, /graph cache is in use/);
});

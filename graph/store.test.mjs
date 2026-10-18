import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { readSource } from './source.mjs';
import { openGraph } from './store.mjs';

test('rebuilds the cache, removes stale nodes, and rolls back failed writes', (t) => {
  const root = mkdtempSync(path.join(tmpdir(), 'ctv-store-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const slug of ['one', 'two']) mkdirSync(path.join(root, 'pieces', slug), { recursive: true });
  const one = path.join(root, 'pieces', 'one', 'index.md');
  const two = path.join(root, 'pieces', 'two', 'index.md');
  writeFileSync(one, `---\ntitle: One\nseries: Sequence\nplanning: [active, published]\n---\n\n[Two](../two/index.md)`);
  writeFileSync(two, `---\ntitle: Two\n---\n`);
  const store = openGraph(path.join(root, 'cache.lbdb'));
  t.after(() => store.close());

  const initial = readSource(root);
  store.replace(initial);
  let snapshot = store.snapshot();
  assert.equal(snapshot.nodes.filter((node) => node.type === 'piece').length, 2);
  assert.equal(snapshot.edges.filter((edge) => edge.type === 'HAS_STATE').length, 2);
  assert.equal(snapshot.edges.filter((edge) => edge.type === 'LINKS_TO_PIECE').length, 1);

  assert.throws(() => store.replace({ ...initial, pieces: [...initial.pieces, initial.pieces[0]] }));
  assert.deepEqual(store.snapshot(), snapshot);

  writeFileSync(one, `---\ntitle: One\n---\n`);
  unlinkSync(two);
  store.replace(readSource(root));
  snapshot = store.snapshot();
  assert.equal(snapshot.nodes.filter((node) => node.type === 'piece').length, 1);
  assert.equal(snapshot.edges.length, 0);

  writeFileSync(one, `---\ntitle: One\nplanning: [queued]\n---\n`);
  assert.throws(() => readSource(root), /planning accepts only/);
  assert.deepEqual(store.snapshot(), snapshot);
});

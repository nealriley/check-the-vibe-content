import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { readSource } from './source.mjs';

function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'ctv-source-'));
  mkdirSync(path.join(root, 'pieces'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  return {
    root,
    piece(slug, content) {
      const dir = path.join(root, 'pieces', slug);
      mkdirSync(dir, { recursive: true });
      writeFileSync(path.join(dir, 'index.md'), content);
    },
  };
}

test('reads confirmed series, explicit planning states, and piece links', (t) => {
  const f = fixture(t);
  f.piece('opening', `---\ntitle: Opening\nseries: Field Guide\nplanning: [active, published]\n---\n\n[Next](../next/index.md) and [again](../next/index.md).\n[Old source](../../../writing/research/paper.md).`);
  f.piece('next', `---\ntitle: Next\nseries: Field Guide\n---\n\nA standalone piece.`);
  const graph = readSource(f.root);
  assert.equal(graph.pieces.length, 2);
  assert.deepEqual(graph.series, ['Field Guide']);
  assert.deepEqual(graph.pieces.find((piece) => piece.id === 'opening').planning, ['active', 'published']);
  assert.deepEqual(graph.pieces.find((piece) => piece.id === 'next').planning, []);
  assert.deepEqual(graph.pieceLinks, [{ source: 'opening', target: 'next' }]);
  assert.deepEqual(graph.warnings, []);
});

test('leaves unlinked pieces in backlog and warns about missing piece links', (t) => {
  const f = fixture(t);
  f.piece('solo', `---\ntitle: Solo\n---\n\n[Missing](../gone/index.md) [Web](https://example.com/story)`);
  mkdirSync(path.join(f.root, 'pieces', 'solo', 'final'));
  writeFileSync(path.join(f.root, 'pieces', 'solo', 'final', 'essay.md'), 'Final text.');
  const graph = readSource(f.root);
  assert.deepEqual(graph.pieces[0].planning, []);
  assert.equal(graph.pieceLinks.length, 0);
  assert.match(graph.warnings[0], /missing piece gone/);
});

test('rejects malformed planning metadata before it reaches the cache', (t) => {
  const f = fixture(t);
  f.piece('bad', `---\ntitle: Bad\nplanning: [active, queued]\n---\n`);
  assert.throws(() => readSource(f.root), /planning accepts only active and published/);
  f.piece('bad', `---\ntitle: Bad\nplanning: active\n---\n`);
  assert.throws(() => readSource(f.root), /planning must be a list/);
  f.piece('bad', `---\ntitle: Bad\nplanning: [active, active]\n---\n`);
  assert.throws(() => readSource(f.root), /duplicate planning state/);
});

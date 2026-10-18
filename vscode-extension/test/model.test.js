'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { emptyFeed, validFeed, pieceForSlug, groupsFor, isStale, findProjectRootFromFolders } = require('../model');

test('groups dual planning states, backlog, and series from graph relationships', () => {
  const feed = {
    ...emptyFeed(),
    graph: {
      nodes: [
        { id: 'piece:one', type: 'piece', slug: 'one', title: 'One', indexPath: 'pieces/one/index.md' },
        { id: 'piece:two', type: 'piece', slug: 'two', title: 'Two', indexPath: 'pieces/two/index.md' },
        { id: 'series:Guide', type: 'series', title: 'Guide' },
      ],
      edges: [
        { type: 'HAS_STATE', source: 'piece:one', target: 'state:active' },
        { type: 'HAS_STATE', source: 'piece:one', target: 'state:published' },
        { type: 'IN_SERIES', source: 'piece:one', target: 'series:Guide' },
      ],
    },
  };
  assert.equal(validFeed(feed), true);
  assert.equal(pieceForSlug(feed, 'two').title, 'Two');
  const groups = Object.fromEntries(groupsFor(feed).map((group) => [group.id, group]));
  assert.deepEqual(groups.backlog.pieces.map((piece) => piece.slug), ['two']);
  assert.deepEqual(groups.active.pieces.map((piece) => piece.slug), ['one']);
  assert.deepEqual(groups.published.pieces.map((piece) => piece.slug), ['one']);
  assert.deepEqual(groups.series.series[0].pieces.map((piece) => piece.slug), ['one']);
});

test('marks the snapshot stale when a piece index changes', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ctv-vscode-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const pieceDir = path.join(root, 'pieces', 'one');
  fs.mkdirSync(pieceDir, { recursive: true });
  const index = path.join(pieceDir, 'index.md');
  fs.writeFileSync(index, '---\ntitle: One\n---\n');
  const builtAt = new Date(Date.now() + 1000);
  const feed = { ...emptyFeed(), lastIndexedAt: builtAt.toISOString(), graph: {
    nodes: [{ id: 'piece:one', type: 'piece', slug: 'one' }], edges: [],
  } };
  assert.equal(isStale(root, feed), false);
  fs.utimesSync(index, new Date(), new Date(builtAt.getTime() + 1000));
  assert.equal(isStale(root, feed), true);
});

test('recognizes only the Check the Vibe project structure', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ctv-scope-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'package.json'), '{"name":"another-project"}');
  fs.mkdirSync(path.join(root, 'pieces'));
  fs.mkdirSync(path.join(root, 'graph'));
  fs.writeFileSync(path.join(root, 'graph', 'cli.mjs'), '');
  assert.equal(findProjectRootFromFolders([root]), null);
  fs.writeFileSync(path.join(root, 'package.json'), '{"name":"check-the-vibe"}');
  assert.equal(findProjectRootFromFolders([root]), root);
});

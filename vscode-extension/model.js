'use strict';

const fs = require('node:fs');
const path = require('node:path');

function emptyFeed() {
  return {
    graph: { nodes: [], edges: [] }, revision: 'unbuilt', lastIndexedAt: null,
    warnings: [], error: null,
  };
}

function findProjectRootFromFolders(folders) {
  for (const root of folders) {
    try {
      const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
      if (manifest.name === 'check-the-vibe' && fs.existsSync(path.join(root, 'graph', 'cli.mjs'))
        && fs.statSync(path.join(root, 'pieces')).isDirectory()) return root;
    } catch { /* This folder is not Check the Vibe. */ }
  }
  return null;
}

function validFeed(value) {
  return value && value.graph && Array.isArray(value.graph.nodes)
    && Array.isArray(value.graph.edges) && Array.isArray(value.warnings);
}

function pieceForSlug(feed, slug) {
  return feed.graph.nodes.find((node) => node.type === 'piece' && node.slug === slug);
}

function isStale(root, feed) {
  if (!root || !feed.lastIndexedAt) return true;
  const indexedAt = Date.parse(feed.lastIndexedAt);
  if (!Number.isFinite(indexedAt)) return true;
  try {
    const slugs = new Set(feed.graph.nodes.filter((node) => node.type === 'piece').map((node) => node.slug));
    const directories = fs.readdirSync(path.join(root, 'pieces'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory());
    for (const entry of directories) {
      const index = path.join(root, 'pieces', entry.name, 'index.md');
      if (!fs.existsSync(index)) continue;
      if (!slugs.delete(entry.name) || fs.statSync(index).mtimeMs > indexedAt + 2) return true;
    }
    return slugs.size > 0;
  } catch { return true; }
}

function groupsFor(feed) {
  const pieces = feed.graph.nodes.filter((node) => node.type === 'piece')
    .sort((a, b) => a.title.localeCompare(b.title));
  const states = new Map(pieces.map((piece) => [piece.id, new Set()]));
  const series = new Map(feed.graph.nodes.filter((node) => node.type === 'series')
    .map((node) => [node.id, { title: node.title, pieces: [] }]));

  for (const edge of feed.graph.edges) {
    if (edge.type === 'HAS_STATE' && states.has(edge.source)) {
      states.get(edge.source).add(edge.target.replace(/^state:/, ''));
    }
    if (edge.type === 'IN_SERIES' && series.has(edge.target)) {
      const piece = pieces.find((candidate) => candidate.id === edge.source);
      if (piece) series.get(edge.target).pieces.push(piece);
    }
  }
  return [
    { id: 'all', title: 'All pieces', pieces },
    { id: 'backlog', title: 'Backlog', pieces: pieces.filter((piece) => states.get(piece.id).size === 0) },
    { id: 'active', title: 'Active', pieces: pieces.filter((piece) => states.get(piece.id).has('active')) },
    { id: 'published', title: 'Published', pieces: pieces.filter((piece) => states.get(piece.id).has('published')) },
    { id: 'series', title: 'Series', series: [...series.entries()].map(([id, value]) => ({ id, ...value })) },
  ];
}

module.exports = { emptyFeed, validFeed, pieceForSlug, groupsFor, isStale, findProjectRootFromFolders };

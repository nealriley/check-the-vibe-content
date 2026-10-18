import { randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { readSource } from './source.mjs';

export function readGraphFeed(file) {
  try {
    const value = JSON.parse(readFileSync(file, 'utf8'));
    if (value && value.graph && Array.isArray(value.graph.nodes) && Array.isArray(value.graph.edges)) return value;
  } catch { /* The cache may not have been built yet. */ }
  return null;
}

function writeGraphFeed(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`;
  try {
    writeFileSync(temporary, `${JSON.stringify(value)}\n`, { flag: 'wx' });
    renameSync(temporary, file);
  } finally {
    rmSync(temporary, { force: true });
  }
}

/** Rebuild the database, then publish one atomic, read-only feed for other viewers. */
export function syncGraph(root, store, feedFile, previous = readGraphFeed(feedFile)) {
  let source;
  let state;
  try {
    source = readSource(root);
    store.replace(source);
    state = {
      graph: store.snapshot(),
      revision: randomUUID(),
      lastIndexedAt: new Date().toISOString(),
      warnings: source.warnings,
      error: null,
    };
  } catch (error) {
    state = {
      graph: previous?.graph ?? store.snapshot(),
      revision: previous?.revision ?? 'unbuilt',
      lastIndexedAt: previous?.lastIndexedAt ?? null,
      warnings: previous?.warnings ?? [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
  writeGraphFeed(feedFile, state);
  return { state, source };
}

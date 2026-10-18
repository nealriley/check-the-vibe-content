import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { Connection, Database } from '@ladybugdb/core';

const SCHEMA = [
  'CREATE NODE TABLE IF NOT EXISTS Piece(id STRING PRIMARY KEY, title STRING, index_path STRING)',
  'CREATE NODE TABLE IF NOT EXISTS Series(name STRING PRIMARY KEY)',
  'CREATE NODE TABLE IF NOT EXISTS PlanningState(name STRING PRIMARY KEY)',
  'CREATE REL TABLE IF NOT EXISTS IN_SERIES(FROM Piece TO Series)',
  'CREATE REL TABLE IF NOT EXISTS LINKS_TO_PIECE(FROM Piece TO Piece)',
  'CREATE REL TABLE IF NOT EXISTS HAS_STATE(FROM Piece TO PlanningState)',
];

function run(connection, statement) {
  const result = connection.querySync(statement);
  result.close();
}

function rows(connection, statement) {
  const result = connection.querySync(statement);
  try {
    return result.getAllSync();
  } finally {
    result.close();
  }
}

function prepare(connection, statement) {
  const prepared = connection.prepareSync(statement);
  if (!prepared.isSuccess()) throw new Error(prepared.getErrorMessage());
  return prepared;
}

function execute(connection, prepared, params) {
  const result = connection.executeSync(prepared, params);
  result.close();
}

export function openGraph(dbPath) {
  mkdirSync(path.dirname(dbPath), { recursive: true });
  let database;
  try {
    database = new Database(dbPath);
    database.initSync();
  } catch (error) {
    if (/lock on file|set lock|locked/i.test(String(error))) {
      throw new Error('The graph cache is in use. Stop the viewer before running graph:build; the viewer rebuilds automatically while it is open.', { cause: error });
    }
    throw error;
  }
  const connection = new Connection(database);
  for (const statement of SCHEMA) run(connection, statement);

  return {
    replace(source) {
      const insertPiece = prepare(connection, 'CREATE (p:Piece {id: $id, title: $title, index_path: $indexPath})');
      const insertSeries = prepare(connection, 'CREATE (s:Series {name: $name})');
      const insertState = prepare(connection, 'CREATE (s:PlanningState {name: $name})');
      const linkSeries = prepare(connection, 'MATCH (p:Piece {id: $piece}), (s:Series {name: $series}) CREATE (p)-[:IN_SERIES]->(s)');
      const linkPiece = prepare(connection, 'MATCH (a:Piece {id: $source}), (b:Piece {id: $target}) CREATE (a)-[:LINKS_TO_PIECE]->(b)');
      const linkState = prepare(connection, 'MATCH (p:Piece {id: $piece}), (s:PlanningState {name: $state}) CREATE (p)-[:HAS_STATE]->(s)');

      run(connection, 'BEGIN TRANSACTION');
      try {
        run(connection, 'MATCH (n) DETACH DELETE n');
        for (const piece of source.pieces) {
          execute(connection, insertPiece, { id: piece.id, title: piece.title, indexPath: piece.indexPath });
        }
        for (const name of source.series) execute(connection, insertSeries, { name });
        for (const name of ['active', 'published']) execute(connection, insertState, { name });
        for (const piece of source.pieces) {
          for (const series of piece.series) execute(connection, linkSeries, { piece: piece.id, series });
          for (const state of piece.planning) execute(connection, linkState, { piece: piece.id, state });
        }
        for (const link of source.pieceLinks) execute(connection, linkPiece, link);
        run(connection, 'COMMIT');
      } catch (error) {
        try { run(connection, 'ROLLBACK'); } catch { /* Keep the original error. */ }
        throw error;
      }
    },

    snapshot() {
      const nodes = [];
      const edges = [];
      for (const piece of rows(connection, 'MATCH (p:Piece) RETURN p.id AS id, p.title AS title, p.index_path AS indexPath ORDER BY p.title')) {
        nodes.push({ id: `piece:${piece.id}`, type: 'piece', slug: piece.id, title: piece.title, indexPath: piece.indexPath });
      }
      for (const series of rows(connection, 'MATCH (s:Series) RETURN s.name AS name ORDER BY s.name')) {
        nodes.push({ id: `series:${series.name}`, type: 'series', title: series.name });
      }
      for (const state of rows(connection, 'MATCH (s:PlanningState) RETURN s.name AS name ORDER BY s.name')) {
        nodes.push({ id: `state:${state.name}`, type: 'state', title: state.name[0].toUpperCase() + state.name.slice(1) });
      }
      for (const edge of rows(connection, 'MATCH (p:Piece)-[:IN_SERIES]->(s:Series) RETURN p.id AS source, s.name AS target')) {
        edges.push({ id: `series:${edge.source}:${edge.target}`, type: 'IN_SERIES', source: `piece:${edge.source}`, target: `series:${edge.target}` });
      }
      for (const edge of rows(connection, 'MATCH (a:Piece)-[:LINKS_TO_PIECE]->(b:Piece) RETURN a.id AS source, b.id AS target')) {
        edges.push({ id: `link:${edge.source}:${edge.target}`, type: 'LINKS_TO_PIECE', source: `piece:${edge.source}`, target: `piece:${edge.target}` });
      }
      for (const edge of rows(connection, 'MATCH (p:Piece)-[:HAS_STATE]->(s:PlanningState) RETURN p.id AS source, s.name AS target')) {
        edges.push({ id: `state:${edge.source}:${edge.target}`, type: 'HAS_STATE', source: `piece:${edge.source}`, target: `state:${edge.target}` });
      }
      return { nodes, edges };
    },

    close() {
      connection.closeSync();
      database.closeSync();
    },
  };
}

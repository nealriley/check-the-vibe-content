import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import YAML from 'yaml';

const markdown = new MarkdownIt({ html: false, linkify: true });
const VALID_STATES = new Set(['active', 'published']);

function frontmatter(source, file) {
  const match = source.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!match) throw new Error(`${file}: expected YAML frontmatter`);

  const document = YAML.parseDocument(match[1], { uniqueKeys: true });
  if (document.errors.length) {
    throw new Error(`${file}: ${document.errors.map((error) => error.message).join('; ')}`);
  }
  const data = document.toJS();
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error(`${file}: frontmatter must be a mapping`);
  }
  return { data, body: source.slice(match[0].length) };
}

function nonemptyString(value, field, file) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${file}: ${field} must be a nonempty string`);
  }
  return value.trim();
}

function parseSeries(value, file) {
  if (value === undefined || value === null) return [];
  const values = Array.isArray(value) ? value : [value];
  return [...new Set(values.map((item) => nonemptyString(item, 'series', file)))];
}

function parsePlanning(value, file) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) {
    throw new Error(`${file}: planning must be a list, for example [active, published]`);
  }
  const result = [];
  for (const state of value) {
    if (typeof state !== 'string' || !VALID_STATES.has(state)) {
      throw new Error(`${file}: planning accepts only active and published`);
    }
    if (result.includes(state)) throw new Error(`${file}: duplicate planning state ${state}`);
    result.push(state);
  }
  return result;
}

function markdownLinks(body) {
  const hrefs = [];
  const visit = (tokens) => {
    for (const token of tokens) {
      if (token.type === 'link_open') hrefs.push(token.attrGet('href'));
      if (token.children) visit(token.children);
    }
  };
  visit(markdown.parse(body, {}));
  return hrefs.filter(Boolean);
}

function siblingPieceId(href, indexFile, piecesDir) {
  if (/^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('//') || href.startsWith('#')) return null;
  const bare = href.split(/[?#]/, 1)[0];
  if (!bare) return null;
  let decoded;
  try {
    decoded = decodeURIComponent(bare);
  } catch {
    return null;
  }
  const target = path.resolve(path.dirname(indexFile), decoded);
  const indexTarget = decoded.endsWith('/') ? path.join(target, 'index.md') : target;
  const relative = path.relative(piecesDir, indexTarget);
  const parts = relative.split(path.sep);
  if (parts.length !== 2 || parts[1] !== 'index.md' || parts[0] === '..') return null;
  return parts[0];
}

/** Read only the piece indexes. No research, draft, or external content is ingested. */
export function readSource(root) {
  const piecesDir = path.join(root, 'pieces');
  const pieces = [];
  const pendingLinks = [];
  const warnings = [];

  for (const entry of readdirSync(piecesDir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;
    const file = path.join(piecesDir, entry.name, 'index.md');
    if (!existsSync(file)) {
      warnings.push(`pieces/${entry.name}/ has no index.md`);
      continue;
    }
    const source = readFileSync(file, 'utf8');
    const { data, body } = frontmatter(source, path.relative(root, file));
    const piece = {
      id: entry.name,
      title: nonemptyString(data.title, 'title', path.relative(root, file)),
      indexPath: path.relative(root, file).split(path.sep).join('/'),
      series: parseSeries(data.series, path.relative(root, file)),
      planning: parsePlanning(data.planning, path.relative(root, file)),
    };
    pieces.push(piece);
    for (const href of markdownLinks(body)) {
      const target = siblingPieceId(href, file, piecesDir);
      if (target && target !== piece.id) pendingLinks.push({ source: piece.id, target, href });
    }
  }

  const known = new Set(pieces.map((piece) => piece.id));
  const pieceLinks = [];
  const seen = new Set();
  for (const link of pendingLinks) {
    if (!known.has(link.target)) {
      warnings.push(`pieces/${link.source}/index.md links to missing piece ${link.target}`);
      continue;
    }
    const key = `${link.source}\0${link.target}`;
    if (!seen.has(key)) {
      pieceLinks.push({ source: link.source, target: link.target });
      seen.add(key);
    }
  }
  const series = [...new Set(pieces.flatMap((piece) => piece.series))].sort();
  return { pieces, series, pieceLinks, warnings };
}

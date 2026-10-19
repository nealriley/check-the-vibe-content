import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pieces = path.join(root, 'pieces');
const markdown = new MarkdownIt();
const errors = [];
let checked = 0;

for (const entry of fs.readdirSync(pieces, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const index = path.join(pieces, entry.name, 'index.md');
  if (!fs.existsSync(index)) continue;

  const tokens = markdown.parse(fs.readFileSync(index, 'utf8'), {});
  for (const token of tokens) {
    for (const child of token.children ?? []) {
      const destination = child.type === 'link_open'
        ? child.attrGet('href')
        : child.type === 'image' ? child.attrGet('src') : null;
      if (!destination || destination.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(destination)) continue;

      checked += 1;
      const pathname = decodeURIComponent(destination.split(/[?#]/, 1)[0]);
      const resolved = path.resolve(path.dirname(index), pathname);
      const shown = `${path.relative(root, index)} -> ${destination}`;
      if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
        errors.push(`${shown} (outside repository)`);
      } else if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
        errors.push(`${shown} (missing file)`);
      } else if (!fs.realpathSync(resolved).startsWith(`${root}${path.sep}`)) {
        errors.push(`${shown} (symlink leaves repository)`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Found ${errors.length} non-portable piece-index link(s):\n${errors.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Checked ${checked} local piece-index links; all resolve inside the repository.`);
}

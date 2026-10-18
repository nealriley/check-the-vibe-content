import { copyFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const extensionRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectRoot = path.resolve(extensionRoot, '..');
const target = path.join(extensionRoot, 'dist', 'webview');
mkdirSync(path.join(target, 'vendor'), { recursive: true });
for (const name of ['index.html', 'app.js', 'style.css']) {
  copyFileSync(path.join(projectRoot, 'graph', 'ui', name), path.join(target, name));
}
copyFileSync(
  path.join(projectRoot, 'node_modules', 'cytoscape', 'dist', 'cytoscape.umd.js'),
  path.join(target, 'vendor', 'cytoscape.js'),
);

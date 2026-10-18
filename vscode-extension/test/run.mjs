import path from 'node:path';
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { runTests } from '@vscode/test-electron';

const extensionRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
rmSync(path.join(extensionRoot, '.vscode-test', 'user-data'), { recursive: true, force: true });
await runTests({
  vscodeExecutablePath: process.env.CTV_VSCODE_EXECUTABLE || undefined,
  extensionDevelopmentPath: extensionRoot,
  extensionTestsPath: path.join(extensionRoot, 'test', 'suite.cjs'),
  launchArgs: [path.resolve(extensionRoot, '..'), '--disable-workspace-trust', '--skip-welcome', '--skip-release-notes'],
});

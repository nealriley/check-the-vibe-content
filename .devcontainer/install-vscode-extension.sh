#!/usr/bin/env bash
set -euo pipefail

# Let the graph service start immediately so Codespaces can open its browser tab.
touch /tmp/ctv-codespaces-attached

workspace_dir="${CTV_WORKSPACE_DIR:-/workspaces/check-the-vibe-content}"
cd "$workspace_dir"
mkdir -p .cache
log_file=.cache/codespaces-extension.log
exec > >(tee -a "$log_file") 2>&1

echo "Building the Check the Vibe VS Code extension..."
npm ci --prefix vscode-extension
npm run vscode:package

# The post-attach shell may not have VS Code's remote CLI on PATH yet.
code_cli="${CTV_VSCODE_CLI:-}"
if [[ -z "$code_cli" ]] && command -v code >/dev/null 2>&1; then
  code_cli="$(command -v code)"
fi
if [[ -z "$code_cli" ]]; then
  shopt -s nullglob
  for candidate in \
    /vscode/vscode-server/bin/linux-*/*/bin/remote-cli/code \
    "$HOME"/.vscode-remote/bin/*/bin/remote-cli/code \
    "$HOME"/.vscode-server/bin/*/bin/remote-cli/code \
    "$HOME"/.vscode-server/cli/servers/Stable-*/server/bin/remote-cli/code; do
    if [[ -x "$candidate" ]]; then
      code_cli="$candidate"
      break
    fi
  done
fi
if [[ -z "$code_cli" || ! -x "$code_cli" ]]; then
  echo "VS Code remote CLI is unavailable; extension was packaged but not installed." >&2
  exit 1
fi

echo "Installing the extension with $code_cli"
"$code_cli" --install-extension vscode-extension/dist/check-the-vibe.vsix --force
extension_version="$(node -p "require('./vscode-extension/package.json').version")"
"$code_cli" --list-extensions --show-versions | grep -Fx "local.check-the-vibe-vscode@$extension_version"
echo "Check the Vibe VS Code extension is installed in this Codespace."

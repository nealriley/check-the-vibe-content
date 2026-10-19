#!/usr/bin/env bash
set -euo pipefail

workspace_dir="${CTV_WORKSPACE_DIR:-/workspaces/check-the-vibe-content}"
attach_signal=/tmp/ctv-codespaces-attached
rm -f "$attach_signal"
while [[ ! -f "$workspace_dir/package-lock.json" ]]; do
  sleep 1
done
cd "$workspace_dir"
mkdir -p .cache
log_file=.cache/codespaces-graph.log

# The viewer is the container's main service. If installation or the server
# fails, leave the Codespace available and retry instead of exiting it.
while ! npm ci >> "$log_file" 2>&1; do
  echo "Dependency install failed; retrying in 10 seconds." | tee -a "$log_file" >&2
  sleep 10
done

# Build as soon as the Codespace is created. Keep serving even if source
# metadata is invalid so the viewer can display the sync error.
node graph/cli.mjs build >> "$log_file" 2>&1 || true

# Codespaces forwards ports after the editor attaches. Start listening only
# then; Codespaces detects the listening port and opens the browser viewer.
while [[ ! -f "$attach_signal" ]]; do
  sleep 1
done

child_pid=
stopping=0
stop() {
  stopping=1
  if [[ -n "$child_pid" ]]; then
    kill -TERM "$child_pid" 2> /dev/null || true
  fi
}
trap stop TERM INT

while (( ! stopping )); do
  CTV_GRAPH_HOST=0.0.0.0 node graph/cli.mjs serve >> "$log_file" 2>&1 &
  child_pid=$!
  wait "$child_pid" || true
  child_pid=
  if (( ! stopping )); then
    echo "Graph viewer stopped; restarting in 2 seconds." | tee -a "$log_file" >&2
    sleep 2
  fi
done

#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

graph_port="${CTV_GRAPH_PORT:-4317}"
graph_url="http://127.0.0.1:${graph_port}/api/graph"
if curl --fail --silent "$graph_url" > /dev/null; then
  echo "Check the Vibe graph is already running on port ${graph_port}."
  exit 0
fi

mkdir -p .cache
log_file=".cache/codespaces-graph.log"
# The lifecycle shell exits after this command. Launch from a nohup shell so the
# viewer remains alive after Codespaces finishes the postStartCommand.
nohup bash -c 'env CTV_GRAPH_HOST=0.0.0.0 node graph/cli.mjs serve > "$1" 2>&1 < /dev/null &' _ "$log_file" > /dev/null 2>&1

for _ in {1..60}; do
  if curl --fail --silent "$graph_url" > /dev/null; then
    echo "Check the Vibe graph is ready on port ${graph_port}."
    exit 0
  fi
  sleep 0.5
done

cat "$log_file" >&2
echo "Graph viewer did not start on port ${graph_port}." >&2
exit 1

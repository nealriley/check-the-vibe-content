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
nohup env CTV_GRAPH_HOST=0.0.0.0 node graph/cli.mjs serve > "$log_file" 2>&1 < /dev/null &
graph_pid=$!

for _ in {1..60}; do
  if curl --fail --silent "$graph_url" > /dev/null; then
    echo "Check the Vibe graph is ready on port ${graph_port}."
    exit 0
  fi
  if ! kill -0 "$graph_pid" 2> /dev/null; then
    cat "$log_file" >&2
    exit 1
  fi
  sleep 0.5
done

cat "$log_file" >&2
echo "Graph viewer did not start on port ${graph_port}." >&2
exit 1

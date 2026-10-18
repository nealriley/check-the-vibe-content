# Check the Vibe for VS Code

A local companion for the Check the Vibe writing project. Open the **Check the Vibe** view in Explorer to browse pieces by planning state and series, or run **Check the Vibe: Open Work Graph** for the full map. Selecting a piece opens its `index.md`.

The extension reads `.cache/work-graph.json`. Build it with `npm run graph:build` from the project root. Piece indexes remain the source of truth; this extension does not edit them.

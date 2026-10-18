# Check the Vibe

A local home for writing pieces, their research and drafts, and a graph of how the pieces connect. Each piece lives in `pieces/<slug>/`, with an `index.md` that provides its title, context, and optional series and planning metadata. Read [the structure guide](docs/structure.md) before adding or reorganising pieces.

## Work graph

```bash
npm install
npm run graph:build
npm run graph
```

`graph:build` creates the ignored Ladybug cache and a JSON snapshot. `graph` serves the browser viewer at <http://127.0.0.1:4317> and keeps both caches current while it runs. Use one rebuild owner at a time.

## GitHub Codespaces

Create a Codespace from `main`. Its container installs the locked dependencies and runs the graph viewer as its main service. The viewer builds the cache on startup and watches piece indexes for changes. Port 4317 is forwarded and the graph opens in your browser. Startup and sync messages are in `.cache/codespaces-graph.log`.

Codespaces' forwarded port should stay **Private**, since the viewer can open piece indexes. If the graph tab is closed, reopen **Check the Vibe graph** from the **Ports** tab. The cache and log are local to the Codespace and ignored by Git.

## VS Code companion

```bash
npm install --prefix vscode-extension
npm run vscode:package
code --install-extension vscode-extension/dist/check-the-vibe.vsix
```

Open this folder in VS Code. The **Check the Vibe** Explorer view groups pieces by planning state and series. **Check the Vibe: Open Work Graph** opens the full map. Selecting a piece opens its source `index.md`. The extension only reads the graph snapshot and source indexes; make changes in the source files, then rebuild. See [the structure guide](docs/structure.md) for the complete workflow.

Run `npm test` for importer, cache, and view-model checks. The VS Code extension's development-host check is `npm run test:integration --prefix vscode-extension`.

[VS Code integration research and decisions](docs/vscode-research.md) records the APIs and cache handoff used here.

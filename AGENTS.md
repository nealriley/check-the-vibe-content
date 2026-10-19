# Working in Check the Vibe

Read [docs/structure.md](docs/structure.md) before creating or reorganising a piece. `intake.md` is the list of candidates and review decisions; `pieces/` holds the writing projects.

When starting a piece, create `pieces/<short-descriptive-name>/` with `index.md`, `drafts/`, and `final/`. Give the index a working title, a short description, and links to its source material. Include the intake ID or contributing IDs if there are any. Keep context, research, freewriting, and other supporting material in whatever form helps that particular piece.

Do not impose a fixed writing workflow, output format, or number of drafts. Do not turn a pending or rejected intake entry into a piece without the writer's decision. Preserve the original source location when bringing material from another project into this one.

The writer is reviewing `intake.md` in order. When they choose an intake entry, create the piece, then remove that entry and every earlier entry still in the register. Treat earlier entries as passed over; leave later entries alone. Keep the chosen entry's ID and source link in its `index.md`. Do not remove or alter the source files in their original projects.

Related pieces may use a plain **Possible series: Name** note. For confirmed series membership, use `series: "Name"` in each piece's index front matter; see [docs/structure.md](docs/structure.md).

The optional `planning` list in a piece's front matter supports `active` and `published`; both may apply. Leave it out unless the writer explicitly assigns a state. A piece with neither state appears in the graph viewer's Backlog. See [docs/structure.md](docs/structure.md) for the local graph commands. The graph database is a rebuildable cache of piece indexes; edit the indexes, not the cache. Research and non-piece links are not represented in this first graph.

The VS Code companion reads `.cache/work-graph.json` and opens the source indexes. After changing graph metadata or piece links, rebuild with `npm run graph:build` only when the browser viewer is stopped; while it runs, its watcher performs the rebuild instead. Check the snapshot or viewer for sync errors. Do not write to the database or JSON snapshot by hand.

## Running the graph locally on macOS

From the repository root, run `npm ci` on first use or after dependencies change, then run `npm run graph`. Keep that terminal open. The command rebuilds the graph on startup and watches `pieces/*/index.md` for changes. Open <http://127.0.0.1:4317/> in a browser. Stop the viewer with Ctrl-C. Run only one viewer at a time: Ladybug allows one process to own the cache. For a one-off rebuild when the viewer is stopped, use `npm run graph:build`.

## Running in VS Code on macOS

Open the repository folder in VS Code (`code .` from the repository root, or **File > Open Folder**). Run `npm ci` in its integrated terminal if needed. Start the browser viewer with **Terminal > Run Task > Check the Vibe: Run Graph Viewer**, or run `npm run graph` in the integrated terminal. Open <http://127.0.0.1:4317/> in your browser; terminate the task or press Ctrl-C in the terminal to stop it.

The project extension reads the JSON snapshot and shows the **Check the Vibe** Explorer view. Run **Check the Vibe: Open Work Graph** from the Command Palette for its graph panel; selecting a piece opens its `index.md`. If the extension is not installed on this Mac, run `npm ci --prefix vscode-extension`, `npm run vscode:package`, and `code --install-extension vscode-extension/dist/check-the-vibe.vsix` from the repository root, then reload VS Code. When the browser viewer is stopped, **Check the Vibe: Rebuild Graph** runs a one-off rebuild. While the viewer is running, use its automatic rebuild instead. See [docs/structure.md](docs/structure.md) for graph rules and extension development instructions.

In GitHub Codespaces, the dev container image includes `.devcontainer/check-the-vibe.vsix` so the remote editor can discover the project extension on first open. The container builds the graph cache on creation. The attach step packages the current extension source, verifies the installed version, and installs it if needed. After attach setup, it starts the browser viewer; Codespaces' `onAutoForward` setting opens the detected graph port in a browser tab. Do not add `forwardPorts` for port 4317: pre-forwarding prevents that detection from triggering the browser launch. Check the browser graph or `.cache/codespaces-graph.log` for graph errors and `.cache/codespaces-extension.log` for extension installation errors. Do not run a separate `graph:build` while the viewer is serving. After changing extension source, run `npm run vscode:bundle` and commit the refreshed `.devcontainer/check-the-vibe.vsix` with the source.

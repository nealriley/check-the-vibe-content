# Working in Check the Vibe

Read [docs/structure.md](docs/structure.md) before creating or reorganising a piece. `intake.md` is the list of candidates and review decisions; `pieces/` holds the writing projects.

When starting a piece, create `pieces/<short-descriptive-name>/` with `index.md`, `drafts/`, and `final/`. Give the index a working title, a short description, and links to its source material. Include the intake ID or contributing IDs if there are any. Keep context, research, freewriting, and other supporting material in whatever form helps that particular piece.

Do not impose a fixed writing workflow, output format, or number of drafts. Do not turn a pending or rejected intake entry into a piece without the writer's decision. Preserve the original source location when bringing material from another project into this one.

The writer is reviewing `intake.md` in order. When they choose an intake entry, create the piece, then remove that entry and every earlier entry still in the register. Treat earlier entries as passed over; leave later entries alone. Keep the chosen entry's ID and source link in its `index.md`. Do not remove or alter the source files in their original projects.

Related pieces may use a plain **Possible series: Name** note. For confirmed series membership, use `series: "Name"` in each piece's index front matter; see [docs/structure.md](docs/structure.md).

The optional `planning` list in a piece's front matter supports `active` and `published`; both may apply. Leave it out unless the writer explicitly assigns a state. A piece with neither state appears in the graph viewer's Backlog. See [docs/structure.md](docs/structure.md) for the local graph commands. The graph database is a rebuildable cache of piece indexes; edit the indexes, not the cache. Research and non-piece links are not represented in this first graph.

The VS Code companion reads `.cache/work-graph.json` and opens the source indexes. After changing graph metadata or piece links, rebuild with `npm run graph:build`; if the browser viewer is running, its watcher performs the rebuild instead. Check the snapshot or viewer for sync errors. Do not write to the database or JSON snapshot by hand. Build and installation instructions are in [docs/structure.md](docs/structure.md).

In GitHub Codespaces, the dev container runs the browser viewer as its main service. It builds the graph on startup and watches indexes. Check its preview or `.cache/codespaces-graph.log` for errors; do not run a separate `graph:build` while it is serving.

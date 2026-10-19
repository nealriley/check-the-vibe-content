# Project structure

`check-the-vibe` is a home for writing pieces. The [intake register](../intake.md) is where potential pieces wait for a decision. Approved ideas can become folders under `pieces/`; an idea can also start directly in `pieces/` without passing through intake.

```text
check-the-vibe/
├── AGENTS.md
├── intake.md
├── docs/
│   └── structure.md
└── pieces/
    └── <short-descriptive-name>/
        ├── index.md
        ├── drafts/
        └── final/
```

## Starting a piece

1. Create a short, descriptive folder name under `pieces/`, with `index.md`, `drafts/`, and `final/` inside it.
2. Put the working title and a short description in `index.md`. If it came from intake, record its `CTV-` ID or contributing IDs. Copy source material from other local projects into this piece, link to the local copies, and record their original locations.
3. Add context, research, notes, freewriting, images, or other working material as the piece needs it. Use names and subfolders that make sense for that piece.
4. Put versions you are drafting in `drafts/` and outputs you consider final in `final/`. Either folder can hold more than one file, in any useful format.

The `index.md` front matter has one required field: `title`. `intake_id` is useful when the piece came from the register. The rest of the file is a human-readable starting point, not a form to complete.

```markdown
---
title: "Working title"
intake_id: CTV-001
---

# Working title

A sentence or two about the piece and what it might explore.

## Source material

- [Original note](research/source-material/writing/path/to/source.md)

Original location: `writing/path/to/source.md` in the local source projects.
```

For a piece that did not come from intake, omit `intake_id`. If several intake ideas contribute to one piece, list their IDs in the prose of the index; no additional metadata is required. Add other metadata only when it solves a real need for that piece. There is no required status system, research sequence, draft count, file format, or publication path.

## Keeping the work findable

- The piece folder is the home for that piece's working material. Keep its `index.md` useful as the entry point as the work develops.
- Copy older work into the piece before linking it in `index.md`. Keep legacy drafts in `drafts/` and other source files in `research/source-material/`; preserve their original project paths in the index. The original files remain untouched.
- An intake decision is a selection decision, not a claim that a source is accurate or ready to publish. Check time-sensitive facts and claims when writing the piece.
- If several pieces may form a sequence, put a simple **Possible series: Name** note in each relevant `index.md`. Once the writer confirms membership, a `series: "Name"` line in each index's front matter makes those pieces easy to find. Keep every piece independently understandable; a series needs no separate folder.

Run `npm run content:check` after editing indexes. It checks that every local file link in a piece index resolves within this repository, so the piece can be opened from a fresh checkout or Codespace. Web links may remain external. Copied source documents can still mention their historical project paths; the index points to the portable copies.

## Local work graph

The work graph is a read-only browser view of the pieces, their confirmed series, links between piece indexes, and two optional planning relationships. The indexes remain the source of truth. The graph cache at `.cache/work-graph.lbdb` is ignored and can be rebuilt at any time.

To assign planning relationships, add a `planning` list to a piece's `index.md` front matter:

```markdown
---
title: "Working title"
series: "How to Talk About AI"
planning: [active, published]
---
```

Use `active`, `published`, both, or neither. Omit `planning` entirely for neither: the viewer calls that the **Backlog**, without creating a Backlog relationship. These labels organise the graph; they do not prescribe a drafting process or imply anything from files in `drafts/` or `final/`. Only `series` front matter creates series membership; a **Possible series** note remains just a note.

From this folder, run `npm install` once, then `npm run graph` to open the local viewer at <http://127.0.0.1:4317>. It rebuilds on startup and updates when an index changes. Use `npm run graph:build` for a one-off cache rebuild while the viewer is stopped; the embedded database permits only one read-write owner. `npm test` runs the importer and cache checks.

The first graph reads only links from one piece's `index.md` to another piece's `index.md`. Research files, web links, and other source material remain in the indexes but are not graph nodes yet. A missing piece link produces a warning. If an index has invalid graph metadata, the viewer keeps the last successful graph and shows the error until the index is fixed.

## VS Code companion

The local Check the Vibe extension adds an Explorer view grouped by **All pieces**, **Backlog**, **Active**, **Published**, and **Series**, plus a full graph panel. Selecting a piece opens its `index.md` in the normal VS Code editor. The extension has no edit controls: change the index yourself or ask your coding agent to do so, then rebuild the graph.

The database build also writes `.cache/work-graph.json`, an ignored snapshot for the extension. It is updated atomically after a successful build. When an index is invalid, it keeps the last good graph and records the sync error. The extension marks the graph as stale after source changes until a new build arrives. Neither `.cache` file belongs in Git.

From the project root, install dependencies with `npm ci` and `npm ci --prefix vscode-extension`. Use `npm run graph:build` to rebuild, or run the **Check the Vibe: Rebuild Graph** VS Code task. `npm run vscode:package` creates `vscode-extension/dist/check-the-vibe.vsix`; install it locally with `code --install-extension vscode-extension/dist/check-the-vibe.vsix`. The extension shows its view only in this project workspace and is not published. For development, use the **Run Check the Vibe Extension** launch configuration. `npm run vscode:bundle` refreshes the committed `.devcontainer/check-the-vibe.vsix` built into new Codespaces images. The attach step rebuilds and verifies the extension, installing it if necessary; installation output is in `.cache/codespaces-extension.log`.

If the browser viewer is running, it owns Ladybug and rebuilds automatically when indexes change. A separate `graph:build` will report that the cache is in use; use the viewer's updated snapshot instead. The VS Code extension never opens or writes Ladybug, so it can remain open in either case.

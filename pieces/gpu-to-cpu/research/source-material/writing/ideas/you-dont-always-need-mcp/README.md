---
collection: how-to-talk-about-ai
collection_essay: "search-retrieval-tools-and-agents"
---

# You Don’t Always Need MCP

Working materials for an article about MCP, Skills, Plugins, Apps, Agents, rules/context files, hooks, commands, and older tool-calling patterns in agentic coding CLIs.

## Working thesis

MCP is valuable when an AI agent needs durable, discoverable, permissioned access to tools, resources, prompts, UI surfaces, or external state across clients. But not every agent-customization problem is an MCP problem. Many needs are better served by rules files, skills, custom commands, plugins/extensions, subagents, direct function calling, existing APIs, CLIs, scripts, SDKs, or product-native integrations.

Short version:

> MCP is for agent-facing integration boundaries. Skills, rules, commands, plugins, and agents are often better for behavior, workflow, packaging, and delegation.

## Project files

| File | Purpose |
| --- | --- |
| `original-prompt.md` | Preserves the initial assignment and follow-up instructions. |
| `research-brief.md` | High-level synthesis and article framing. |
| `technical-research-dossier.md` | Technical notes on MCP specs, skills, connection mechanics, and lineage. |
| `verification-notes.md` | Follow-up verification results, caveats, and corrected claims. |
| `decision-framework.md` | Practical framework for choosing MCP vs simpler alternatives. |
| `integration-equivalence-framework.md` | Evaluates the claim that MCP integrations can be replaced by skills, CLIs, APIs, or agents. |
| `boundary-vocabulary.md` | Defines the project’s core vocabulary around contracts, boundaries, authority, and movement of action/information. |
| `article-argument-arc.md` | Narrative arc for reframing the article around boundary placement rather than MCP vs alternatives. |
| `atlassian-boundary-map.md` | Applies the boundary model to Jira, Confluence, Rovo, REST, MCP, browser control, Forge, Automation, and marketplaces. |
| `examples-snippets-bank.md` | Reusable examples, analogies, snippets, and config patterns. |
| `outline.md` | Article outline, not a full draft. |
| `sources.jsonl` | Machine-readable bibliography. |
| `drafts/` | Future article drafts. |

## Documentation boundaries

- Keep source-supported facts in research and verification files.
- Keep article structure in `outline.md`.
- Keep reusable decision language in `decision-framework.md`.
- Keep boundary vocabulary and the Atlassian onion model in `boundary-vocabulary.md` and `atlassian-boundary-map.md`.
- Do not turn notes into draft prose until major claims are checked against current primary sources.

## Verification status

Initial research is complete enough to plan a draft, but these ecosystems move quickly. Before publication, re-check protocol versions, host support matrices, skills syntax, MCP Apps support, and host security defaults.

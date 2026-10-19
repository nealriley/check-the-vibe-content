# Book Brief: How to Talk About AI

Status: evolving project memory / Balanced Research Sprint 1  
Last updated: 2026-06-15

## Working title

**How to Talk About AI**

Possible subtitles:

1. **A Plain-English Guide to the History, Ideas, and Everyday Use of Artificial Intelligence**
2. **What It Is, How the Pieces Fit, and How to Use It Well**
3. **A Practical Explainer for Clearer Conversations and Better AI Use**

## One-sentence promise

Readers will learn enough history, vocabulary, and practical mental models to understand today’s AI services, talk about them clearly, and use them more deliberately.

## Positioning

This is a field guide to today’s AI services: what they are, how they work, what they are used for, and what vocabulary and mental models help readers understand new tools, claims, and research as they arrive.

The vocabulary is the explainer layer, not the whole product. The book should not become primarily a glossary or generic AI explainer.

## Target reader

Primary reader: the general public, with special emphasis on knowledge workers, leaders, and educators who need to consume AI information clearly and explain it to others.

Sharper working formulation: **responsible explainers** — people who are not necessarily AI engineers, but who are expected to make sense of AI for teams, students, colleagues, customers, families, or communities.

Key reader segments:

- Knowledge workers who need to use AI tools responsibly and explain them to colleagues.
- Managers, executives, and team leads who need clear language for strategy, risk, and adoption.
- Educators and trainers who need teachable frameworks rather than hype or fear.
- General readers who want a calm, structured explainer.

## Reader’s current situation

The reader hears terms like AI, machine learning, generative AI, LLMs, agents, automation, hallucination, prompt engineering, RAG, model, training, inference, and alignment. They may know fragments, but they lack a clear map. They want to avoid sounding naive, credulous, or reflexively dismissive.

## Reader promise

After reading, the reader should be able to:

- Explain why “AI” is an umbrella term rather than one single technology.
- Place modern generative AI in a short historical arc.
- Distinguish common related topics without drowning in jargon.
- Talk about capability, risk, ethics, value, and limitations in a balanced way.
- Choose better AI use cases and get better results from tools.
- Explain how AI affects tasks, workflows, responsibilities, and accountability without collapsing the discussion into “AI will/won’t take jobs.”
- Keep learning as the tools change.

## Author angle

Neal brings a useful three-part angle:

1. **Educator lineage:** child of an educator and a math teacher, with an inherited respect for explanation, learning, and careful thinking.
2. **Executive technology perspective:** former Chief Information Officer, with experience translating technology into decisions, risks, strategy, budgets, and organizational change.
3. **Specialist practitioner perspective:** direct specialization in these technologies, giving the book practical authority beyond general commentary.

Positioning implication: the book should sound like a technically literate teacher and executive guide, not a futurist manifesto or a product tutorial.

## Scope

### Included

- A selective history of AI ideas and waves.
- Plain-language concepts and vocabulary.
- How related topics integrate: data, models, machine learning, deep learning, generative AI, LLMs, agents, automation, search, retrieval, workflows, APIs, and products.
- How AI services affect work at the level of tasks, workflows, jobs, labour, judgment, coordination, and accountability.
- Practical guidance for talking about AI with skeptics, enthusiasts, leaders, teams, customers, and oneself.
- Practical user guidance: asking better questions, giving context, verifying outputs, protecting privacy, and choosing appropriate tasks.

### Excluded or minimized

- Deep math.
- A programmer-first technical manual.
- Vendor-by-vendor tutorials that will go stale quickly.
- Predictions presented as certainty.
- Comprehensive coverage of every AI subfield.
- Culture-war framing as the central organizing principle.

## Publishing path

Gate status: unresolved. Do not narrow target length, release cadence, appendix scope, or content-series dependency until the first release format is chosen.

Likely options:

- Short trade-style nonfiction book.
- Leanpub-style serial release while the field changes.
- Self-published EPUB/PDF/print book.
- Book plus public article/newsletter series.
- Book plus talks, workshops, worksheets, cheatsheets, or short videos.

## Success criteria

Possible success criteria to prioritize:

- Readers say, “I finally have a map.”
- The book creates reusable language for meetings, teaching, consulting, and product conversations.
- The content series builds audience and tests chapters before publication.
- The book remains useful despite tool churn because it teaches concepts and conversation frames, not just product tips.

## Existing source material

Initial source-backed research now exists for these areas:

- **Area IA / Part II math foundations:** parameters, weights, loss, gradients, embeddings, tuning, scaling, PEFT, MoE, pruning, quantization, model cards/datasheets, GPT-3 few-shot, RAG, product memory/file search/citations, and RAG/citation evaluation.
- **Area M / Chapter 10:** embeddings/semantic search, RAG, AI memory, tool use/function calling, agent taxonomy, and agent/tool prompt-injection risk.
- **Area D/E/F / Part I history seeds:** pre-AI timeline, example shortlist, cultural-vs-technical lineage caveats, Turing/imitation-game caveats, cybernetics definitions, feedback examples, cybernetics boundary memo, Dartmouth/AI-name evidence, and history scope-control memo.

The current evidence system is tracked in `source-ledger.jsonl`, `claims.md`, `research/tasks/`, `research/rollups/`, and `research/source-packs/`. This is a strong start, not a complete book-wide source inventory.

Potential inputs:

- Neal’s notes, talks, essays, blog posts, internal documents, conversations, workshops, or examples.
- Public AI histories and primary sources.
- Official documentation from major AI tool/providers where specific tool behavior is discussed.
- Research papers for canonical technical milestones.
- Real reader questions and conversation examples.

## AI-use preference

Current default: human-authored, AI-assisted planning, outlining, research support, editing, and drafting samples only. Any AI-generated draft text used in the manuscript should be logged in `ai-use-ledger.md` and reviewed by Neal.

## Brief gate status

Partially passed. The project now has:

- A workable primary reader: general public with a focus on knowledge workers, leaders, and educators as “responsible explainers.”
- A credible author angle: educator lineage, former CIO, and AI/technology specialist.
- A revised five-part book spine and 17-chapter working TOC.
- A source/claim workflow and source-backed research clusters: Area IA, Area M, and first-pass Area D/E/F history seeds.
- A provisional framework stack: Pattern Engine as the primary spine metaphor, supported by Model → Harness → Sandbox → Work, the AI Service Lens, Work Loop, Vocabulary Repair, and Model Card Mindset.

Still needed:

- A chosen publishing path or first release format.
- Comps and market validation.
- Reader validation through questions, interviews, beta notes, workshop feedback, or content-series response.
- A working voice profile derived from Neal’s writing samples.
- Framework validation: test whether the Pattern Engine / Model → Harness → Sandbox → Work stack is memorable, accurate enough, and distinct from generic AI explainers.

## Project Control Milestone 1

Milestone 1 records the current planning state after the revised spine and the first IA/M research passes. It does not approve a final publishing path, final voice profile, final comparative positioning, or final reader-validation evidence.

Stable enough to coordinate from now:

- responsible explainers as the primary reader;
- the revised five-part architecture;
- Pattern Engine as the provisional spine metaphor;
- Model → Harness → Sandbox → Work as a major product/service lens;
- the source-note → task-output → rollup → source-pack → chapter-brief → draft workflow;
- the claims/source-ledger discipline.

Still gated before full manuscript drafting: publishing path, central-framework validation, Neal voice profile, comps/market positioning, reader validation, and chapter-specific source packs.

## Project Control Milestone 2

Milestone 2 establishes the first chapter-level drafting gate for **Ch 10 — Search, Retrieval, Tools, and Agents**.

Completed for this milestone:

- M-07 diagram brief for retrieval loop, tool-call loop, agent loop, and risk checkpoints.
- Ch 10 chapter brief.
- Ch 10 promoted to **Draft-ready / Freshness hold** in the readiness dashboard.

Freshness hold remains because exact vendor/product/security details should be refreshed before publication or before drafting product-specific claims.

## Project Control Milestone 3

Milestone 3 starts the source-balance and positioning pass so the project does not overdevelop the technical middle while history, learning modes, work, risk, and market positioning remain weak.

Completed for this milestone:

- Initial comps list and matrix for adjacent AI literacy, AI-at-work, technical explainer, education, critical AI, and future-risk books.
- Comps gap analysis identifying the responsible-explainer / conversation-first / model-is-not-the-tool / work-loop lane.
- Framework stress test across seven AI service examples, captured as L-02.
- Source-balance plan for the next 3–5 research sprints.
- Ch 10 working draft for review, kept under Freshness hold.

Resulting direction: pause further Area M expansion unless needed for Ch 10 freshness checks; rebalance next toward Part I history, Ch 6 learning modes, Ch 15 work/tasks/jobs, and Ch 16 risk/governance.

## Project Control Milestone 4 Sprint 0 / 0B

Milestone 4 Sprint 0 addresses control debt before the next large research expansion. Sprint 0B completes the actual source-ledger backfill and creates a reviewable ledger view.

Completed for Sprint 0:

- A-01 source-ledger schema v1 adopted for future entries and later minimal ledger backfill.
- A-02 claims structure decision: keep one canonical claims table.
- A-05 freshness policy for product, model, benchmark, legal/policy, adoption, comps, and security claims.
- A-07 chapter-to-claim map aligned to the revised 17-chapter spine.
- `claims.md` chapter labels realigned to the current spine.

Completed for Sprint 0B:

- `source-ledger.jsonl` backfilled to schema v1 with `status`, `related_chapters`, `claim_ids`, and `source_note_path`.
- `claim_ids` canonicalized to mirror `claims.md` exactly.
- `research/source-ledger-view.md` created as the human-readable review surface for the ledger.

Remaining after Sprint 0B: choose the next balanced research sprint rather than continuing to overbuild Ch 10 / Area M.

## Balanced Research Sprint 1 — Part I history seed pass

This sprint starts raising Ch 1–3 from roadmap-only status.

Completed so far:

- D-01 pre-AI timeline, D-02 example shortlist, and D-03 cultural-vs-technical lineage caveat memo, with source notes for Science Museum, SEP Turing Test, and Computer History Museum timeline.
- E-01 cybernetics definitions, E-02 feedback example bank, and E-03 cybernetics boundary memo, with MIT Libraries and Britannica source notes.
- F-01 through F-08 modern AI history coverage: Dartmouth/name, symbolic AI and expert systems, AI winters, ML transition, deep learning, Transformer, ChatGPT/generative-AI wave, and omission/scope control.
- Seed rollups for Area D, Area E, and Area F.
- Claims updated: C-002, C-003, C-004, C-005, and C-009 source-linked; C-032 through C-038 added across Part I history and modern AI history.

Remaining for Part I before chapter briefs: Ch 1–3 need source-pack/brief synthesis decisions; Ch 1–2 may still need D-05/E-05 if visuals/diagrams are used; Ch 3 should preserve caveats around AI winters, ML-transition taxonomy, and current adoption claims.

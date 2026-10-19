# Chapter Source Pack: Part II — Pattern Engine math foundations

Status: draft / caveat-fix slice  
Last updated: 2026-06-14

## Chapter research goal

Give Chapters 5–7 enough source-backed technical grounding to explain parameters, weights, activations, embeddings, loss, gradients, backpropagation, tuning, scaling-law caveats, PEFT/adapters/LoRA, in-context/RAG distinctions, compression/sparsity caveats, and parameter-count caveats at a category-literacy level.

## Minimum required sources

- Canonical neural-network source for parameters/layers/activations: S-IA-001.
- Canonical optimization source for loss/gradient training: S-IA-002.
- Accessible teaching sources for parameters/gradient/backprop: S-IA-003, S-IA-004, S-IA-005.
- Embedding/vector sources: S-IA-006, S-IA-007, S-IA-018, S-IA-019, with S-IA-023 for retrieval/vector-index connection.
- Post-training source: S-IA-008, plus additional current sources still needed.
- Historical backprop source: S-IA-009, official abstract reviewed; full article-body review still needed.
- Scaling-law and compute-optimal sources: S-IA-010 and S-IA-011.
- PEFT/adapters/LoRA sources: S-IA-012, S-IA-013, with S-IA-015 as secondary implementation vocabulary.
- Sparse/MoE parameter-count caveat: S-IA-014, used lightly unless more sources are added.
- Pruning/quantization/compression caveat: S-IA-016, S-IA-017, and S-IA-027, used at checklist level unless model-specific deployment examples are added.
- In-context, product-memory, file-search, and RAG distinction sources: S-IA-022, S-IA-023, S-IA-024, and S-IA-025.
- Documentation/freshness protocol sources: S-IA-020, S-IA-021, S-IA-028, and S-IA-029.
- Citation/source-grounding product source: S-IA-026, paired with non-vendor evaluation sources S-IA-030 through S-IA-033.
- Non-vendor RAG/citation/source-grounding evaluation sources: S-IA-030, S-IA-031, S-IA-032, S-IA-033.

## Source notes

| Source note | Source ID | Use | Caveat |
| --- | --- | --- | --- |
| `research/notes/ia-goodfellow-bengio-courville-deep-learning-ch6.md` | S-IA-001 | Parameters, layers, activations, representations. | Technical; not LLM-specific. |
| `research/notes/ia-goodfellow-bengio-courville-deep-learning-ch8.md` | S-IA-002 | Loss, optimization, gradients, proxy-objective caveat. | Technical; not current LLM recipe. |
| `research/notes/ia-cs231n-neural-networks-1.md` | S-IA-003 | Accessible parameters/layers/parameter-count framing. | Course notes. |
| `research/notes/ia-cs231n-optimization-1.md` | S-IA-004 | Accessible loss/gradient descent. | Course notes. |
| `research/notes/ia-cs231n-optimization-2.md` | S-IA-005 | Accessible backpropagation. | Course notes. |
| `research/notes/ia-mikolov-word2vec-2013.md` | S-IA-006 | Word vectors / embeddings. | Abstract-level; older static vectors. |
| `research/notes/ia-pennington-glove-2014.md` | S-IA-007 | Semantic vector space models. | Partial PDF review. |
| `research/notes/ia-ouyang-instructgpt-2022.md` | S-IA-008 | Instruction tuning/RLHF and parameter-count caveat. | Vendor/lab; freshness-sensitive. |
| `research/notes/ia-rumelhart-hinton-williams-backprop-1986.md` | S-IA-009 | Historical backprop anchor and official abstract wording. | Full article body not reviewed. |
| `research/notes/ia-kaplan-scaling-laws-2020.md` | S-IA-010 | Scaling laws: parameters, data, compute. | Empirical/loss-focused; pair with S-IA-011. |
| `research/notes/ia-hoffmann-chinchilla-2022.md` | S-IA-011 | Compute-optimal training and data/model-size caveat. | Lab source; 2022 comparisons need refresh. |
| `research/notes/ia-hu-lora-2021.md` | S-IA-012 | LoRA PEFT method: frozen base + trainable low-rank matrices. | Method-specific. |
| `research/notes/ia-houlsby-adapters-2019.md` | S-IA-013 | Adapter modules as parameter-efficient transfer learning. | Older NLP benchmark setting. |
| `research/notes/ia-switch-transformer-2021.md` | S-IA-014 | Sparse/MoE total-vs-active parameter caveat. | Abstract-level; use lightly. |
| `research/notes/ia-huggingface-peft-docs.md` | S-IA-015 | PEFT practitioner vocabulary. | Secondary docs; versioned and implementation-specific. |
| `research/notes/ia-han-deep-compression-2015.md` | S-IA-016 | Pruning, trained quantization, compression/storage caveat. | Older CNN settings; exact ratios not general. |
| `research/notes/ia-zhu-gupta-pruning-2017.md` | S-IA-017 | Pruning as sparsity/nonzero-parameter reduction. | Older architectures; not current LLM survey. |
| `research/notes/ia-devlin-bert-2018.md` | S-IA-018 | Contextual representations and fine-tuning vocabulary. | Encoder-model source; historical. |
| `research/notes/ia-reimers-sbert-2019.md` | S-IA-019 | Sentence embeddings and cosine-similarity comparison. | Exact speedups dated/context-specific. |
| `research/notes/ia-mitchell-model-cards-2018.md` | S-IA-020 | Model cards, intended use, evaluation documentation. | Current model/system cards still need fresh examples. |
| `research/notes/ia-gebru-datasheets-2018.md` | S-IA-021 | Dataset documentation, provenance/composition/recommended uses. | Not evidence for any one dataset. |
| `research/notes/ia-brown-gpt3-few-shot-2020.md` | S-IA-022 | In-context/few-shot behavior without gradient updates/fine-tuning. | Lab source; product memory needs current docs. |
| `research/notes/ia-lewis-rag-2020.md` | S-IA-023 | RAG parametric/non-parametric memory and dense vector index. | Product RAG implementations vary. |
| `research/notes/ia-openai-memory-faq-2026.md` | S-IA-024 | Product memory/personalization and user controls. | Vendor docs; fast-changing. |
| `research/notes/ia-openai-file-search-docs-2026.md` | S-IA-025 | Current file search, vector stores, retrieval, and file citations. | Vendor API docs; implementation-specific. |
| `research/notes/ia-anthropic-citations-docs-2026.md` | S-IA-026 | Current source-location/citation feature for provided documents. | Citations are not correctness guarantees. |
| `research/notes/ia-huggingface-transformers-quantization-overview.md` | S-IA-027 | Current quantization vocabulary and precision/memory caveats. | Practitioner docs; not primary evaluation evidence. |
| `research/notes/ia-openai-gpt-4o-system-card-2024.md` | S-IA-028 | Current system-card example. | Vendor-authored; not independent validation. |
| `research/notes/ia-meta-llama-3-1-model-card-2024.md` | S-IA-029 | Current open-weight model-card example. | Provider-authored; not independent validation. |
| `research/notes/ia-gao-alce-citations-2023.md` | S-IA-030 | Citation evaluation and incomplete source-support caveat. | Abstract-level; exact numbers need refresh. |
| `research/notes/ia-es-ragas-2023.md` | S-IA-031 | RAG evaluation dimensions: retrieval relevance, faithful use, generation quality. | Evaluation framework; avoid metric deep dive. |
| `research/notes/ia-liu-lost-in-middle-2023.md` | S-IA-032 | Long-context source-use failures and position effects. | Context-use caveat; not all RAG systems. |
| `research/notes/ia-chen-rgb-rag-benchmark-2023.md` | S-IA-033 | RAG robustness benchmark dimensions. | Exact results are model/time-specific. |

## Supported claims

| Claim ID | Claim | Source IDs | Notes |
| --- | --- | --- | --- |
| C-015 | Parameters/weights are learned numerical values. | S-IA-001, S-IA-003 | Ready for chapter brief with accessible wording. |
| C-011 | Fine-tuning differs from prompting/retrieval/product configuration. | S-IA-001, S-IA-008, S-IA-018, S-IA-022, S-IA-023, S-IA-024, S-IA-025 | Product docs are freshness-sensitive. |
| C-012 | In-context learning can change behavior without necessarily updating weights. | S-IA-022, S-IA-024 | Product memory caveat remains. |
| C-013 | RAG can add external information at query time without base-model weight updates. | S-IA-023, S-IA-025 | Do not say RAG systems involve no training or no storage elsewhere. |
| C-016 | Parameter count alone is not a simple quality/intelligence score. | S-IA-003, S-IA-008, S-IA-010, S-IA-011, S-IA-014, S-IA-016, S-IA-017, S-IA-022, S-IA-027 | Stronger after scaling/compression/context additions; still refresh current model examples. |
| C-017 | Embeddings are vector representations. | S-IA-006, S-IA-007, S-IA-018, S-IA-019, S-IA-023, S-IA-025 | Modern contextual/sentence/retrieval/file-search support added. |
| C-018 | PEFT can adapt behavior with a small set of trainable added/selected parameters. | S-IA-012, S-IA-013, S-IA-015 | Use method-specific caveats; docs are secondary. |
| C-019 | Loss/cost functions provide training objective/proxy error. | S-IA-001, S-IA-002, S-IA-004 | Good for Ch 6. |
| C-020 | Gradient descent iteratively updates parameters to reduce loss. | S-IA-002, S-IA-004, S-IA-005 | Good for Ch 6, with caveat about optimizer refinements. |
| C-021 | Backpropagation computes gradients through multilayer networks. | S-IA-001, S-IA-005, S-IA-009 | Official abstract reviewed; full article body pending. |
| C-022 | Scaling-law sources relate loss/performance to parameters, data, and compute in scoped empirical settings. | S-IA-010, S-IA-011 | Do not turn into universal intelligence formula. |
| C-023 | Model/dataset claims need intended-use, evaluation, data, limitation, and freshness context. | S-IA-020, S-IA-021, S-IA-028, S-IA-029 | Current examples added; still not independent validation. |
| C-024 | Sparse/MoE total and active parameter counts can differ. | S-IA-014 | Narrow support; add more sources before detailed sidebar. |
| C-025 | Compression methods such as pruning and quantization complicate model-size claims. | S-IA-016, S-IA-017, S-IA-027 | Checklist-level support; add model-specific evaluation for examples. |
| C-026 | Product memory can store context for future responses without necessarily updating base weights during that chat. | S-IA-024 | Vendor/product-specific and freshness-sensitive. |
| C-027 | Retrieval/citation features can point to source material without guaranteeing correctness. | S-IA-025, S-IA-026, S-IA-030, S-IA-031, S-IA-032, S-IA-033 | Vendor feature docs plus non-vendor evaluation sources now support the caveat. |
| C-028 | RAG/source-grounded systems need evaluation for retrieval relevance, faithful use, citation quality, robustness, integration, and answer quality. | S-IA-030, S-IA-031, S-IA-032, S-IA-033 | Checklist guidance; refresh before product/model-specific claims. |

## Unsupported or weak claims

- Current RAG/source-quality guidance has initial non-vendor support here, but Area L should still build a fuller chapter source pack before drafting product advice.
- Current model-release comparisons need fresh model-card/system-card, benchmark, release-note, and serving sources before publication.

## Examples available

- “Adjustable numerical settings” for parameters.
- “Scoreboard/proxy” for loss function.
- “Nudging downhill” for gradient descent, with caution that it is a metaphor.
- “Backward bookkeeping” for backpropagation.
- “Learned map” for embeddings, with caveat that map position is not human meaning.
- InstructGPT as a scoped example where post-training and evaluation context complicate parameter-count comparisons.
- Chinchilla as a scoped example where data/compute allocation complicates “bigger is better.”
- PEFT visual: frozen base model with small adapter/LoRA-style trainable components.
- Parameter announcement checklist for readers.
- GPT-3/few-shot as a scoped example of in-context examples without gradient updates during application.
- RAG as a scoped example of parametric model memory plus non-parametric retrieved memory.
- Model cards/datasheets as a freshness and documentation protocol for model/data claims.
- OpenAI Memory FAQ as a scoped example of product memory.
- OpenAI file search and Anthropic citations docs as scoped examples of retrieval/citation product features.
- GPT-4o system card and Llama 3.1 model card as dated release-documentation examples.
- ALCE/Ragas/RGB/Lost-in-the-Middle as examples of why source-grounding needs evaluation, not trust-by-citation.

## Diagram needs

- Layered computation with weights and activations.
- Training loop: prediction -> loss -> backprop/gradient -> parameter update.
- Embedding space map.
- “What changed?” decision tree separating parameters, prompt, context, retrieval/file search, citations, memory, tools, and workflow.
- Scale triangle: parameters, data/tokens, and compute, with evaluation/serving/use-case caveats around it.
- PEFT overlay: frozen base plus small adaptation parameters.
- Optional dense-vs-sparse/MoE total/active parameter sidebar.
- Optional compression sidebar: raw parameters vs nonzero parameters vs storage precision/size.
- Source-grounding checklist: retrieved? cited? supported? faithfully used? robust to noise/conflict?

## Freshness checks before drafting/publication

- Refresh post-training terminology and methods.
- Refresh parameter-efficient tuning, quantization, sparsity, MoE, and active-parameter examples.
- Refresh any model-release examples or parameter-count comparisons.
- Review full text of Rumelhart et al. if cited historically.
- Refresh Hugging Face PEFT docs if used for implementation vocabulary.
- Review current model/system cards, dataset disclosures, and release notes before citing live model claims.
- Review current product memory and RAG documentation before explaining user-facing memory/retrieval products.
- Refresh and expand RAG/source-grounding evaluation before making product- or domain-specific reliability claims about citations or retrieval.
- Move RAG/source-grounding reliability sources into Area L and add domain-specific evaluations if Ch 10 uses high-stakes examples.

## Open questions

- How much of this belongs in main text vs sidebars/glossary?
- Which single metaphor should dominate: knobs/settings, learned numerical structure, or layered function?
- Should parameter-count caveats appear before or after the first model-announcement example?
- Should LoRA/adapters be in main text or glossary/sidebar only?

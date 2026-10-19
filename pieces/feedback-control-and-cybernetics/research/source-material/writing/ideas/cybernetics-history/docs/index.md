# Cybernetics History Dataset

Local research navigation for the cybernetics-history corpus.

## Corpus Status

- Sources: 48 PDFs
- Embedded-text sidecars: 40
- OCR-needed sidecars: 8
- Extracted words: 2,217,826
- Source of corpus: <https://monoskop.org/Cybernetics> and linked Monoskop resource pages

## Main Indexes

- [Source index](source-index.md)
- [Extraction gaps](extraction-gaps.md)
- [Dataset files](../dataset/README.md)
- [Project README](../README.md)

## Topic Rollups

| Topic | Sources | Extracted | OCR needed | Rollup |
|---|---:|---:|---:|---|
| Foundations, Wiener, and first-order cybernetics | 5 | 4 | 1 | [Open](topics/foundations-wiener.md) |
| French, Soviet, German, and translation contexts | 9 | 7 | 2 | [Open](topics/regional-reception.md) |
| Macy conferences and the cybernetics group | 1 | 1 | 0 | [Open](topics/macy-cybernetics-group.md) |
| Second-order cybernetics, autopoiesis, and constructivism | 11 | 9 | 2 | [Open](topics/second-order-autopoiesis.md) |
| Pask, conversation theory, learning, and performance | 3 | 3 | 0 | [Open](topics/pask-learning-conversation.md) |
| Historiography, Cold War, politics, and critique | 7 | 6 | 1 | [Open](topics/historiography-cold-war.md) |
| Computing, design, media, and counterculture | 3 | 3 | 0 | [Open](topics/computing-design-counterculture.md) |
| Posthumanism, cyborgs, and embodied mind | 2 | 1 | 1 | [Open](topics/posthuman-cyborg-embodiment.md) |
| Social impact, governance, and state-of-the-art surveys | 3 | 3 | 0 | [Open](topics/social-impact-governance.md) |
| Periodicals, diagrams, bibliographies, and research resources | 4 | 3 | 1 | [Open](topics/periodicals-resources.md) |

## Maintenance

Regenerate the dataset after adding sources, replacing OCR text, or editing `manifest.json`:

```bash
python3 tools/build_dataset.py
```

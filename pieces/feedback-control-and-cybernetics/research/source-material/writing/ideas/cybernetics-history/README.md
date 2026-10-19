---
collection: how-to-talk-about-ai
collection_essay: "feedback-control-and-cybernetics"
---

# Cybernetics History

Working corpus for cybernetics history research based on Monoskop's Cybernetics page.

## Contents

- `sources/*.pdf`: 48 PDFs copied from `/home/neal/Downloads` after scraping `https://monoskop.org/Cybernetics` and its linked Monoskop resource pages.
- `sources/*.txt`: Poppler `pdftotext` sidecar extraction stored next to each PDF.
- `manifest.json`: source URL, Monoskop resource page, local PDF path, local text path, file sizes, and extraction status for each item.
- `dataset/`: machine-readable local dataset derived from the manifest and text sidecars.
- `docs/`: human- and agent-readable source cards, source index, extraction gaps, and topic rollups with links to local PDFs and text files.

## Dataset Navigation

Start with:

- [Dataset index](docs/index.md): corpus status and topic rollup table.
- [Source index](docs/source-index.md): all 48 sources with links to source cards, PDFs, and text sidecars.
- [Extraction gaps](docs/extraction-gaps.md): image-only or low-text PDFs requiring OCR.
- [Dataset files](dataset/README.md): JSON/JSONL schema for local processing.

Topic rollups are in `docs/topics/`:

- [Foundations, Wiener, and first-order cybernetics](docs/topics/foundations-wiener.md)
- [French, Soviet, German, and translation contexts](docs/topics/regional-reception.md)
- [Macy conferences and the cybernetics group](docs/topics/macy-cybernetics-group.md)
- [Second-order cybernetics, autopoiesis, and constructivism](docs/topics/second-order-autopoiesis.md)
- [Pask, conversation theory, learning, and performance](docs/topics/pask-learning-conversation.md)
- [Historiography, Cold War, politics, and critique](docs/topics/historiography-cold-war.md)
- [Computing, design, media, and counterculture](docs/topics/computing-design-counterculture.md)
- [Posthumanism, cyborgs, and embodied mind](docs/topics/posthuman-cyborg-embodiment.md)
- [Social impact, governance, and state-of-the-art surveys](docs/topics/social-impact-governance.md)
- [Periodicals, diagrams, bibliographies, and research resources](docs/topics/periodicals-resources.md)

Regenerate the dataset after adding sources or replacing OCR text:

```bash
python3 tools/build_dataset.py
```

## Extraction

Text sidecars were generated with:

```bash
pdftotext -enc UTF-8 -nopgbrk source.pdf source.txt
```

Poppler extracted embedded text for 40 PDFs. The following 8 PDFs appear to be image-only or otherwise lack an embedded text layer and need OCR if full text is required:

- `Ruyer_Raymond_La_cybernetique_et_l_origine_de_l_information.pdf`
- `Kossa_Pol_Kibernetika_Ot_chelovecheskogo_mozga_k_mozgu_iskusstvennomu_1958.pdf`
- `Margaret_Mead_1968_Cybernetics_of_Cybernetics.pdf`
- `Varela_Maturana_Uribe_1974_Autopoiesis.pdf`
- `Gray_Chris_Hables_ed_The_Cyborg_Handbook_1995.pdf`
- `Anti-Daedalus_A_Manifesto_Against_the_Cybernetic_Hypothesis_2025.pdf`
- `Wiener_Norbert_Cybernetics_or_the_Control_and_Communication_in_the_Animal_and_the_Machine_2nd_ed.pdf`
- `Maturana_Humberto_R_Varela_Francisco_J_Autopoiesis_and_Cognition_The_Realization_of_the_Living.pdf`

OCR tooling such as `ocrmypdf` or `tesseract` was not installed when the initial sidecars were generated.

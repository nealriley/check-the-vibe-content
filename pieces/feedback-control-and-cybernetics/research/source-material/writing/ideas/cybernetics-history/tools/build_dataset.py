#!/usr/bin/env python3
"""Build a local research dataset for the cybernetics-history corpus.

Inputs:
  - manifest.json
  - sources/*.pdf
  - sources/*.txt

Outputs:
  - dataset/sources.json
  - dataset/sources.jsonl
  - dataset/topics.json
  - dataset/README.md
  - docs/index.md
  - docs/source-index.md
  - docs/extraction-gaps.md
  - docs/sources/*.md
  - docs/topics/*.md

The builder is deliberately dependency-light: it uses only Python's standard
library plus optional Poppler `pdfinfo` when available.
"""

from __future__ import annotations

import json
import re
import subprocess
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen


PROJECT = Path(__file__).resolve().parents[1]
MANIFEST = PROJECT / "manifest.json"
DATASET = PROJECT / "dataset"
DOCS = PROJECT / "docs"
SOURCE_DOCS = DOCS / "sources"
TOPIC_DOCS = DOCS / "topics"
START_URL = "https://monoskop.org/Cybernetics"
USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0 Safari/537.36"


STOPWORDS = {
    "about", "after", "again", "against", "also", "among", "and", "another",
    "any", "are", "because", "been", "before", "being", "between", "both",
    "but", "can", "could", "does", "each", "from", "had", "has", "have",
    "her", "here", "him", "his", "how", "into", "its", "more", "most",
    "not", "only", "other", "our", "over", "page", "pages", "part", "such",
    "than", "that", "the", "their", "them", "then", "there", "these", "they",
    "this", "through", "upon", "use", "used", "using", "was", "were", "when",
    "where", "which", "while", "who", "will", "with", "within", "without",
    "would", "your", "what", "very", "must", "even", "many", "much", "some",
    "same", "make", "made", "may", "might", "shall", "should", "one", "two",
    "three", "first", "second", "chapter", "figure", "table", "note", "notes",
    "would", "your", "cybernetics", "cybernetic", "information", "system",
    "systems", "control", "communication", "communications",
}


@dataclass(frozen=True)
class Topic:
    id: str
    title: str
    summary: str
    research_use: str
    sort: int


TOPICS: dict[str, Topic] = {
    "foundations-wiener": Topic(
        id="foundations-wiener",
        title="Foundations, Wiener, and first-order cybernetics",
        summary=(
            "Foundational works and translations around Norbert Wiener's first-order "
            "cybernetics: control, communication, feedback, prediction, and the social "
            "questions raised by automation."
        ),
        research_use=(
            "Use this area to establish the baseline vocabulary of cybernetics and to "
            "trace how Wiener's technical framework becomes a broader social theory."
        ),
        sort=10,
    ),
    "regional-reception": Topic(
        id="regional-reception",
        title="French, Soviet, German, and translation contexts",
        summary=(
            "Regional and translation histories showing how cybernetics moved through "
            "French, Soviet, German, Italian, Portuguese, Spanish, and Serbo-Croatian contexts."
        ),
        research_use=(
            "Use this area to compare national receptions, scientific vocabularies, "
            "ideological constraints, and translation choices."
        ),
        sort=20,
    ),
    "macy-cybernetics-group": Topic(
        id="macy-cybernetics-group",
        title="Macy conferences and the cybernetics group",
        summary=(
            "Works focused on the Macy conferences, the cybernetics group, and the early "
            "interdisciplinary network around feedback, communication, psychiatry, anthropology, "
            "mathematics, and engineering."
        ),
        research_use=(
            "Use this area to reconstruct people, meetings, disciplinary crossings, and the "
            "formation of cybernetics as an interdisciplinary field."
        ),
        sort=30,
    ),
    "second-order-autopoiesis": Topic(
        id="second-order-autopoiesis",
        title="Second-order cybernetics, autopoiesis, and constructivism",
        summary=(
            "Observer-centered and self-referential cybernetics: autopoiesis, radical "
            "constructivism, self-organization, cognition, embodiment, and epistemology."
        ),
        research_use=(
            "Use this area to track the move from observed systems to observing systems, "
            "and from control models to cognition and self-production."
        ),
        sort=40,
    ),
    "pask-learning-conversation": Topic(
        id="pask-learning-conversation",
        title="Pask, conversation theory, learning, and performance",
        summary=(
            "Gordon Pask's conversation theory, human learning, performance, education, "
            "and interaction-oriented cybernetics."
        ),
        research_use=(
            "Use this area for chapters on pedagogy, learning machines, conversation as a "
            "formal model, and cybernetics as an interaction discipline."
        ),
        sort=50,
    ),
    "historiography-cold-war": Topic(
        id="historiography-cold-war",
        title="Historiography, Cold War, politics, and critique",
        summary=(
            "Historical analyses of cybernetics as a Cold War science, an epistemic style, "
            "a political vocabulary, and an object of later critique."
        ),
        research_use=(
            "Use this area for historiographic framing, political stakes, military and Cold "
            "War context, and critiques of cybernetic rationality."
        ),
        sort=60,
    ),
    "computing-design-counterculture": Topic(
        id="computing-design-counterculture",
        title="Computing, design, media, and counterculture",
        summary=(
            "Cybernetics as a bridge into computing, design research, media theory, "
            "counterculture, cultural techniques, and apparatus theories."
        ),
        research_use=(
            "Use this area to connect cybernetics to design methods, computing cultures, "
            "media theory, and postwar human-science reform."
        ),
        sort=70,
    ),
    "posthuman-cyborg-embodiment": Topic(
        id="posthuman-cyborg-embodiment",
        title="Posthumanism, cyborgs, and embodied mind",
        summary=(
            "Cybernetics in posthumanist, cyborg, body, embodiment, and cognitive-science "
            "lineages."
        ),
        research_use=(
            "Use this area for the cultural afterlife of cybernetics in body theory, cyborg "
            "studies, posthumanism, and embodied cognition."
        ),
        sort=80,
    ),
    "social-impact-governance": Topic(
        id="social-impact-governance",
        title="Social impact, governance, and state-of-the-art surveys",
        summary=(
            "Works that generalize cybernetics into social organization, governance, control "
            "societies, communications revolution, and survey/state-of-the-field contexts."
        ),
        research_use=(
            "Use this area for macro-social arguments and for synthesizing cybernetics as a "
            "historical force in organizations, markets, states, and institutions."
        ),
        sort=90,
    ),
    "periodicals-resources": Topic(
        id="periodicals-resources",
        title="Periodicals, diagrams, bibliographies, and research resources",
        summary=(
            "Journals, diagrams, resource documents, bibliographies, and short-form materials "
            "that help map the field rather than presenting a single monograph argument."
        ),
        research_use=(
            "Use this area for field mapping, citation discovery, visualizations, and quick "
            "orientation documents."
        ),
        sort=100,
    ),
}


TOPIC_RULES: list[tuple[str, str]] = [
    (r"Social_Graph|Cybernetic_Vol|Cybernetics_of_Cybernetics", "periodicals-resources"),
    (r"Wiener_Norbert_(1948_Cybernetics|Cybernetics_or|The_Human_Use|The_Machine_Age)", "foundations-wiener"),
    (r"Wiener_Norbert_(La_cibernetica|Cibernetica|Introduzione)|Viner_Norbert", "regional-reception"),
    (r"Ruyer|Kossa|Zheleznov|Gotthard_Guenther", "regional-reception"),
    (r"Heims_Steve|Macy|Cybernetics_Group", "macy-cybernetics-group"),
    (r"Varela_Maturana|Maturana_Humberto|Von_Glasersfeld|Glanville|Von_Foerster|Embodied_Mind", "second-order-autopoiesis"),
    (r"Pask_Gordon", "pask-learning-conversation"),
    (r"Galison|Gerovitch|Pickering|Geoghegan_Bernard_Dionys(ius|us)_20|Anti-Daedalus", "historiography-cold-war"),
    (r"Pias_Claus|Clarke_Bruce|Dubberly_Hugh_Pangaro_Paul_2015_How|Cybernetic_Apparatus", "computing-design-counterculture"),
    (r"Hayles|Cyborg_Handbook|Varela_Thompson_Rosch", "posthuman-cyborg-embodiment"),
    (r"Dechert|Control_Revolution|Werner_Liss", "social-impact-governance"),
]


class SectionLinkParser(HTMLParser):
    def __init__(self, base_url: str) -> None:
        super().__init__()
        self.base_url = base_url
        self.section_by_url: dict[str, str] = {}
        self.sections: dict[int, str] = {}
        self.in_heading_level: int | None = None
        self.heading_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        if tag in {"h2", "h3", "h4"}:
            self.in_heading_level = int(tag[1])
            self.heading_parts = []
            return
        if tag == "a":
            href = None
            for key, value in attrs:
                if key and key.lower() == "href" and value:
                    href = value
                    break
            if href:
                url = normalize_url(href, self.base_url)
                self.section_by_url.setdefault(url, self.current_section())

    def handle_data(self, data: str) -> None:
        if self.in_heading_level is not None:
            self.heading_parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if self.in_heading_level is not None and tag == f"h{self.in_heading_level}":
            text = clean_ws("".join(self.heading_parts))
            text = clean_ws(text.replace("[edit]", ""))
            if text:
                self.sections[self.in_heading_level] = text
                for level in list(self.sections):
                    if level > self.in_heading_level:
                        del self.sections[level]
            self.in_heading_level = None
            self.heading_parts = []

    def current_section(self) -> str:
        parts = [self.sections[level] for level in sorted(self.sections)]
        return " > ".join(parts) if parts else "Lead"


def clean_ws(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def normalize_url(url: str, base: str) -> str:
    parsed = urlparse(urljoin(base, url))
    if parsed.netloc.lower() == "monoskop.org":
        parsed = parsed._replace(scheme="https")
    return urlunparse(parsed._replace(fragment=""))


def fetch_section_map() -> dict[str, str]:
    try:
        req = Request(START_URL, headers={"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"})
        with urlopen(req, timeout=30) as response:
            html = response.read().decode("utf-8", "replace")
    except (HTTPError, URLError, TimeoutError, OSError):
        return {}
    parser = SectionLinkParser(START_URL)
    parser.feed(html)
    return parser.section_by_url


def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return re.sub(r"-+", "-", text).strip("-")[:100]


def display_title(pdf_path: Path) -> str:
    stem = pdf_path.stem
    stem = stem.replace("_", " ")
    stem = stem.replace("  ", " ")
    return clean_ws(stem)


def year_from_name(name: str) -> int | None:
    years = [int(y) for y in re.findall(r"(?<!\d)(19\d{2}|20\d{2})(?!\d)", name)]
    return years[-1] if years else None


def assign_topic(filename: str) -> str:
    for pattern, topic_id in TOPIC_RULES:
        if re.search(pattern, filename, flags=re.IGNORECASE):
            return topic_id
    return "historiography-cold-war"


def relative_link(target: str | Path, start: Path = DOCS) -> str:
    path = Path(target)
    if path.is_absolute():
        path = path.relative_to(PROJECT)
    rel = Path("..") / path if start == DOCS else path
    return quote(str(rel).replace("\\", "/"), safe="/:#._-%")


def link_from_doc(target: str | Path, doc_dir: Path) -> str:
    path = Path(target)
    if path.is_absolute():
        path = path.relative_to(PROJECT)
    rel = Path("../") / path if doc_dir == DOCS else Path("../..") / path
    return quote(str(rel).replace("\\", "/"), safe="/:#._-%")


def read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8", errors="replace")


def word_count(text: str) -> int:
    return len(re.findall(r"\b[\w'’-]+\b", text))


def top_terms(text: str, limit: int = 12) -> list[str]:
    words = re.findall(r"\b[a-zA-Z][a-zA-Z-]{3,}\b", text.lower())
    counts = Counter(w for w in words if w not in STOPWORDS and len(w) >= 4)
    return [word for word, _ in counts.most_common(limit)]


def preview_paragraphs(text: str, limit: int = 3) -> list[str]:
    paras: list[str] = []
    for para in re.split(r"\n\s*\n", text):
        para = clean_ws(para)
        if len(para) < 80:
            continue
        if len(para) > 700:
            para = para[:697].rsplit(" ", 1)[0] + "..."
        paras.append(para)
        if len(paras) >= limit:
            break
    return paras


def detected_headings(text: str, limit: int = 14) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for raw in text.splitlines():
        line = clean_ws(raw)
        if not (4 <= len(line) <= 110):
            continue
        if line in seen:
            continue
        if re.search(r"\.{4,}|\d{3,}$", line):
            continue
        letters = re.sub(r"[^A-Za-z]", "", line)
        if not letters:
            continue
        looks_heading = (
            line.isupper()
            or re.match(r"^(chapter|part|section|introduction|preface|conclusion|appendix|contents)\b", line, re.I)
            or (len(line.split()) <= 9 and sum(1 for w in line.split() if w[:1].isupper()) >= max(2, len(line.split()) // 2))
        )
        if looks_heading:
            seen.add(line)
            out.append(line)
            if len(out) >= limit:
                break
    return out


def pdf_page_count(path: Path) -> int | None:
    try:
        completed = subprocess.run(["pdfinfo", str(path)], capture_output=True, text=True, timeout=20)
    except (OSError, subprocess.TimeoutExpired):
        return None
    if completed.returncode != 0:
        return None
    match = re.search(r"^Pages:\s+(\d+)", completed.stdout, re.MULTILINE)
    return int(match.group(1)) if match else None


def source_card(record: dict) -> str:
    topic = TOPICS[record["primary_topic"]]
    status = record["extract_status"]
    lines = [
        f"# Source: {record['title']}",
        "",
        "## Links",
        "",
        f"- PDF: [{Path(record['pdf_path']).name}]({link_from_doc(record['pdf_path'], SOURCE_DOCS)})",
        f"- Text sidecar: [{Path(record['txt_path']).name}]({link_from_doc(record['txt_path'], SOURCE_DOCS)})",
        f"- Monoskop file URL: <{record['url']}>",
        f"- Source page/context: <{record['source_page']}>",
        "",
        "## Dataset Metadata",
        "",
        f"- Source slug: `{record['slug']}`",
        f"- Primary topic: [{topic.title}](../topics/{record['primary_topic']}.md)",
        f"- Monoskop section: {record['monoskop_section']}",
        f"- Year inferred from filename: {record['year'] if record['year'] else 'unknown'}",
        f"- PDF size: {record['pdf_bytes']} bytes",
        f"- Page count: {record['page_count'] if record['page_count'] is not None else 'unknown'}",
        f"- Text extraction status: `{status}`",
        f"- Text characters: {record['text_chars']}",
        f"- Word count: {record['word_count']}",
        "",
    ]
    if record["keywords"]:
        lines.extend(["## High-Frequency Terms", "", ", ".join(f"`{term}`" for term in record["keywords"]), ""])
    if record["detected_headings"]:
        lines.extend(["## Detected Text Outline", ""])
        lines.extend(f"- {heading}" for heading in record["detected_headings"])
        lines.append("")
    if record["preview"]:
        lines.extend(["## Content Preview", ""])
        for para in record["preview"]:
            lines.append(f"> {para}")
            lines.append("")
    else:
        lines.extend([
            "## Content Preview",
            "",
            "No embedded text was extracted. OCR is required before this source can be searched or summarized reliably.",
            "",
        ])
    lines.extend([
        "## Notes",
        "",
        "Metadata is generated from the local manifest, filename, Monoskop link context, and Poppler text extraction. Treat title/year fields as filename-derived until manually verified against the PDF front matter.",
        "",
    ])
    return "\n".join(lines)


def topic_page(topic: Topic, records: list[dict]) -> str:
    records = sorted(records, key=lambda r: (r["year"] or 9999, r["title"]))
    aggregate_terms = Counter()
    for r in records:
        aggregate_terms.update(r["keywords"])
    terms = [term for term, _ in aggregate_terms.most_common(15)]
    extracted = sum(1 for r in records if r["extract_status"] == "extracted")
    low_text = sum(1 for r in records if r["extract_status"] != "extracted")
    year_values = [r["year"] for r in records if r["year"]]
    year_span = f"{min(year_values)}–{max(year_values)}" if year_values else "unknown"
    lines = [
        f"# Topic Rollup: {topic.title}",
        "",
        topic.summary,
        "",
        "## Rollup",
        "",
        f"This topic currently contains {len(records)} sources spanning {year_span}. {extracted} have embedded text sidecars suitable for search and quotation; {low_text} need OCR or manual inspection before they can support full-text analysis.",
        "",
        topic.research_use,
        "",
    ]
    if terms:
        lines.extend(["## Aggregate Terms", "", ", ".join(f"`{term}`" for term in terms), ""])
    lines.extend([
        "## Sources",
        "",
        "| Year | Source | PDF | Text | Status | Monoskop section |",
        "|---:|---|---|---|---|---|",
    ])
    for r in records:
        card = f"../sources/{r['slug']}.md"
        pdf = link_from_doc(r["pdf_path"], TOPIC_DOCS)
        txt = link_from_doc(r["txt_path"], TOPIC_DOCS)
        lines.append(
            f"| {r['year'] or ''} | [{r['title']}]({card}) | [PDF]({pdf}) | [TXT]({txt}) | `{r['extract_status']}` | {r['monoskop_section']} |"
        )
    lines.extend(["", "## Source Notes", ""])
    for r in records:
        note = "OCR needed before full-text analysis." if r["extract_status"] != "extracted" else f"{r['word_count']} extracted words."
        lines.append(f"- [{r['title']}](../sources/{r['slug']}.md): {note}")
    lines.append("")
    return "\n".join(lines)


def source_index(records: list[dict]) -> str:
    lines = [
        "# Source Index",
        "",
        "Structured index of the cybernetics-history source corpus. Links point to local PDFs, local text sidecars, and generated source cards.",
        "",
        "| Topic | Year | Source | PDF | Text | Status | Words |",
        "|---|---:|---|---|---|---|---:|",
    ]
    for r in sorted(records, key=lambda r: (TOPICS[r["primary_topic"]].sort, r["year"] or 9999, r["title"])):
        topic = TOPICS[r["primary_topic"]]
        lines.append(
            f"| [{topic.title}](topics/{topic.id}.md) | {r['year'] or ''} | [{r['title']}](sources/{r['slug']}.md) | [PDF]({link_from_doc(r['pdf_path'], DOCS)}) | [TXT]({link_from_doc(r['txt_path'], DOCS)}) | `{r['extract_status']}` | {r['word_count']} |"
        )
    lines.append("")
    return "\n".join(lines)


def extraction_gaps(records: list[dict]) -> str:
    gaps = [r for r in records if r["extract_status"] != "extracted"]
    lines = [
        "# Extraction Gaps",
        "",
        "These sources are present as PDFs but do not yet have usable embedded-text extraction. They need OCR before they can be searched, quoted, or summarized reliably.",
        "",
        "| Source | PDF | Text sidecar | Topic |",
        "|---|---|---|---|",
    ]
    for r in sorted(gaps, key=lambda r: r["title"]):
        topic = TOPICS[r["primary_topic"]]
        lines.append(
            f"| [{r['title']}](sources/{r['slug']}.md) | [PDF]({link_from_doc(r['pdf_path'], DOCS)}) | [TXT]({link_from_doc(r['txt_path'], DOCS)}) | [{topic.title}](topics/{topic.id}.md) |"
        )
    lines.extend([
        "",
        "Recommended next step: install or run OCR tooling such as `ocrmypdf`/`tesseract`, then regenerate this dataset with `python3 tools/build_dataset.py`.",
        "",
    ])
    return "\n".join(lines)


def docs_index(records: list[dict]) -> str:
    by_topic = defaultdict(list)
    for r in records:
        by_topic[r["primary_topic"]].append(r)
    total_words = sum(r["word_count"] for r in records)
    extracted = sum(1 for r in records if r["extract_status"] == "extracted")
    low_text = len(records) - extracted
    lines = [
        "# Cybernetics History Dataset",
        "",
        "Local research navigation for the cybernetics-history corpus.",
        "",
        "## Corpus Status",
        "",
        f"- Sources: {len(records)} PDFs",
        f"- Embedded-text sidecars: {extracted}",
        f"- OCR-needed sidecars: {low_text}",
        f"- Extracted words: {total_words:,}",
        "- Source of corpus: <https://monoskop.org/Cybernetics> and linked Monoskop resource pages",
        "",
        "## Main Indexes",
        "",
        "- [Source index](source-index.md)",
        "- [Extraction gaps](extraction-gaps.md)",
        "- [Dataset files](../dataset/README.md)",
        "- [Project README](../README.md)",
        "",
        "## Topic Rollups",
        "",
        "| Topic | Sources | Extracted | OCR needed | Rollup |",
        "|---|---:|---:|---:|---|",
    ]
    for topic in sorted(TOPICS.values(), key=lambda t: t.sort):
        rows = by_topic.get(topic.id, [])
        if not rows:
            continue
        e = sum(1 for r in rows if r["extract_status"] == "extracted")
        l = len(rows) - e
        lines.append(f"| {topic.title} | {len(rows)} | {e} | {l} | [Open](topics/{topic.id}.md) |")
    lines.extend([
        "",
        "## Maintenance",
        "",
        "Regenerate the dataset after adding sources, replacing OCR text, or editing `manifest.json`:",
        "",
        "```bash",
        "python3 tools/build_dataset.py",
        "```",
        "",
    ])
    return "\n".join(lines)


def dataset_readme(records: list[dict]) -> str:
    return f"""# Dataset Files

Machine-readable source indexes generated from `manifest.json` and `sources/*.txt`.

## Files

- `sources.json`: complete JSON array of {len(records)} source records.
- `sources.jsonl`: one JSON source record per line for local processing.
- `topics.json`: topic taxonomy and source membership.

## Record Shape

Each source record includes:

- `slug`
- `title`
- `year`
- `primary_topic`
- `monoskop_section`
- `url`
- `source_page`
- `pdf_path`
- `txt_path`
- `pdf_bytes`
- `page_count`
- `extract_status`
- `text_chars`
- `word_count`
- `keywords`
- `detected_headings`
- `preview`

Generated at {datetime.now(timezone.utc).isoformat()}.
"""


def build_records() -> list[dict]:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    section_by_url = fetch_section_map()
    records: list[dict] = []
    used_slugs: Counter[str] = Counter()
    for raw in manifest["records"]:
        pdf = Path(raw["pdf_path"])
        txt = Path(raw["txt_path"])
        text = read_text(txt)
        title = display_title(pdf)
        base_slug = slugify(pdf.stem)
        used_slugs[base_slug] += 1
        slug = base_slug if used_slugs[base_slug] == 1 else f"{base_slug}-{used_slugs[base_slug]}"
        direct_section = section_by_url.get(normalize_url(raw["url"], START_URL))
        source_section = section_by_url.get(normalize_url(raw["source_page"], START_URL))
        section = direct_section or source_section or "Unmapped Monoskop context"
        record = {
            "slug": slug,
            "title": title,
            "year": year_from_name(pdf.name),
            "primary_topic": assign_topic(pdf.name),
            "monoskop_section": section,
            "url": raw["url"],
            "source_page": raw["source_page"],
            "pdf_path": str(pdf.relative_to(PROJECT)),
            "txt_path": str(txt.relative_to(PROJECT)),
            "pdf_bytes": raw.get("pdf_bytes", pdf.stat().st_size if pdf.exists() else 0),
            "page_count": pdf_page_count(pdf) if pdf.exists() else None,
            "extract_status": raw["extract_status"],
            "text_chars": len(text),
            "word_count": word_count(text),
            "keywords": top_terms(text),
            "detected_headings": detected_headings(text),
            "preview": preview_paragraphs(text),
        }
        records.append(record)
    return records


def write_outputs(records: list[dict]) -> None:
    for directory in [DATASET, DOCS, SOURCE_DOCS, TOPIC_DOCS]:
        directory.mkdir(parents=True, exist_ok=True)

    (DATASET / "sources.json").write_text(json.dumps(records, indent=2, ensure_ascii=False), encoding="utf-8")
    with (DATASET / "sources.jsonl").open("w", encoding="utf-8") as handle:
        for record in records:
            handle.write(json.dumps(record, ensure_ascii=False) + "\n")

    by_topic = defaultdict(list)
    for record in records:
        by_topic[record["primary_topic"]].append(record)

    topics_payload = []
    for topic in sorted(TOPICS.values(), key=lambda t: t.sort):
        rows = by_topic.get(topic.id, [])
        topics_payload.append({
            "id": topic.id,
            "title": topic.title,
            "summary": topic.summary,
            "research_use": topic.research_use,
            "source_count": len(rows),
            "source_slugs": [r["slug"] for r in sorted(rows, key=lambda r: (r["year"] or 9999, r["title"]))],
        })
    (DATASET / "topics.json").write_text(json.dumps(topics_payload, indent=2, ensure_ascii=False), encoding="utf-8")
    (DATASET / "README.md").write_text(dataset_readme(records), encoding="utf-8")

    for record in records:
        (SOURCE_DOCS / f"{record['slug']}.md").write_text(source_card(record), encoding="utf-8")
    for topic in sorted(TOPICS.values(), key=lambda t: t.sort):
        rows = by_topic.get(topic.id, [])
        if rows:
            (TOPIC_DOCS / f"{topic.id}.md").write_text(topic_page(topic, rows), encoding="utf-8")

    (DOCS / "index.md").write_text(docs_index(records), encoding="utf-8")
    (DOCS / "source-index.md").write_text(source_index(records), encoding="utf-8")
    (DOCS / "extraction-gaps.md").write_text(extraction_gaps(records), encoding="utf-8")


def main() -> int:
    records = build_records()
    write_outputs(records)
    status_counts = Counter(r["extract_status"] for r in records)
    print(f"built {len(records)} source records")
    print("extract_status", dict(status_counts))
    print(f"docs: {DOCS}")
    print(f"dataset: {DATASET}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

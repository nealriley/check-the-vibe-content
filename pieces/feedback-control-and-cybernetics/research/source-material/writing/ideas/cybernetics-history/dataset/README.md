# Dataset Files

Machine-readable source indexes generated from `manifest.json` and `sources/*.txt`.

## Files

- `sources.json`: complete JSON array of 48 source records.
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

Generated at 2026-06-14T11:54:05.588147+00:00.

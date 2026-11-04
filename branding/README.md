# Brand packs

Session install loads `branding/{brand}/tokens.json`.

| Brand | Path | Status |
|-------|------|--------|
| **youtube** | [youtube/tokens.json](youtube/tokens.json) | **Default demo** — obvious #FF0000 branding |
| demo | [demo/tokens.json](demo/tokens.json) | Generic blue pack |
| 917v | `917v/` (future) | Customer brand |

Install prompt: `Brand: youtube` (recommended for demos).

GenUI documents:

```json
"themeRef": { "source": "youtube", "id": "youtube" }
```

Extraction workflow for custom sites: [spec/branding-extraction.md](../spec/branding-extraction.md).

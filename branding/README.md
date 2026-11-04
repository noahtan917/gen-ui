# Brand packs

Session install loads `branding/{brand}/tokens.json` (default: **demo**).

| Brand | Path | Status |
|-------|------|--------|
| demo | [demo/tokens.json](demo/tokens.json) | Shipped |
| 917v | `917v/` (future) | Add tokens + UI-GUIDELINES when ready |

GenUI documents should set:

```json
"themeRef": { "source": "demo", "id": "demo" }
```

Extraction workflow for custom sites: [spec/branding-extraction.md](../spec/branding-extraction.md).

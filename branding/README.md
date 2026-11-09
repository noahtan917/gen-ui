# Brand packs

Chat session install resolves the active pack from [spec/session-config.json](../spec/session-config.json) (`defaultBrandPack`). Provider overlays do **not** define brand — change config + tokens here, then `pnpm generate:session-artifacts`.

| Brand | Path | Status |
|-------|------|--------|
| **917v** | [917v/tokens.json](917v/tokens.json) | **Session default** (via config). Visual source: [`design-system/`](../design-system/styles.css) |

The old demo pack file has been removed. Do not invent a second primary.

GenUI documents:

```json
"themeRef": { "source": "<pack id>", "id": "<pack id>" }
```

Extraction workflow for custom sites: [spec/branding-extraction.md](../spec/branding-extraction.md).

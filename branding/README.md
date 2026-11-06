# Brand packs

Chat session install resolves the active pack from [spec/session-config.json](../spec/session-config.json) (`defaultBrandPack`). Provider overlays do **not** define brand — change config + tokens here, then `pnpm generate:session-artifacts`.

| Brand | Path | Status |
|-------|------|--------|
| **917v** | [917v/tokens.json](917v/tokens.json) | **Session default** (via config). Visual source: [`design-system/`](../design-system/styles.css) |
| demo | [demo/tokens.json](demo/tokens.json) | Legacy / local tests only — **forbidden** for session install |

GenUI documents:

```json
"themeRef": { "source": "<pack id>", "id": "<pack id>" }
```

Extraction workflow for custom sites: [spec/branding-extraction.md](../spec/branding-extraction.md).

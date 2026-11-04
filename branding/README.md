# Brand packs

Chat session install resolves the active pack from [spec/session-config.json](../spec/session-config.json) (`defaultBrandPack`). Provider overlays do **not** define brand — change config + tokens here, then `pnpm generate:session-artifacts`.

| Brand | Path | Status |
|-------|------|--------|
| **youtube** | [youtube/tokens.json](youtube/tokens.json) | **Session default** (via config) |
| demo | [demo/tokens.json](demo/tokens.json) | Legacy / local tests only — **forbidden** for session install |
| 917v | `917v/` (future) | Customer brand — set `defaultBrandPack` when added |

GenUI documents:

```json
"themeRef": { "source": "<pack id>", "id": "<pack id>" }
```

Extraction workflow for custom sites: [spec/branding-extraction.md](../spec/branding-extraction.md).

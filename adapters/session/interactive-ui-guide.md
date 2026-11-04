# Interactive UI guide (all providers)

## Step 1 — Build GenUI JSON

Create a valid document (see [spec/GENUI.md](../../spec/GENUI.md)) with:

- `themeRef` from [session-config.json](../../spec/session-config.json) default brand pack
- Actions with `ai.request` + `promptTemplate`
- Clickable `Card` / `Button` nodes per reference document

## Step 2 — Render per profile

| Profile | What to show |
|---------|----------------|
| `embedded-ui-host` | Branded interactive artifact; chat-bridge on click |
| `markdown-ui-host` | Branded markdown cards + **Send this next:** |
| `json-visible-host` | JSON block + follow-up instructions |
| `react-host` | Output JSON; user runs host app |

Details: [spec/session-visual-guide.md](../../spec/session-visual-guide.md).

## Step 3 — Chat-bridge text

The next user message should equal the resolved `promptTemplate`. Same text on every provider; only packaging differs.

## Reference

- Document path: `referenceDocument` in [session-config.json](../../spec/session-config.json)
- Embedded example: [examples/meal-artifact.reference.tsx](examples/meal-artifact.reference.tsx)

# Interactive UI guide (all providers)

## Step 1 — Build GenUI JSON

Create a valid document (see [spec/GENUI.md](../../spec/GENUI.md)) with:

- `themeRef` from loaded brand tokens
- `actions.planMeal` (or similar) with `ai.request` + `promptTemplate`
- Clickable `Card` nodes for meal or product options

## Step 2 — Render per profile

| Profile | What to show |
|---------|----------------|
| `embedded-ui-host` | Branded interactive artifact; implement chat-bridge on click |
| `markdown-ui-host` | Branded markdown cards; each card lists **Send this next:** with interpolated prompt |
| `json-visible-host` | JSON block + one-line instruction to click/copy follow-ups |
| `react-host` | Output JSON only; user runs host app |

## Step 3 — Chat-bridge text

On interaction, the **next user message** should equal the resolved `promptTemplate`, e.g.:

> Help me cook Sheet-pan salmon (Mediterranean): ingredient list, steps, and total time for a weeknight dinner.

Use the same template for every provider; only the **packaging** (artifact vs markdown) changes.

## Reference document

See [examples/meal-planning.document.json](examples/meal-planning.document.json).

Reference React (embedded hosts only): [examples/meal-artifact.reference.tsx](examples/meal-artifact.reference.tsx).

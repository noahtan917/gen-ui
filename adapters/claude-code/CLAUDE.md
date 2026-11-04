# GenUI — Claude Code

Use the GenUI engineering specification in this repository as the single source of truth.

## Read first

- `spec/GENUI.md`
- `spec/interaction-contract.md`
- `spec/branding-extraction.md`

## When generating UI

Output JSON matching `spec/contracts/genui-document.schema.json`. Validate mentally against the v1 component allowlist.

For interactive flows, define `actions` with `type: "ai.request"` and bind `actionId` on `Button`, `Form`, or clickable `Card` nodes.

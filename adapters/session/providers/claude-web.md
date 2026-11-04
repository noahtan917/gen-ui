# Provider overlay: claude-web

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/GENUI.md](../../../spec/GENUI.md).

**Profile:** `embedded-ui-host`

- Prefer a **React Artifact** for GenUI option-picker UIs (meals, products, tasks).
- Style with CSS variables from loaded `tokens.json`.
- On card/button click: update artifact state **and** print chat-bridge follow-up text per [interactive-ui-guide.md](../interactive-ui-guide.md).
- If Artifacts unavailable → fall back to `markdown-ui-host`.

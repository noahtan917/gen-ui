# Provider overlay: chatgpt-web

**Profile:** `embedded-ui-host` when the host allows interactive HTML/canvas-style output; otherwise `markdown-ui-host`.

- Build GenUI JSON first; map to embedded UI when supported.
- Apply demo brand tokens to all visible UI.
- Use chat-bridge messages for `ai.request` actions (same templates as spec).
- If only text mode → `markdown-ui-host` with **Send this next:** lines.

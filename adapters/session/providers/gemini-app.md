# Provider overlay: gemini-app

**Profile:** `embedded-ui-host` when Gemini can render rich UI in the client; otherwise `markdown-ui-host`.

- Follow [spec/session-bootstrap.md](../../../spec/session-bootstrap.md).
- Same GenUI JSON and `themeRef` as other providers.
- Interactions: in-ui feedback + chat-bridge prompt text.

Note: **Gemini CLI** uses [../../gemini/GEMINI.md](../../gemini/GEMINI.md), not this overlay.

# Provider overlay: gemini-app

**Profile:** `embedded-ui-host` when Gemini can render rich UI in the client; otherwise `markdown-ui-host`.

**GitHub:** Gemini chat **cannot** pull this repo from a URL. User must paste [../PASTE-BUNDLE.md](../PASTE-BUNDLE.md) (see [../../../docs/install-gemini.md](../../../docs/install-gemini.md)).

- Follow [spec/session-bootstrap.md](../../../spec/session-bootstrap.md) when files are available.
- Same GenUI JSON and `themeRef` as other providers.
- Interactions: in-ui feedback + **Send this next:** chat-bridge prompt text.

Note: **Gemini CLI** uses [../../gemini/GEMINI.md](../../gemini/GEMINI.md), not this overlay.

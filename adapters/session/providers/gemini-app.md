# Provider overlay: gemini-app

**Profile:** `markdown-ui-host` by default in Gemini chat (rich markdown cards + **Send this next:**). Do **not** dump raw GenUI JSON as the first response.

Use `embedded-ui-host` only when Gemini Canvas / app UI explicitly supports an interactive panel (product-dependent).

**GitHub:** Gemini chat **cannot** pull this repo from a URL. User must paste [../PASTE-BUNDLE.md](../PASTE-BUNDLE.md) (see [../../../docs/install-gemini.md](../../../docs/install-gemini.md)).

- Follow [spec/session-bootstrap.md](../../../spec/session-bootstrap.md) when files are available.
- Same GenUI JSON and `themeRef` as other providers.
- Interactions: in-ui feedback + **Send this next:** chat-bridge prompt text.

Note: **Gemini CLI** uses [../../gemini/GEMINI.md](../../gemini/GEMINI.md), not this overlay.

# Provider overlay: gemini-app

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/session-config.json](../../../spec/session-config.json).

**Profile:** `markdown-ui-host` by default in Gemini chat. Do **not** dump raw GenUI JSON as the first response.

Use `embedded-ui-host` only when Gemini Canvas explicitly supports an interactive panel (product-dependent).

**GitHub:** Gemini chat **cannot** pull this repo from a URL. User must paste [../PASTE-BUNDLE.md](../PASTE-BUNDLE.md) ([install-gemini.md](../../../docs/install-gemini.md)).

Interactions: in-ui feedback + **Send this next:** per [session-visual-guide.md](../../../spec/session-visual-guide.md).

**Gemini CLI:** [../../gemini/GEMINI.md](../../gemini/GEMINI.md), not this overlay.

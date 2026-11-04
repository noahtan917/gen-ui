# Provider overlay: chatgpt-web

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/session-config.json](../../../spec/session-config.json).

**Profile:** Prefer `embedded-ui-host` (Canvas / HTML). If unavailable → `markdown-ui-host`.

## Host drift (L10)

| Symptom | Cause |
|---------|--------|
| Unrelated recipes, stock photos | ChatGPT native widgets override GenUI |
| Missing **Send this next:** | Overlay profile not applied |

Do **not** use the host’s default recipe carousel when the user invoked GenUI. Follow [session-visual-guide.md](../../../spec/session-visual-guide.md) and the reference document from config.

Brand and meals: **only** [session-config.json](../../../spec/session-config.json) + loaded tokens — not this file.

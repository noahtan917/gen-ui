# Provider overlay: deepseek-chat

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/session-config.json](../../../spec/session-config.json).

**Profile:** `markdown-ui-host`

- Present branded markdown cards per [session-visual-guide.md](../../../spec/session-visual-guide.md).
- Each card includes **Send this next:** with the interpolated `ai.request` message.
- Optional collapsible GenUI JSON for developers.
- If embedded UI becomes available, switch to `embedded-ui-host` without changing spec.

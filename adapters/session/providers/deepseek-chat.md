# Provider overlay: deepseek-chat

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/GENUI.md](../../../spec/GENUI.md).

**Profile:** `markdown-ui-host` (default)

- Still produce GenUI JSON (collapsible or short) for parity with other providers.
- Present branded **markdown cards** for meal/product options using token colors as hex in inline styling if supported, else semantic labels.
- Each card includes **Send this next:** with the exact `ai.request` interpolated message.
- When DeepSeek adds embedded UI, switch profile to `embedded-ui-host` without changing spec.

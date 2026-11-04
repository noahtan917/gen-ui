# Provider overlay: generic-chat

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/GENUI.md](../../../spec/GENUI.md).

Detect the product (Claude, ChatGPT, Gemini, DeepSeek, Grok, other).

1. If the host supports **embedded React/HTML UI** → profile `embedded-ui-host` (see [claude-web.md](claude-web.md) behavior).
2. Else → profile `markdown-ui-host` (see [deepseek-chat.md](deepseek-chat.md) behavior).

Always load brand tokens and emit GenUI JSON internally before presenting UI.

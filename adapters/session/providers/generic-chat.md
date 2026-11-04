# Provider overlay: generic-chat

Rules: [spec/session-bootstrap.md](../../../spec/session-bootstrap.md), [spec/session-config.json](../../../spec/session-config.json).

Detect the product (Claude, ChatGPT, Gemini, DeepSeek, Grok, other).

1. Embedded React/HTML UI available → `embedded-ui-host` ([claude-web.md](claude-web.md) capabilities).
2. Else → `markdown-ui-host` ([deepseek-chat.md](deepseek-chat.md) capabilities).

Brand, scenario, and colors: [session-config.json](../../../spec/session-config.json) + [session-visual-guide.md](../../../spec/session-visual-guide.md) only.

# Session provider overlays

Pick **one** file per session. Each file only declares **host capabilities** and **rendering profile**; rules live in `spec/`.

| `provider_id` | File | Profile |
|---------------|------|---------|
| `claude-web` | [claude-web.md](claude-web.md) | `embedded-ui-host` |
| `chatgpt-web` | [chatgpt-web.md](chatgpt-web.md) | `embedded-ui-host` or `markdown-ui-host` |
| `gemini-app` | [gemini-app.md](gemini-app.md) | `embedded-ui-host` or `markdown-ui-host` |
| `deepseek-chat` | [deepseek-chat.md](deepseek-chat.md) | `markdown-ui-host` |
| `grok-chat` | [grok-chat.md](grok-chat.md) | `markdown-ui-host` |
| `generic-chat` | [generic-chat.md](generic-chat.md) | auto-detect best available |

User can set `Provider: deepseek-chat` in the install message.

# Session provider overlays

Pick **one** file per session. Each file declares **host capabilities** and **rendering profile** only.

| `provider_id` | File | Profile |
|---------------|------|---------|
| `claude-web` | [claude-web.md](claude-web.md) | `embedded-ui-host` |
| `chatgpt-web` | [chatgpt-web.md](chatgpt-web.md) | `embedded-ui-host` or `markdown-ui-host` |
| `gemini-app` | [gemini-app.md](gemini-app.md) | `markdown-ui-host` (Canvas optional) |
| `deepseek-chat` | [deepseek-chat.md](deepseek-chat.md) | `markdown-ui-host` |
| `grok-chat` | [grok-chat.md](grok-chat.md) | `markdown-ui-host` |
| `generic-chat` | [generic-chat.md](generic-chat.md) | auto-detect |

Optional install hint: `Provider: deepseek-chat`

## Contribution rule

**Do not** add brand colors, hex values, reference meals, or `themeRef` JSON in provider overlays.

Change session-wide behavior in:

- [spec/session-config.json](../../../spec/session-config.json) — default brand pack, reference document
- [branding/{pack}/tokens.json](../../../branding/) — colors and typography
- [spec/session-visual-guide.md](../../../spec/session-visual-guide.md) — presentation rules

Then run `pnpm generate:paste-bundle` and `pnpm lint:adapters`.

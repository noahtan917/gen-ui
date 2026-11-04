# Provider matrix

## Chat / web session (one skill)

| Provider | `Provider:` id | Overlay | Typical profile |
|----------|----------------|---------|-----------------|
| Any (auto) | `generic-chat` | [generic-chat.md](../adapters/session/providers/generic-chat.md) | detect |
| Claude web | `claude-web` | [claude-web.md](../adapters/session/providers/claude-web.md) | embedded-ui-host |
| ChatGPT web | `chatgpt-web` | [chatgpt-web.md](../adapters/session/providers/chatgpt-web.md) | embedded or markdown |
| Gemini app | `gemini-app` | [gemini-app.md](../adapters/session/providers/gemini-app.md) | embedded or markdown |
| DeepSeek chat | `deepseek-chat` | [deepseek-chat.md](../adapters/session/providers/deepseek-chat.md) | markdown-ui-host |
| Grok chat | `grok-chat` | [grok-chat.md](../adapters/session/providers/grok-chat.md) | markdown-ui-host |

**Install:** [INSTALL-SKILL.md](../INSTALL-SKILL.md) · **Bootstrap SSOT:** [spec/session-bootstrap.md](../spec/session-bootstrap.md)

## Coding agents

| Provider | Status | Entry | Notes |
|----------|--------|-------|-------|
| Cursor | Supported | `.cursor/skills/genui/SKILL.md` | Project skill |
| Claude Code | Supported | `adapters/claude-code/CLAUDE.md` | Points to `spec/` |
| Gemini CLI | Supported | `adapters/gemini/GEMINI.md` | `@` imports |
| OpenAI / Codex-style | Supported | `adapters/openai/AGENTS.md` | AGENTS.md |
| DeepSeek / Grok CLI | Stub | `adapters/_template` | Verify format |

## Capability distinction

| Capability | Session + coding skills | react-host (`pnpm demo`) |
|------------|-------------------------|---------------------------|
| Same GenUI JSON / actions | Yes | Yes |
| Inline UI in chat | Profile-dependent | N/A |
| Full `genui.interact` runtime | Chat-bridge or markdown | Yes |

# Provider adapters

Two families — **same** [spec/GENUI.md](../spec/GENUI.md):

## 1. Chat / web GenAI (session)

Install once per conversation from a public GitHub URL.

| Resource | Path |
|----------|------|
| User prompt | [INSTALL-SKILL.md](../INSTALL-SKILL.md) |
| Central skill | [session/SKILL.md](session/SKILL.md) |
| Bootstrap SSOT | [spec/session-bootstrap.md](../spec/session-bootstrap.md) |
| Provider overlays | [session/providers/](session/providers/) |

Add a chat provider: copy [session/providers/deepseek-chat.md](session/providers/deepseek-chat.md), adjust profile, register in [session/providers/README.md](session/providers/README.md).

## 2. Coding agents

| Adapter | Entry file |
|---------|------------|
| Cursor | [cursor/.cursor/skills/genui/SKILL.md](cursor/.cursor/skills/genui/SKILL.md) |
| Claude Code | [claude-code/CLAUDE.md](claude-code/CLAUDE.md) |
| Gemini CLI | [gemini/GEMINI.md](gemini/GEMINI.md) |
| OpenAI / Codex-style | [openai/AGENTS.md](openai/AGENTS.md) |
| Template | [_template/README.md](_template/README.md) |

## This repository (Cursor)

Active skill: [../.cursor/skills/genui/SKILL.md](../.cursor/skills/genui/SKILL.md)

Run `pnpm lint:adapters` after changes.

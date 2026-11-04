# New provider adapter template

## Chat / web (session)

1. Copy [session/providers/deepseek-chat.md](../session/providers/deepseek-chat.md) to `adapters/session/providers/<id>.md`.
2. Set rendering profile in [spec/rendering-profiles.md](../../spec/rendering-profiles.md) if new.
3. Register in [session/providers/README.md](../session/providers/README.md) and [docs/provider-matrix.md](../../docs/provider-matrix.md).
4. Do **not** duplicate `spec/GENUI.md` — link bootstrap only.

## Coding agent

1. Confirm official context format (SKILL.md, AGENTS.md, GEMINI.md, etc.).
2. Copy this folder to `adapters/<provider-name>/`.
3. Link `spec/GENUI.md` only.
4. Run `pnpm lint:adapters`.

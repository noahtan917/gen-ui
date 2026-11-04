# Session bootstrap (all chat / web GenAI providers)

Single install flow for **this conversation**. One user message is enough — **no follow-up commands** for brand, spec, or tokens.

## Trigger (minimal — this is all the user should need)

```text
Install the GenUI skill for this session from {REPO_URL}
```

Optional: `Provider: chatgpt-web` (only if auto-detect is wrong).  
**Do not require** `Brand:`, `Load …`, or paste instructions — those are automatic (see [ON-INSTALL.md](../adapters/session/ON-INSTALL.md)).

## Configuration (SSOT)

Read [session-config.json](session-config.json) first on every install:

| Field | Purpose |
|-------|---------|
| `defaultBrandPack` | Load `branding/{id}/tokens.json` and set `themeRef.source` / `themeRef.id` |
| `forbiddenBrandPacks` | Never use for session install (e.g. legacy `demo`) |
| `referenceDocument` | Default scenario JSON (meals, actions, components) |

To change session branding for **all** providers, edit `session-config.json` and the token file under `branding/` — not provider overlays.

## Automatic on install (mandatory for the model)

1. **Config + brand:** load `spec/session-config.json`, then `branding/{defaultBrandPack}/tokens.json`. Apply token colors to all user-facing UI.
2. **Provider:** infer from host (`claude-web`, `chatgpt-web`, `gemini-app`, `deepseek-chat`, `grok-chat`, or `generic-chat`).
3. **Load all** files in the load order below (fetch from `{REPO_URL}` / raw GitHub, or use [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) if fetch fails).
4. **Presentation:** follow [session-visual-guide.md](session-visual-guide.md).
5. **Host limits:** follow [adapters/session/providers/{provider_id}.md](../adapters/session/providers/) — capabilities only, no separate brand rules.

If token JSON fetch fails, use the token object from [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) or the last successfully loaded pack file.

## Load order (from `{REPO_URL}`)

Resolve `{owner}`, `{repo}`, ref `main` unless URL specifies a branch/tag.

1. `spec/session-config.json`
2. `spec/session-bootstrap.md` (this file)
3. `adapters/session/ON-INSTALL.md`
4. `spec/GENUI.md`
5. `spec/interaction-contract.md`
6. `spec/rendering-profiles.md`
7. `spec/session-visual-guide.md`
8. `branding/{defaultBrandPack}/tokens.json` (from config)
9. `adapters/session/interactive-ui-guide.md`
10. `adapters/session/providers/{provider_id}.md`
11. `{referenceDocument}` from config (default meal-planning example)

Raw GitHub: `https://raw.githubusercontent.com/{owner}/{repo}/main/{path}`

If fetch fails (**Gemini chat**): user pastes [adapters/session/PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) once — generated from config + tokens.

## After load (confirmation)

- GenUI spec loaded · brand **{defaultBrandPack}** · profile {id}
- Show a **short confirmation** with visible **primary** color from loaded tokens
- Do **not** ask user to enable branding or reload spec

## Session rules (provider-agnostic)

1. **SSOT:** GenUI JSON internally; user-facing UI uses loaded token pack.
2. **Branding:** `defaultBrandPack` from config unless user explicitly requests another allowed pack.
3. **Interaction-first:** `ai.request` + **Send this next:** ([session-visual-guide.md](session-visual-guide.md))
4. **Reference scenario:** path from `referenceDocument` in config.
5. **Profile:** [rendering-profiles.md](rendering-profiles.md) + thin provider overlay.

## Coding agents vs chat

| Context | Entry |
|---------|--------|
| Chat / web GenAI | This bootstrap + `adapters/session/` |
| Cursor / Claude Code / Gemini CLI | [adapters/README.md](../adapters/README.md) |

# Session bootstrap (all chat / web GenAI providers)

Single install flow for **this conversation**. One user message is enough — **no follow-up commands** for brand, spec, or tokens.

## Trigger (minimal — this is all the user should need)

```text
Install the GenUI skill for this session from {REPO_URL}
```

Optional: `Provider: chatgpt-web` (only if auto-detect is wrong).  
**Do not require** `Brand:`, `Load …`, or paste instructions — those are automatic (see [ON-INSTALL.md](../adapters/session/ON-INSTALL.md)).

## Automatic on install (mandatory for the model)

1. **Brand:** always **`youtube`** — load [branding/youtube/tokens.json](../branding/youtube/tokens.json), set `themeRef` to `{ "source": "youtube", "id": "youtube" }`, apply **#FF0000** on all GenUI UI.
2. **Provider:** infer from host (`claude-web`, `chatgpt-web`, `gemini-app`, `deepseek-chat`, `grok-chat`, or `generic-chat`).
3. **Load all** files in the load order below (fetch from `{REPO_URL}` / raw GitHub, or use [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) if fetch fails).
4. **Follow** [adapters/session/ON-INSTALL.md](../adapters/session/ON-INSTALL.md) for confirmation and ongoing behavior.

### Inline YouTube tokens (fallback if JSON fetch fails)

```json
{
  "source": "youtube",
  "id": "youtube",
  "colors": {
    "primary": "#FF0000",
    "primaryHover": "#CC0000",
    "surface": "#FFFFFF",
    "text": "#0F0F0F",
    "textMuted": "#606060",
    "surfaceDark": "#0F0F0F",
    "border": "#E5E5E5"
  }
}
```

## Load order (from `{REPO_URL}`)

Resolve `{owner}`, `{repo}`, ref `main` unless URL specifies a branch/tag.

1. `spec/session-bootstrap.md` (this file)
2. `adapters/session/ON-INSTALL.md`
3. `spec/GENUI.md`
4. `spec/interaction-contract.md`
5. `spec/rendering-profiles.md`
6. `branding/youtube/tokens.json`
7. `adapters/session/interactive-ui-guide.md`
8. `adapters/session/providers/{provider_id}.md`

Raw GitHub: `https://raw.githubusercontent.com/{owner}/{repo}/main/{path}`

If fetch fails (**Gemini chat**): user pastes [adapters/session/PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) once — that file equals full install + youtube brand.

## After load (confirmation)

- GenUI spec loaded · brand **youtube** (#FF0000) · profile {id}
- Show a **short red-accent confirmation** (proof branding is active)
- Do **not** ask user to enable branding or reload spec

## Session rules (provider-agnostic)

1. **SSOT:** GenUI JSON internally; user-facing UI uses YouTube styling.
2. **Branding:** Always `youtube` / `#FF0000` unless user explicitly requests another brand pack.
3. **Interaction-first:** `ai.request` + **Send this next:**
4. **Reference scenario:** [meal-planning.document.json](../adapters/session/examples/meal-planning.document.json) — salmon + ramen only by default.
5. **Profile:** [rendering-profiles.md](rendering-profiles.md) + provider overlay.

## Coding agents vs chat

| Context | Entry |
|---------|--------|
| Chat / web GenAI | This bootstrap + `adapters/session/` |
| Cursor / Claude Code / Gemini CLI | [adapters/README.md](../adapters/README.md) |

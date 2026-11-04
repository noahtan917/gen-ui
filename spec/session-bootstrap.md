# Session bootstrap (all chat / web GenAI providers)

Single install flow for **this conversation**. Works with Claude, ChatGPT, Gemini, DeepSeek, Grok, and future hosts via thin provider overlays.

## Trigger

User message pattern:

```text
Install the GenUI skill for this session from {REPO_URL}
Provider: {provider_id}   # optional; see providers/README.md
Brand: demo                 # optional; default branding/demo
```

## Load order (from `{REPO_URL}`)

Resolve `{owner}`, `{repo}`, ref `main` unless URL specifies a branch/tag.

1. `spec/session-bootstrap.md` (this file)
2. `spec/GENUI.md`
3. `spec/interaction-contract.md`
4. `spec/rendering-profiles.md`
5. `branding/demo/tokens.json` (or `branding/{brand}/tokens.json`)
6. `adapters/session/interactive-ui-guide.md`
7. `adapters/session/providers/{provider_id}.md` — if `{provider_id}` omitted, infer from product or use `generic-chat.md`

Raw GitHub pattern:

`https://raw.githubusercontent.com/{owner}/{repo}/main/{path}`

If fetch fails (common on **Gemini chat**), ask the user to paste the full [adapters/session/PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) — one file, all rules + demo brand + reference JSON.

## After load

Reply with a short confirmation:

- GenUI version / spec loaded
- Brand id applied
- Rendering profile id in use
- Example: *“Ask: Help me plan a quick weeknight dinner.”*

## Session rules (provider-agnostic)

1. **SSOT:** Generate and reason using GenUI JSON; do not invent parallel UI rules.
2. **Branding:** Apply tokens from the loaded brand file to any visible UI (`themeRef` fields).
3. **Interaction-first:** Cards/buttons for options must wire to `actions` with `ai.request` (or `state.update` for forms).
4. **Profile:** Map JSON to host using the profile from the provider overlay + `rendering-profiles.md`.
5. **Reference demo scenario:** Meal-planning cards (see `adapters/session/examples/meal-planning.document.json`) follow the interaction contract pattern.

## Coding agents vs chat

| Context | Entry |
|---------|--------|
| Chat / web GenAI | This bootstrap + `adapters/session/` |
| Cursor / Claude Code / Gemini CLI | Existing adapters under `adapters/cursor`, `claude-code`, `gemini`, etc. |

Same spec; different entry files.

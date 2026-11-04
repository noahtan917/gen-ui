# Session bootstrap (all chat / web GenAI providers)

Single install flow for **this conversation**. One user message is enough — **no follow-up commands** for brand, spec, or tokens.

## Trigger (minimal — this is all the user should need)

```text
Install the GenUI skill for this session from {REPO_URL}
```

Optional: `Provider: chatgpt-web` (only if auto-detect is wrong).  
**Do not require** `Brand:`, `Load …`, or paste instructions — those are automatic (see [ON-INSTALL.md](../adapters/session/ON-INSTALL.md)).

## Primary install path (fetch-capable hosts)

When the user references `{REPO_URL}`, the model **must** fetch and read **in full**:

`https://raw.githubusercontent.com/{owner}/{repo}/main/adapters/session/SESSION-INSTALL.md`

That generated file inlines [session-config.json](session-config.json), brand tokens, reference scenario, and presentation rules. **Do not** browse the repo piecemeal or install from `GENUI.md` alone.

Install is **invalid** if the model cannot confirm `defaultBrandPack` and token **primary** from that artifact.

## Configuration (SSOT for maintainers)

Edit [session-config.json](session-config.json) and `branding/{defaultBrandPack}/tokens.json`, then run `pnpm generate:session-artifacts`.

| Field | Purpose |
|-------|---------|
| `defaultBrandPack` | Active brand for all providers |
| `forbiddenBrandPacks` | Never use for session (e.g. legacy `demo`) |
| `referenceDocument` | Default scenario JSON |

## Paste path (no GitHub fetch)

**Gemini chat** and similar: user pastes [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) (same generated body as SESSION-INSTALL).

## Automatic on install (mandatory for the model)

1. Load **SESSION-INSTALL.md** (fetch) or **PASTE-BUNDLE.md** (paste) in full.
2. **Provider:** infer overlay (`claude-web`, `chatgpt-web`, `gemini-app`, …).
3. **Presentation:** rules inside the artifact + [session-visual-guide.md](session-visual-guide.md) if fetched optionally.
4. **Host limits:** [adapters/session/providers/{provider_id}.md](../adapters/session/providers/) — capabilities only.

## Optional deep load (coding agents / debugging)

After the one-shot artifact, optionally fetch:

1. `spec/GENUI.md`
2. `spec/interaction-contract.md`
3. `spec/rendering-profiles.md`
4. `adapters/session/interactive-ui-guide.md`
5. `adapters/session/providers/{provider_id}.md`

Raw GitHub: `https://raw.githubusercontent.com/{owner}/{repo}/main/{path}`

## After load (confirmation)

- GenUI spec loaded · brand **{defaultBrandPack}** · profile {id}
- Visible **primary** color from loaded tokens
- Do **not** ask user to enable branding or reload spec

## Session rules (provider-agnostic)

1. **SSOT:** one-shot artifact for chat install; config file for repo maintenance.
2. **Branding:** `defaultBrandPack` unless user explicitly requests another allowed pack.
3. **Interaction-first:** `ai.request` + **Send this next:**
4. **Reference scenario:** `referenceDocument` in config.
5. **Profile:** rendering profile + thin provider overlay.

## Coding agents vs chat

| Context | Entry |
|---------|--------|
| Chat / web GenAI | SESSION-INSTALL or PASTE-BUNDLE + `adapters/session/` |
| Cursor / Claude Code / Gemini CLI | [adapters/README.md](../adapters/README.md) |

# Session bootstrap (all chat / web GenAI providers)

Single install flow for **this conversation**. One user message is enough — **no follow-up commands** for brand, spec, or tokens.

## Trigger (minimal — this is all the user should need)

```text
Load GenUI for this chat from https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/SESSION-INSTALL.md
```

The **raw URL must be in the user message** (OpenSpec 005): hosts such as Claude web only fetch URLs the user supplied or that appeared in earlier results, and GitHub's `robots.txt` blocks `/tree/`, `/raw/`, `/commits/` for AI fetchers. A bare repo URL (`{REPO_URL}`) is still honored, but is not reliable.

Optional: `Provider: chatgpt-web` (only if auto-detect is wrong).  
**Do not require** `Brand:`, extra load commands, or paste instructions — those are automatic (see [ON-INSTALL.md](../adapters/session/ON-INSTALL.md)).

## Primary install path (fetch-capable hosts)

When the user sends the raw URL (or references `{REPO_URL}`), the model **must** fetch and read **in full**:

`https://raw.githubusercontent.com/{owner}/{repo}/main/adapters/session/SESSION-INSTALL.md`

That generated file inlines [session-config.json](session-config.json), brand tokens, reference scenario, reference Artifact layout, provider overlays, and presentation rules. It is the **whole** install — **no further fetches**. **Do not** browse the repo piecemeal or install from `GENUI.md` alone.

Install is **invalid** if the model cannot confirm `installVersion`, `defaultBrandPack`, and token **primary** from that artifact. A mismatched `installVersion` means a stale cached copy — re-load from a commit-pinned raw URL (`.../gen-ui/<sha>/adapters/session/SESSION-INSTALL.md`) or paste.

## Configuration (SSOT for maintainers)

Edit [session-config.json](session-config.json) and `branding/{defaultBrandPack}/tokens.json`, then run `pnpm generate:session-artifacts`.

| Field | Purpose |
|-------|---------|
| `defaultBrandPack` | Active brand for all providers |
| `forbiddenBrandPacks` | Never use for session (e.g. legacy `demo`) |
| `referenceDocument` | Default scenario JSON |

Generated outputs: `SESSION-INSTALL.md`, `PASTE-BUNDLE.md`, `adapters/claude-skill/genui/SKILL.md`, `adapters/claude-skill/genui.zip`. `pnpm lint:adapters` fails if any is out of sync.

## Paste path (no GitHub fetch)

**Gemini chat**, or any host whose fetch fails: user pastes [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) (same generated body as SESSION-INSTALL).

## Persistent path (Claude web)

Upload generated [adapters/claude-skill/genui.zip](../adapters/claude-skill/genui.zip) as a Claude Skill — same body, no fetch.

## Automatic on install (mandatory for the model)

1. Load **SESSION-INSTALL.md** (fetch) or **PASTE-BUNDLE.md** (paste) in full.
2. **Provider:** infer overlay (`claude-web`, `chatgpt-web`, `gemini-app`, …).
3. **Presentation:** rules inside the artifact + [session-visual-guide.md](session-visual-guide.md) if fetched optionally.
4. **Host limits:** [adapters/session/providers/{provider_id}.md](../adapters/session/providers/) — capabilities only.

## Deep load (coding agents / debugging only — never in chat install)

Coding agents with a local checkout may read:

1. `spec/GENUI.md`
2. `spec/interaction-contract.md`
3. `spec/rendering-profiles.md`
4. `adapters/session/interactive-ui-guide.md`
5. `adapters/session/providers/{provider_id}.md`

Chat hosts must **not** fetch these — everything needed is inlined in the one-shot artifact.

## After load (confirmation)

- GenUI loaded · installVersion · brand **{defaultBrandPack}** · profile {id}
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

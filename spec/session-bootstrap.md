# Session bootstrap (all chat / web GenAI providers)

Single skill load for **this conversation**. One user message is enough — **no follow-up commands** for brand, spec, or tokens.

## Trigger (minimal — this is all the user should need)

```text
install this skill for this session https://github.com/noahtan917/gen-ui/blob/main/SKILL.md
```

That message is the skill file. Read that blob only. GitHub’s `robots.txt` blocks `/tree/`, `/raw/`, and `/commits/` for AI fetchers and allows the `SKILL.md` blob. Do **not** open the repository root and do **not** send the user to `adapters/session/SESSION-INSTALL.md` on `main` — that URL is cached and has served an old YouTube brand.

Optional: `Provider: chatgpt-web` (only if auto-detect is wrong).  
**Do not require** `Brand:`, extra load commands, or paste instructions — those are automatic (see [ON-INSTALL.md](../adapters/session/ON-INSTALL.md)).

## Primary path (fetch-capable hosts)

When the user sends the prompt above, the model **must** read root `SKILL.md` **in full**.

That generated file inlines [session-config.json](session-config.json), brand tokens, reference scenario, reference Artifact layout, provider overlays, and presentation rules. It is the **whole** skill — **no further fetches**. **Do not** browse the repo piecemeal, and **do not** load `SESSION-INSTALL.md`.

Install is **invalid** if the model cannot confirm `installVersion`, brand **917v**, and token **primary** `#2F63D6` from that file. A mismatched `installVersion` means a stale cached copy — use a commit-pinned blob (`https://github.com/noahtan917/gen-ui/blob/<sha>/SKILL.md`) or paste root `SKILL.md`.

## Configuration (SSOT for maintainers)

Edit [session-config.json](session-config.json) and `branding/{defaultBrandPack}/tokens.json`, then run `pnpm generate:session-artifacts`.

| Field | Purpose |
|-------|---------|
| `defaultBrandPack` | Active brand for all providers |
| `forbiddenBrandPacks` | Never use for chat (e.g. legacy `demo`). `youtube` is an older pack and is also forbidden |
| `referenceDocument` | Default scenario JSON |

Generated outputs: root `SKILL.md`, `adapters/claude-skill/genui/SKILL.md`, and `adapters/claude-skill/genui.zip`. Root `SKILL.md` and the Claude skill file are the same body. `pnpm lint:adapters` fails if any is out of sync.

## Paste path (no GitHub fetch)

**Gemini chat**, or any host whose fetch fails: user pastes root [SKILL.md](../SKILL.md) and says `Use this skill.`

## Persistent path (Claude web)

Upload generated [adapters/claude-skill/genui.zip](../adapters/claude-skill/genui.zip) as a Claude Skill — same body, no fetch.

## Automatic on install (mandatory for the model)

1. Read root **SKILL.md** (fetch the blob, or the user’s paste) in full.
2. **Provider:** infer overlay (`claude-web`, `chatgpt-web`, `gemini-app`, …).
3. **Presentation:** rules inside the skill. Do not fetch [session-visual-guide.md](session-visual-guide.md).
4. **Host limits:** overlays are inlined in the skill. Do not fetch [adapters/session/providers/](../adapters/session/providers/).

## Deep load (coding agents / debugging only — never in chat install)

Coding agents with a local checkout may read:

1. `spec/GENUI.md`
2. `spec/interaction-contract.md`
3. `spec/rendering-profiles.md`
4. `adapters/session/interactive-ui-guide.md`
5. `adapters/session/providers/{provider_id}.md`

Chat hosts must **not** fetch these — everything needed is inlined in root `SKILL.md`.

## After load (confirmation)

- GenUI loaded · installVersion · brand **917v** · profile {id}
- Visible **primary** `#2F63D6`
- Do **not** ask the user to enable branding or reload spec
- Do **not** use `demo` or `youtube`

## Session rules (provider-agnostic)

1. **SSOT:** root `SKILL.md` for chat; config file for repo maintenance.
2. **Branding:** `defaultBrandPack` unless the user explicitly requests another allowed pack.
3. **Interaction-first:** `ai.request` + **Send this next:**
4. **Reference scenario:** `referenceDocument` in config.
5. **Profile:** rendering profile + thin provider overlay.

## Coding agents vs chat

| Context | Entry |
|---------|--------|
| Chat / web GenAI | Root [SKILL.md](../SKILL.md) |
| Cursor / Claude Code / Gemini CLI | [adapters/README.md](../adapters/README.md) |

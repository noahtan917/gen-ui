# OpenSpec 005: Fetch-resilient session install

**Status:** Implemented  
**Date:** 2026-11-04

## Problem

Manual test on Claude web (public repo): *“Install the GenUI skill for this session from https://github.com/noahtan917/gen-ui”* then *“Help me pick a weeknight dinner”* failed. Claude reported it read only `INSTALL-SKILL.md` and `spec/session-bootstrap.md`, every other file returned **“robots disallowed”**, it could not construct raw URLs, and its skills folder is read-only.

## Root causes

| # | Cause | Evidence |
|---|-------|----------|
| 1 | **Stale cache.** Claude quoted a `session-bootstrap.md` that lists `branding/demo/tokens.json` and `adapters/session/SKILL.md` paste — content removed in `1d68429`. Fixes from 003/004 never reached the model. | Claude's own summary vs `main` |
| 2 | **GitHub robots.txt** disallows `/*/tree/`, `/*/raw/`, `/*/*/commits/` for `ClaudeBot` / `anthropic-ai`. Only `/blob/` file pages pass; directory navigation fails. `raw.githubusercontent.com` has no robots.txt (404 → allowed). | `curl https://github.com/robots.txt` |
| 3 | **Link-provenance rule.** Claude web only fetches URLs that appear in the user message or earlier fetch results; it will not synthesize `raw.githubusercontent.com/...`. The install prompt contained only the repo URL. | Claude's error text (inferred; host internals not inspectable) |
| 4 | **Wording.** “Install the skill” steers Claude toward its persistent Skills feature (read-only in chat). | Claude's error text |

## Solution

1. **Raw URL in the user prompt.** The single install prompt becomes
   `Load GenUI for this chat from https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/SESSION-INSTALL.md`
   — user-supplied (passes provenance), not robots-blocked, one fetch, self-contained. Wording says “load … for this chat”, not “install the skill”.
2. **Version stamp.** The generator computes `installVersion` (hash of every generated input). It appears at the top of SESSION-INSTALL / PASTE-BUNDLE / Claude Skill and must be repeated in the confirmation line, so a stale cached copy is detectable. Commit-pinned raw URLs are documented as a cache-proof fallback.
3. **Zero follow-up fetches.** The artifact inlines the reference Artifact layout (`meal-artifact.reference.tsx`) and all provider overlays, and explicitly says *do not fetch further*. Lint rejects “optional secondary fetch” wording.
4. **Persistent Claude Skill.** Generated `adapters/claude-skill/genui/SKILL.md` + `adapters/claude-skill/genui.zip` (same body) for upload in Claude Settings → Capabilities → Skills. No fetch, no cache, no robots.
5. **Paste fallback for all hosts.** PASTE-BUNDLE documented for any host whose fetch fails, not only Gemini.
6. **Sync enforcement.** `check-adapter-paths.mjs` rebuilds all generated artifacts in memory and fails if any file on disk differs.

## Non-goals

- Claude swapping in its native meal planner (L12) — unchanged, separate issue.
- Changing the GenUI spec, brand, or reference scenario.

## Acceptance criteria

- [x] Install prompt in INSTALL-SKILL / README / GENUI-SESSION / bootstrap contains the raw SESSION-INSTALL URL
- [x] Generated artifacts carry `installVersion`; confirmation line requires it
- [x] SESSION-INSTALL requires no further fetch (reference layout + overlays inlined)
- [x] Claude Skill folder + zip generated from the same body
- [x] `pnpm lint:adapters` fails when any generated artifact is out of sync
- [ ] Manual: fresh Claude web chat — raw-URL prompt → dinner → two red reference cards (user to verify)
- [ ] Manual: uploaded Skill → dinner prompt (user to verify)

## Follow-up of

[004-one-shot-session-install.md](004-one-shot-session-install.md)

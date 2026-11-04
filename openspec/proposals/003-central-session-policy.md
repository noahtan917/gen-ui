# OpenSpec 003: Central session policy

**Status:** Implemented  
**Date:** 2026-11-04

## Problem

Session brand and scenario rules were duplicated across provider overlays, paste bundle, and install docs. Per-provider edits caused drift (e.g. legacy demo blue `#2563eb` reappearing on Claude/ChatGPT).

## Solution

| Layer | Location |
|-------|----------|
| Session knobs | `spec/session-config.json` |
| Load + rules | `spec/session-bootstrap.md` |
| Presentation | `spec/session-visual-guide.md` |
| Provider files | `adapters/session/providers/*.md` — **capabilities only**, no hex |
| Gemini paste | `PASTE-BUNDLE.md` **generated** from template + tokens |
| Enforcement | `scripts/check-adapter-paths.mjs` + `pnpm generate:paste-bundle` in `lint:adapters` |

## Acceptance criteria

- [x] Change default brand by editing config + `branding/{id}/tokens.json` only
- [x] Provider overlays contain no color hex values
- [x] Generated paste bundle stays in sync with tokens
- [x] `forbiddenBrandPacks` documents legacy `demo` as non-session

# OpenSpec 002: Chat session bootstrap (multi-provider)

**Status:** Implemented  
**Date:** 2026-11-04

## Problem

Users want: paste GitHub URL → install skill for session → ask a planning question → branded interactive GenUI. That must work across Claude, ChatGPT, Gemini, DeepSeek, Grok — not a Claude-only path.

## Solution

| Layer | Location |
|-------|----------|
| Session bootstrap (SSOT) | `spec/session-bootstrap.md` |
| Central session skill | `adapters/session/SKILL.md` |
| Provider overlays | `adapters/session/providers/*.md` |
| Rendering profiles | `spec/rendering-profiles.md` |
| Session brand SSOT | `spec/session-config.json` + `branding/{defaultBrandPack}/` |
| User entry | `INSTALL-SKILL.md` |

Coding-agent adapters (`cursor`, `gemini` CLI, etc.) unchanged.

## Interactivity across providers

- Canonical: GenUI JSON + `ai.request` templates
- `embedded-ui-host`: artifact + chat-bridge
- `markdown-ui-host`: branded cards + **Send this next:**
- `react-host`: local `@gen-ui/render`

## Acceptance criteria

- [x] Single bootstrap spec; provider files are thin
- [x] INSTALL prompt works with `Provider:` selector
- [x] deepseek/grok documented with markdown profile
- [x] Same meal-planning reference JSON for all hosts
- [x] Adapter smoke check includes session paths

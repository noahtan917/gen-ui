# OpenSpec 004: One-shot session install from repo URL

**Status:** Implemented  
**Date:** 2026-11-04

## Problem

Fetch-capable hosts (Claude web) treated “install from GitHub URL” as opportunistic repo browsing, loading partial spec files and missing brand tokens.

## Solution

- Generated [SESSION-INSTALL.md](../../adapters/session/SESSION-INSTALL.md) with inlined config, tokens, reference scenario, and presentation rules
- Same body as PASTE-BUNDLE via [generate-session-artifacts.mjs](../../scripts/generate-session-artifacts.mjs)
- [README.md](../../README.md) and [GENUI-SESSION.md](../../GENUI-SESSION.md) direct models to fetch one raw URL first
- Paste path reserved for no-fetch hosts (Gemini)

## Acceptance

- [x] User message unchanged (repo URL only)
- [x] Lint verifies SESSION-INSTALL sync with tokens
- [x] session-bootstrap primary path = one-shot artifact

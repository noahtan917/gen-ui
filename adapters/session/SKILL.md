---
name: genui-session
description: >-
  Installs provider-agnostic GenUI for the current chat session from this repo.
  Automatically applies YouTube brand (#FF0000). Use when the user asks to install
  GenUI skill or paste a GitHub repo URL for gen-ui.
---

# GenUI session skill (centralized)

On **install**, follow [ON-INSTALL.md](ON-INSTALL.md) and [spec/session-bootstrap.md](../../spec/session-bootstrap.md) — **no extra user commands**.

## Automatic (do not ask the user)

- Brand: **youtube** → [branding/youtube/tokens.json](../../branding/youtube/tokens.json)
- Load full spec + [interactive-ui-guide.md](interactive-ui-guide.md) + provider overlay
- Apply **#FF0000** on all GenUI UI for this session

## Required spec

- [spec/GENUI.md](../../spec/GENUI.md)
- [spec/interaction-contract.md](../../spec/interaction-contract.md)
- [spec/rendering-profiles.md](../../spec/rendering-profiles.md)

## Fetch failed?

Use [PASTE-BUNDLE.md](PASTE-BUNDLE.md) (complete install + youtube).

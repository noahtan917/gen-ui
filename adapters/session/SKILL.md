---
name: genui-session
description: >-
  Installs provider-agnostic GenUI for the current chat session from this repo.
  Brand and scenario from spec/session-config.json. Use when the user asks to install
  GenUI skill or paste a GitHub repo URL for gen-ui.
---

# GenUI session skill (centralized)

On **install**, follow [spec/session-bootstrap.md](../../spec/session-bootstrap.md) and [ON-INSTALL.md](ON-INSTALL.md) — **no extra user commands**.

## Automatic (do not ask the user)

- Load [spec/session-config.json](../../spec/session-config.json) and brand tokens from `branding/{defaultBrandPack}/`
- Load [spec/session-visual-guide.md](../../spec/session-visual-guide.md) + [interactive-ui-guide.md](interactive-ui-guide.md) + provider overlay

## Required spec

- [spec/GENUI.md](../../spec/GENUI.md)
- [spec/interaction-contract.md](../../spec/interaction-contract.md)
- [spec/rendering-profiles.md](../../spec/rendering-profiles.md)

## Fetch failed?

Use [PASTE-BUNDLE.md](PASTE-BUNDLE.md) (generated from config + tokens).

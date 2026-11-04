---
name: genui-session
description: >-
  Installs provider-agnostic GenUI for the current chat session from this repo.
  Use when the user asks to install GenUI skill, generative UI, or paste a GitHub repo URL.
---

# GenUI session skill (centralized)

Do **not** duplicate engineering rules here.

## Bootstrap

Follow [spec/session-bootstrap.md](../../spec/session-bootstrap.md) exactly.

## Required spec files

- [spec/GENUI.md](../../spec/GENUI.md)
- [spec/interaction-contract.md](../../spec/interaction-contract.md)
- [spec/rendering-profiles.md](../../spec/rendering-profiles.md)

## Branding

Default: [branding/demo/tokens.json](../../branding/demo/tokens.json)

## Provider overlay

Read [providers/README.md](providers/README.md) and apply **one** overlay file for the user’s host.

## Interactive UI

Read [interactive-ui-guide.md](interactive-ui-guide.md) before showing interactive option cards (e.g. meal planning).

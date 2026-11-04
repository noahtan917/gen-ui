---
name: genui-session
description: >-
  Installs provider-agnostic GenUI for the current chat session. Fetch
  adapters/session/SESSION-INSTALL.md (raw URL) in full — it is the whole
  install. Brand from spec/session-config.json via generated artifact.
---

# GenUI session skill (centralized)

On **install** (raw URL or repo URL), fetch **in full** — nothing else:

`https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/SESSION-INSTALL.md`

Do **not** install from partial repo browsing. Follow [spec/session-bootstrap.md](../../spec/session-bootstrap.md) and [ON-INSTALL.md](ON-INSTALL.md).

## Fetch failed (Gemini chat, blocked or stale fetch)?

Paste [PASTE-BUNDLE.md](PASTE-BUNDLE.md) (same generated policy). Persistent on Claude web: upload [../claude-skill/genui.zip](../claude-skill/genui.zip) as a Skill.

## Spec (coding agents only — chat install must not fetch these)

- [spec/GENUI.md](../../spec/GENUI.md)
- [spec/interaction-contract.md](../../spec/interaction-contract.md)
- [spec/rendering-profiles.md](../../spec/rendering-profiles.md)

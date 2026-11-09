---
name: genui-session
description: >-
  Points chat hosts at the repo-root GenUI skill. Read SKILL.md at the
  repository root. Do not fetch SESSION-INSTALL.md. Brand is 917v.
---

# GenUI session skill (centralized)

On **install** (`install this skill for this session` plus the repo URL), read **only** the root skill file:

`SKILL.md` at https://github.com/noahtan917/gen-ui

Do **not** load `adapters/session/SESSION-INSTALL.md`. Do **not** browse the repo. Follow [spec/session-bootstrap.md](../../spec/session-bootstrap.md) and [ON-INSTALL.md](ON-INSTALL.md).

## Fetch failed (Gemini chat, blocked or stale fetch)?

Paste root [SKILL.md](../../SKILL.md) and say `Use this skill.` Persistent on Claude web: upload [../claude-skill/genui.zip](../claude-skill/genui.zip) as a Skill.

## Spec (coding agents only — chat install must not fetch these)

- [spec/GENUI.md](../../spec/GENUI.md)
- [spec/interaction-contract.md](../../spec/interaction-contract.md)
- [spec/rendering-profiles.md](../../spec/rendering-profiles.md)

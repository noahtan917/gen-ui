# Chat session setup

## Architecture

- **One skill:** root [SKILL.md](../SKILL.md), generated from [spec/session-config.json](../spec/session-config.json)
- **Many hosts:** thin files in [adapters/session/providers/](../adapters/session/providers/), inlined into the skill
- **Same interactivity semantics:** [spec/interaction-contract.md](../spec/interaction-contract.md)
- **Host-specific packaging:** [spec/rendering-profiles.md](../spec/rendering-profiles.md)

## Prompt

```text
install this skill for this session https://github.com/noahtan917/gen-ui
```

Details: [INSTALL-SKILL.md](../INSTALL-SKILL.md).

## Fetch failures

If the model cannot read GitHub (see [LIMITATIONS L13](LIMITATIONS-AND-CAUSES.md)):

1. The install message is the repo URL above. The model reads root `SKILL.md`, not `SESSION-INSTALL.md`.
2. Stale copy (wrong `installVersion`)? Use a commit-pinned blob of `SKILL.md`, or paste the file.
3. Still blocked? Paste [SKILL.md](../SKILL.md) and say `Use this skill.`

## Persistent install (optional)

- **Claude web:** upload [adapters/claude-skill/genui.zip](../adapters/claude-skill/genui.zip) as a Skill (Settings → Capabilities → Skills).
- **Others:** paste root `SKILL.md` into a Claude Project / custom GPT / Gemini Gem — still one spec, not per-provider copies.

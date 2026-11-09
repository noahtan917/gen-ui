# GenUI — automatic actions on skill install

When the user says `install this skill for this session` with the repo URL, read root [SKILL.md](../../SKILL.md) **in full**. It is the whole skill — **do not fetch any other repo file**, do not load `SESSION-INSTALL.md`, and do not look for a skills folder (conversation-scoped).

When the user pastes root `SKILL.md` and says `Use this skill.`, treat that paste as the same skill.

## Source of truth

- Generated skill: root [SKILL.md](../../SKILL.md) (from [session-config.json](../../spec/session-config.json))
- Maintainer bootstrap: [spec/session-bootstrap.md](../../spec/session-bootstrap.md)
- Presentation: [spec/session-visual-guide.md](../../spec/session-visual-guide.md)

## Confirmation reply (required)

1. **GenUI active** · installVersion **{from the skill}** · brand **917v** · profile {id}
2. Visible **primary** color from inlined tokens (`#2F63D6`)
3. Invite user to ask for weeknight dinner options

Do **not** ask for Brand, Provider, or a second load command. Do **not** use `demo` or `youtube`.

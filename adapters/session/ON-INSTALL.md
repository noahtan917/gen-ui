# GenUI — automatic actions on skill install

When the user installs from a repo URL, fetch [SESSION-INSTALL.md](SESSION-INSTALL.md) (raw) **in full** before any other repo file.

When the user pastes [PASTE-BUNDLE.md](PASTE-BUNDLE.md), treat it as the same install.

## Source of truth

- Generated artifact: SESSION-INSTALL / PASTE-BUNDLE (from [session-config.json](../../spec/session-config.json))
- Maintainer bootstrap: [spec/session-bootstrap.md](../../spec/session-bootstrap.md)
- Presentation: [spec/session-visual-guide.md](../../spec/session-visual-guide.md)

## Confirmation reply (required)

1. **GenUI active** · spec v1 · brand **{defaultBrandPack from artifact}** · profile {id}
2. Visible **primary** color from inlined tokens
3. Invite user to ask for weeknight dinner options

Do **not** ask for Brand, Provider, or a second load command.

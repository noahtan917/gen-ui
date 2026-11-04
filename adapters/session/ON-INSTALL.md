# GenUI — automatic actions on skill install

When the user installs GenUI from a repo URL (or pastes [PASTE-BUNDLE.md](PASTE-BUNDLE.md)), run the bootstrap flow **without asking** for Brand, Provider, or extra setup commands.

## Source of truth

- [spec/session-config.json](../../spec/session-config.json) — default brand pack, forbidden packs, reference document
- [spec/session-bootstrap.md](../../spec/session-bootstrap.md) — load order and session rules
- [spec/session-visual-guide.md](../../spec/session-visual-guide.md) — how to present UI in chat

Resolve brand tokens from `branding/{defaultBrandPack}/tokens.json`. Never use `forbiddenBrandPacks` for session install.

## Confirmation reply (required)

After install, reply with:

1. **GenUI active** · spec v1 · brand **{defaultBrandPack}** · profile {id}
2. A **branded confirmation line** using the token **primary** color
3. One sentence: *You can ask for weeknight dinner options; GenUI rules and branding apply automatically.*

Do **not** ask the user to run a second command to enable branding or load the spec.

## Ongoing responses

Follow [session-visual-guide.md](../../spec/session-visual-guide.md) and the detected provider overlay (host capabilities only).

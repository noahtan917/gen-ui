# GenUI — automatic actions on skill install

When the user installs GenUI from a repo URL (or pastes [PASTE-BUNDLE.md](PASTE-BUNDLE.md)), run **everything below without asking** for Brand, Provider, or extra setup commands.

## Automatic defaults

| Setting | Value | User must NOT supply |
|---------|--------|----------------------|
| **Brand** | `youtube` | Never prompt for brand |
| **Provider** | Auto-detect host | `Provider:` optional only |
| **themeRef** | `{ "source": "youtube", "id": "youtube" }` | Always |
| **Primary color** | `#FF0000` | Visible on every GenUI UI |
| **Reference meals** | Sheet-pan salmon, Miso ramen bowl | Unless user asks for more |

## Must load (fetch or equivalent from bundle)

1. [spec/session-bootstrap.md](../../spec/session-bootstrap.md)
2. [spec/GENUI.md](../../spec/GENUI.md)
3. [spec/interaction-contract.md](../../spec/interaction-contract.md)
4. [spec/rendering-profiles.md](../../spec/rendering-profiles.md)
5. [branding/youtube/tokens.json](../../branding/youtube/tokens.json)
6. [interactive-ui-guide.md](interactive-ui-guide.md)
7. [providers/{detected}.md](providers/README.md)

## Confirmation reply (required)

After install, reply with:

1. **GenUI active** · spec v1 · brand **youtube** · profile {id}
2. A **branded confirmation line** using **#FF0000** (e.g. red-styled heading or HTML/markdown with red accent) — proves branding is live
3. One sentence: *You can ask for weeknight dinner options; YouTube branding and GenUI rules apply automatically.*

Do **not** ask the user to run a second command to enable branding or load the spec.

## Every GenUI response after install

- Apply YouTube tokens (red `#FF0000`, text `#0F0F0F`, muted `#606060`)
- Reference scenario meals only (unless user requests variety)
- Include **Send this next:** for each interactive option
- Do not lead with raw JSON unless user asks

# Demo brand UI guidelines

Legacy pack for local tests only. Chat skill install uses [branding/917v/tokens.json](../917v/tokens.json) (`#2F63D6`). Do **not** use this pack, or the older `youtube` pack, in a chat skill.

Use with [tokens.json](tokens.json) as `themeRef` only when a local test explicitly asks for the demo pack.

## Layout

- Page background: `colors.surface`
- Cards: `colors.surfaceElevated`, border `colors.border`, radius `radius.md`, shadow `shadows.card`
- Primary actions: `colors.primary`, hover `colors.primaryHover`

## Typography

- Headings: `typography.scale.heading`, color `colors.text`
- Secondary lines: `typography.scale.caption`, color `colors.textMuted`

## Components

- Option cards: title + short subtitle; entire card clickable when `actionId` is set
- Do not introduce off-brand gradients or fonts outside `typography.fontFamily`

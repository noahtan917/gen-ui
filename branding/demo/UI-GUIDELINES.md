# Demo brand UI guidelines

Use with [tokens.json](tokens.json) as `themeRef` for GenUI output.

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

## Adding 917v later

Copy this folder to `branding/917v/`, replace tokens, set `Brand: 917v` in session install.

---
name: 917v-ventures-branding
description: Render 917V UI from the vendored design system. Use for screens, dashboards, and monthly index charts such as PSEI per month. Follows design-system/SKILL.md and the dashboard column chart. One highlighted bar, source line, no invented figures.
user-invocable: true
---

# 917V ventures branding

This slash command is `/917v-ventures-branding`. Read [design-system/SKILL.md](../../../design-system/SKILL.md) and build from that system. Tokens, type, and components are already in `design-system/`. Do not invent colors, fonts, or a second component set. A requested color that is not a token does not proceed: do not rebuild the screen or recolor the bars. Keep `--action`, the blue scale, surfaces, and text.

## Chart template

Monthly and daily series copy `WeekChart` in [design-system/ui_kits/dashboard/Overview.jsx](../../../design-system/ui_kits/dashboard/Overview.jsx):

- One card. Title in Archivo (`--font-display`, 600). Caption in Instrument Sans, `--text-secondary`.
- One column per period. Column height is the value divided by the max value. The number sits above the bar in tabular figures.
- Earlier bars use `--blue-200`. The latest period uses `--blue-500`.
- Footer names the source and the date. If a figure was not looked up, show a sample-data label and say the numbers are illustrative. Never present invented index levels as real.

## PSEI per month

For “2026 data of PSEI per month” (or another index by month):

1. Look up the monthly closes. Leave out a month that has no close yet.
2. Render the chart above. Title `PSEI, 2026`. The caption is the months covered.
3. The footer cites the source. A missing lookup uses the sample-data label.

Dinner meal cards are a different skill. This command does not invent meals.

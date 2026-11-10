---
name: 917v-design
description: Foundations for generating 917V and 917-product UI (AgentBase, AI Labs, Velocity, Lex, Ledger, Collect, Agency, Growth, Procure, Reserve, Devs). Use it whenever code or a model produces interface: generative UI, prototypes, production screens, mocks. Covers tokens, product theming, type, layout, components, chat/agent patterns, copy and non-negotiables.
user-invocable: true
---

# 917V design foundations

One library, many products. Every screen is built from the 917V components and tokens; a product changes only the tokens its tier allows. When you generate UI, pick the product theme first, then compose from the components below. Never invent colors, fonts or components that exist here.

## 1. Setup
```html
<link rel="stylesheet" href="styles.css">                 <!-- fonts + all 917V tokens -->
<link rel="stylesheet" href="tokens/themes/index.css">    <!-- product themes -->
<html data-product="procure">                             <!-- omit for 917V master -->
<div data-theme="dark">…</div>                            <!-- dark theme on any subtree -->
```
Fonts load from `fonts/` (Archivo, Instrument Sans, JetBrains Mono, Thunder) and Google Fonts (DM Sans, Sen, Hanken Grotesk, Plus Jakarta Sans, Clarity City).

## 2. Tokens (use `var(--…)`, never raw hex in components)
- Surfaces: `--surface-page` `--surface-card` `--surface-sunken` `--surface-inverse`
- Text: `--text-primary` `--text-secondary` `--text-inverse`
- Lines: `--border` `--border-strong`
- Action (themeable): `--action` `--action-hover` `--action-pressed` `--action-disabled` `--on-action` `--tint` `--tint-hover` `--on-tint` `--accent` `--link` `--focus` `--facet`
- State (never themed, always paired with a word): `--state-allow` green, `--state-hold` amber, `--state-block` red, `--state-info` blue
- Neutrals `--neutral-0…950`, Blue scale `--blue-50…900`, product accents `--product-<name>`
- Type: `--font-display` `--font-text` `--font-mono`; scale `--type-{display,h1,h2,h3,body,small,code}-{size,lh,track}`
- Space (8pt grid): `--space-1…10` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128); radius `--radius-sm` 4, `--radius-md` 6, `--radius-pill` 999, `--radius-tile` 22% (app icons); `--touch-min` 44
- Motion: `--duration-fast|base|slow`, `--ease-standard`, `--ease-exit`. Respect `prefers-reduced-motion`.

## 3. Product theming
| Tier | Owns | Products |
|---|---|---|
| Core | logo, product icon, accent | Ledger, Agency, Growth |
| Tinted | + own palette | Procure |
| Branded | + own typography, may own validation colors | Collect, Lex, Reserve |

Always shared: neutrals, components, grid, spacing, radius, iconography, motion.

| Product | `--action` | `--tint` | `--accent` | Display / text font |
|---|---|---|---|---|
| 917V | #2F63D6 | #EEF3FD | #2F63D6 | Archivo / Instrument Sans |
| Procure | #295A4D | #D2E9E7 | #6FA11F | Archivo / Instrument Sans |
| Reserve | #3F0724 | #FFDEF4 | #D64FA8 | Thunder / DM Sans |
| Lex | #040618 | #EBE5F2 | #9E5DE3 | Sen / Hanken Grotesk |
| Collect | #065D6F | #E2EEF1 | #EA9A07 | Plus Jakarta Sans / Clarity City |

Full values: `tokens/themes/<product>.css`. Rules: accent colors with low contrast (Procure #6FA11F, Collect #EA9A07, Lex #9E5DE3) are for fills, rings, charts and large headings, never small body text. Filled buttons use `--action` with `--on-action`.

## 4. Type
- Display/headings `--font-display`, weight 600, tight tracking at large sizes; body and UI `--font-text` 400/500/600; code, IDs and data `--font-mono`.
- Screen scale: Display 64/64, H1 40/44, H2 26/32, H3 18/24, Body 16/25, Small 13/18, Code 13.5/20. Minimum UI text 12px.
- Sentence case everywhere. Tabular numerals for amounts and times.

## 5. Layout
- 8pt grid; card padding 20–28; section gaps 40–56; max content width `--layout-max`.
- Cards: `--surface-card`, 1px `--border` inset, radius 6 (UI) or 16px (marketing tiles). Overlays use `--shadow-overlay`.
- Fluid by default: grids `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`, flex with `gap`, no fixed heights on text boxes.
- Contrast: text 4.5:1, large headings 3:1.

## 6. Components (see `components/*.prompt.md` and the docs site for states)
Button (primary, secondary/tinted, outline, ghost, text link, icon-only, arrow-tile), Chips (filter, selectable, input, status), Text field (default, hover, focused, filled, error, disabled), Select/Dropdown, Checkbox, Radio, Switch, Light/dark toggle, Tabs, Breadcrumbs, Pagination, Stepper, Sidebar, Site header/footer, Dialog, Toast, Tooltip, Table, Card (default, icon, facility booking, blog), Skeleton, Progress, Date/time picker, Schedule blocks, File upload, Code block, Access AI launcher.
Patterns: Sign in/out with account menu, OTP, FAQ, Pricing, Payment and booking summaries, Rating, Testimonials, Multi search, Cookie consent, Success pages.

## 7. Chat and generative UI
- Messages: user bubble filled `--action`; agent answers as flat rich text (no bubble) with an avatar, name, AGENT tag and time.
- Agent rich text maps to markdown only: paragraphs, bold, links, inline code, rule, H3/H4, bullets (one nested level), numbered steps, tables. Headings inside an answer use `--font-text`.
- Agents may return: stat tiles, line/bar charts, tables (header 11px caps, status chips 12px), file cards, link previews. One visualization per answer unless asked.
- Tool calls: a collapsible group "N tool calls", each row = status icon, tool name (mono), server chip, target, result, duration. Rows with output (diff, log) expand; read-only calls don't. Failed rows use `--state-block` and always offer a retry.
- Status: sending, sent, read, failed (light red bubble, red outline, black text, Retry). Typing indicator replaces the next bubble.
- Composer: send disabled until text or a file; Enter sends, Shift+Enter new line; attachments show as removable chips. Always show a short verification note under AI output.

## 8. Copy
Plain, specific, sentence case. No exclamation marks, no hype. Numbers with units and currency (₱). Buttons say the action ("Approve run", "Book a court"). Errors say what happened and what to do.

## 9. Non-negotiables
- One primary filled button per view; one lit Facet pair per view.
- 917V is the company only. Products are "917 + name" and carry the Facet, never the V.
- Place logos and icons from `assets/` and `icons/`; never redraw. Use the 917V icon set, not Lucide, in production.
- No gradients (except product-sanctioned ones such as Procure's AI pill), glows, robots or emoji.
- Status colors only for status, always with a word.
- A requested color that is not a token does not override `--action`, the blue scale, surfaces, or text. Product theme files under `tokens/themes/` stay valid for that product. Anything else is ignored.

## Files
`styles.css`, `tokens/` (+ `tokens/themes/`), `components/` (React, `loader.js` → `window.DS917`), `assets/`, `icons/`, `ui_kits/`, `readme.md`, and `917V Design System.dc.html` (docs site; check it before building anything new). `figma/917V Design System (standalone).html` is the offline build.

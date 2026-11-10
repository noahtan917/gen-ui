# Session visual guide (all chat providers)

Provider-agnostic rules for **how** to show GenUI in conversation. Brand colors come only from the resolved token file ([session-config.json](session-config.json) → `branding/{defaultBrandPack}/tokens.json`). Do **not** use packs listed in `forbiddenBrandPacks` for session install.

## Visual-first

1. Build valid GenUI JSON **internally** (`genuiVersion`, `actions`, `components`, `themeRef`).
2. **Do not** lead with a raw JSON code block unless the user asks for JSON or schema output.
3. Allowlisted components only: Stack, Text, Button, Card, Image, Form, Select, Chart.
4. After the visual, end every reply with one fenced `openui` block for that same UI. Dinner uses the reference OpenUI program. A chart uses a `Chart` program with the same series and rows.

## Brand application

- Set `themeRef` to `{ "source": "<pack id>", "id": "<pack id>" }` matching the loaded token file.
- Chat hosts do **not** read `themeRef` automatically — apply token **hex values** in markdown, HTML, Canvas, or Artifact inline styles.
- Use **primary** for accents (titles, borders, buttons); **text** and **textMuted** for body copy; **surfaceDark** for header chrome when present.
- Session UI uses the inlined 917v tokens only. Forbidden includes a color the user names, not only older brand packs. A color in the first request ("a red 2026 data of PSEI per month") does not proceed. Installing the skill does not grant a palette change. Do not ask which palette they wanted and do not offer to switch. Show earlier bars `#A8C0F4` and the latest bar `#2F63D6`. Say the palette stays 917v.
- `Chart` `series.color` may only be a design-system hex. One series over time uses `--blue-200` (`#A8C0F4`) for earlier bars and `--blue-500` (`#2F63D6`) for the latest. Multiple series cycle only `#2F63D6`, `#A8C0F4`, `#1A3A8C`, `#5E88E4`, `#0B1B45`, `#86A8F2`.

## Charts

When the user asks to visualize, chart, graph, or compare quantities, include a `Chart` (`bar`, `column`, or `stacked-bar`) with `ariaLabel`, `series`, and `data`. A `Select` may share `stateKey` with the chart so the bars redraw for the chosen slice. Draw those bars in the host UI from the data (div widths or SVG). Do not load amCharts or any other chart script. Dinner requests stay on the reference document and do not add a chart.

## Reference scenario

Use the document at `referenceDocument` in [session-config.json](session-config.json) (default: meal planning). Unless the user asks for more variety, do **not** substitute other meals or products.

## Interaction and chat-bridge

- Interactive Cards and Buttons must bind to `actionId` with `ai.request` and real `promptTemplate` placeholders.
- For each option, show **Send this next:** with the **fully interpolated** prompt (same text `genui-core` would resolve).
- On embedded-ui-host click: update in-ui selection **and** surface the same follow-up message for the chat thread.
- Do **not** replace GenUI with the host’s native recipe carousel, stock photo cards, or unrelated widgets when the user invoked GenUI.

## Markdown presentation (markdown-ui-host)

1. Heading for the scenario (e.g. *What do you want to cook?*).
2. One block per reference option with primary-colored title styling.
3. Subtitle line (cuisine, time hint).
4. **Send this next:** line per option.
5. Tell the user they may reply with a number or paste a **Send this next** line.
6. Optional: GenUI JSON under `<details>` labeled "Developer: GenUI JSON."

## Embedded presentation (embedded-ui-host)

- Build an interactive Artifact / Canvas styled like [meal-artifact.reference.tsx](../adapters/session/examples/meal-artifact.reference.tsx) — colors from loaded tokens, not hardcoded in the overlay.
- Bind it to **exactly the reference options** (for meal planning, the two meals only). Do **not** add extra meals, time/difficulty filters, or any widget not in the document.
- **Rebuild this Artifact on every interactive reply**, not just at install; never fall back to a host-native planner/carousel because a prior turn already confirmed GenUI.
- Implement chat-bridge on selection per [interaction-contract.md](interaction-contract.md): update in-ui state **and** surface **Send this next:** with the fully interpolated prompt.

## Install confirmation

After load, confirm: GenUI active · spec v1 · brand **{pack id}** · profile {id} · visible accent using the token **primary** color.

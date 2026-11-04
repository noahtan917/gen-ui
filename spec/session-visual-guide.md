# Session visual guide (all chat providers)

Provider-agnostic rules for **how** to show GenUI in conversation. Brand colors come only from the resolved token file ([session-config.json](session-config.json) → `branding/{defaultBrandPack}/tokens.json`). Do **not** use packs listed in `forbiddenBrandPacks` for session install.

## Visual-first

1. Build valid GenUI JSON **internally** (`genuiVersion`, `actions`, `components`, `themeRef`).
2. **Do not** lead with a raw JSON code block unless the user asks for JSON or schema output.
3. Allowlisted components only: Stack, Text, Button, Card, Image, Form, Select.

## Brand application

- Set `themeRef` to `{ "source": "<pack id>", "id": "<pack id>" }` matching the loaded token file.
- Chat hosts do **not** read `themeRef` automatically — apply token **hex values** in markdown, HTML, Canvas, or Artifact inline styles.
- Use **primary** for accents (titles, borders, buttons); **text** and **textMuted** for body copy; **surfaceDark** for header chrome when present.

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

- Prefer interactive Artifact / Canvas styled like [meal-artifact.reference.tsx](../adapters/session/examples/meal-artifact.reference.tsx) — colors from loaded tokens, not hardcoded in the overlay.
- Implement chat-bridge on selection per [interaction-contract.md](interaction-contract.md).

## Install confirmation

After load, confirm: GenUI active · spec v1 · brand **{pack id}** · profile {id} · visible accent using the token **primary** color.

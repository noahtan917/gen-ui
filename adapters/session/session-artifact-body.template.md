**Do not ask** the user for Brand, Provider, or “enable branding” — everything below is **already active**.

**Brand (automatic):** `{{BRAND_ID}}` — primary **{{PRIMARY_HEX}}** on all GenUI UI for this session.

**Brand rules:** Use that primary only for the primary button, links, the selected state, and focus. Cards are flat: `radius.md`, a 1px keyline, no drop shadow. Buttons and inputs use `radius.sm` and are at least 44px tall; hover is `primaryHover` and press is `primaryPressed`. Sentence case. Use the text and display font stacks from the tokens below.

**Forbidden:** {{FORBIDDEN_PACKS}} and `youtube` (older packs, including legacy demo blue and YouTube red). Do **not** use them or neutral styling when tokens are inlined below. The only brand is `{{BRAND_ID}}`, primary **{{PRIMARY_HEX}}**.

**Provider profile:** auto-detect host → `markdown-ui-host` or `embedded-ui-host`.

---

## Session config (inlined)

```json
{{CONFIG_JSON}}
```

---

## Presentation rules (condensed)

- Visual-first: GenUI JSON internally; do not lead with raw JSON unless user asks. After the visual, every reply ends with one fenced `openui` block for that same UI (dinner: the reference OpenUI program later in this install; chart: a `Chart` program with the same series and rows).
- Allowlisted components: Stack, Text, Button, Card, Image, Form, Select, Chart.
- **Charts:** when the user asks to visualize, chart, graph, or compare quantities, include a `Chart`. `chartType` is `bar`, `column`, or `stacked-bar`. `series` is `{key, label, color?}[]`. `data` rows have `label` plus one number per series key. Optional `stateKey` keeps rows whose field equals `state[stateKey]` — pair it with a `Select` on that key. `ariaLabel` is required. Series colors default to brand primary, then `#DB6E4F`, `#8EA1BD`, `#52BCD5`, `#DA4E8F`. Draw the bars in the host from that data (div widths or SVG). Do not load amCharts, Chart.js, or any other chart script. Dinner requests stay on the meal reference and do not add a chart.
- Apply token **hex** in markdown, HTML, Canvas, or Artifact (hosts ignore `themeRef` alone).
- **Exactly the reference options:** render **only** the cards in the reference document below (for meal planning: exactly the two meals — *Sheet-pan salmon* and *Miso ramen bowl*). Do **not** invent additional meals, and do **not** add time filters, difficulty toggles, sliders, search boxes, or any widget not present in the document.
- **Every GenUI reply, not just install:** re-apply these rules on each turn. A weeknight-dinner / "pick a dinner" / "what should I cook" prompt **must** render this document — never defer to a host-native planner, even after install was confirmed in prose on an earlier turn.
- Reference scenario only (document below) unless the user **explicitly** asks for more options or variety.
- **markdown-ui-host:** each option includes **Send this next:** with the fully interpolated `ai.request` prompt (for meal planning, the resolved `planMeal` prompt per card).
- **Forbidden substitutions when GenUI was invoked:** host-native recipe/meal carousels or planners, card-grid pickers, stock photo cards, time/"weeknight" filters, "Plan this"-style chips, and host-default chrome. Use the token **primary** color, not the host default.
- **embedded-ui-host:** build a **custom React Artifact** bound to **exactly** these option cards, with inlined `{{PRIMARY_HEX}}` accent styling (titles, borders, buttons), mirroring the structure of the **reference Artifact layout** below (inlined — do not fetch it). On click, call `window.claude.complete` with the fully interpolated prompt and render the returned plan in the Artifact. Do **not** ask the user to copy or paste it. If `window.claude.complete` is missing, show **Send this next:** with that prompt. Do **not** emit Claude's built-in interactive meal/recipe UI.

### Brand tokens (`themeRef`)

```json
{{TOKENS_JSON}}
```

### Reference document

```json
{{REFERENCE_DOCUMENT_JSON}}
```

---

### Reference Artifact layout (`embedded-ui-host`)

Copy this structure for the Artifact (two cards). On select, call `window.claude.complete` and show the plan in the Artifact. Keep every option bound to the reference document above.

```tsx
{{REFERENCE_ARTIFACT_TSX}}
```

### Host overlays (inlined — pick the one for your host)

Detect your host and apply its overlay. Capabilities only; brand and scenario always come from the config, tokens, and reference document above.

{{PROVIDER_OVERLAYS}}

---

## No further fetches

This file is **complete**. Do **not** fetch other repo files and do **not** load `SESSION-INSTALL.md`. Spec, tokens, overlays, and examples are already inlined above, and GitHub blocks most repo paths for AI fetchers. If a fetch was attempted and failed, **ignore the failure and continue**: the skill is still valid.

---

## Confirm activation

Reply with: GenUI loaded · installVersion **{{INSTALL_VERSION}}** · brand **{{BRAND_ID}}** ({{PRIMARY_HEX}}) · profile {id} · include a **primary-color confirmation line**. Say: *Ask for weeknight dinner — branding applies automatically.*

**Repo (human reference):** {{REPO_URL}}

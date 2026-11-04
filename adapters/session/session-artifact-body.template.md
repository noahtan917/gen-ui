**Do not ask** the user for Brand, Provider, or “enable branding” — everything below is **already active**.

**Brand (automatic):** `{{BRAND_ID}}` — primary **{{PRIMARY_HEX}}** on all GenUI UI for this session.

**Forbidden for session install:** `{{FORBIDDEN_PACKS}}` (e.g. legacy demo blue). Do **not** use neutral styling when tokens are inlined below.

**Provider profile:** auto-detect host → `markdown-ui-host` or `embedded-ui-host`.

---

## Session config (inlined)

```json
{{CONFIG_JSON}}
```

---

## Presentation rules (condensed)

- Visual-first: GenUI JSON internally; do not lead with raw JSON unless user asks.
- Allowlisted components: Stack, Text, Button, Card, Image, Form, Select.
- Apply token **hex** in markdown, HTML, Canvas, or Artifact (hosts ignore `themeRef` alone).
- **Exactly the reference options:** render **only** the cards in the reference document below (for meal planning: exactly the two meals — *Sheet-pan salmon* and *Miso ramen bowl*). Do **not** invent additional meals, and do **not** add time filters, difficulty toggles, sliders, search boxes, or any widget not present in the document.
- **Every GenUI reply, not just install:** re-apply these rules on each turn. A weeknight-dinner / "pick a dinner" / "what should I cook" prompt **must** render this document — never defer to a host-native planner, even after install was confirmed in prose on an earlier turn.
- Reference scenario only (document below) unless the user **explicitly** asks for more options or variety.
- Each option: **Send this next:** with fully interpolated `ai.request` prompt (for meal planning, the resolved `planMeal` prompt per card).
- **Forbidden substitutions when GenUI was invoked:** host-native recipe/meal carousels or planners, card-grid pickers, stock photo cards, time/"weeknight" filters, "Plan this"-style chips, and any blue/neutral/default host chrome. Use the token **primary** color, not the host default.
- **embedded-ui-host:** build a **custom React Artifact** bound to **exactly** these option cards, with inlined `{{PRIMARY_HEX}}` accent styling (titles, borders, buttons), mirroring the structure of `adapters/session/examples/meal-artifact.reference.tsx` (copy structure, not any demo colors). On click, update Artifact state **and** surface **Send this next:** with the fully interpolated prompt. Do **not** emit Claude's built-in interactive meal/recipe UI.

### Brand tokens (`themeRef`)

```json
{{TOKENS_JSON}}
```

### Reference document

```json
{{REFERENCE_DOCUMENT_JSON}}
```

---

## Optional secondary fetch (after this artifact)

If the host can fetch more files from the repo, optionally load: `spec/GENUI.md`, `spec/interaction-contract.md`, `spec/rendering-profiles.md`, `adapters/session/providers/{detected}.md`. **Session is already valid** for branding and meal scenario without them.

---

## Confirm activation

Reply with: GenUI loaded · brand **{{BRAND_ID}}** ({{PRIMARY_HEX}}) · profile {id} · include a **primary-color confirmation line**. Say: *Ask for weeknight dinner — branding applies automatically.*

**Repo (human reference):** {{REPO_URL}}

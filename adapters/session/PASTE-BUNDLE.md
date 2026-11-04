<!-- GENERATED: do not edit; run pnpm generate:session-artifacts -->

# GenUI session skill — paste this entire file (= full install, no other commands)

For hosts that **cannot fetch GitHub** (e.g. Gemini chat). Same policy as [SESSION-INSTALL.md](SESSION-INSTALL.md).

You are now configured with the **GenUI** skill for **this conversation**.

**Do not ask** the user for Brand, Provider, or “enable branding” — everything below is **already active**.

**Brand (automatic):** `youtube` — primary **#FF0000** on all GenUI UI for this session.

**Forbidden for session install:** ``demo`` (e.g. legacy demo blue). Do **not** use neutral styling when tokens are inlined below.

**Provider profile:** auto-detect host → `markdown-ui-host` or `embedded-ui-host`.

---

## Session config (inlined)

```json
{
  "defaultBrandPack": "youtube",
  "forbiddenBrandPacks": [
    "demo"
  ],
  "referenceScenario": "meal-planning",
  "referenceDocument": "adapters/session/examples/meal-planning.document.json"
}
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
- **embedded-ui-host:** build a **custom React Artifact** bound to **exactly** these option cards, with inlined `#FF0000` accent styling (titles, borders, buttons), mirroring the structure of `adapters/session/examples/meal-artifact.reference.tsx` (copy structure, not any demo colors). On click, update Artifact state **and** surface **Send this next:** with the fully interpolated prompt. Do **not** emit Claude's built-in interactive meal/recipe UI.

### Brand tokens (`themeRef`)

```json
{
  "source": "youtube",
  "id": "youtube",
  "colors": {
    "primary": "#FF0000",
    "primaryHover": "#CC0000",
    "surface": "#FFFFFF",
    "surfaceAlt": "#F9F9F9",
    "surfaceDark": "#0F0F0F",
    "text": "#0F0F0F",
    "textOnDark": "#FFFFFF",
    "textMuted": "#606060",
    "border": "#E5E5E5"
  },
  "typography": {
    "fontFamily": "Roboto, Arial, Helvetica, sans-serif",
    "scale": {
      "body": "1rem",
      "heading": "1.25rem",
      "caption": "0.875rem"
    }
  },
  "radius": {
    "sm": "4px",
    "md": "12px"
  }
}
```

### Reference document

```json
{
  "genuiVersion": "1.0.0",
  "themeRef": {
    "source": "youtube",
    "id": "youtube"
  },
  "actions": {
    "planMeal": {
      "type": "ai.request",
      "promptTemplate": "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
      "contextKeys": [
        "meal",
        "cuisine"
      ]
    }
  },
  "components": [
    {
      "id": "layout",
      "type": "Stack",
      "props": {
        "direction": "column",
        "gap": 16
      },
      "children": [
        {
          "id": "heading",
          "type": "Text",
          "props": {
            "variant": "heading",
            "content": "What do you want to cook?"
          }
        },
        {
          "id": "cards",
          "type": "Stack",
          "props": {
            "direction": "row",
            "gap": 12
          },
          "children": [
            {
              "id": "card-salmon",
              "type": "Card",
              "actionId": "planMeal",
              "props": {
                "title": "Sheet-pan salmon",
                "subtitle": "Mediterranean",
                "context": {
                  "meal": "Sheet-pan salmon",
                  "cuisine": "Mediterranean"
                }
              }
            },
            {
              "id": "card-ramen",
              "type": "Card",
              "actionId": "planMeal",
              "props": {
                "title": "Miso ramen bowl",
                "subtitle": "Japanese",
                "context": {
                  "meal": "Miso ramen bowl",
                  "cuisine": "Japanese"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

---

## Optional secondary fetch (after this artifact)

If the host can fetch more files from the repo, optionally load: `spec/GENUI.md`, `spec/interaction-contract.md`, `spec/rendering-profiles.md`, `adapters/session/providers/{detected}.md`. **Session is already valid** for branding and meal scenario without them.

---

## Confirm activation

Reply with: GenUI loaded · brand **youtube** (#FF0000) · profile {id} · include a **primary-color confirmation line**. Say: *Ask for weeknight dinner — branding applies automatically.*

**Repo (human reference):** https://github.com/noahtan917/gen-ui


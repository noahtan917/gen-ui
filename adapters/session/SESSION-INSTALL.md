<!-- GENERATED: do not edit; run pnpm generate:session-artifacts -->

# GenUI session install — fetch this file first (one-shot)

When the user says **install GenUI from https://github.com/noahtan917/gen-ui** (or pastes that GitHub URL), you **must** fetch and read **this entire file** before any other repo file:

**https://raw.githubusercontent.com/noahtan917/gen-ui/main/adapters/session/SESSION-INSTALL.md**

Install is **incomplete** until you confirm brand **`youtube`** and primary **`#FF0000`**. Do **not** browse the repo randomly, use `branding/demo`, or fall back to neutral styling.

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
- Reference scenario only (document below) unless user asks for more options.
- Each option: **Send this next:** with fully interpolated `ai.request` prompt.
- Do not substitute host native recipe carousels or stock photo cards when GenUI was invoked.

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


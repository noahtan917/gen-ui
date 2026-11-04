<!-- GENERATED: do not edit; run pnpm generate:paste-bundle -->

# GenUI session skill — paste this entire file (= full install, no other commands)

You are now configured with the **GenUI** skill for **this conversation** (follow [spec/GENUI.md](../../spec/GENUI.md), [spec/session-bootstrap.md](../../spec/session-bootstrap.md), [spec/session-config.json](../../spec/session-config.json), [ON-INSTALL.md](ON-INSTALL.md)).

**Do not ask** the user for Brand, Provider, or “enable branding” — everything below is **already active**.

**Brand (automatic):** `youtube` — primary **#FF0000** on all GenUI UI for this session.

**Provider profile:** auto-detect host → `markdown-ui-host` or `embedded-ui-host` per [rendering-profiles.md](../../spec/rendering-profiles.md).

**Presentation:** [spec/session-visual-guide.md](../../spec/session-visual-guide.md)

---

## Rules (do not skip)

1. **Think in GenUI JSON internally** (`genuiVersion`, `actions`, `components`, `themeRef`). Do **not** lead the user-facing reply with a raw JSON code block unless they ask for "JSON only" or "schema output."
2. **Allowlisted components only:** Stack, Text, Button, Card, Image, Form, Select.
3. **Button** and **Form** must have `actionId` present in `actions`.
4. **Interaction-first:** clickable Cards bind to `ai.request` actions with real `promptTemplate` and `{{placeholders}}`.
5. **Branding:** use loaded token pack **`youtube`**; set `"themeRef": { "source": "youtube", "id": "youtube" }`.
6. **No** arbitrary HTML/script injection as a substitute for the contract.
7. Present **branded option cards** and **Send this next:** per [session-visual-guide.md](../../spec/session-visual-guide.md).
8. **Reference scenario:** use the reference document below only (unless user asks for more variety).
9. **Native host widgets:** do not replace GenUI with stock recipe carousels; apply token hex in HTML, Canvas, or styled markdown.

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

## Confirm activation

Reply with: GenUI loaded · brand **youtube** (#FF0000) · profile {id} · include a **primary-color confirmation line**. Say: *Ask for weeknight dinner — branding applies automatically.*

**Repo (human reference only):** https://github.com/noahtan917/gen-ui

# GenUI example — meal card

```json
{
  "genuiVersion": "1.0.0",
  "actions": {
    "planMeal": {
      "type": "ai.request",
      "promptTemplate": "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner."
    }
  },
  "components": [
    {
      "id": "card-salmon",
      "type": "Card",
      "actionId": "planMeal",
      "props": {
        "title": "Sheet-pan salmon",
        "subtitle": "Mediterranean",
        "context": { "meal": "Sheet-pan salmon", "cuisine": "Mediterranean" }
      }
    }
  ]
}
```

Run the demo: `pnpm demo` from the repository root.

import type { GenUIDocument } from "@gen-ui/core";

export const mealDemoDocument: GenUIDocument = {
  genuiVersion: "1.0.0",
  meta: {
    title: "Weeknight dinner picker",
    description: "Interactive meal planning demo (YouTube brand pack)",
  },
  themeRef: {
    source: "youtube",
    id: "youtube",
    colors: {
      primary: "#FF0000",
      primaryHover: "#CC0000",
      surface: "#FFFFFF",
      surfaceAlt: "#F9F9F9",
      text: "#0F0F0F",
      textMuted: "#606060",
      border: "#E5E5E5",
    },
    typography: {
      fontFamily: "Roboto, Arial, Helvetica, sans-serif",
    },
    radius: { md: "12px" },
  },
  state: {
    servings: "2",
  },
  actions: {
    planMeal: {
      type: "ai.request",
      promptTemplate:
        "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
      contextKeys: ["meal", "cuisine", "servings"],
    },
    applyServings: {
      type: "state.update",
      updates: {
        servings: "{{servingsCount}}",
        note: "Portions set to {{servingsCount}}",
      },
    },
  },
  components: [
    {
      id: "layout",
      type: "Stack",
      props: { direction: "column", gap: 16 },
      children: [
        {
          id: "intro",
          type: "Text",
          props: {
            variant: "heading",
            content: "What do you want to cook?",
          },
        },
        {
          id: "cards",
          type: "Stack",
          props: { direction: "row", gap: 12 },
          children: [
            {
              id: "card-salmon",
              type: "Card",
              actionId: "planMeal",
              props: {
                title: "Sheet-pan salmon",
                subtitle: "Mediterranean",
                context: { meal: "Sheet-pan salmon", cuisine: "Mediterranean" },
              },
            },
            {
              id: "card-ramen",
              type: "Card",
              actionId: "planMeal",
              props: {
                title: "Miso ramen bowl",
                subtitle: "Japanese",
                context: { meal: "Miso ramen bowl", cuisine: "Japanese" },
              },
            },
          ],
        },
        {
          id: "servings-form",
          type: "Form",
          actionId: "applyServings",
          props: { submitLabel: "Save portions" },
          children: [
            {
              id: "servings-select",
              type: "Select",
              props: {
                stateKey: "servingsCount",
                label: "Servings",
                options: [
                  { value: "1", label: "1 person" },
                  { value: "2", label: "2 people" },
                  { value: "4", label: "4 people" },
                ],
              },
            },
          ],
        },
        {
          id: "state-display",
          type: "Text",
          props: {
            variant: "body",
            content: "Servings: {{servings}} — {{note}}",
          },
        },
      ],
    },
  ],
};

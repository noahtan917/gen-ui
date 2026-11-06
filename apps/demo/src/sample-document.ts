import type { GenUIDocument } from "@gen-ui/core";

export const mealDemoDocument: GenUIDocument = {
  genuiVersion: "1.0.0",
  meta: {
    title: "Weeknight dinner picker",
    description: "Interactive meal planning demo (917V brand pack)",
  },
  themeRef: {
    source: "917v",
    id: "917v",
    colors: {
      primary: "#2F63D6",
      primaryHover: "#2551B6",
      primaryPressed: "#1A3A8C",
      onPrimary: "#FFFFFF",
      surface: "#F4F6F9",
      surfaceElevated: "#FFFFFF",
      text: "#0A0C11",
      textMuted: "#586173",
      border: "#D8DEE7",
      focus: "#2F63D6",
    },
    typography: {
      fontFamily: '"Instrument Sans", "Helvetica Neue", Arial, sans-serif',
      fontFamilyDisplay: '"Archivo", "Helvetica Neue", Arial, sans-serif',
    },
    radius: { sm: "4px", md: "6px" },
  },
  state: {
    servings: "2",
  },
  actions: {
    planMeal: {
      type: "ai.request",
      promptTemplate:
        "Help me cook {{meal}} ({{cuisine}}) for {{servings}} servings: ingredient list, steps, and total time for a weeknight dinner.",
      contextKeys: ["meal", "cuisine", "servings"],
    },
    applyServings: {
      type: "state.update",
      updates: {
        note: "Portions set to {{servings}}",
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
                stateKey: "servings",
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

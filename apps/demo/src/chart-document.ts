import type { GenUIDocument } from "@gen-ui/core";
import { mealDemoDocument } from "./sample-document.js";

/**
 * Sample seat comparison so the demo can draw a stacked bar chart.
 * Counts are illustrative, not a live election tally.
 */
export const chartDemoDocument: GenUIDocument = {
  genuiVersion: "1.0.0",
  meta: {
    title: "Sample seat chart",
    description: "Stacked bar chart with a chamber filter. Counts are sample data.",
  },
  themeRef: mealDemoDocument.themeRef,
  state: {
    chamber: "senate",
  },
  actions: {
    explainBar: {
      type: "ai.request",
      promptTemplate:
        "Explain the {{label}} bar on the sample {{chamber}} seat chart. These counts are sample data, not a live tally.",
      contextKeys: ["label", "chamber"],
    },
  },
  components: [
    {
      id: "layout",
      type: "Stack",
      props: { direction: "column", gap: 16 },
      children: [
        {
          id: "title",
          type: "Text",
          props: { variant: "heading", content: "Sample seat comparison" },
        },
        {
          id: "note",
          type: "Text",
          props: {
            variant: "body",
            content: "Switch chamber to redraw the bars. Counts are sample data, not a live tally.",
          },
        },
        {
          id: "chamber",
          type: "Select",
          props: {
            stateKey: "chamber",
            label: "Chamber",
            options: [
              { value: "senate", label: "Senate" },
              { value: "house", label: "House" },
            ],
          },
        },
        {
          id: "seats",
          type: "Chart",
          actionId: "explainBar",
          props: {
            chartType: "stacked-bar",
            ariaLabel: "Sample seat share before and after, by chamber",
            stateKey: "chamber",
            unit: "seats",
            series: [
              { key: "democrats", label: "Democrats", color: "#2F63D6" },
              { key: "republicans", label: "Republicans", color: "#DB6E4F" },
              { key: "other", label: "Uncalled or vacant", color: "#8EA1BD" },
            ],
            data: [
              { label: "Before", chamber: "senate", democrats: 47, republicans: 53, other: 0 },
              { label: "After", chamber: "senate", democrats: 54, republicans: 44, other: 2 },
              { label: "Before", chamber: "house", democrats: 220, republicans: 215, other: 0 },
              { label: "After", chamber: "house", democrats: 180, republicans: 200, other: 20 },
            ],
          },
        },
      ],
    },
  ],
};

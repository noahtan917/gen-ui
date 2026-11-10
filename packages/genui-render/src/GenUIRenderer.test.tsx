import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { GenUIDocument } from "@gen-ui/core";
import { GenUIRenderer } from "./GenUIRenderer.js";

const mealDoc: GenUIDocument = {
  genuiVersion: "1.0.0",
  actions: {
    planMeal: {
      type: "ai.request",
      promptTemplate:
        "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
    },
  },
  components: [
    {
      id: "card-salmon",
      type: "Card",
      actionId: "planMeal",
      props: { title: "Sheet-pan salmon", subtitle: "Mediterranean" },
    },
  ],
};

describe("GenUIRenderer", () => {
  it("dispatches AI request when card is clicked", async () => {
    const user = userEvent.setup();
    const onAIRequest = vi.fn();
    render(<GenUIRenderer document={mealDoc} onAIRequest={onAIRequest} />);

    await user.click(screen.getByRole("button", { name: /Sheet-pan salmon/i }));

    expect(onAIRequest).toHaveBeenCalledOnce();
    expect(onAIRequest.mock.calls[0][0].prompt).toContain("Sheet-pan salmon");
    expect(onAIRequest.mock.calls[0][0].prompt).toContain("Mediterranean");
  });

  it("filters a stacked bar chart from Select state and explains the clicked row", async () => {
    const user = userEvent.setup();
    const onAIRequest = vi.fn();
    const chartDoc: GenUIDocument = {
      genuiVersion: "1.0.0",
      state: { chamber: "senate" },
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
          props: { direction: "column", gap: 12 },
          children: [
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
                ariaLabel: "Sample seat share before and after",
                stateKey: "chamber",
                unit: "seats",
                series: [
                  { key: "democrats", label: "Democrats" },
                  { key: "republicans", label: "Republicans" },
                ],
                data: [
                  { label: "Before", chamber: "senate", democrats: 47, republicans: 53 },
                  { label: "After", chamber: "senate", democrats: 54, republicans: 44 },
                  { label: "Before", chamber: "house", democrats: 213, republicans: 220 },
                  { label: "After", chamber: "house", democrats: 214, republicans: 219 },
                ],
              },
            },
          ],
        },
      ],
    };
    render(<GenUIRenderer document={chartDoc} onAIRequest={onAIRequest} />);

    expect(screen.getByRole("group", { name: /sample seat share/i })).toBeTruthy();
    expect(screen.getByText("100 seats")).toBeTruthy();
    expect(screen.getByText("98 seats")).toBeTruthy();

    await user.selectOptions(screen.getByLabelText("Chamber"), "house");
    expect(screen.getAllByText("433 seats")).toHaveLength(2);
    expect(screen.queryByText("100 seats")).toBeNull();

    await user.click(screen.getByRole("button", { name: /Before/i }));
    expect(onAIRequest).toHaveBeenCalledOnce();
    expect(onAIRequest.mock.calls[0][0].context.label).toBe("Before");
    expect(onAIRequest.mock.calls[0][0].prompt).toContain("house");
  });

  it("drops a series color that is not in the design system", () => {
    const chartDoc: GenUIDocument = {
      genuiVersion: "1.0.0",
      actions: {},
      components: [
        {
          id: "bars",
          type: "Chart",
          props: {
            chartType: "bar",
            ariaLabel: "Brand colors only",
            series: [
              { key: "a", label: "Allowed", color: "#2f63d6" },
              { key: "b", label: "Requested", color: "#FF0000" },
            ],
            data: [{ label: "Now", a: 1, b: 2 }],
          },
        },
      ],
    };
    const { container } = render(<GenUIRenderer document={chartDoc} />);
    const paints = [...container.querySelectorAll(".genui-chart__swatch")].map((node) =>
      (node.getAttribute("style") ?? "").replace(/\s/g, "").toLowerCase(),
    );
    expect(paints[0]).toMatch(/#2f63d6|rgb\(47,99,214\)/);
    expect(paints[1]).toMatch(/#a8c0f4|rgb\(168,192,244\)/);
    expect(paints[1]).not.toMatch(/#ff0000|rgb\(255,0,0\)/);
  });

  it("renders fallback for unknown type", () => {
    const badDoc = {
      ...mealDoc,
      components: [
        {
          id: "x",
          type: "UnknownWidget" as "Card",
          props: {},
        },
      ],
    };
    render(<GenUIRenderer document={badDoc as GenUIDocument} />);
    expect(screen.getByRole("alert").textContent).toContain("Unsupported");
  });
});

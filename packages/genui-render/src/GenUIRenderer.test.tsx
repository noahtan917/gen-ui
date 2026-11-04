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

import { describe, expect, it } from "vitest";
import { resolveAIRequest, buildInteractEvent, validateGenUIDocument } from "./index.js";

const validDoc = {
  genuiVersion: "1.0.0",
  actions: {
    planMeal: {
      type: "ai.request" as const,
      promptTemplate:
        "Help me cook {{meal}} ({{cuisine}}): ingredient list, steps, and total time for a weeknight dinner.",
      contextKeys: ["meal", "cuisine"],
    },
  },
  components: [
    {
      id: "card-salmon",
      type: "Card" as const,
      actionId: "planMeal",
      props: {
        title: "Sheet-pan salmon",
        subtitle: "Mediterranean",
      },
    },
  ],
};

describe("validateGenUIDocument", () => {
  it("accepts valid document", () => {
    const result = validateGenUIDocument(validDoc);
    expect(result.success).toBe(true);
    expect(result.document?.genuiVersion).toBe("1.0.0");
  });

  it("rejects a Chart without series", () => {
    const result = validateGenUIDocument({
      ...validDoc,
      components: [{ id: "seats", type: "Chart", props: { ariaLabel: "Seats", data: [] } }],
    });
    expect(result.success).toBe(false);
    expect(result.errors.some((error) => error.message.includes("series"))).toBe(true);
  });

  it("rejects button without actionId", () => {
    const result = validateGenUIDocument({
      ...validDoc,
      components: [
        {
          id: "btn",
          type: "Button",
          props: { label: "Go" },
        },
      ],
    });
    expect(result.success).toBe(false);
    expect(result.retryHints.length).toBeGreaterThan(0);
  });
});

describe("resolveAIRequest", () => {
  it("builds contextual prompt for meal card", () => {
    const doc = validateGenUIDocument(validDoc).document!;
    const event = buildInteractEvent("planMeal", "card-salmon", {
      meal: "Sheet-pan salmon",
      cuisine: "Mediterranean",
    });
    const payload = resolveAIRequest(doc, event);
    expect(payload?.prompt).toContain("Sheet-pan salmon");
    expect(payload?.prompt).toContain("Mediterranean");
  });
});

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateGenUIDocument } from "./index.js";

const repoRoot = join(import.meta.dirname, "..", "..", "..");

describe("demo brand + session example", () => {
  it("branding/demo/tokens.json has required keys", () => {
    const tokens = JSON.parse(
      readFileSync(join(repoRoot, "branding/demo/tokens.json"), "utf8"),
    ) as Record<string, unknown>;
    expect(tokens.id).toBe("demo");
    expect(tokens.colors).toBeTruthy();
    expect(tokens.typography).toBeTruthy();
  });

  it("meal-planning session example validates", () => {
    const doc = JSON.parse(
      readFileSync(
        join(repoRoot, "adapters/session/examples/meal-planning.document.json"),
        "utf8",
      ),
    );
    const result = validateGenUIDocument(doc);
    expect(result.success).toBe(true);
  });
});

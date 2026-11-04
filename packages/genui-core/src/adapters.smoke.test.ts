import { execSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const repoRoot = join(import.meta.dirname, "..", "..", "..");

describe("adapter path smoke", () => {
  it("check-adapter-paths.mjs passes", () => {
    execSync("node scripts/check-adapter-paths.mjs", { cwd: repoRoot, stdio: "pipe" });
    expect(true).toBe(true);
  });
});

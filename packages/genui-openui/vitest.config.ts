import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    env: {
      // Keep OpenUI's dev-only devtools auto-mount out of tests.
      NODE_ENV: "test",
    },
  },
});

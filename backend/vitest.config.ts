import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
    exclude: ["node_modules", "dist"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules", "dist", "**/*.test.ts", "vitest.config.ts"],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    // Load .env.test for test environment
    env: {
      NODE_ENV: "test",
    },
    setupFiles: ["./src/test-setup.ts"],
  },
});

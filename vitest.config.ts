import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.contract.test.ts", "src/**/*.smoke.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/task-service.ts", "src/task-store.ts"],
      thresholds: {
        "src/task-service.ts": {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
    },
  },
});

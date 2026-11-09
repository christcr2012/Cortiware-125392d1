import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "packages/*/src/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "apps/*/src/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      // Unit suites are split by runner: the describe-style federation suites run
      // under Vitest; the run()-style suites in tests/unit run under the custom
      // runner (npm run test:unit, tests/unit/run.ts). Scopes are disjoint by design.
      "tests/unit/federation.hmac.test.ts",
      "tests/unit/federation.idempotency.test.ts",
      "tests/unit/federation.ratelimit.test.ts",
      "tests/unit/federation.rbac.test.ts",
    ],
    exclude: [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".next/**",
      "tests/e2e/**", // E2E tests use Playwright, not vitest
      "tests/e2e-playwright/**", // Playwright tests
      "tests/acceptance/**", // Separate test harness
      "tests/integration/**", // May use different runner
    ],
    reporters: ["default"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "lcov"],
      reportsDirectory: "./coverage",
      include: [
        "packages/*/src/**/*.ts",
        "packages/*/src/**/*.tsx",
        "apps/*/src/**/*.ts",
        "apps/*/src/**/*.tsx",
      ],
      exclude: ["**/*.d.ts", "**/*.config.*", "**/dist/**", "**/.next/**"],
    },
    testTimeout: 15000,
    hookTimeout: 15000,
  },
  resolve: {
    alias: [
      // Provider-portal sources use the "@/..." alias internally (their tsconfig
      // maps it to provider src); the Vitest scope is provider/federation suites.
      { find: /^@\/(.*)$/, replacement: resolve(__dirname, "./apps/provider-portal/src") + "/$1" },
      { find: "@tenant", replacement: resolve(__dirname, "./apps/tenant-app/src") },
      { find: "@provider", replacement: resolve(__dirname, "./apps/provider-portal/src") },
    ],
  },
});

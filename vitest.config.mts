import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
      exclude: [
        "content-collections.ts",
        "next.config.ts",
        "postcss.config.mjs",
        "tailwind.config.ts",
        "playwright.config.ts",
        ".next/**",
        "node_modules/**",
        "public/**",
        "tests/**",
        "lib/utils.ts",
        "app/**",
        "components/ui/ArticleGrid.tsx",
        "eslint.config.mjs",
      ],
      include: ["components/**/*.tsx", "components/**/*.ts"],
    },
    include: [
      "tests/unit/**/*.{test,spec}.{ts,tsx}",
      "src/features/**/*.{test,spec}.{ts,tsx}",
    ],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "content-collections": fileURLToPath(
        new URL("./.content-collections/generated", import.meta.url),
      ),
    },
  },
});

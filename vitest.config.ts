import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

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
        lines: 96,
        functions: 96,
        branches: 85,
        statements: 96,
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
        "lib/utils.ts", // Utility files often excluded or tested separately
        "app/**", // We are focusing on components unit tests as per plan
        "components/ui/ArticleGrid.tsx", // Often just a grid wrapper, maybe low value? We will see.
        "eslint.config.mjs",
      ],
      include: ["components/**/*.tsx", "components/**/*.ts"],
    },
    include: [
      "tests/unit/**/*.{test,spec}.{ts,tsx}",
      "src/features/**/*.{test,spec}.{ts,tsx}",
    ],
    alias: {
      "@": path.resolve(__dirname, "./"),
      "content-collections": path.resolve(
        __dirname,
        "./.content-collections/generated",
      ),
    },
  },
});

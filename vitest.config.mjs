import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    exclude: [
      "node_modules/**",
      "functions/**",
      "scripts/**",
      "e2e/**/*.{js,jsx}",
      "playwright.config.js",
      "**/tests-examples/**",
      "dist",
      ".idea",
      ".git",
      ".cache",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,jsx}"],
      exclude: ["node_modules/", "src/**/*.test.{js,jsx}"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

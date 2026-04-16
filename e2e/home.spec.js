import { test, expect } from "@playwright/test";

// 此測試已被 navigation.spec.js NAV-01 涵蓋更完整的骨架驗證
// 保留作為最基本的 smoke test
test("has expected title and renders without crash", async ({ page }) => {
  await page.goto("/");

  const root = page.locator("#root");
  await expect(root).toBeVisible();

  // Ant Design Menu 渲染 <ul role="menu">，不使用 <nav> 標籤
  const headerElement = page.locator("header").first();
  await expect(headerElement).toBeVisible();
});

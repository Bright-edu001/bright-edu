import { test, expect } from "@playwright/test";
import { waitForPageReady } from "./fixtures.js";

test.describe("部落格功能 E2E", () => {
  // BLOG-01：部落格列表載入文章卡片
  test("BLOG-01：部落格列表載入文章卡片", async ({ page }) => {
    await page.goto("/blog");
    await waitForPageReady(page);

    // 至少 1 篇文章連結可見
    const articles = page.locator("a[href*='/blog/']");
    await articles.first().waitFor({ state: "visible", timeout: 10000 });

    const count = await articles.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  // BLOG-02：點擊文章卡片進入詳情頁
  test("BLOG-02：點擊文章卡片進入詳情頁", async ({ page }) => {
    await page.goto("/blog");
    const firstLink = page.locator("a[href*='/blog/']").first();
    await firstLink.waitFor({ state: "visible", timeout: 10000 });
    const href = await firstLink.getAttribute("href");
    expect(href).toBeTruthy();

    await firstLink.click();

    // URL 為 /blog/{slug} 格式
    await page.waitForURL("**/blog/**", { timeout: 8000 });
    expect(page.url()).toMatch(/\/blog\/.+/);

    // 詳情頁區塊可見
    const detailPage = page.locator(".blog-detail-page");
    await expect(detailPage).toBeVisible({ timeout: 8000 });
  });

  // BLOG-03：部落格搜尋功能
  test("BLOG-03：部落格搜尋功能", async ({ page }) => {
    await page.goto("/blog");
    await waitForPageReady(page);

    // 進入有搜尋框的頁面（搜尋框在側邊欄，先到搜尋結果頁）
    await page.goto("/blog/search/mba");

    const searchInput = page.locator(
      ".blog-detail-searchbar input[type='text']",
    );
    await searchInput.waitFor({ state: "visible", timeout: 8000 });

    // 清除並輸入新關鍵字
    await searchInput.fill("mba");
    await searchInput.press("Enter");

    // URL 應包含搜尋關鍵字
    await page.waitForURL("**/blog/search/**", { timeout: 8000 });
    expect(page.url()).toContain("/blog/search/");

    // 主要內容區可見
    const mainrow = page.locator(".blog-detail-mainrow");
    await expect(mainrow).toBeVisible({ timeout: 8000 });
  });

  // BLOG-04：部落格分類篩選
  test("BLOG-04：部落格分類篩選", async ({ page }) => {
    // 到搜尋結果頁（有側邊欄分類按鈕）
    await page.goto("/blog/search/mba");
    await page
      .locator(".blog-detail-mainrow")
      .waitFor({ state: "visible", timeout: 8000 });

    // 點擊「招生活動」分類按鈕
    const categoryBtn = page
      .locator(".blog-detail-category-btn")
      .filter({ hasText: "招生活動" });
    await categoryBtn.click();

    // URL 應包含 category=enrollment
    await page.waitForURL("**category=enrollment**", { timeout: 8000 });
    expect(page.url()).toContain("category=enrollment");
  });

  // BLOG-05：搜尋空結果不崩潰
  test("BLOG-05：搜尋空結果不崩潰", async ({ page }) => {
    await page.goto("/blog/search/xyznonexistent999");

    // 頁面不白屏
    await page.locator("#root").waitFor({ state: "visible", timeout: 10000 });
    const rootContent = await page.locator("#root").innerHTML();
    expect(rootContent.length).toBeGreaterThan(0);
  });
});

import { test, expect } from "@playwright/test";
import { waitForPageReady, urlContainsChinese } from "./fixtures.js";

test.describe("核心導航 E2E", () => {
  // NAV-01：首頁載入顯示完整骨架
  test("NAV-01：首頁載入顯示完整骨架", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);

    // Footer 可見
    const footer = page.locator("footer, .footer").first();
    await expect(footer).toBeVisible({ timeout: 8000 });

    // 主要標題或 Hero 區塊存在
    const heading = page.locator("h1, .hero, .home-hero").first();
    await expect(heading).toBeVisible({ timeout: 8000 });
  });

  // NAV-04：Header「活動與文章」連結導航至 /blog
  test("NAV-04：Header 活動與文章連結導航至 /blog", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile-chrome",
      "mobile 導航由 NAV-06 覆蓋",
    );

    await page.goto("/");
    await waitForPageReady(page);

    const blogLink = page
      .locator("header a, .header-nav a")
      .getByText("活動與文章");
    await blogLink.click();

    await page.waitForURL("**/blog", { timeout: 8000 });
    expect(page.url()).toContain("/blog");
  });

  // NAV-05：Header「聯絡我們」連結導航至 /聯絡我們
  test("NAV-05：Header 聯絡我們連結導航至 /聯絡我們", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile-chrome",
      "mobile 導航由 NAV-06 覆蓋",
    );

    await page.goto("/");
    await waitForPageReady(page);

    const contactLink = page
      .locator("header a, .header-nav a")
      .getByText("聯絡我們");
    await contactLink.click();

    await page.waitForURL("**/%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91", {
      timeout: 8000,
    });
    expect(urlContainsChinese(page.url(), "聯絡我們")).toBe(true);

    // 聯絡表單可見
    const form = page.locator(".application-form");
    await expect(form).toBeVisible({ timeout: 8000 });
  });
});

// NAV-02 & NAV-03：Desktop-only 多層選單 hover 測試
// Ant Design <Menu mode="horizontal"> 的子選單需要 hover 觸發
test.describe("Header 子選單導航（Desktop only）", () => {
  // NAV-02：UIC 學校介紹
  test("NAV-02：Header 導航至 UIC 學校介紹", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile-chrome",
      "跳過 mobile viewport",
    );

    await page.goto("/");
    await waitForPageReady(page);

    // 第一層：Hover「UIC商學院碩士」
    const uicMenu = page
      .locator(".ant-menu-submenu-title")
      .filter({ hasText: "UIC商學院碩士" });
    await uicMenu.first().hover();

    // 第二層：Hover「UIC 伊利諾大學芝加哥分校」展開子項
    const uicSchool = page
      .locator(".ant-menu-submenu-popup .ant-menu-submenu-title")
      .filter({ hasText: "UIC 伊利諾大學芝加哥分校" });
    await uicSchool.first().waitFor({ state: "visible", timeout: 5000 });
    await uicSchool.first().hover();

    // 點擊「學校介紹」
    const aboutLink = page
      .locator(".ant-menu-submenu-popup a")
      .filter({ hasText: /^學校介紹$/ });
    await aboutLink.first().waitFor({ state: "visible", timeout: 5000 });
    await aboutLink.first().click();

    await page.waitForURL(
      (url) =>
        decodeURIComponent(url.pathname).includes("伊利諾大學芝加哥分校"),
      { timeout: 8000 },
    );
    expect(urlContainsChinese(page.url(), "伊利諾大學芝加哥分校")).toBe(true);
    await expect(page.locator("#root")).toBeVisible();
  });

  // NAV-03：MSU 學校介紹
  test("NAV-03：Header 導航至 MSU 學校介紹", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile-chrome",
      "跳過 mobile viewport",
    );

    await page.goto("/");
    await waitForPageReady(page);

    // 第一層：Hover「MSU金融碩士」
    const msuMenu = page
      .locator(".ant-menu-submenu-title")
      .filter({ hasText: "MSU金融碩士" });
    await msuMenu.first().hover();

    // 第二層：Hover「MSU密西根州立大學」展開子項
    const msuSchool = page
      .locator(".ant-menu-submenu-popup .ant-menu-submenu-title")
      .filter({ hasText: "MSU密西根州立大學" });
    await msuSchool.first().waitFor({ state: "visible", timeout: 5000 });
    await msuSchool.first().hover();

    // 點擊「學校介紹」
    const aboutLink = page
      .locator(".ant-menu-submenu-popup a")
      .filter({ hasText: /^學校介紹$/ });
    await aboutLink.first().waitFor({ state: "visible", timeout: 5000 });
    await aboutLink.first().click();

    await page.waitForURL(
      (url) => decodeURIComponent(url.pathname).includes("密西根州立大學"),
      { timeout: 8000 },
    );
    expect(urlContainsChinese(page.url(), "密西根州立大學")).toBe(true);
    await expect(page.locator("#root")).toBeVisible();
  });
});

// NAV-06：手機版 Drawer 選單（Mobile only）
test.describe("手機版 Drawer 選單", () => {
  test("NAV-06：手機版 Drawer 選單開關與導航", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile-chrome",
      "僅在 mobile viewport 執行",
    );

    await page.goto("/");
    await expect(page.locator("#root")).toBeVisible({ timeout: 10000 });

    // 點擊漢堡選單按鈕
    const hamburger = page.locator(".mobile-nav-toggle");
    await hamburger.click();

    // Drawer 打開
    const drawer = page.locator(".ant-drawer");
    await expect(drawer).toBeVisible({ timeout: 5000 });

    // 選單項目可見
    await expect(drawer.getByText("首頁")).toBeVisible();
    await expect(drawer.getByText("UIC商學院碩士")).toBeVisible();

    // 點擊「聯絡我們」
    const contactLink = drawer.locator("a").filter({ hasText: "聯絡我們" });
    await contactLink.click();

    // 驗證導航成功
    await page.waitForURL("**/%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91", {
      timeout: 8000,
    });
    expect(urlContainsChinese(page.url(), "聯絡我們")).toBe(true);

    // 聯絡表單可見
    const form = page.locator(".application-form");
    await expect(form).toBeVisible({ timeout: 8000 });
  });
});

import { test, expect } from "@playwright/test";
import { waitForPageReady } from "./fixtures.js";

// CAMPUS-01：UIC 核心頁面
const uicPages = [
  "/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹",
  "/伊利諾大學芝加哥分校/MBA-Programs",
  "/伊利諾大學芝加哥分校/MS-Programs/課程介紹",
  "/伊利諾大學芝加哥分校/UIC商學院碩士/排名與獎項",
  "/伊利諾大學芝加哥分校/UIC商學院碩士/常見問題",
];

// CAMPUS-02：MSU 核心頁面
const msuPages = [
  "/密西根州立大學/MSU商學院/學校介紹",
  "/密西根州立大學/MSU商學院/排名與獎項",
  "/密西根州立大學/金融碩士課程/MSF金融碩士",
  "/密西根州立大學/金融碩士課程/申請資訊",
];

test.describe("校園頁面 Smoke Test — UIC", () => {
  for (const path of uicPages) {
    test(`CAMPUS-01：${path} 可正常載入`, async ({ page }) => {
      await page.goto(encodeURI(path));
      await waitForPageReady(page);

      // 確認路由正確（未被重導向至首頁或 404）
      expect(decodeURIComponent(page.url())).toContain(path.split("/")[1]);

      // 頁面內有標題或主要內容區塊
      const content = page.locator("h1, h2, .hero, .section-container").first();
      await expect(content).toBeVisible({ timeout: 8000 });

      // Footer 可見
      const footer = page.locator("footer, .footer").first();
      await expect(footer).toBeVisible({ timeout: 8000 });
    });
  }
});

test.describe("校園頁面 Smoke Test — MSU", () => {
  for (const path of msuPages) {
    test(`CAMPUS-02：${path} 可正常載入`, async ({ page }) => {
      await page.goto(encodeURI(path));
      await waitForPageReady(page);

      // 確認路由正確（未被重導向至首頁或 404）
      expect(decodeURIComponent(page.url())).toContain(path.split("/")[1]);

      // 頁面內有標題或主要內容區塊
      const content = page.locator("h1, h2, .hero, .section-container").first();
      await expect(content).toBeVisible({ timeout: 8000 });

      // Footer 可見
      const footer = page.locator("footer, .footer").first();
      await expect(footer).toBeVisible({ timeout: 8000 });
    });
  }
});

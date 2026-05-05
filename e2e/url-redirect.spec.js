import { test, expect } from "@playwright/test";
import { urlContainsChinese } from "./fixtures.js";

// REDIR-01：UIC 舊 URL 重導向
const uicRedirects = [
  { from: "/uic-business-school", expectedFragment: "伊利諾大學芝加哥分校" },
  {
    from: "/uic-business-school/uic/about-uic",
    expectedFragment: "學校介紹",
  },
  { from: "/uic-business-school/mba/areas", expectedFragment: "五大領域" },
  { from: "/uic-business-school/uic/faq", expectedFragment: "常見問題" },
  {
    from: "/uic-business-school/mba/application",
    expectedFragment: "申請資訊",
  },
  {
    from: "/uic-business-school/ms/programs",
    expectedFragment: "MS-Programs",
  },
  {
    from: "/uic-business-school/ms",
    expectedFragment: "MS-Programs",
  },
];

// REDIR-02：MSU 舊 URL 重導向
const msuRedirects = [
  { from: "/msu-business-school", expectedFragment: "密西根州立大學" },
  {
    from: "/msu-business-school/msu/about-msu",
    expectedFragment: "MSU商學院/學校介紹",
  },
  {
    from: "/msu-business-school/msf/application",
    expectedFragment: "申請資訊",
  },
  {
    from: "/msu-business-school/msu/east-lansing",
    expectedFragment: "東蘭辛市",
  },
  {
    from: "/msu-business-school/msu/career-resources",
    expectedFragment: "職涯資源",
  },
];

// REDIR-02B：通用英文 fallback URL 重導向
const commonRedirects = [{ from: "/contact", expectedFragment: "聯絡我們" }];

test.describe("URL Redirect — UIC 舊 URL", () => {
  for (const { from, expectedFragment } of uicRedirects) {
    test(`REDIR-01：${from} → 包含「${expectedFragment}」`, async ({
      page,
    }) => {
      await page.goto(from);

      // 等待 SPA client-side redirect 完成（URL 不再是原始路徑）
      await page.waitForURL((url) => !url.pathname.startsWith(from), {
        timeout: 10000,
      });
      await page.locator("#root").waitFor({ state: "visible", timeout: 10000 });

      const finalUrl = page.url();
      expect(urlContainsChinese(finalUrl, expectedFragment)).toBe(true);
    });
  }
});

test.describe("URL Redirect — MSU 舊 URL", () => {
  for (const { from, expectedFragment } of msuRedirects) {
    test(`REDIR-02：${from} → 包含「${expectedFragment}」`, async ({
      page,
    }) => {
      await page.goto(from);

      // 等待 SPA client-side redirect 完成
      await page.waitForURL((url) => !url.pathname.startsWith(from), {
        timeout: 10000,
      });
      await page.locator("#root").waitFor({ state: "visible", timeout: 10000 });

      const finalUrl = page.url();
      expect(urlContainsChinese(finalUrl, expectedFragment)).toBe(true);
    });
  }
});

test.describe("URL Redirect — 通用英文 fallback URL", () => {
  for (const { from, expectedFragment } of commonRedirects) {
    test(`REDIR-02B：${from} → 包含「${expectedFragment}」`, async ({
      page,
    }) => {
      await page.goto(from);

      // 等待 SPA client-side redirect 完成
      await page.waitForURL((url) => !url.pathname.startsWith(from), {
        timeout: 10000,
      });
      await page.locator("#root").waitFor({ state: "visible", timeout: 10000 });

      const finalUrl = page.url();
      expect(urlContainsChinese(finalUrl, expectedFragment)).toBe(true);
    });
  }
});

test.describe("URL Redirect — 404 不崩潰", () => {
  // REDIR-03：不存在的路由不崩潰
  test("REDIR-03：不存在的路由不會導致白屏", async ({ page }) => {
    // 收集 console error
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/this-does-not-exist");
    await page.locator("#root").waitFor({ state: "visible", timeout: 10000 });

    // 頁面不白屏
    const rootContent = await page.locator("#root").innerHTML();
    expect(rootContent.length).toBeGreaterThan(0);

    // 沒有致命的 JS 崩潰（允許 React warnings，但不允許 uncaught 錯誤）
    const fatalErrors = consoleErrors.filter(
      (e) => e.includes("Uncaught") || e.includes("ChunkLoadError"),
    );
    expect(fatalErrors).toHaveLength(0);
  });
});

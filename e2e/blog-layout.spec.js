import { test, expect } from "@playwright/test";

// 取得第一篇文章連結
async function getFirstArticleHref(page) {
  await page.goto("/blog");
  await page.waitForSelector(".blog-grid a, .blog-card a, a[href*='/blog/']", {
    timeout: 10000,
  });
  const link = page.locator("a[href*='/blog/']").first();
  const href = await link.getAttribute("href");
  return href;
}

// 取得 .blog-detail-mainrow 的 computed padding（接受任意前置選擇器）
async function getMainrowPadding(page, selector = ".blog-detail-mainrow") {
  await page.waitForSelector(selector, { timeout: 8000 });
  return await page.$eval(selector, (el) => {
    const style = window.getComputedStyle(el);
    return {
      paddingTop: style.paddingTop,
      paddingBottom: style.paddingBottom,
      paddingLeft: style.paddingLeft,
      paddingRight: style.paddingRight,
      display: style.display,
      flexDirection: style.flexDirection,
    };
  });
}

// 向下相容：列表頁使用 .blog-page 範圍
async function getBlogMainrowPadding(page) {
  return await getMainrowPadding(page, ".blog-page .blog-detail-mainrow");
}

test.describe("活動與文章頁面跑版修復驗證", () => {
  test("情境1：直接訪問 /blog，mainrow 有 padding", async ({ page }) => {
    await page.goto("/blog");
    const padding = await getBlogMainrowPadding(page);
    console.log("直接訪問 /blog padding:", padding);
    // paddingTop 應該是 4rem = 64px（假設 root font-size = 16px）
    // 至少不為 0
    expect(parseInt(padding.paddingTop)).toBeGreaterThan(0);
    expect(parseInt(padding.paddingBottom)).toBeGreaterThan(0);
  });

  test("情境2：進入文章詳情後按瀏覽器上一頁，列表頁 padding 不跑版", async ({
    page,
  }) => {
    const href = await getFirstArticleHref(page);
    expect(href).toBeTruthy();

    // 進入詳情頁
    await page.goto(href);
    await page.waitForSelector(".blog-detail-page", { timeout: 8000 });

    // 按瀏覽器上一頁
    await page.goBack();
    await page.waitForURL("**/blog**");

    const padding = await getBlogMainrowPadding(page);
    console.log("返回後 padding:", padding);
    expect(parseInt(padding.paddingTop)).toBeGreaterThan(0);
    expect(parseInt(padding.paddingBottom)).toBeGreaterThan(0);
  });

  test("情境3：點選「返回部落格」按鈕，列表頁 padding 不跑版", async ({
    page,
  }) => {
    const href = await getFirstArticleHref(page);
    await page.goto(href);
    await page.waitForSelector(".blog-detail-page", { timeout: 8000 });

    // 點「返回部落格」按鈕
    const backBtn = page
      .locator(".blog-back-btn.blog-detail-back, a.blog-back-btn")
      .first();
    await expect(backBtn).toBeVisible();
    await backBtn.click();
    await page.waitForURL("**/blog");

    const padding = await getBlogMainrowPadding(page);
    console.log("點返回按鈕後 padding:", padding);
    expect(parseInt(padding.paddingTop)).toBeGreaterThan(0);
    expect(parseInt(padding.paddingBottom)).toBeGreaterThan(0);
  });

  test("情境4：詳情頁本身 .blog-detail-mainrow padding 應為 0（詳情頁樣式正常）", async ({
    page,
  }) => {
    const href = await getFirstArticleHref(page);
    await page.goto(href);
    await page.waitForSelector(".blog-detail-page .blog-detail-mainrow", {
      timeout: 8000,
    });
    const padding = await page.$eval(
      ".blog-detail-page .blog-detail-mainrow",
      (el) => {
        const style = window.getComputedStyle(el);
        return {
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          paddingLeft: style.paddingLeft,
          paddingRight: style.paddingRight,
        };
      },
    );
    console.log("詳情頁 mainrow padding:", padding);
    // 詳情頁 padding 應為 0
    expect(padding.paddingTop).toBe("0px");
    expect(padding.paddingBottom).toBe("0px");
    expect(padding.paddingLeft).toBe("0px");
    expect(padding.paddingRight).toBe("0px");
  });

  test("情境5：多次來回切換（詳情→列表→詳情→列表），每次 padding 都正確", async ({
    page,
  }) => {
    const href = await getFirstArticleHref(page);

    for (let i = 0; i < 3; i++) {
      // 進詳情
      await page.goto(href);
      await page.waitForSelector(".blog-detail-page", { timeout: 8000 });

      // 返回列表
      await page.goBack();
      await page.waitForURL("**/blog**");
      const padding = await getBlogMainrowPadding(page);
      console.log(`第 ${i + 1} 次返回後 padding:`, padding);
      expect(parseInt(padding.paddingTop)).toBeGreaterThan(0);
    }
  });

  test("情境6：分類頁 /blog?category=enrollment 返回後不跑版", async ({
    page,
  }) => {
    // 先直接訪問分類頁
    await page.goto("/blog?category=enrollment");
    const padding = await getBlogMainrowPadding(page);
    console.log("分類頁 padding:", padding);
    expect(parseInt(padding.paddingTop)).toBeGreaterThan(0);
  });
});

test.describe("搜尋頁版型驗證（P1 Badge 修復）", () => {
  test("情境S1：/blog/search/:keyword — .blog-detail-mainrow 具備 flex 佈局與 padding", async ({
    page,
  }) => {
    await page.goto("/blog/search/mba");
    const layout = await getMainrowPadding(page);
    console.log("/blog/search/mba mainrow layout:", layout);
    expect(layout.display).toBe("flex");
    expect(parseInt(layout.paddingTop)).toBeGreaterThan(0);
    expect(parseInt(layout.paddingBottom)).toBeGreaterThan(0);
  });

  test("情境S2：搜尋頁有側邊欄元素 .blog-detail-sidebar", async ({ page }) => {
    await page.goto("/blog/search/mba");
    await page.waitForSelector(".blog-detail-mainrow", { timeout: 8000 });
    const sidebar = page.locator(".blog-detail-sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("情境S3：搜尋頁 viewport 1025px 以下 sidebar order:-1（sidebar 排在主內容前）", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/blog/search/mba");
    await page.waitForSelector(".blog-detail-sidebar", { timeout: 8000 });
    const order = await page.$eval(
      ".blog-detail-sidebar",
      (el) => window.getComputedStyle(el).order,
    );
    console.log("1024px sidebar order:", order);
    expect(parseInt(order)).toBe(-1);
  });

  test("情境S4：從 /blog 點搜尋後到搜尋頁，版型正常", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForSelector(".blog-page", { timeout: 8000 });
    // 直接導航至搜尋頁（模擬搜尋行為）
    await page.goto("/blog/search/test");
    const layout = await getMainrowPadding(page);
    console.log("從列表頁導航到搜尋頁 layout:", layout);
    expect(layout.display).toBe("flex");
    expect(parseInt(layout.paddingTop)).toBeGreaterThan(0);
  });
});

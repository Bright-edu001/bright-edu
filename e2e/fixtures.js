// e2e/fixtures.js — 共用 E2E 測試輔助函式

/**
 * 等待頁面基礎骨架載入完成（#root + nav 可見）
 */
export async function waitForPageReady(page) {
  await page.locator("#root").waitFor({ state: "visible", timeout: 10000 });
  // Ant Design Menu 渲染 <ul role="menu">，不使用 <nav> 標籤
  await page
    .locator("header")
    .first()
    .waitFor({ state: "visible", timeout: 10000 });
}

/**
 * 取得第一篇部落格文章的 href
 * @returns {Promise<string>}
 */
export async function getFirstArticleHref(page) {
  await page.goto("/blog");
  const link = page.locator("a[href*='/blog/']").first();
  await link.waitFor({ state: "visible", timeout: 10000 });
  return await link.getAttribute("href");
}

/**
 * 取得指定選擇器元素的 computed padding / display / flexDirection
 * 使用 Locator API（非 page.$eval）
 */
export async function getMainrowPadding(
  page,
  selector = ".blog-detail-mainrow",
) {
  const element = page.locator(selector);
  await element.waitFor({ state: "visible", timeout: 8000 });
  return await element.evaluate((el) => {
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

/**
 * 取得列表頁 .blog-page .blog-detail-mainrow 的 padding
 */
export async function getBlogMainrowPadding(page) {
  return await getMainrowPadding(page, ".blog-page .blog-detail-mainrow");
}

/**
 * 解碼 URL 後比對是否包含指定中文片段
 */
export function urlContainsChinese(url, fragment) {
  return decodeURIComponent(url).includes(fragment);
}

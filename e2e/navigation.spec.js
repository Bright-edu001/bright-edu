import { test, expect } from "@playwright/test";
import { waitForPageReady, urlContainsChinese } from "./fixtures.js";

const DESKTOP_VIEWPORT = { width: 1280, height: 720 };
const UIC_ABOUT_PATH = "/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹";
const MSU_ABOUT_PATH = "/密西根州立大學/MSU商學院/學校介紹";
const CONTACT_PATH = "/聯絡我們";

const currentPathname = (page) => decodeURIComponent(new URL(page.url()).pathname);

test.describe("Navigation E2E", () => {
  test("NAV-01: homepage renders header and footer", async ({ page }) => {
    await page.goto("/");
    await waitForPageReady(page);

    await expect(page.locator("header").first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator("footer, .footer").first()).toBeVisible({
      timeout: 8000,
    });
    await expect(page.locator("h1, .hero, .home-hero").first()).toBeVisible({
      timeout: 8000,
    });
  });

  test("NAV-04: header blog link navigates to /blog", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile-chrome", "Covered by mobile flow");
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto("/");
    await waitForPageReady(page);

    const header = page.locator("header").first();
    const blogLink = header.locator('a[href="/blog"]').first();
    await blogLink.click();

    await page.waitForURL("**/blog", { timeout: 8000 });
    expect(currentPathname(page)).toBe("/blog");
  });

  test("NAV-05: header contact link navigates to /聯絡我們", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile-chrome", "Covered by mobile flow");
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto("/");
    await waitForPageReady(page);

    const header = page.locator("header").first();
    const contactLink = header
      .locator(
        'a[href="/聯絡我們"], a[href*="%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91"]',
      )
      .first();

    await contactLink.click();

    await page.waitForURL("**/%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91", {
      timeout: 8000,
    });
    expect(urlContainsChinese(page.url(), "聯絡我們")).toBe(true);
    await expect(page.locator(".application-form")).toBeVisible({ timeout: 8000 });
  });
});

test.describe("Header submenu navigation (desktop only)", () => {
  test("NAV-02: navigate to UIC about page from desktop submenu", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name === "mobile-chrome", "Desktop-only submenu flow");
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto("/");
    await waitForPageReady(page);

    const desktopNav = page.locator(".header-nav");
    await desktopNav.getByText("UIC商學院碩士", { exact: true }).first().hover();

    const uicSchoolTrigger = page
      .getByText("UIC 伊利諾大學芝加哥分校", { exact: true })
      .first();
    await expect(uicSchoolTrigger).toBeVisible({ timeout: 5000 });
    await uicSchoolTrigger.hover();

    const aboutLink = page.locator(`a[href="${UIC_ABOUT_PATH}"]`).first();
    await expect(aboutLink).toBeVisible({ timeout: 5000 });
    await aboutLink.click();

    await page.waitForURL((url) => decodeURIComponent(url.pathname).includes(UIC_ABOUT_PATH), {
      timeout: 8000,
    });
    expect(urlContainsChinese(page.url(), "伊利諾大學芝加哥分校")).toBe(true);
    await expect(page.locator("#root")).toBeVisible();
  });

  test("NAV-03: navigate to MSU about page from desktop submenu", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name === "mobile-chrome", "Desktop-only submenu flow");
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto("/");
    await waitForPageReady(page);

    const desktopNav = page.locator(".header-nav");
    await desktopNav.getByText("MSU金融碩士", { exact: true }).first().hover();

    const msuSchoolTrigger = page
      .getByText("MSU密西根州立大學", { exact: true })
      .first();
    await expect(msuSchoolTrigger).toBeVisible({ timeout: 5000 });
    await msuSchoolTrigger.hover();

    const aboutLink = page.locator(`a[href="${MSU_ABOUT_PATH}"]`).first();
    await expect(aboutLink).toBeVisible({ timeout: 5000 });
    await aboutLink.click();

    await page.waitForURL((url) => decodeURIComponent(url.pathname).includes(MSU_ABOUT_PATH), {
      timeout: 8000,
    });
    expect(urlContainsChinese(page.url(), "密西根州立大學")).toBe(true);
    await expect(page.locator("#root")).toBeVisible();
  });

  test("NAV-07: repeated header clicks do not stack URL segments", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name === "mobile-chrome", "Desktop-only navigation stability");
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto("/blog");
    await waitForPageReady(page);

    const header = page.locator("header").first();
    const blogLink = header.locator('a[href="/blog"]').first();
    await blogLink.click();
    await blogLink.click();

    await page.waitForURL("**/blog", { timeout: 8000 });
    expect(currentPathname(page)).toBe("/blog");
    expect(page.url()).not.toContain("/blog/blog");
  });
});

test.describe("Mobile drawer navigation", () => {
  test("NAV-06: hamburger opens mobile menu and navigates to contact", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-chrome", "Mobile-only flow");

    await page.goto("/");
    await waitForPageReady(page);

    const hamburger = page.locator(".mobile-nav-toggle");
    await expect(hamburger).toBeVisible({ timeout: 5000 });
    await hamburger.click();

    const mobileMenu = page.locator(".mobile-drawer");
    await expect(mobileMenu).toBeVisible({ timeout: 5000 });
    await expect(mobileMenu.getByText("首頁")).toBeVisible();
    await expect(mobileMenu.getByText("UIC商學院碩士")).toBeVisible();

    const contactLink = mobileMenu
      .locator(
        'a[href="/聯絡我們"], a[href*="%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91"]',
      )
      .first();
    await contactLink.click();

    await page.waitForURL("**/%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91", {
      timeout: 8000,
    });
    expect(urlContainsChinese(page.url(), "聯絡我們")).toBe(true);
    expect(currentPathname(page)).toBe(CONTACT_PATH);
    await expect(page.locator(".application-form")).toBeVisible({ timeout: 8000 });
  });
});

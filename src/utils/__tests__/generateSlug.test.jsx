import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateSlug, ensureUniqueSlug } from "../generateSlug";

describe("generateSlug", () => {
  it("一般英文標題產生正確 slug", () => {
    expect(generateSlug("UIC MBA 2026 Spring")).toBe("uic-mba-2026-spring");
  });

  it("英文混數字", () => {
    expect(generateSlug("MSU MBA+MS Programs 2026")).toBe(
      "msu-mbams-programs-2026",
    );
  });

  it("去除 HTML 標籤", () => {
    expect(generateSlug("<img src='/flag.png' /> Fall 2026")).toBe("fall-2026");
  });

  it("去除 HTML entities", () => {
    // &amp; → space，連續空白合併為單一連字號
    expect(generateSlug("MSU &amp; UIC 2026")).toBe("msu-uic-2026");
  });

  it("多個空白合併為單一連字號", () => {
    expect(generateSlug("hello   world")).toBe("hello-world");
  });

  it("去除首尾連字號", () => {
    expect(generateSlug("  hello world  ")).toBe("hello-world");
  });

  it("特殊字元去除", () => {
    expect(generateSlug("hello@world!")).toBe("helloworld");
  });

  it("長度超過 80 字元時截斷", () => {
    const long = "a-".repeat(50); // 100 chars
    const result = generateSlug(long);
    expect(result.length).toBeLessThanOrEqual(80);
  });

  it("截斷後不以連字號結尾", () => {
    // 產生剛好 81 字元的輸入，截斷後最後一個字元應為連字號 → 應被移除
    const input = "a".repeat(80) + "-extra";
    const result = generateSlug(input);
    expect(result).not.toMatch(/-$/);
  });

  it("純中文標題回傳 null", () => {
    expect(generateSlug("最新消息招生資訊")).toBeNull();
  });

  it("空字串回傳 null", () => {
    expect(generateSlug("")).toBeNull();
  });

  it("null 回傳 null", () => {
    expect(generateSlug(null)).toBeNull();
  });

  it("undefined 回傳 null", () => {
    expect(generateSlug(undefined)).toBeNull();
  });

  it("非字串型別回傳 null", () => {
    expect(generateSlug(123)).toBeNull();
  });

  it("只含特殊字元回傳 null", () => {
    expect(generateSlug("!@#$%^&*()")).toBeNull();
  });

  it("中英混合：保留英數部分", () => {
    // 中文字元被去除後，連續空白合併為單一連字號
    const result = generateSlug("UIC MBA 招生資訊 2026");
    expect(result).toBe("uic-mba-2026");
  });

  it("底線轉換為連字號", () => {
    expect(generateSlug("hello_world_test")).toBe("hello-world-test");
  });
});

describe("ensureUniqueSlug", () => {
  it("slug 不存在時直接回傳原 slug", async () => {
    const checkExists = vi.fn().mockResolvedValue(false);
    const result = await ensureUniqueSlug("uic-mba-2026", checkExists);
    expect(result).toBe("uic-mba-2026");
    expect(checkExists).toHaveBeenCalledTimes(1);
  });

  it("slug 已存在時加 -2 後綴", async () => {
    const checkExists = vi
      .fn()
      .mockResolvedValueOnce(true) // "uic-mba-2026" 存在
      .mockResolvedValueOnce(false); // "uic-mba-2026-2" 不存在
    const result = await ensureUniqueSlug("uic-mba-2026", checkExists);
    expect(result).toBe("uic-mba-2026-2");
  });

  it("多次衝突時遞增後綴", async () => {
    const checkExists = vi
      .fn()
      .mockResolvedValueOnce(true) // -1（原始）存在
      .mockResolvedValueOnce(true) // -2 存在
      .mockResolvedValueOnce(true) // -3 存在
      .mockResolvedValueOnce(false); // -4 不存在
    const result = await ensureUniqueSlug("test-slug", checkExists);
    expect(result).toBe("test-slug-4");
  });

  it("超過 100 次衝突時加時間戳後綴", async () => {
    // 前 100 次全回傳 true，第 101 次（時間戳版本）checkExists 應傳入帶時間戳的 slug
    const checkExists = vi.fn().mockResolvedValue(true);
    const result = await ensureUniqueSlug("slug", checkExists);
    // 結果應包含 "slug-" 前綴（時間戳後綴）
    expect(result).toMatch(/^slug-\d+$/);
  });
});

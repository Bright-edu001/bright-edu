// src/utils/__tests__/getImageUrl.test.js
import getImageUrl from "../getImageUrl";

describe("getImageUrl", () => {
  const BUCKET_URL =
    "https://firebasestorage.googleapis.com/v0/b/bright-edu-data.firebasestorage.app/o/";

  // 測試：標準路徑轉換
  test("should correctly format a standard image path", () => {
    const localPath = "/images/Uic/Mba/image.webp";
    const expectedPath = encodeURIComponent("Uic/Mba/image.webp");
    expect(getImageUrl(localPath)).toBe(
      `${BUCKET_URL}${expectedPath}?alt=media`
    );
  });

  // 測試：包含空格的路徑
  test("should handle paths with spaces correctly", () => {
    const localPath = "/images/blog/my new post.webp";
    const expectedPath = encodeURIComponent("blog/my new post.webp");
    expect(getImageUrl(localPath)).toBe(
      `${BUCKET_URL}${expectedPath}?alt=media`
    );
  });

  // 測試：包含特殊字元的路徑
  test("should handle paths with special characters", () => {
    const localPath = "/images/gallery/pic_&_sound.webp";
    const expectedPath = encodeURIComponent("gallery/pic_&_sound.webp");
    expect(getImageUrl(localPath)).toBe(
      `${BUCKET_URL}${expectedPath}?alt=media`
    );
  });

  // 測試：根目錄下的圖片
  test("should handle root image paths", () => {
    const localPath = "/images/logo.webp";
    const expectedPath = encodeURIComponent("logo.webp");
    expect(getImageUrl(localPath)).toBe(
      `${BUCKET_URL}${expectedPath}?alt=media`
    );
  });

  // 測試：無效路徑（不以 /images/ 開頭）
  test("should return the original path if it is invalid", () => {
    const invalidPath = "/other/path/image.webp";
    expect(getImageUrl(invalidPath)).toBe(invalidPath);
  });

  // 測試：null 或 undefined 路徑
  test("should return the original path for null or undefined input", () => {
    expect(getImageUrl(null)).toBe(null);
    expect(getImageUrl(undefined)).toBe(undefined);
  });

  // 測試：空字串路徑
  test("should return an empty string for an empty string input", () => {
    expect(getImageUrl("")).toBe("");
  });
});

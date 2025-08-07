// 測試 getAssetUrl 工具
import getAssetUrl from "../getAssetUrl";

describe("getAssetUrl", () => {
  // 保存原始 PUBLIC_URL
  const originalEnv = process.env.PUBLIC_URL;

  // 每次測試後還原 PUBLIC_URL
  afterEach(() => {
    process.env.PUBLIC_URL = originalEnv;
  });

  // 測試：有無斜線都能正確組合路徑
  it("handles paths with and without leading slash", () => {
    process.env.PUBLIC_URL = "/base";
    expect(getAssetUrl("img.png")).toBe("/base/img.png");
    expect(getAssetUrl("/img.png")).toBe("/base/img.png");
  });

  // 測試：沒給 path 時只回傳 base
  it("returns base when path missing", () => {
    process.env.PUBLIC_URL = "/assets";
    expect(getAssetUrl()).toBe("/assets");
  });

  // 測試：沒設 PUBLIC_URL 時回傳根目錄
  it("works when PUBLIC_URL is empty", () => {
    delete process.env.PUBLIC_URL;
    expect(getAssetUrl("logo.png")).toBe("/logo.png");
  });
});

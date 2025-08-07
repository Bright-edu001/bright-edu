// 測試 loadStylesheet 工具
let importCount = 0;
jest.mock(
  "style-path",
  () => {
    importCount += 1;
    return {};
  },
  { virtual: true }
);

describe("loadStylesheet", () => {
  // 每次測試前重設 importCount
  beforeEach(() => {
    importCount = 0;
    jest.resetModules();
  });

  // 測試：同一個樣式只會 import 一次
  it("imports style only once for same path", async () => {
    const { loadStylesheet } = await import("../performance");
    await loadStylesheet("style-path");
    await loadStylesheet("style-path");
    expect(importCount).toBe(1);
  });
});

// 測試 logger 工具
describe("logger", () => {
  // 保存原始 NODE_ENV
  const originalEnv = process.env.NODE_ENV;
  let consoleSpy;

  // 每次測試後還原 NODE_ENV 與 console
  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    if (consoleSpy) consoleSpy.mockRestore();
  });

  // 測試：開發環境下會 log
  it("logs messages in development", async () => {
    jest.resetModules();
    process.env.NODE_ENV = "development";
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const logger = (await import("../logger")).default;
    logger.log("test");
    expect(consoleSpy).toHaveBeenCalledWith("test");
  });

  // 測試：production 不會 log
  it("does not log messages in production", async () => {
    jest.resetModules();
    process.env.NODE_ENV = "production";
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const logger = (await import("../logger")).default;
    logger.log("test");
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  // 🔥 測試：performance 日誌在所有環境都會輸出
  it("logs performance messages in all environments", async () => {
    jest.resetModules();
    process.env.NODE_ENV = "production";
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const logger = (await import("../logger")).default;
    logger.performance("test performance");
    expect(consoleSpy).toHaveBeenCalledWith(
      "🚀 [PERFORMANCE]",
      "test performance"
    );
  });

  // 🔥 測試：formSubmit 日誌在所有環境都會輸出
  it("logs formSubmit messages in all environments", async () => {
    jest.resetModules();
    process.env.NODE_ENV = "production";
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const logger = (await import("../logger")).default;
    logger.formSubmit("test form submit");
    expect(consoleSpy).toHaveBeenCalledWith(
      "📝 [FORM_SUBMIT]",
      "test form submit"
    );
  });
});

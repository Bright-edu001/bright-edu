// 測試 utils/request 的 request 函式
describe("request", () => {
  // 保存原始環境變數與 fetch，避免污染全域
  const originalEnv = process.env.REACT_APP_FORM_ENDPOINT;
  const originalFetch = global.fetch;
  let consoleSpy;

  // 每次測試前重設 module 與 mock console.log
  beforeEach(() => {
    jest.resetModules();
    process.env.REACT_APP_FORM_ENDPOINT = "http://example.com/api";
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  // 測試後還原環境變數與 fetch
  afterEach(() => {
    process.env.REACT_APP_FORM_ENDPOINT = originalEnv;
    global.fetch = originalFetch;
    consoleSpy.mockRestore();
  });

  // 測試：GET 請求會正確帶上查詢參數
  it("sends GET requests with query string", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    );
    const { request } = await import("../request");
    const data = { a: 1, b: null, c: "x" };
    const result = await request("GET", data);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://example.com/api?a=1&c=x",
      { method: "GET", mode: "cors" }
    );
    expect(result).toEqual({ success: true });
  });

  // 測試：POST 請求會用 FormData 傳送資料
  it("sends POST requests using FormData", async () => {
    global.fetch = jest.fn(() => Promise.resolve({}));
    const { request } = await import("../request");
    const data = { a: 1, b: null };
    const result = await request("POST", data);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe("http://example.com/api");
    expect(options.method).toBe("POST");
    expect(options.mode).toBe("no-cors");
    // 只會傳送非 null 欄位
    expect(Array.from(options.body.entries())).toEqual([["a", "1"]]);
    expect(result).toEqual({
      result: "success",
      message: "FormData 請求已發送 (no-cors 模式)",
    });
  });
});

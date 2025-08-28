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

  // 測試：POST 請求會並行嘗試多種方式
  it("sends POST requests using parallel approaches", async () => {
    global.fetch = jest.fn(() => Promise.resolve({}));
    const { request } = await import("../request");
    const data = { a: 1, b: null };
    const result = await request("POST", data);

    // 🔥 新的並行行為：會同時發送三個請求
    expect(global.fetch).toHaveBeenCalledTimes(3);

    // 檢查三種不同的請求方式都有被調用
    const calls = global.fetch.mock.calls;
    expect(calls[0][0]).toBe("http://example.com/api"); // FormData
    expect(calls[1][0]).toBe("http://example.com/api"); // URLSearchParams
    expect(calls[2][0]).toBe("http://example.com/api"); // JSON

    // 檢查返回結果包含成功訊息
    expect(result).toEqual(
      expect.objectContaining({
        result: "success",
        method: expect.any(String),
      })
    );
  });
});

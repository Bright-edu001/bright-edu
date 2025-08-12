// 匯入測試工具與自訂 hook
import { renderHook, act } from "@testing-library/react";
import useFormSubmit from "../useFormSubmit";
import { request } from "../../utils/request";
import { App } from "antd";

// Mock Ant Design 的 App.useApp，避免實際呼叫 UI
jest.mock("antd", () => ({
  App: {
    useApp: jest.fn(),
  },
  // Mock Button component used in hook's error message
  Button: () => null,
}));

// Mock request 工具，避免實際發送 API 請求
jest.mock("../../utils/request", () => ({
  request: jest.fn(),
}));

// 測試 useFormSubmit hook 的行為
describe("useFormSubmit", () => {
  // message mock 物件，模擬 antd 的訊息提示
  const message = {
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    loading: jest.fn(),
  };

  // 每次測試前重置 mock 狀態，並讓 useApp 回傳 message mock
  beforeEach(() => {
    jest.clearAllMocks();
    App.useApp.mockReturnValue({ message });
  });

  // 測試：表單驗證失敗時，顯示錯誤訊息且不送出
  it("shows error message and does not submit when form is invalid", async () => {
    const { result } = renderHook(() => useFormSubmit());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(message.error).toHaveBeenCalled();
    expect(request).not.toHaveBeenCalled();
  });

  // 測試：POST 失敗時會自動用 GET 再試一次
  it("retries with GET after POST failure", async () => {
    request
      .mockRejectedValueOnce(new Error("POST failed"))
      .mockResolvedValueOnce({ result: "success" });

    const { result } = renderHook(() => useFormSubmit());

    // 模擬填寫表單
    act(() => {
      result.current.handleChange({ target: { name: "name", value: "John" } });
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      });
      result.current.handleChange({
        target: { name: "message", value: "Hello world 123" },
      });
    });

    // 送出表單
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    // 應該先 POST，再 GET
    expect(request).toHaveBeenCalledTimes(2);
    expect(request).toHaveBeenNthCalledWith(1, "POST", {
      name: "John",
      lineId: "",
      email: "john@example.com",
      message: "Hello world 123",
    });
    expect(request).toHaveBeenNthCalledWith(2, "GET", {
      name: "John",
      lineId: "",
      email: "john@example.com",
      message: "Hello world 123",
    });
  });

  // 測試：送出成功後會重置表單並顯示成功訊息
  it("resets form and sets result.success after successful submission", async () => {
    request.mockResolvedValue({ result: "success" });

    const { result } = renderHook(() => useFormSubmit());

    // 模擬填寫表單
    act(() => {
      result.current.handleChange({ target: { name: "name", value: "John" } });
      result.current.handleChange({
        target: { name: "email", value: "john@example.com" },
      });
      result.current.handleChange({
        target: { name: "message", value: "Hello world 123" },
      });
    });

    // 送出表單
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    // 表單應該被重置，result.success 應為 true，並顯示成功訊息
    expect(result.current.form).toEqual({
      name: "",
      lineId: "",
      email: "",
      message: "",
    });
    expect(result.current.result).toEqual(
      expect.objectContaining({ success: true })
    );
    expect(message.success).toHaveBeenCalled();
  });
});

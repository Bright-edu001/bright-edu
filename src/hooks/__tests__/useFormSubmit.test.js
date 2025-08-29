// 匯入測試工具與自訂 hook
import { renderHook, act } from "@testing-library/react";
import useFormSubmit from "../useFormSubmit";
import { contactService } from "../../services/contactService";
import { App } from "antd";

// 增加測試超時時間
jest.setTimeout(10000);

// Mock Ant Design 的 App.useApp，避免實際呼叫 UI
jest.mock("antd", () => ({
  App: {
    useApp: jest.fn(),
  },
  // Mock Button component used in hook's error message
  Button: () => null,
}));

// Mock Firebase modules to prevent actual Firebase calls
jest.mock("../../config/firebaseConfig", () => ({
  db: "mock-db",
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(() => ({ _delegate: { _key: "server-timestamp" } })),
}));

// Mock contactService
jest.mock("../../services/contactService", () => ({
  contactService: {
    saveToBoth: jest.fn(),
  },
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
    expect(contactService.saveToBoth).not.toHaveBeenCalled();
  });

  // 測試：送出成功後會重置表單並顯示成功訊息
  it("resets form and sets result.success after successful submission", async () => {
    contactService.saveToBoth.mockResolvedValue({
      firestore: { success: true, docId: "test-doc-id", error: null },
      googleSheets: { success: true, message: "需要手動同步到 Google Sheets" },
    });

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

  // 測試：Firestore 儲存失敗的情況
  it("handles firestore save failure", async () => {
    contactService.saveToBoth.mockResolvedValue({
      firestore: {
        success: false,
        docId: null,
        error: new Error("Firestore error"),
      },
      googleSheets: { success: true, message: "需要手動同步到 Google Sheets" },
    });

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

    expect(result.current.result).toEqual(
      expect.objectContaining({ success: false })
    );
    expect(message.error).toHaveBeenCalled();
  });

  // 測試：完全儲存失敗的情況
  it("handles complete save failure", async () => {
    contactService.saveToBoth.mockRejectedValue(new Error("Complete failure"));

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

    expect(result.current.result).toEqual(
      expect.objectContaining({ success: false })
    );
    expect(message.error).toHaveBeenCalled();
  });
});

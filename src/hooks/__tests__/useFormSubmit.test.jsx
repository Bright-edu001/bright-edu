// 匯入測試工具與自訂 hook
import { renderHook, act } from "@testing-library/react";
import useFormSubmit from "../useFormSubmit";
import { contactService } from "../../services/contactService";

// Mock Firebase modules to prevent actual Firebase calls
vi.mock("../../config/firebaseCore", () => ({
  db: "mock-db",
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: vi.fn(() => ({ _delegate: { _key: "server-timestamp" } })),
}));

// Mock contactService
vi.mock("../../services/contactService", () => ({
  contactService: {
    saveToBoth: vi.fn(),
  },
}));

// 測試 useFormSubmit hook 的行為
describe("useFormSubmit", () => {
  // 每次測試前重置 mock 狀態
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 測試：表單驗證失敗時，顯示錯誤通知且不送出
  it("shows error message and does not submit when form is invalid", async () => {
    const { result } = renderHook(() => useFormSubmit());

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(result.current.notification?.type).toBe("error");
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
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    // 表單應該被重置，result.success 應為 true，並顯示成功通知
    expect(result.current.form).toEqual({
      name: "",
      lineId: "",
      email: "",
      message: "",
    });
    expect(result.current.result).toEqual(
      expect.objectContaining({ success: true }),
    );
    expect(result.current.notification?.type).toBe("success");
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
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(result.current.result).toEqual(
      expect.objectContaining({ success: false }),
    );
    expect(result.current.notification?.type).toBe("error");
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
      await result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(result.current.result).toEqual(
      expect.objectContaining({ success: false }),
    );
    expect(result.current.notification?.type).toBe("error");
  });
});

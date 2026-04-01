import { contactService } from "../contactService";
import { collection, addDoc } from "firebase/firestore";

// Mock firebaseCore
vi.mock("../../config/firebaseCore", () => ({
  db: "mock-db",
}));

// Mock Firebase Firestore
const mockServerTimestamp = { _delegate: { _key: "server-timestamp" } };
const mockCollectionRef = "mock-collection-ref";

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  serverTimestamp: () => mockServerTimestamp,
}));

// 設置 mock 行為
beforeEach(() => {
  collection.mockReturnValue(mockCollectionRef);
  addDoc.mockResolvedValue({ id: "mock-doc-id" });
});

// Mock Firebase config
vi.mock("../../config/firebaseCore", () => ({
  db: "mock-db",
}));

// Mock logger
vi.mock("../../utils/logger", () => ({ default: { log: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn(), performance: vi.fn(), formSubmit: vi.fn() } }));

describe("ContactService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 🔥 清除 contactService 的快取，避免測試間相互影響
    contactService.recentSubmissions.clear();
    // 🔥 設置 Firebase 為已準備就緒狀態，避免待處理佇列影響測試
    contactService.setFirebaseReady(true);
    // 設置 fetch mock
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // 清理 global fetch mock
    delete global.fetch;
  });

  describe("saveToFirestore", () => {
    it("should save valid form data to Firestore", async () => {
      const mockDocRef = { id: "mock-doc-id" };
      addDoc.mockResolvedValue(mockDocRef);

      const formData = {
        name: "測試使用者",
        email: "test@example.com",
        lineId: "test123",
        message: "這是測試訊息",
      };

      const result = await contactService.saveToFirestore(formData);

      expect(addDoc).toHaveBeenCalledWith(
        mockCollectionRef,
        expect.objectContaining({
          name: "測試使用者",
          email: "test@example.com",
          lineId: "test123",
          message: "這是測試訊息",
          source: "website_contact_form",
          status: "pending",
          createdAt: mockServerTimestamp,
          // 🔥 測試簡化後的結構：直接欄位而非 metadata 物件
          url: expect.any(String),
          userAgent: expect.any(String),
          referrer: expect.any(String),
        })
      );
      expect(result).toBe("mock-doc-id");
    });

    it("should handle missing optional lineId", async () => {
      const mockDocRef = { id: "mock-doc-id" };
      addDoc.mockResolvedValue(mockDocRef);

      const formData = {
        name: "測試使用者",
        email: "test@example.com",
        message: "這是測試訊息",
      };

      await contactService.saveToFirestore(formData);

      expect(addDoc).toHaveBeenCalledWith(
        mockCollectionRef,
        expect.objectContaining({
          lineId: "",
        })
      );
    });

    it("should validate required fields", async () => {
      const invalidFormData = {
        name: "",
        email: "test@example.com",
        message: "這是測試訊息",
      };

      await expect(
        contactService.saveToFirestore(invalidFormData)
      ).rejects.toThrow("缺少必填欄位");
    });

    it("should normalize email to lowercase", async () => {
      const mockDocRef = { id: "mock-doc-id" };
      addDoc.mockResolvedValue(mockDocRef);

      const formData = {
        name: "測試使用者",
        email: "TEST@EXAMPLE.COM",
        message: "這是測試訊息",
      };

      await contactService.saveToFirestore(formData);

      expect(addDoc).toHaveBeenCalledWith(
        mockCollectionRef,
        expect.objectContaining({
          email: "test@example.com",
        })
      );
    });
  });

  describe("saveToBoth", () => {
    it("should handle both systems succeeding", async () => {
      const mockDocRef = { id: "mock-doc-id" };
      addDoc.mockResolvedValue(mockDocRef);

      // Mock the Firebase Extensions HTTP request
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({ success: true, message: "Data saved to sheet" }),
      });

      const formData = {
        name: "測試使用者 全部成功",
        email: "test-success@example.com",
        message: "這是測試全部成功的訊息",
      };

      const result = await contactService.saveToBoth(formData);

      expect(result.googleSheets.success).toBe(true);
      expect(result.googleSheets.message).toBe("需要手動同步到 Google Sheets");
      expect(result.firestore.success).toBe(true);
      expect(result.firestore.docId).toBe("mock-doc-id");
    });

    it("should handle Google Sheets failure with Firestore success", async () => {
      const mockDocRef = { id: "mock-doc-id" };
      addDoc.mockResolvedValue(mockDocRef);

      const formData = {
        name: "測試使用者 Google Sheets 失敗",
        email: "test-gs-fail@example.com",
        message: "這是測試 Google Sheets 失敗的訊息",
      };

      const result = await contactService.saveToBoth(formData);

      // 現在只儲存到 Firestore，Google Sheets 標記為需要手動同步
      expect(result.googleSheets.success).toBe(true);
      expect(result.googleSheets.message).toBe("需要手動同步到 Google Sheets");
      expect(result.firestore.success).toBe(true);
      expect(result.firestore.docId).toBe("mock-doc-id");
    });

    it("should handle Firestore failure with Google Sheets success", async () => {
      addDoc.mockRejectedValue(new Error("Firestore error"));

      // Mock Firebase Extensions HTTP request success
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({ success: true, message: "Data saved to sheet" }),
      });

      const formData = {
        name: "測試使用者 Firestore 失敗",
        email: "test-firestore-fail@example.com",
        message: "這是測試 Firestore 失敗的訊息",
      };

      const result = await contactService.saveToBoth(formData);

      expect(result.googleSheets.success).toBe(true);
      expect(result.firestore.success).toBe(false);
      expect(result.firestore.error).toBeInstanceOf(Error);
    });
  });
});

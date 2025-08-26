import { contactService } from "../contactService";
import { collection, addDoc } from "firebase/firestore";

// Mock Firebase Firestore
const mockServerTimestamp = { _delegate: { _key: "server-timestamp" } };
const mockCollectionRef = "mock-collection-ref";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  serverTimestamp: () => mockServerTimestamp,
}));

// 設置 mock 行為
beforeEach(() => {
  collection.mockReturnValue(mockCollectionRef);
  addDoc.mockResolvedValue({ id: "mock-doc-id" });
});

// Mock Firebase config
jest.mock("../../config/firebaseConfig", () => ({
  db: "mock-db",
}));

// Mock logger
jest.mock("../../utils/logger", () => ({
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

describe("ContactService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
          updatedAt: mockServerTimestamp,
          metadata: expect.objectContaining({
            userAgent: expect.any(String),
          }),
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

      const mockGoogleSheetsRequest = jest
        .fn()
        .mockResolvedValue({ result: "success" });

      const formData = {
        name: "測試使用者",
        email: "test@example.com",
        message: "這是測試訊息",
      };

      const result = await contactService.saveToBoth(
        formData,
        mockGoogleSheetsRequest
      );

      expect(result.googleSheets.success).toBe(true);
      expect(result.firestore.success).toBe(true);
      expect(result.firestore.docId).toBe("mock-doc-id");
    });

    it("should handle Google Sheets failure with Firestore success", async () => {
      const mockDocRef = { id: "mock-doc-id" };
      addDoc.mockResolvedValue(mockDocRef);

      const mockGoogleSheetsRequest = jest
        .fn()
        .mockRejectedValueOnce(new Error("POST failed"))
        .mockRejectedValueOnce(new Error("GET failed"));

      const formData = {
        name: "測試使用者",
        email: "test@example.com",
        message: "這是測試訊息",
      };

      const result = await contactService.saveToBoth(
        formData,
        mockGoogleSheetsRequest
      );

      expect(result.googleSheets.success).toBe(false);
      expect(result.firestore.success).toBe(true);
      expect(result.firestore.docId).toBe("mock-doc-id");
    });

    it("should handle Firestore failure with Google Sheets success", async () => {
      addDoc.mockRejectedValue(new Error("Firestore error"));

      const mockGoogleSheetsRequest = jest
        .fn()
        .mockResolvedValue({ result: "success" });

      const formData = {
        name: "測試使用者",
        email: "test@example.com",
        message: "這是測試訊息",
      };

      const result = await contactService.saveToBoth(
        formData,
        mockGoogleSheetsRequest
      );

      expect(result.googleSheets.success).toBe(true);
      expect(result.firestore.success).toBe(false);
      expect(result.firestore.error).toBeInstanceOf(Error);
    });
  });

  describe("saveToGoogleSheets", () => {
    it("should try POST first, then GET on failure", async () => {
      const mockRequest = jest
        .fn()
        .mockRejectedValueOnce(new Error("POST failed"))
        .mockResolvedValueOnce({ result: "success" });

      const formData = {
        name: "測試使用者",
        email: "test@example.com",
        message: "這是測試訊息",
      };

      const result = await contactService.saveToGoogleSheets(
        formData,
        mockRequest
      );

      expect(mockRequest).toHaveBeenCalledTimes(2);
      expect(mockRequest).toHaveBeenNthCalledWith(1, "POST", formData);
      expect(mockRequest).toHaveBeenNthCalledWith(2, "GET", formData);
      expect(result.method).toBe("GET");
    });

    it("should return POST result when successful", async () => {
      const mockRequest = jest.fn().mockResolvedValue({ result: "success" });

      const formData = {
        name: "測試使用者",
        email: "test@example.com",
        message: "這是測試訊息",
      };

      const result = await contactService.saveToGoogleSheets(
        formData,
        mockRequest
      );

      expect(mockRequest).toHaveBeenCalledTimes(1);
      expect(result.method).toBe("POST");
    });
  });
});

import { FirestoreToSheetsSync } from "../firestoreToSheetsSync";
import { getDocs } from "firebase/firestore";

// Mock firebaseCore
vi.mock("../../config/firebaseCore", () => ({
  db: "mock-db",
}));

// Mock Firebase Firestore
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
}));

vi.mock("../../config/firebaseCore", () => ({
  db: {},
}));

vi.mock("../../utils/logger", () => ({ default: { log: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn(), performance: vi.fn(), formSubmit: vi.fn() } }));

// Mock global fetch
global.fetch = vi.fn();

// Mock AbortSignal.timeout for older Node.js versions
if (!AbortSignal.timeout) {
  AbortSignal.timeout = vi.fn(() => ({
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    aborted: false,
  }));
}

describe("FirestoreToSheetsSync", () => {
  let syncService;

  beforeEach(() => {
    syncService = new FirestoreToSheetsSync();
    vi.clearAllMocks();
    global.fetch.mockClear();

    // Mock window.location for environment detection
    delete window.location;
    window.location = { hostname: "localhost" };
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe("constructor", () => {
    it("應該正確初始化配置", () => {
      expect(syncService.collectionName).toBe("contact_forms");
      expect(syncService.sheetsConfig.method).toBe("POST");
      expect(syncService.sheetsConfig.url).toContain("script.google.com");
      expect(syncService.autoSync.enabled).toBe(false);
    });
  });

  describe("checkHealth", () => {
    it("在開發環境中應該跳過網路請求", async () => {
      // 確保是開發環境
      process.env.NODE_ENV = "development";

      const result = await syncService.checkHealth();

      expect(result.success).toBe(true);
      expect(result.isDevelopment).toBe(true);
      expect(result.message).toContain("開發環境");
    });

    it("應該處理無效的 Google Sheets URL 配置", async () => {
      process.env.NODE_ENV = "development";
      syncService.sheetsConfig.url = "invalid-url";

      const result = await syncService.checkHealth();

      expect(result.success).toBe(false);
      expect(result.error).toContain("Google Apps Script URL 配置無效");
    });

    it("在生產環境中應該執行網路檢查", async () => {
      process.env.NODE_ENV = "production";
      window.location.hostname = "production.com";

      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        statusText: "OK",
      });

      const result = await syncService.checkHealth();

      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("script.google.com"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });

  describe("getContactForms", () => {
    it("應該成功獲取 Firestore 資料", async () => {
      const mockDocs = [
        {
          id: "doc1",
          data: () => ({
            name: "Test User",
            email: "test@example.com",
            message: "Test message",
            createdAt: new Date(),
          }),
        },
        {
          id: "doc2",
          data: () => ({
            name: "Test User 2",
            email: "test2@example.com",
            message: "Test message 2",
            createdAt: new Date(),
          }),
        },
      ];

      const mockQuerySnapshot = {
        forEach: vi.fn((callback) => {
          mockDocs.forEach(callback);
        }),
      };

      getDocs.mockResolvedValueOnce(mockQuerySnapshot);

      const result = await syncService.getContactForms();

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: "doc1",
        name: "Test User",
        email: "test@example.com",
      });
    });

    it("應該處理空的 Firestore 回應", async () => {
      const mockQuerySnapshot = {
        forEach: vi.fn(),
      };

      getDocs.mockResolvedValueOnce(mockQuerySnapshot);

      const result = await syncService.getContactForms();

      expect(result).toHaveLength(0);
    });
  });

  describe("sendToSheets", () => {
    const mockData = {
      name: "Test User",
      email: "test@example.com",
      message: "Test message",
      timestamp: "2023-01-01T00:00:00.000Z",
    };

    it("在開發環境中應該嘗試不同的請求方式", async () => {
      process.env.NODE_ENV = "development";

      // Mock sendToSheetsViaGet 方法
      syncService.sendToSheetsViaGet = jest
        .fn()
        .mockRejectedValueOnce(new Error("GET 方式失敗"));

      global.fetch.mockRejectedValueOnce(new Error("CORS error"));

      await expect(syncService.sendToSheets(mockData)).rejects.toThrow(
        "開發環境 CORS 限制"
      );
    });

    it("在生產環境中應該發送實際請求", async () => {
      process.env.NODE_ENV = "production";
      window.location.hostname = "production.com";

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, status: "completed" }),
      });

      const result = await syncService.sendToSheets(mockData);

      expect(result.success).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("script.google.com"),
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("Test User"),
        })
      );
    });

    it("應該處理網路錯誤", async () => {
      process.env.NODE_ENV = "production";
      window.location.hostname = "production.com";

      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(syncService.sendToSheets(mockData)).rejects.toThrow(
        "Network error"
      );
    });
  });

  describe("syncToSheets", () => {
    it("應該成功同步資料", async () => {
      // Mock getContactForms 返回測試資料
      syncService.getContactForms = jest
        .fn()
        .mockResolvedValueOnce([
          { id: "1", name: "Test User", email: "test@example.com" },
        ]);

      // Mock batchSyncToSheets 返回成功結果
      syncService.batchSyncToSheets = vi.fn().mockResolvedValueOnce({
        total: 1,
        success: 1,
        failed: 0,
        errors: [],
      });

      const result = await syncService.syncToSheets();

      expect(result.success).toBe(true);
      expect(result.results.success).toBe(1);
    });

    it("應該處理空資料同步", async () => {
      syncService.getContactForms = vi.fn().mockResolvedValueOnce([]);

      const result = await syncService.syncToSheets();

      expect(result.success).toBe(true);
      expect(result.message).toContain("沒有資料需要同步");
    });
  });

  describe("syncFormToSheets", () => {
    it("應該格式化並同步單筆資料", async () => {
      const mockFormData = {
        id: "test-id",
        name: "Test User",
        email: "test@example.com",
        message: "Test message",
        createdAt: new Date(),
      };

      syncService.sendToSheets = vi.fn().mockResolvedValueOnce({
        success: true,
        data: { status: "completed" },
      });

      const result = await syncService.syncFormToSheets(mockFormData);

      expect(result.success).toBe(true);
      expect(syncService.sendToSheets).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test User",
          email: "test@example.com",
          message: "Test message",
        })
      );
    });
  });

  describe("batchSyncToSheets", () => {
    it("應該批次同步多筆資料", async () => {
      const mockForms = [
        { id: "1", name: "User 1", email: "user1@example.com" },
        { id: "2", name: "User 2", email: "user2@example.com" },
      ];

      syncService.syncFormToSheets = jest
        .fn()
        .mockResolvedValue({ success: true });

      const result = await syncService.batchSyncToSheets(mockForms);

      expect(result.total).toBe(2);
      expect(result.success).toBe(2);
      expect(result.failed).toBe(0);
      expect(syncService.syncFormToSheets).toHaveBeenCalledTimes(2);
    });

    it("應該處理部分失敗的情況", async () => {
      const mockForms = [
        { id: "1", name: "User 1", email: "user1@example.com" },
        { id: "2", name: "User 2", email: "user2@example.com" },
      ];

      syncService.syncFormToSheets = jest
        .fn()
        .mockResolvedValueOnce({ success: true })
        .mockRejectedValueOnce(new Error("Sync failed"));

      const result = await syncService.batchSyncToSheets(mockForms);

      expect(result.total).toBe(2);
      expect(result.success).toBe(1);
      expect(result.failed).toBe(1);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe("自動同步功能", () => {
    it("應該具有自動同步配置", () => {
      expect(syncService.autoSync).toBeDefined();
      expect(syncService.autoSync.enabled).toBe(false);
      expect(syncService.autoSync.intervalHours).toBe(3);
    });
  });

  describe("錯誤處理", () => {
    it("應該處理 Firestore 連接錯誤", async () => {
      getDocs.mockRejectedValueOnce(new Error("Firestore connection failed"));

      await expect(syncService.getContactForms()).rejects.toThrow(
        "Firestore connection failed"
      );
    });

    it("應該處理 Google Sheets API 錯誤", async () => {
      process.env.NODE_ENV = "production";
      window.location.hostname = "production.com";

      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      const mockData = { name: "Test", email: "test@example.com" };

      await expect(syncService.sendToSheets(mockData)).rejects.toThrow(
        "HTTP Error: 500"
      );
    });
  });
});

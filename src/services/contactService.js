import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import logger from "../utils/logger";

/**
 * 聯絡表單服務 - 處理表單資料的儲存
 */
class ContactService {
  constructor() {
    this.collectionName = "contact_forms";
    // 🔥 優化 2: 添加快取機制避免重複送出
    this.recentSubmissions = new Map();
    this.CACHE_DURATION = 60000; // 1分鐘快取
    this.MAX_CACHE_SIZE = 100; // 最大快取項目數
  }

  /**
   * 🔥 生成快取鍵值
   * @param {Object} formData - 表單資料
   * @returns {string} 快取鍵值
   */
  generateCacheKey(formData) {
    const normalizedData = {
      name: formData.name?.trim().toLowerCase(),
      email: formData.email?.trim().toLowerCase(),
      lineId: formData.lineId?.trim(),
      message: formData.message?.trim(),
    };
    return JSON.stringify(normalizedData);
  }

  /**
   * 🔥 檢查快取
   * @param {string} cacheKey - 快取鍵值
   * @returns {Object|null} 快取結果或 null
   */
  checkCache(cacheKey) {
    if (this.recentSubmissions.has(cacheKey)) {
      const cached = this.recentSubmissions.get(cacheKey);
      if (Date.now() - cached.timestamp < this.CACHE_DURATION) {
        logger.performance("🔥 使用快取結果，避免重複送出");
        return cached.result;
      } else {
        // 過期的快取項目
        this.recentSubmissions.delete(cacheKey);
      }
    }
    return null;
  }

  /**
   * 🔥 儲存到快取
   * @param {string} cacheKey - 快取鍵值
   * @param {Object} result - 結果
   */
  saveToCache(cacheKey, result) {
    // 限制快取大小
    if (this.recentSubmissions.size >= this.MAX_CACHE_SIZE) {
      // 刪除最舊的項目
      const oldestKey = this.recentSubmissions.keys().next().value;
      this.recentSubmissions.delete(oldestKey);
    }

    this.recentSubmissions.set(cacheKey, {
      result: result,
      timestamp: Date.now(),
    });
  }

  /**
   * 將聯絡表單資料儲存到 Firestore
   * @param {Object} formData - 表單資料
   * @param {string} formData.name - 姓名
   * @param {string} formData.email - 電子郵件
   * @param {string} formData.lineId - LINE ID (可選)
   * @param {string} formData.message - 訊息內容
   * @returns {Promise<string>} 文件 ID
   */
  async saveToFirestore(formData) {
    // 🔥 記錄 Firestore 儲存開始時間
    const firestoreStartTime = performance.now();
    logger.log("🔥 開始儲存到 Firestore", { formData });

    try {
      // 驗證必填欄位
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("缺少必填欄位");
      }

      // 準備要儲存的資料（🔥 簡化結構以提升效能）
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        lineId: formData.lineId?.trim() || "",
        message: formData.message.trim(),
        source: "website_contact_form", // 資料來源標識
        status: "pending", // 處理狀態：pending, processing, completed
        createdAt: serverTimestamp(), // Firebase 伺服器時間戳
        // 🔥 效能優化：移除 updatedAt（初始建立時與 createdAt 相同）
        // 🔥 效能優化：簡化 metadata，只保留必要資訊
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      // 儲存到 Firestore
      const docRef = await addDoc(
        collection(db, this.collectionName),
        contactData
      );

      // 🔥 計算並記錄 Firestore 儲存時間
      const firestoreEndTime = performance.now();
      const firestoreTotalTime = firestoreEndTime - firestoreStartTime;

      logger.log("✅ 聯絡表單已儲存到 Firestore", {
        docId: docRef.id,
        totalTime: `${firestoreTotalTime.toFixed(2)}ms`,
        totalTimeSeconds: `${(firestoreTotalTime / 1000).toFixed(2)}s`,
      });

      return docRef.id;
    } catch (error) {
      // 🔥 記錄 Firestore 儲存失敗時間
      const firestoreEndTime = performance.now();
      const firestoreTotalTime = firestoreEndTime - firestoreStartTime;

      logger.error("❌ 儲存到 Firestore 失敗:", {
        error: error.message,
        totalTime: `${firestoreTotalTime.toFixed(2)}ms`,
        errorDetails: error,
      });
      throw error;
    }
  }

  /**
   * 批次儲存：同時儲存到 Google Sheets 和 Firestore
   * @param {Object} formData - 表單資料
   * @param {Function} googleSheetsRequest - Google Sheets 儲存函數
   * @returns {Promise<Object>} 儲存結果
   */
  async saveToBoth(formData, googleSheetsRequest) {
    // 🔥 優化 2: 檢查快取，避免重複送出
    const cacheKey = this.generateCacheKey(formData);
    const cachedResult = this.checkCache(cacheKey);

    if (cachedResult) {
      logger.performance("⚡ 使用快取結果，跳過重複送出");
      return cachedResult;
    }

    // 🔥 記錄批次儲存開始時間
    const batchStartTime = performance.now();
    logger.log("🔄 開始批次儲存到 Google Sheets 和 Firestore", {
      formData: formData,
      startTime: batchStartTime,
    });

    const results = {
      googleSheets: { success: false, error: null },
      firestore: { success: false, error: null, docId: null },
    };

    // 同時執行兩個儲存操作
    const [googleSheetsResult, firestoreResult] = await Promise.allSettled([
      // Google Sheets 儲存 (使用現有的 request 函數)
      this.saveToGoogleSheets(formData, googleSheetsRequest),
      // Firestore 儲存
      this.saveToFirestore(formData),
    ]);

    // 🔥 計算批次儲存總時間
    const batchEndTime = performance.now();
    const batchTotalTime = batchEndTime - batchStartTime;

    // 處理 Google Sheets 結果
    if (googleSheetsResult.status === "fulfilled") {
      results.googleSheets.success = true;
      results.googleSheets.data = googleSheetsResult.value;
    } else {
      results.googleSheets.error = googleSheetsResult.reason;
      logger.error("Google Sheets 儲存失敗:", googleSheetsResult.reason);
    }

    // 處理 Firestore 結果
    if (firestoreResult.status === "fulfilled") {
      results.firestore.success = true;
      results.firestore.docId = firestoreResult.value;
    } else {
      results.firestore.error = firestoreResult.reason;
      logger.error("Firestore 儲存失敗:", firestoreResult.reason);
    }

    // 🔥 詳細記錄批次儲存結果和時間
    logger.log("📊 批次儲存完成:", {
      totalTime: `${batchTotalTime.toFixed(2)}ms`,
      totalTimeSeconds: `${(batchTotalTime / 1000).toFixed(2)}s`,
      googleSheetsSuccess: results.googleSheets.success,
      firestoreSuccess: results.firestore.success,
      results: results,
    });

    // 記錄整體結果
    if (results.googleSheets.success && results.firestore.success) {
      logger.log("✅ 表單已成功儲存到兩個位置", results);
    } else if (results.googleSheets.success || results.firestore.success) {
      logger.warn("⚠️ 表單部分儲存成功", results);
    } else {
      logger.error("❌ 表單儲存完全失敗", results);
    }

    // 🔥 優化 2: 儲存成功結果到快取（只快取成功的結果）
    if (results.googleSheets.success || results.firestore.success) {
      this.saveToCache(cacheKey, results);
      logger.performance("💾 結果已儲存到快取");
    }

    return results;
  }

  /**
   * 包裝現有的 Google Sheets 儲存邏輯
   * @param {Object} formData - 表單資料
   * @param {Function} googleSheetsRequest - Google Sheets 請求函數
   * @returns {Promise} Google Sheets 儲存結果
   */
  async saveToGoogleSheets(formData, googleSheetsRequest) {
    // 🔥 記錄 Google Sheets 儲存開始時間
    const googleSheetsStartTime = performance.now();
    logger.log("📊 開始儲存到 Google Sheets", { formData });

    try {
      // 先嘗試 POST
      try {
        const postStartTime = performance.now();
        const postResult = await googleSheetsRequest("POST", formData);
        const postEndTime = performance.now();
        const postTotalTime = postEndTime - postStartTime;

        logger.log("✅ Google Sheets POST 成功:", {
          result: postResult,
          postTime: `${postTotalTime.toFixed(2)}ms`,
          totalTime: `${(postEndTime - googleSheetsStartTime).toFixed(2)}ms`,
        });
        return { method: "POST", result: postResult };
      } catch (postError) {
        const postFailTime = performance.now();
        const postAttemptTime = postFailTime - googleSheetsStartTime;

        logger.warn("⚠️ Google Sheets POST 失敗，嘗試 GET:", {
          error: postError.message,
          attemptTime: `${postAttemptTime.toFixed(2)}ms`,
        });

        // POST 失敗時使用 GET
        const getStartTime = performance.now();
        const getResult = await googleSheetsRequest("GET", formData);
        const getEndTime = performance.now();
        const getTotalTime = getEndTime - getStartTime;

        logger.log("✅ Google Sheets GET 成功:", {
          result: getResult,
          getTime: `${getTotalTime.toFixed(2)}ms`,
          totalTime: `${(getEndTime - googleSheetsStartTime).toFixed(2)}ms`,
        });
        return { method: "GET", result: getResult };
      }
    } catch (error) {
      // 🔥 記錄 Google Sheets 儲存失敗時間
      const googleSheetsEndTime = performance.now();
      const googleSheetsTotalTime = googleSheetsEndTime - googleSheetsStartTime;

      logger.error("❌ Google Sheets 儲存失敗:", {
        error: error.message,
        totalTime: `${googleSheetsTotalTime.toFixed(2)}ms`,
        errorDetails: error,
      });
      throw error;
    }
  }
}

// 建立單例實例
export const contactService = new ContactService();
export default contactService;

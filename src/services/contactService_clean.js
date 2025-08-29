import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import logger from "../utils/logger";

/**
 * 聯絡表單服務 - 專注於 Firestore 儲存
 */
class ContactService {
  constructor() {
    this.collectionName = "contact_forms";
    // 快取機制避免重複送出
    this.recentSubmissions = new Map();
    this.CACHE_DURATION = 60000; // 1分鐘快取
    this.MAX_CACHE_SIZE = 100; // 最大快取項目數
  }

  /**
   * 生成快取鍵值
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
   * 檢查快取
   * @param {string} cacheKey - 快取鍵值
   * @returns {Object|null} 快取結果或 null
   */
  checkCache(cacheKey) {
    if (this.recentSubmissions.has(cacheKey)) {
      const cached = this.recentSubmissions.get(cacheKey);
      if (Date.now() - cached.timestamp < this.CACHE_DURATION) {
        logger.performance("使用快取結果，避免重複送出");
        return cached.result;
      } else {
        // 過期的快取項目
        this.recentSubmissions.delete(cacheKey);
      }
    }
    return null;
  }

  /**
   * 儲存到快取
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
    const startTime = performance.now();
    logger.log("開始儲存到 Firestore", {
      name: formData.name,
      email: formData.email,
    });

    try {
      // 驗證必填欄位
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("缺少必填欄位");
      }

      // 準備要儲存的資料
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        lineId: formData.lineId?.trim() || "",
        message: formData.message.trim(),
        source: "website_contact_form",
        status: "pending",
        createdAt: serverTimestamp(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      // 儲存到 Firestore
      const docRef = await addDoc(
        collection(db, this.collectionName),
        contactData
      );

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      logger.log("✅ 聯絡表單已儲存到 Firestore", {
        docId: docRef.id,
        totalTime: `${totalTime.toFixed(2)}ms`,
      });

      return docRef.id;
    } catch (error) {
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      logger.error("❌ 儲存到 Firestore 失敗:", {
        error: error.message,
        totalTime: `${totalTime.toFixed(2)}ms`,
      });
      throw error;
    }
  }

  /**
   * 主要表單處理方法 - 只儲存到 Firestore
   * @param {Object} formData - 表單資料
   * @returns {Promise<Object>} 儲存結果
   */
  async submitContactForm(formData) {
    // 檢查快取，避免重複送出
    const cacheKey = this.generateCacheKey(formData);
    const cachedResult = this.checkCache(cacheKey);

    if (cachedResult) {
      logger.performance("使用快取結果，跳過重複送出");
      return cachedResult;
    }

    const startTime = performance.now();
    logger.log("開始處理聯絡表單", {
      name: formData.name,
      email: formData.email,
    });

    try {
      // 直接儲存到 Firestore
      const docId = await this.saveToFirestore(formData);

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      const result = {
        success: true,
        docId: docId,
        message: "表單已成功提交",
        totalTime: `${totalTime.toFixed(2)}ms`,
      };

      // 儲存到快取
      this.saveToCache(cacheKey, result);
      logger.performance("結果已儲存到快取");

      logger.log("✅ 聯絡表單處理完成", result);
      return result;
    } catch (error) {
      const endTime = performance.now();
      const totalTime = endTime - startTime;

      logger.error("❌ 聯絡表單處理失敗", {
        error: error.message,
        totalTime: `${totalTime.toFixed(2)}ms`,
      });

      const result = {
        success: false,
        error: error.message,
        message: "表單提交失敗，請稍後再試",
        totalTime: `${totalTime.toFixed(2)}ms`,
      };

      return result;
    }
  }

  /**
   * 為了向後相容，保留 saveToBoth 方法，實際上只調用 submitContactForm
   * @param {Object} formData - 表單資料
   * @returns {Promise<Object>} 儲存結果
   */
  async saveToBoth(formData) {
    const result = await this.submitContactForm(formData);

    // 轉換為舊格式以保持相容性
    return {
      firestore: {
        success: result.success,
        docId: result.docId,
        error: result.success ? null : new Error(result.error),
      },
      googleSheets: {
        success: true,
        message: "需要手動同步到 Google Sheets",
      },
    };
  }
}

// 建立單例實例
export const contactService = new ContactService();
export default contactService;

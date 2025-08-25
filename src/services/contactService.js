import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import logger from "../utils/logger";

/**
 * 聯絡表單服務 - 處理表單資料的儲存
 */
class ContactService {
  constructor() {
    this.collectionName = "contact_forms";
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
        source: "website_contact_form", // 資料來源標識
        status: "pending", // 處理狀態：pending, processing, completed
        createdAt: serverTimestamp(), // Firebase 伺服器時間戳
        updatedAt: serverTimestamp(),
        // 可以加入更多元資料
        metadata: {
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          url: window.location.href,
        },
      };

      // 儲存到 Firestore
      const docRef = await addDoc(
        collection(db, this.collectionName),
        contactData
      );

      logger.log("聯絡表單已儲存到 Firestore，文件 ID:", docRef.id);

      return docRef.id;
    } catch (error) {
      logger.error("儲存到 Firestore 失敗:", error);
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

    // 記錄整體結果
    if (results.googleSheets.success && results.firestore.success) {
      logger.log("表單已成功儲存到兩個位置", results);
    } else if (results.googleSheets.success || results.firestore.success) {
      logger.warn("表單部分儲存成功", results);
    } else {
      logger.error("表單儲存完全失敗", results);
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
    try {
      // 先嘗試 POST
      try {
        const postResult = await googleSheetsRequest("POST", formData);
        logger.log("Google Sheets POST 成功:", postResult);
        return { method: "POST", result: postResult };
      } catch (postError) {
        logger.warn("Google Sheets POST 失敗，嘗試 GET:", postError);

        // POST 失敗時使用 GET
        const getResult = await googleSheetsRequest("GET", formData);
        logger.log("Google Sheets GET 成功:", getResult);
        return { method: "GET", result: getResult };
      }
    } catch (error) {
      logger.error("Google Sheets 儲存失敗:", error);
      throw error;
    }
  }
}

// 建立單例實例
export const contactService = new ContactService();
export default contactService;

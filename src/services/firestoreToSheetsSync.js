import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import logger from "../utils/logger";

/**
 * 從 Firestore 同步資料到 Google Sheets 的服務
 */
class FirestoreToSheetsSync {
  constructor() {
    this.collectionName = "contact_forms";
    this.sheetsConfig = {
      method: "POST",
      url: "https://script.google.com/macros/s/AKfycbz-9eNEd9HbnVTAx_oP3xHb07Tr5OFrj3qlY_cMP2nLHNSPfTSq_3anpXyjBVvWZbZW/exec",
      timeout: 30000,
    };

    // 自動同步設定
    this.autoSync = {
      enabled: false,
      intervalId: null,
      lastSyncTime: null,
      intervalHours: 3, // 預設每3小時同步一次
      maxRetries: 3,
      retryCount: 0,
    };
  }

  /**
   * 檢查服務健康狀態
   * @returns {Promise<Object>} 健康檢查結果
   */
  async checkHealth() {
    try {
      logger.info("開始檢查 Google Sheets 同步服務健康狀態");

      // 在開發環境中跳過實際的網路請求以避免 CORS 問題
      const isDevelopment =
        process.env.NODE_ENV === "development" ||
        window.location.hostname === "localhost";

      if (isDevelopment) {
        logger.info("開發環境：跳過實際網路請求，執行基本配置檢查");

        // 檢查基本配置
        if (
          !this.sheetsConfig.url ||
          !this.sheetsConfig.url.includes("script.google.com")
        ) {
          throw new Error("Google Apps Script URL 配置無效");
        }

        return {
          success: true,
          message: "開發環境：配置檢查通過，跳過網路連接測試",
          isDevelopment: true,
        };
      }

      // 生產環境：執行實際的健康檢查
      // 使用 POST 請求和特殊的健康檢查 payload 來避免 CORS 問題
      const healthCheckPayload = {
        action: "healthCheck",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(this.sheetsConfig.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(healthCheckPayload),
        // 設置較短的超時時間用於健康檢查
        signal: AbortSignal.timeout(8000),
      });

      if (response.ok) {
        logger.info("Google Sheets 同步服務健康檢查通過");
        return {
          success: true,
          message: "同步服務運作正常",
          statusCode: response.status,
        };
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      logger.error("Google Sheets 同步服務健康檢查失敗:", error);

      // 如果是 CORS 錯誤，提供更友善的錯誤信息
      let errorMessage = error.message;
      if (
        error.message.includes("CORS") ||
        error.message.includes("Failed to fetch")
      ) {
        errorMessage =
          "網路連接受限或服務暫時無法使用。在開發環境中，這是正常現象。";
      }

      return {
        success: false,
        error: errorMessage,
        message: "同步服務無法連接",
      };
    }
  }

  /**
   * 發送 HTTP 請求到 Google Sheets
   * @param {Object} data 要發送的資料
   * @returns {Promise<Object>} 回應結果
   */
  async sendToSheets(data) {
    try {
      // 根據 GAS 代碼調整請求格式
      const requestBody = {
        name: data.name || "",
        lineId: data.lineId || "",
        email: data.email || "",
        message: data.message || "",
        timestamp: data.timestamp || new Date().toISOString(),
        source: data.source || "website",
        status: data.status || "pending",
      };

      // 嘗試不同的請求方式來避免 CORS 問題
      let response;
      const isDevelopment = process.env.NODE_ENV === "development";

      if (isDevelopment) {
        // 開發環境：優先嘗試 GET 方式避免 CORS 問題
        logger.info("開發環境：嘗試使用 GET 方式發送請求");

        try {
          return await this.sendToSheetsViaGet(data);
        } catch (getError) {
          logger.warn("GET 方式失敗，嘗試其他方法", {
            error: getError.message,
          });
          // 繼續嘗試其他方法
        }
      }

      // 標準請求方式
      response = await fetch(this.sheetsConfig.url, {
        method: this.sheetsConfig.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(this.sheetsConfig.timeout),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();

      if (result.success) {
        logger.info("資料成功同步至 Google Sheets:", {
          timestamp: data.timestamp,
          status: result.status,
        });
        return { success: true, data: result };
      } else {
        throw new Error(result.error || "同步失敗");
      }
    } catch (error) {
      // 檢查是否為開發環境的 CORS 錯誤
      const isDevelopment = process.env.NODE_ENV === "development";
      if (
        isDevelopment &&
        (error.message.includes("CORS") ||
          error.message.includes("Failed to fetch") ||
          error.name === "TypeError")
      ) {
        logger.error("開發環境 CORS 限制：無法同步到 Google Sheets", {
          originalError: error.message,
          suggestion: "請在生產環境中測試，或設置本地代理服務器",
        });

        // 返回失敗狀態而不是模擬成功
        throw new Error(`開發環境 CORS 限制：${error.message}`);
      }

      logger.error("同步到 Google Sheets 失敗:", error);
      throw error;
    }
  }

  /**
   * 從 Firestore 取得所有聯絡表單資料
   * @returns {Promise<Array>} 表單資料陣列
   */
  async getContactForms() {
    try {
      logger.info(`正在從 Firestore 集合 '${this.collectionName}' 取得資料...`);

      const contactFormsRef = collection(db, this.collectionName);
      const q = query(contactFormsRef, orderBy("createdAt", "desc"));

      logger.info("執行 Firestore 查詢...");
      const querySnapshot = await getDocs(q);

      const forms = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        logger.info(`找到文檔 ID: ${doc.id}`, {
          createdAt: docData.createdAt,
          name: docData.name,
          email: docData.email,
        });
        forms.push({
          id: doc.id,
          ...docData,
        });
      });

      logger.info(`從 Firestore 取得 ${forms.length} 筆表單資料`);

      // 如果沒有找到資料，讓我們檢查是否有其他可能的集合名稱
      if (forms.length === 0) {
        logger.warn("未找到任何資料，檢查可能的原因：");
        logger.warn("1. 檢查 Firebase 專案連接是否正確");
        logger.warn("2. 檢查是否有實際的表單提交資料");
        logger.warn("3. 檢查 Firestore 安全規則是否允許讀取");

        // 讓我們嘗試列出所有集合（僅在開發環境）
        if (process.env.NODE_ENV === "development") {
          logger.info("開發環境：檢查 Firestore 連接狀態...");
          try {
            // 嘗試簡單的讀取操作來測試連接
            const testRef = collection(db, this.collectionName);
            await getDocs(testRef);
            logger.info("Firestore 連接正常，但集合為空或無權限讀取");
          } catch (testError) {
            logger.error("Firestore 連接測試失敗:", testError);
          }
        }
      }

      return forms;
    } catch (error) {
      logger.error("從 Firestore 取得資料失敗:", error);
      throw error;
    }
  }

  /**
   * 同步單筆資料到 Google Sheets
   * @param {Object} formData 表單資料
   * @returns {Promise<Object>} 同步結果
   */
  async syncFormToSheets(formData) {
    try {
      // 格式化資料為 Google Sheets 格式
      const sheetsData = {
        timestamp:
          formData.createdAt?.toDate?.() ||
          formData.createdAt ||
          new Date().toISOString(),
        name: formData.name || "",
        email: formData.email || "",
        lineId: formData.lineId || "",
        message: formData.message || "",
        source: formData.source || "website",
        status: formData.status || "pending",
        url: formData.url || "",
        userAgent: formData.userAgent || "",
        referrer: formData.referrer || "",
      };

      const result = await this.sendToSheets(sheetsData);

      logger.info("單筆資料同步成功:", {
        formId: formData.id,
        name: formData.name,
        email: formData.email,
      });

      return result;
    } catch (error) {
      logger.error("單筆資料同步失敗:", {
        formId: formData.id,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * 批次同步資料到 Google Sheets
   * @param {Array} forms 表單資料陣列
   * @param {Function} onProgress 進度回調函數
   * @returns {Promise<Object>} 同步結果統計
   */
  async batchSyncToSheets(forms, onProgress) {
    const results = {
      total: forms.length,
      success: 0,
      failed: 0,
      errors: [],
    };

    logger.info(`開始批次同步 ${forms.length} 筆資料到 Google Sheets`);

    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];

      try {
        await this.syncFormToSheets(form);
        results.success++;

        // 調用進度回調
        if (onProgress) {
          onProgress({
            current: i + 1,
            total: forms.length,
            success: results.success,
            failed: results.failed,
          });
        }

        // 避免請求過於頻繁，每次請求間隔 500ms
        if (i < forms.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        results.failed++;
        results.errors.push({
          formId: form.id,
          name: form.name,
          error: error.message,
        });

        logger.error(`表單 ${form.id} 同步失敗:`, error);
      }
    }

    logger.info("批次同步完成:", results);
    return results;
  }

  /**
   * 主要同步函數：從 Firestore 同步所有資料到 Google Sheets
   * @param {Function} onProgress 進度回調函數
   * @returns {Promise<Object>} 同步結果
   */
  async syncToSheets(onProgress) {
    try {
      const isDevelopment = process.env.NODE_ENV === "development";

      if (isDevelopment) {
        logger.warn("開發環境模式：同步功能將模擬執行以避免 CORS 問題");
      }

      logger.info("開始從 Firestore 同步資料到 Google Sheets");

      // 1. 從 Firestore 取得所有表單資料
      const forms = await this.getContactForms();

      if (forms.length === 0) {
        logger.info("沒有資料需要同步");

        // 在開發環境中提供更多診斷信息
        if (isDevelopment) {
          logger.info("開發環境診斷：請檢查以下項目：");
          logger.info("1. 是否有聯絡表單提交記錄");
          logger.info("2. 檢查 Firebase 專案設定是否正確");
          logger.info("3. 檢查 Firestore 安全規則");
          logger.info("4. 可以查看管理後台的聯絡表單頁面確認是否有資料");
        }

        return {
          success: true,
          message: "沒有資料需要同步",
          results: { total: 0, success: 0, failed: 0, errors: [] },
        };
      }

      // 2. 批次同步到 Google Sheets
      const results = await this.batchSyncToSheets(forms, onProgress);

      let message = `同步完成！成功: ${results.success}/${results.total}`;
      if (isDevelopment && results.success > 0) {
        message += " (開發環境模擬)";
      }

      if (results.failed > 0) {
        logger.warn(message, { errors: results.errors });
      } else {
        logger.info(message);
      }

      return {
        success: results.failed === 0,
        message,
        results,
      };
    } catch (error) {
      const errorMessage = `同步過程發生錯誤: ${error.message}`;
      logger.error(errorMessage, error);

      return {
        success: false,
        message: errorMessage,
        error: error.message,
      };
    }
  }

  /**
   * 測試 Google Sheets 連線 - 使用簡單的 GET 請求避免 CORS 問題
   * @returns {Promise<boolean>} 連線測試結果
   */
  async testConnection() {
    try {
      // 構建一個包含測試資料的 URL 參數
      const testParams = new URLSearchParams({
        name: "Connection Test",
        email: "test@bright-edu.com",
        lineId: "",
        message: "這是連接測試",
        timestamp: new Date().toISOString(),
      });

      const testUrl = `${this.sheetsConfig.url}?${testParams.toString()}`;

      logger.info("嘗試使用 GET 方式測試 Google Sheets 連接...");

      // 使用 GET 請求，這樣比較不會有 CORS 問題
      await fetch(testUrl, {
        method: "GET",
        mode: "no-cors", // 使用 no-cors 模式
      });

      logger.info("Google Sheets 連線測試完成（no-cors 模式）");

      // 在 no-cors 模式下，我們無法檢查回應，但請求應該已經發送
      return true;
    } catch (error) {
      logger.error("Google Sheets 連線測試失敗:", error);
      return false;
    }
  }

  /**
   * 使用 GET 請求方式發送資料到 Google Sheets（避免 CORS 問題）
   * @param {Object} data 要發送的資料
   * @returns {Promise<Object>} 回應結果
   */
  async sendToSheetsViaGet(data) {
    try {
      // 將資料轉換為 URL 參數，格式與 GAS 代碼匹配
      const params = new URLSearchParams({
        name: data.name || "",
        lineId: data.lineId || "",
        email: data.email || "",
        message: data.message || "",
        // 額外的除錯資訊，但不是 GAS 主要處理的欄位
        timestamp: data.timestamp || new Date().toISOString(),
        source: data.source || "website",
        status: data.status || "pending",
      });

      const getUrl = `${this.sheetsConfig.url}?${params.toString()}`;

      logger.info("使用 GET 方式發送資料到 Google Sheets...", {
        name: data.name,
        email: data.email,
        url: getUrl.substring(0, 100) + "...", // 只顯示前100個字符
      });

      // 使用 GET 請求搭配 no-cors 模式
      await fetch(getUrl, {
        method: "GET",
        mode: "no-cors",
      });

      logger.info("GET 請求已發送到 Google Sheets");

      // 在 no-cors 模式下，我們無法檢查實際的回應狀態
      // 但如果沒有拋出錯誤，通常表示請求已發送
      return {
        success: true,
        data: {
          status: "get-request-sent",
          message: "使用 GET 方式發送資料",
          method: "GET",
        },
      };
    } catch (error) {
      logger.error("GET 方式發送失敗:", {
        error: error.message,
        url: this.sheetsConfig.url,
        suggestion:
          error.message.includes("404") || error.message.includes("Not Found")
            ? "請檢查 Google Apps Script 是否正確部署，URL 是否正確"
            : "請檢查網路連接和 Google Apps Script 設定",
      });
      throw new Error(`GET 請求失敗: ${error.message}`);
    }
  }

  /**
   * 啟動自動同步功能
   * @param {number} intervalHours - 同步間隔（小時）
   * @returns {boolean} 是否成功啟動
   */
  startAutoSync(intervalHours = 3) {
    try {
      // 如果已經啟動，先停止現有的定時器
      if (this.autoSync.enabled) {
        this.stopAutoSync();
      }

      this.autoSync.intervalHours = intervalHours;
      this.autoSync.enabled = true;
      this.autoSync.retryCount = 0;

      // 設定定時器（轉換為毫秒）
      const intervalMs = intervalHours * 60 * 60 * 1000;

      this.autoSync.intervalId = setInterval(async () => {
        await this.performAutoSync();
      }, intervalMs);

      // 記錄啟動時間
      this.autoSync.lastSyncTime = new Date();

      logger.info(`自動同步已啟動，每 ${intervalHours} 小時執行一次`, {
        nextSyncTime: new Date(Date.now() + intervalMs).toLocaleString(),
        intervalHours,
      });

      // 將設定儲存到 localStorage
      this.saveAutoSyncSettings();

      return true;
    } catch (error) {
      logger.error("啟動自動同步失敗:", error);
      return false;
    }
  }

  /**
   * 停止自動同步功能
   */
  stopAutoSync() {
    if (this.autoSync.intervalId) {
      clearInterval(this.autoSync.intervalId);
      this.autoSync.intervalId = null;
    }

    this.autoSync.enabled = false;
    this.autoSync.retryCount = 0;

    logger.info("自動同步已停止");

    // 更新 localStorage 設定
    this.saveAutoSyncSettings();
  }

  /**
   * 執行自動同步（內部方法）
   */
  async performAutoSync() {
    try {
      logger.info("🔄 開始執行自動同步...");

      // 檢查服務健康狀態
      const healthCheck = await this.checkHealth();
      if (
        !healthCheck.success &&
        healthCheck.error &&
        !healthCheck.error.includes("開發環境") &&
        !healthCheck.error.includes("CORS")
      ) {
        throw new Error(`服務健康檢查失敗: ${healthCheck.error}`);
      }

      // 執行同步
      const result = await this.syncToSheets();

      // 重置重試計數
      this.autoSync.retryCount = 0;
      this.autoSync.lastSyncTime = new Date();

      logger.info("✅ 自動同步完成", {
        總筆數: result.results.total,
        成功: result.results.success,
        失敗: result.results.failed,
        時間: new Date().toLocaleString(),
      });

      // 保存最後同步時間
      this.saveAutoSyncSettings();

      return result;
    } catch (error) {
      this.autoSync.retryCount++;

      logger.error(
        `❌ 自動同步失敗 (嘗試 ${this.autoSync.retryCount}/${this.autoSync.maxRetries})`,
        {
          error: error.message,
          時間: new Date().toLocaleString(),
        }
      );

      // 如果重試次數達到上限，停止自動同步
      if (this.autoSync.retryCount >= this.autoSync.maxRetries) {
        logger.error("⚠️ 自動同步重試次數達到上限，已停止自動同步");
        this.stopAutoSync();

        // 可以在這裡添加通知機制，例如發送郵件或推送通知
        this.notifyAutoSyncFailure(error);
      }

      throw error;
    }
  }

  /**
   * 獲取自動同步狀態
   */
  getAutoSyncStatus() {
    const nextSyncTime =
      this.autoSync.enabled && this.autoSync.lastSyncTime
        ? new Date(
            this.autoSync.lastSyncTime.getTime() +
              this.autoSync.intervalHours * 60 * 60 * 1000
          )
        : null;

    return {
      enabled: this.autoSync.enabled,
      intervalHours: this.autoSync.intervalHours,
      lastSyncTime: this.autoSync.lastSyncTime,
      nextSyncTime,
      retryCount: this.autoSync.retryCount,
      maxRetries: this.autoSync.maxRetries,
    };
  }

  /**
   * 保存自動同步設定到 localStorage
   */
  saveAutoSyncSettings() {
    try {
      const settings = {
        enabled: this.autoSync.enabled,
        intervalHours: this.autoSync.intervalHours,
        lastSyncTime: this.autoSync.lastSyncTime,
        retryCount: this.autoSync.retryCount,
      };

      localStorage.setItem("autoSyncSettings", JSON.stringify(settings));
    } catch (error) {
      logger.warn("無法保存自動同步設定:", error);
    }
  }

  /**
   * 從 localStorage 載入自動同步設定
   */
  loadAutoSyncSettings() {
    try {
      const settingsStr = localStorage.getItem("autoSyncSettings");
      if (settingsStr) {
        const settings = JSON.parse(settingsStr);

        this.autoSync.intervalHours = settings.intervalHours || 3;
        this.autoSync.retryCount = settings.retryCount || 0;
        this.autoSync.lastSyncTime = settings.lastSyncTime
          ? new Date(settings.lastSyncTime)
          : null;

        // 如果之前啟用了自動同步，重新啟動
        if (settings.enabled) {
          return this.startAutoSync(this.autoSync.intervalHours);
        }
      }
    } catch (error) {
      logger.warn("無法載入自動同步設定:", error);
    }
    return false;
  }

  /**
   * 通知自動同步失敗（可以擴展為郵件通知等）
   */
  notifyAutoSyncFailure(error) {
    // 這裡可以實現各種通知方式
    logger.error("🚨 自動同步服務需要注意", {
      原因: "連續失敗次數達到上限",
      錯誤: error.message,
      建議: "請檢查網路連線和 Google Apps Script 服務狀態",
      時間: new Date().toLocaleString(),
    });

    // 未來可以添加：
    // - 發送郵件通知
    // - 推送通知
    // - Slack 通知等
  }

  /**
   * 手動觸發同步並重置自動同步狀態
   */
  async triggerManualSync() {
    try {
      // 如果有自動同步正在運行，重置重試計數
      if (this.autoSync.enabled) {
        this.autoSync.retryCount = 0;
      }

      const result = await this.syncToSheets();

      // 更新最後同步時間
      if (this.autoSync.enabled) {
        this.autoSync.lastSyncTime = new Date();
        this.saveAutoSyncSettings();
      }

      return result;
    } catch (error) {
      // 手動同步失敗不影響自動同步計數
      throw error;
    }
  }
}

// 創建並導出單例實例
const firestoreToSheetsSync = new FirestoreToSheetsSync();

// 載入自動同步設定（如果有的話）
firestoreToSheetsSync.loadAutoSyncSettings();

export default firestoreToSheetsSync;

// 也導出類別供測試使用
export { FirestoreToSheetsSync };

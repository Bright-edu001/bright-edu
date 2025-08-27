// Google Sheets 同步服務配置
// 統一管理同步服務的端點和 API 金鑰

// 生產環境的 Cloud Run 服務
const PRODUCTION_CONFIG = {
  SYNC_SERVICE_URL:
    process.env.REACT_APP_SYNC_SERVICE_URL ||
    "https://bright-edu-sync-156805168089.asia-east1.run.app",
  API_KEY: process.env.REACT_APP_SYNC_API_KEY,
  HEALTH_CHECK_URL: `${
    process.env.REACT_APP_SYNC_SERVICE_URL ||
    "https://bright-edu-sync-156805168089.asia-east1.run.app"
  }/api/health`,
};

// 開發環境的本地服務（如果需要）
const DEVELOPMENT_CONFIG = {
  SYNC_SERVICE_URL:
    process.env.REACT_APP_DEV_SYNC_SERVICE_URL || "http://localhost:3002",
  API_KEY: process.env.REACT_APP_SYNC_API_KEY,
  HEALTH_CHECK_URL: `${
    process.env.REACT_APP_DEV_SYNC_SERVICE_URL || "http://localhost:3002"
  }/api/health`,
};

// 根據環境選擇配置
const isDevelopment =
  process.env.NODE_ENV === "development" &&
  window.location.hostname === "localhost";

const config = isDevelopment ? DEVELOPMENT_CONFIG : PRODUCTION_CONFIG;

// 驗證必要的環境變數
if (!config.API_KEY) {
  console.error("❌ 缺少必要的環境變數 REACT_APP_SYNC_API_KEY");
  throw new Error("同步服務配置錯誤：缺少 API 金鑰環境變數");
}

// 導出同步服務配置
export const SYNC_CONFIG = {
  ...config,
  // 通用設定
  TIMEOUT: 30000, // 30秒超時
  RETRY_ATTEMPTS: 3,
};

// 同步服務 API 呼叫函數
export const syncGoogleSheets = async () => {
  try {
    console.log("🔄 開始同步 Google Sheets...");

    const response = await fetch(
      `${SYNC_CONFIG.SYNC_SERVICE_URL}/api/sync-google-sheets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": SYNC_CONFIG.API_KEY,
        },
        timeout: SYNC_CONFIG.TIMEOUT,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const result = await response.json();

    if (result.success) {
      console.log("✅ 同步完成:", result);
      return {
        success: true,
        count: result.count,
        message: result.message,
      };
    } else {
      console.error("❌ 同步失敗:", result);
      throw new Error(result.message || "同步失敗");
    }
  } catch (error) {
    console.error("❌ 同步服務請求失敗:", error);
    throw error;
  }
};

// 健康檢查函數
export const checkSyncServiceHealth = async () => {
  try {
    const response = await fetch(SYNC_CONFIG.HEALTH_CHECK_URL, {
      timeout: 5000, // 5秒超時
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, error: "Service unavailable" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 帶重試機制的同步函數
export const syncWithRetry = async (
  maxRetries = SYNC_CONFIG.RETRY_ATTEMPTS
) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 同步嘗試 ${attempt}/${maxRetries}`);
      return await syncGoogleSheets();
    } catch (error) {
      lastError = error;
      console.warn(`❌ 同步嘗試 ${attempt} 失敗:`, error.message);

      if (attempt < maxRetries) {
        // 指數退避延遲
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        console.log(`⏱️ ${delay}ms 後重試...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};

export default SYNC_CONFIG;

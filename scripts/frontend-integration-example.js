// Google Sheets 同步服務前端整合範例
// 適用於管理介面的 API 調用
//
// 注意：此文件包含不同框架的範例代碼，使用時請根據實際框架進行調整
// React 和 Vue 範例需要在對應的項目環境中使用
/* global React */

const SYNC_SERVICE_URL =
  "https://bright-edu-sync-156805168089.asia-east1.run.app";
const API_KEY = "bright-edu-sync-2024-secure-key";

/**
 * 檢查同步服務健康狀態
 */
async function checkSyncServiceHealth() {
  try {
    const response = await fetch(`${SYNC_SERVICE_URL}/api/health`);
    const data = await response.json();

    if (response.ok) {
      console.log("✅ 同步服務狀態正常:", data.message);
      return { success: true, data };
    } else {
      console.error("❌ 同步服務狀態異常:", data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error("❌ 同步服務連接失敗:", error);
    return { success: false, error: error.message };
  }
}

/**
 * 執行 Google Sheets 同步
 * 只有具備 API 金鑰的管理員可以調用
 */
async function syncGoogleSheets() {
  try {
    console.log("🔄 開始同步 Google Sheets...");

    const response = await fetch(`${SYNC_SERVICE_URL}/api/sync-google-sheets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ 同步完成:", data);
      return {
        success: true,
        count: data.count,
        message: data.message,
      };
    } else {
      console.error("❌ 同步失敗:", data);
      return {
        success: false,
        error: data.error,
        message: data.message,
      };
    }
  } catch (error) {
    console.error("❌ 同步服務請求失敗:", error);
    return {
      success: false,
      error: "NETWORK_ERROR",
      message: error.message,
    };
  }
}

/**
 * 帶有 UI 反饋的同步函數
 * 適合整合到管理介面按鈕點擊事件
 */
async function handleSyncButtonClick() {
  // 檢查服務狀態
  const healthCheck = await checkSyncServiceHealth();
  if (!healthCheck.success) {
    // eslint-disable-next-line no-alert
    alert("同步服務目前無法使用，請稍後再試");
    return;
  }

  // 確認執行同步
  // eslint-disable-next-line no-restricted-globals
  if (!confirm("確定要執行 Google Sheets 同步嗎？這可能需要幾秒鐘時間。")) {
    return;
  }

  // 顯示載入狀態
  const button = document.getElementById("sync-button");
  if (!button) {
    console.error("找不到同步按鈕元素");
    return;
  }

  const originalText = button.textContent;
  button.textContent = "同步中...";
  button.disabled = true;

  try {
    // 執行同步
    const result = await syncGoogleSheets();

    if (result.success) {
      // eslint-disable-next-line no-alert
      alert(`同步完成！${result.message}`);
    } else {
      if (
        result.error === "MISSING_API_KEY" ||
        result.error === "INVALID_API_KEY"
      ) {
        // eslint-disable-next-line no-alert
        alert("認證失敗：無效的 API 金鑰");
      } else {
        // eslint-disable-next-line no-alert
        alert(`同步失敗：${result.message}`);
      }
    }
  } finally {
    // 恢復按鈕狀態
    button.textContent = originalText;
    button.disabled = false;
  }
}

// React 組件範例（需要在 React 項目中使用）
// eslint-disable-next-line no-unused-vars
function SyncButton() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastSyncTime, setLastSyncTime] = React.useState(null);

  const handleSync = async () => {
    setIsLoading(true);

    try {
      const result = await syncGoogleSheets();

      if (result.success) {
        setLastSyncTime(new Date());
        console.log("同步完成:", result);
      } else {
        console.error("同步失敗:", result);
      }
    } catch (error) {
      console.error("同步錯誤:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return React.createElement("div", { className: "sync-button-container" }, [
    React.createElement(
      "button",
      {
        key: "button",
        onClick: handleSync,
        disabled: isLoading,
        className: "btn btn-primary",
      },
      isLoading ? "同步中..." : "同步 Google Sheets"
    ),

    lastSyncTime &&
      React.createElement(
        "div",
        {
          key: "time",
          className: "last-sync-time",
        },
        `上次同步：${lastSyncTime.toLocaleString()}`
      ),
  ]);
}

// Vue 組件範例（需要在 Vue 項目中使用）
// eslint-disable-next-line no-unused-vars
const SyncButtonVue = {
  data() {
    return {
      isLoading: false,
      lastSyncTime: null,
    };
  },

  methods: {
    async handleSync() {
      this.isLoading = true;

      try {
        const result = await syncGoogleSheets();

        if (result.success) {
          this.lastSyncTime = new Date();
          this.$emit("sync-complete", result);
        } else {
          this.$emit("sync-error", result);
        }
      } catch (error) {
        this.$emit("sync-error", {
          success: false,
          error: "NETWORK_ERROR",
          message: error.message,
        });
      } finally {
        this.isLoading = false;
      }
    },
  },

  template: `
    <div class="sync-button-container">
      <button 
        @click="handleSync"
        :disabled="isLoading"
        class="btn btn-primary"
      >
        {{ isLoading ? '同步中...' : '同步 Google Sheets' }}
      </button>
      
      <div v-if="lastSyncTime" class="last-sync-time">
        上次同步：{{ lastSyncTime.toLocaleString() }}
      </div>
    </div>
  `,
};

// 純 JavaScript 使用範例
function initializeSyncButton() {
  const button = document.getElementById("sync-button");
  if (button) {
    button.addEventListener("click", handleSyncButtonClick);
  }
}

// 檢查 DOM 載入完成後初始化
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSyncButton);
  } else {
    initializeSyncButton();
  }
}

// 導出函數供外部使用
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    checkSyncServiceHealth,
    syncGoogleSheets,
    handleSyncButtonClick,
    SyncButton,
    SyncButtonVue,
    SYNC_SERVICE_URL,
    API_KEY,
  };
}

// 如果在瀏覽器環境中，將函數添加到全局對象
if (typeof window !== "undefined") {
  window.BrightEduSync = {
    checkSyncServiceHealth,
    syncGoogleSheets,
    handleSyncButtonClick,
    SYNC_SERVICE_URL,
    API_KEY,
  };
}

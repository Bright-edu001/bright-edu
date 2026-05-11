import { useState } from "react";
import { message } from "antd";
import firestoreToSheetsSync from "../../services/firestoreToSheetsSync";

function useContactFormsManualSync({
  syncService = firestoreToSheetsSync,
  notify = message,
  authGuard = () => !!localStorage.getItem("isAuthenticated"),
  env = {
    nodeEnv: process.env.NODE_ENV,
    hostname: window.location.hostname,
  },
} = {}) {
  const [syncLoading, setSyncLoading] = useState(false);

  const handleSync = async () => {
    setSyncLoading(true);
    try {
      notify.loading({
        content: "正在將 Firestore 資料同步到 Google Sheets...",
        key: "sync",
        duration: 0,
      });

      // 檢查管理員身份驗證（基於 localStorage）
      if (!authGuard()) {
        throw new Error("請先登入管理後台");
      }

      // 檢查服務健康狀態
      console.log("🔍 開始檢查同步服務健康狀態...");
      const healthCheck = await syncService.checkHealth();

      if (!healthCheck.success) {
        console.warn("⚠️ 同步服務健康檢查失敗:", healthCheck.error);

        // 在開發環境中，如果是網路相關錯誤，給予警告但繼續執行
        const isDevelopment =
          env.nodeEnv === "development" || env.hostname === "localhost";

        if (
          isDevelopment &&
          (healthCheck.error.includes("網路連接受限") ||
            healthCheck.error.includes("CORS") ||
            healthCheck.error.includes("Failed to fetch"))
        ) {
          console.warn(
            "🚧 開發環境檢測到網路限制，將繼續執行同步（可能會失敗）",
          );
          notify.warning({
            content: "開發環境：跳過網路連接檢查",
            key: "sync",
            duration: 2,
          });
        } else {
          // 提供更具體的錯誤信息
          let errorMessage = "同步服務目前無法使用";
          if (healthCheck.error.includes("連接超時")) {
            errorMessage = "連接同步服務超時，請檢查網路連線";
          } else if (healthCheck.error.includes("ERR_CONNECTION_REFUSED")) {
            errorMessage = "無法連接到同步服務，服務可能暫時維護中";
          } else if (healthCheck.error) {
            errorMessage = `同步服務錯誤: ${healthCheck.error}`;
          }
          throw new Error(errorMessage);
        }
      } else {
        console.log("✅ 同步服務健康檢查通過，開始執行同步...");
      }

      // 執行從 Firestore 到 Google Sheets 的同步
      const result = await syncService.triggerManualSync();

      // 處理同步結果
      if (result.results.total === 0) {
        console.log("📝 Firestore 中沒有資料需要同步");
        notify.success({
          content: "Firestore 中沒有資料需要同步",
          key: "sync",
          duration: 4,
        });
      } else if (result.results.success > 0) {
        console.log(
          `📤 成功同步 ${result.results.success} 筆資料到 Google Sheets`,
        );

        if (result.results.failed > 0) {
          notify.warning({
            content: `同步完成！成功 ${result.results.success} 筆，失敗 ${result.results.failed} 筆`,
            key: "sync",
            duration: 6,
          });
        } else {
          notify.success({
            content: `同步完成！成功將 ${result.results.success} 筆資料同步到 Google Sheets`,
            key: "sync",
            duration: 4,
          });
        }
      } else {
        console.log("⚠️ 同步過程中發生錯誤");
        notify.error({
          content: result.message || "同步過程中發生錯誤",
          key: "sync",
          duration: 4,
        });
      }
    } catch (error) {
      console.error("同步 Firestore 到 Google Sheets 失敗:", error);
      notify.error({
        content: error.message || "同步失敗，請檢查網路連線或聯絡系統管理員",
        key: "sync",
        duration: 4,
      });
    } finally {
      setSyncLoading(false);
    }
  };

  return {
    syncLoading,
    handleSync,
  };
}

export default useContactFormsManualSync;

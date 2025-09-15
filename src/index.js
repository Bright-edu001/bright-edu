// ===== React 及相關函式庫匯入 =====
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router"; // 匯入路由設定

// ===== 效能監控工具匯入 =====
import performanceMonitor from "./utils/performanceMonitor";

// ===== 日誌工具匯入 =====
import logger from "./utils/logger";

// ===== Firebase Analytics 匯入 =====
import { analytics } from "./config/firebaseConfig";
import { logEvent } from "firebase/analytics";

// ===== 全域字體與關鍵 CSS =====
import "./styles/critical.css";

// ===== Firebase 服務初始化 =====
import { initializeServices } from "./config/firebaseConfig";

// ===== 初始化 Sentry（僅限生產環境） =====
if (process.env.NODE_ENV === "production") {
  // Sentry 用於前端錯誤監控與追蹤
  const Sentry = require("@sentry/react");
  const { BrowserTracing } = require("@sentry/tracing");
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN, // 從環境變數取得 DSN
    integrations: [new BrowserTracing()], // 啟用瀏覽器追蹤
    tracesSampleRate: 1.0, // 100% 追蹤率（可依需求調整）
  });
}

// （已刪除開發期大量偵錯補丁：HookOutsideRender / Promise null tracing / 全域 unhandledrejection 攔截）

// ===== 移除舊的 Service Worker（避免快取干擾） =====
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister(); // 逐一註銷所有已註冊的 Service Worker
      }
    })
    .catch(function (err) {
      logger.error("Service Worker 註銷失敗: ", err);
    });
}

// ===== 初始化效能監控 =====
performanceMonitor.init();
// ===== 記錄頁面載入事件到 Firebase Analytics =====
logEvent(analytics, "page_load");

// ===== React 應用程式掛載入口 =====
const root = ReactDOM.createRoot(document.getElementById("root"));

// 初始化 Firebase 服務，然後渲染應用
initializeServices()
  .then(() => {
    logger.info("[Bootstrap] Firebase 服務初始化成功，開始渲染應用。");
    root.render(<RouterProvider router={router} />);
  })
  .catch((error) => {
    logger.error("[Bootstrap] Firebase 服務初始化失敗:", error);
    // 即使初始化失敗，也嘗試渲染應用，但可能會出現功能異常
    root.render(
      <div>
        <h1>應用程式初始化失敗</h1>
        <p>很抱歉，載入時發生嚴重錯誤，請稍後再試。</p>
      </div>
    );
  });

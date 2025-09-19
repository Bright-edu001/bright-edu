// ===== React 及相關函式庫匯入 =====
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router"; // 匯入路由設定

// ===== 效能監控工具匯入 =====
import performanceMonitor from "./utils/performanceMonitor";

// ===== 日誌工具匯入 =====
import logger from "./utils/logger";

// ===== Firebase Analytics 匯入（使用新模組化結構）=====
import { logAnalyticsEvent } from "./config/analyticsClient";

// ===== 全域字體與關鍵 CSS =====
import "./styles/critical.css";

// ===== Firebase 初始化 Context =====
import { FirebaseInitProvider } from "./context/FirebaseInitContext";

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

// ===== 記錄頁面載入事件到 Firebase Analytics（安全調用）=====
try {
  logAnalyticsEvent("page_load").catch((error) => {
    logger.debug(
      "[Bootstrap] Analytics 事件記錄失敗，但不影響應用運行:",
      error
    );
  });
} catch (error) {
  logger.debug("[Bootstrap] Analytics 事件調用失敗，但不影響應用運行:", error);
}

// ===== React 應用程式掛載入口 =====
const root = ReactDOM.createRoot(document.getElementById("root"));

// 立即渲染應用，Firebase 會在背景初始化
logger.info("[Bootstrap] 開始渲染應用，Firebase 將在背景初始化。");

root.render(
  <FirebaseInitProvider>
    <RouterProvider router={router} />
  </FirebaseInitProvider>
);

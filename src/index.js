import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router"; // 引入新的路由設定

// 引入性能監控
import performanceMonitor from "./utils/performanceMonitor";

// 引入日誌工具
import logger from "./utils/logger";

// 引入關鍵 CSS
import "./styles/critical.css";

// 初始化 Sentry（僅在生產環境）
if (process.env.NODE_ENV === "production") {
  const Sentry = require("@sentry/react");
  const { BrowserTracing } = require("@sentry/tracing");
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

// 移除舊的 Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    })
    .catch(function (err) {
      logger.error("Service Worker unregistration failed: ", err);
    });
}

// 初始化性能監控
performanceMonitor.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

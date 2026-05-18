// ===== React 及相關函式庫匯入 =====
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router"; // 匯入路由設定

// ===== 日誌工具匯入 =====
import logger from "./utils/logger";

// ===== 全域字體與關鍵 CSS（優先載入）=====
// import "./styles/critical.css";

// ===== Firebase 初始化 Context（優化版）=====
import { FirebaseInitProvider } from "./context/FirebaseInitContext";

// ===== React Query =====
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 分鐘
      gcTime: 1000 * 60 * 30, // 30 分鐘
      retry: 2,
      refetchOnWindowFocus: false, // 可依需求開啟
    },
  },
});

// ===== 優化版 Sentry 初始化（非阻塞）=====
const initializeSentryOptimized = () => {
  if (process.env.NODE_ENV !== "production") return;

  // 實際初始化邏輯：BrowserTracing 從 @sentry/tracing 取得（v7 不從 @sentry/react re-export）
  const doInit = async () => {
    try {
      const [{ default: Sentry }, { BrowserTracing }] = await Promise.all([
        import("@sentry/react"),
        import("@sentry/tracing"),
      ]);

      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        integrations: [new BrowserTracing()],
        tracesSampleRate: 0.1, // 降低到 10% 減少性能影響
        environment: process.env.NODE_ENV,
        beforeSend(event) {
          // 過濾掉不重要的錯誤
          if (event.exception) {
            const error = event.exception.values?.[0];
            if (
              error?.value?.includes("ResizeObserver") ||
              error?.value?.includes("Non-Error promise rejection")
            ) {
              return null;
            }
          }
          return event;
        },
      });

      logger.info("[Sentry] 延遲初始化完成");
    } catch (error) {
      logger.warn("[Sentry] 初始化失敗:", error);
    }
  };

  // 瀏覽器空閒時才載入 Sentry，避免阻塞初始渲染；不支援 requestIdleCallback 的環境退回 setTimeout
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(doInit, { timeout: 5000 });
  } else {
    setTimeout(doInit, 2000);
  }
};

// ===== 優化版 Service Worker 清理（非阻塞）=====
const cleanupServiceWorkerOptimized = () => {
  if (!("serviceWorker" in navigator)) return;

  // 非阻塞清理
  setTimeout(() => {
    navigator.serviceWorker
      .getRegistrations()
      .then(function (registrations) {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      })
      .catch(function (err) {
        logger.debug("Service Worker 註銷失敗: ", err);
      });
  }, 1000);
};

// ===== 優化版效能監控（延遲載入）=====
const initializePerformanceMonitorOptimized = () => {
  setTimeout(async () => {
    try {
      const { default: performanceMonitor } =
        await import("./utils/performanceMonitor");
      performanceMonitor.init();
      logger.info("[Performance] 延遲初始化完成");
    } catch (error) {
      logger.debug("[Performance] 初始化失敗:", error);
    }
  }, 3000); // 3秒後初始化
};

// ===== 優化版 Analytics（延遲載入）=====
const initializeAnalyticsOptimized = () => {
  setTimeout(async () => {
    try {
      const { logAnalyticsEvent } = await import("./config/analyticsClient");
      await logAnalyticsEvent("page_load");
      logger.info("[Analytics] 延遲事件記錄完成");
    } catch (error) {
      logger.debug("[Analytics] 事件記錄失敗:", error);
    }
  }, 1500); // 1.5秒後記錄
};

// ===== 開始優化初始化 =====
logger.info("[Bootstrap] 開始優化版應用載入");

// 立即開始非關鍵服務的初始化（不阻塞渲染）
initializeSentryOptimized();
cleanupServiceWorkerOptimized();
initializePerformanceMonitorOptimized();
initializeAnalyticsOptimized();

// ===== React 應用程式掛載入口 =====
const root = ReactDOM.createRoot(document.getElementById("root"));

// 立即渲染應用，所有 Firebase 服務都在背景初始化
logger.info("[Bootstrap] 立即開始渲染，Firebase 在背景初始化");

root.render(
  <FirebaseInitProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      />
    </QueryClientProvider>
  </FirebaseInitProvider>,
);

// ===== 預載入關鍵資源（非阻塞）=====
setTimeout(() => {
  // 預載入關鍵路由組件
  import("./pages/Home/Home").catch(() => {});
}, 100);

logger.info("[Bootstrap] 優化版應用載入完成");

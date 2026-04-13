/* eslint-disable no-console */
// 簡易日誌工具：開發環境輸出 console log，正式環境將重要日誌發送到 Sentry

// 判斷目前是否為開發環境
const isDevelopment = process.env.NODE_ENV === "development";

// 取得已被 index.jsx 初始化的 Sentry singleton（ESM 環境不可用 require()）
// Sentry.init() 呼叫後，@sentry/react 會將自身掛載到 module 快取；
// 此處透過 dynamic import 延遲取得，避免在模組初始化時同步 require
const getSentry = (() => {
  let cached = null;
  return async () => {
    if (cached) return cached;
    try {
      cached = await import("@sentry/react");
    } catch {
      cached = null;
    }
    return cached;
  };
})();

// logger 物件，提供 log/info/warn/error 四種日誌方法
const logger = {
  // 一般訊息，僅在開發環境輸出
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  // 資訊訊息，僅在開發環境輸出
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  // 警告訊息，開發環境輸出 console，正式環境發送到 Sentry
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    } else {
      getSentry().then((Sentry) => {
        if (!Sentry) return;
        const message = args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg) : String(arg),
          )
          .join(" ");
        Sentry.captureMessage(message, "warning");
      });
    }
  },
  // 錯誤訊息，開發環境輸出 console，正式環境發送到 Sentry
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    } else {
      getSentry().then((Sentry) => {
        if (!Sentry) return;
        const errorMessage = args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg) : String(arg),
          )
          .join(" ");
        if (args[0] instanceof Error) {
          Sentry.captureException(args[0]);
        } else {
          Sentry.captureMessage(errorMessage, "error");
        }
      });
    }
  },
  // 除錯訊息，僅在開發環境輸出
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
  // 🔥 效能相關日誌，在所有環境都會記錄
  performance: (...args) => {
    console.log("🚀 [PERFORMANCE]", ...args);
  },
  // 🔥 表單送出相關的重要日誌，在所有環境都會記錄
  formSubmit: (...args) => {
    console.log("📝 [FORM_SUBMIT]", ...args);
  },
};

// 將 logger 物件導出，供其他模組使用
export default logger;

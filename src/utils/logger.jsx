/* eslint-disable no-console */
// 簡易日誌工具：開發環境輸出 console log，正式環境將重要日誌發送到 Sentry

// 判斷目前是否為開發環境
const isDevelopment = process.env.NODE_ENV === "development";

// 動態載入 Sentry（僅在正式環境）
let Sentry = null;
if (!isDevelopment) {
  try {
    Sentry = require("@sentry/react");
  } catch (error) {
    console.warn("Sentry not available:", error.message);
  }
}

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
    } else if (Sentry) {
      // 在正式環境中將警告發送到 Sentry
      const message = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" ");
      Sentry.captureMessage(message, "warning");
    }
  },
  // 錯誤訊息，開發環境輸出 console，正式環境發送到 Sentry
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
    } else if (Sentry) {
      // 在正式環境中將錯誤發送到 Sentry
      const errorMessage = args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg) : String(arg)
        )
        .join(" ");

      // 如果第一個參數是 Error 物件，直接捕獲
      if (args[0] instanceof Error) {
        Sentry.captureException(args[0]);
      } else {
        Sentry.captureMessage(errorMessage, "error");
      }
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

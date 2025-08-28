/* eslint-disable no-console */
// 簡易日誌工具：只在開發環境輸出 log，並統一不同日誌等級的寫法。

// 判斷目前是否為開發環境
const isDevelopment = process.env.NODE_ENV === "development";

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
  // 警告訊息，僅在開發環境輸出
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  // 錯誤訊息，僅在開發環境輸出
  error: (...args) => {
    if (isDevelopment) {
      console.error(...args);
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
module.exports = logger;

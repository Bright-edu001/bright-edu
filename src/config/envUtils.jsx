/**
 * Firebase 環境檢查工具
 * 將重複的 window 檢查和環境判斷邏輯封裝
 */

/**
 * 檢查是否為瀏覽器環境
 */
export const isBrowser = () => {
  return typeof window !== "undefined";
};

/**
 * 檢查是否為本地開發環境
 */
export const isLocalDevelopment = () => {
  if (!isBrowser()) return false;

  return (
    process.env.NODE_ENV === "development" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
};

/**
 * 檢查是否為 Firebase Hosting 環境
 */
export const isFirebaseHosting = () => {
  if (!isBrowser()) return false;

  const hostname = window.location.hostname;
  return (
    hostname.endsWith(".web.app") ||
    hostname.endsWith(".firebaseapp.com") ||
    hostname === "uicedu.org" ||
    hostname === "uic-mba.tw"
  );
};

/**
 * 檢查是否為生產環境
 */
export const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

/**
 * 獲取當前環境資訊
 */
export const getEnvironmentInfo = () => {
  const info = {
    isBrowser: isBrowser(),
    isLocalDev: isLocalDevelopment(),
    isFirebaseHosting: isFirebaseHosting(),
    isProduction: isProduction(),
  };

  if (isBrowser()) {
    info.hostname = window.location.hostname;
    info.protocol = window.location.protocol;
    info.userAgent = navigator.userAgent;
  }

  return info;
};

/**
 * 等待 DOM 完全載入
 */
export const waitForDOMReady = () => {
  if (!isBrowser()) return Promise.resolve();

  if (document.readyState === "loading") {
    return new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", resolve);
    });
  }

  return Promise.resolve();
};

/**
 * 等待特定的全域變數可用
 */
export const waitForGlobal = (globalName, timeout = 10000, interval = 500) => {
  if (!isBrowser()) return Promise.resolve(false);

  return new Promise((resolve) => {
    if (window[globalName]) {
      resolve(true);
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (window[globalName]) {
        clearInterval(checkInterval);
        resolve(true);
        return;
      }

      if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, interval);
  });
};

// 環境檢查工具
// 用於統一檢查開發/生產環境

export const isDevelopment = () => {
  // 檢查 NODE_ENV
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // 檢查是否在瀏覽器環境
  if (typeof window === "undefined") {
    return false;
  }

  // 檢查 hostname
  const hostname = window.location.hostname;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.endsWith(".local")
  );
};

export const isProduction = () => {
  return !isDevelopment();
};

export const isFirebaseHosting = () => {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;
  return (
    hostname.endsWith(".web.app") ||
    hostname.endsWith(".firebaseapp.com") ||
    hostname === "uicedu.org" ||
    hostname === "uic-mba.tw"
  );
};

export const shouldSkipAppCheck = () => {
  return isDevelopment() || (!isFirebaseHosting() && isProduction());
};

export const getEnvironmentInfo = () => {
  const info = {
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isFirebaseHosting: isFirebaseHosting(),
    shouldSkipAppCheck: shouldSkipAppCheck(),
  };

  if (typeof window !== "undefined") {
    info.hostname = window.location.hostname;
    info.protocol = window.location.protocol;
    info.userAgent = navigator.userAgent;
  }

  return info;
};

// Firebase Hosting 專用的 App Check 配置
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
} from "firebase/app-check";
import logger from "../utils/logger";

// Firebase 配置
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// 初始化 Firebase 應用程式
const app = initializeApp(firebaseConfig);

// 其他 Firebase 服務
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const functions = getFunctions(app, "asia-east1");

// Firebase Hosting 環境檢測
const isFirebaseHosting = () => {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;
  return (
    hostname.endsWith(".web.app") ||
    hostname.endsWith(".firebaseapp.com") ||
    hostname === "uicedu.org" ||
    hostname === "uic-mba.tw"
  );
};

// 改進的 App Check 初始化 - 特別針對 Firebase Hosting
let appCheck = null;

const initializeAppCheckForHosting = async () => {
  try {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      logger.warn("[AppCheck] 缺少 REACT_APP_RECAPTCHA_SITE_KEY");
      return null;
    }

    // 檢查是否在 Firebase Hosting 環境
    if (typeof window === "undefined") {
      logger.info("[AppCheck] 伺服器端渲染環境，跳過初始化");
      return null;
    }

    const currentHostname = window.location.hostname;
    logger.info(`[AppCheck] 當前域名: ${currentHostname}`);

    // Firebase Hosting 環境的特殊處理
    if (isFirebaseHosting()) {
      logger.info("[AppCheck] 檢測到 Firebase Hosting 環境");

      // 確保 DOM 完全載入
      if (document.readyState === "loading") {
        await new Promise((resolve) => {
          document.addEventListener("DOMContentLoaded", resolve);
        });
      }

      // 額外等待，確保 reCAPTCHA 腳本載入
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 檢查 reCAPTCHA 是否可用
      if (typeof window.grecaptcha === "undefined") {
        logger.warn("[AppCheck] reCAPTCHA 尚未載入，稍後重試");

        // 等待 reCAPTCHA 載入
        let retries = 5;
        while (retries > 0 && typeof window.grecaptcha === "undefined") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          retries--;
        }

        if (typeof window.grecaptcha === "undefined") {
          logger.error("[AppCheck] reCAPTCHA 載入失敗");
          return null;
        }
      }

      // 初始化 App Check
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });

      logger.info("[AppCheck] 在 Firebase Hosting 上成功初始化");

      // 立即測試 token 獲取
      try {
        await getToken(appCheck, false);
        logger.info("[AppCheck] 初始 token 獲取成功");
      } catch (tokenError) {
        logger.error("[AppCheck] 初始 token 獲取失敗:", tokenError);

        // 提供詳細的錯誤診斷
        await diagnoseAppCheckError(tokenError);
      }

      return appCheck;
    } else {
      // 非 Firebase Hosting 環境 (如 localhost)
      logger.info("[AppCheck] 非 Firebase Hosting 環境");

      if (currentHostname === "localhost" || currentHostname === "127.0.0.1") {
        // 本地開發環境使用 debug token
        window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        logger.info("[AppCheck] 本地環境啟用 debug token");
      }

      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });

      logger.info("[AppCheck] 本地環境初始化完成");
      return appCheck;
    }
  } catch (error) {
    logger.error("[AppCheck] 初始化失敗:", error);
    await diagnoseAppCheckError(error);
    return null;
  }
};

// App Check 錯誤診斷
const diagnoseAppCheckError = async (error) => {
  logger.group("[AppCheck] 錯誤診斷");

  try {
    // 基本資訊
    logger.info("錯誤代碼:", error.code);
    logger.info("錯誤訊息:", error.message);
    logger.info("當前域名:", window.location.hostname);
    logger.info(
      "reCAPTCHA 狀態:",
      typeof window.grecaptcha !== "undefined" ? "已載入" : "未載入"
    );

    // 根據錯誤類型提供建議
    switch (error.code) {
      case "app-check/recaptcha-error":
        logger.error("🚨 reCAPTCHA 配置錯誤:");
        logger.error("1. 檢查 Firebase Console > App Check 設定");
        logger.error("2. 確認 reCAPTCHA site key 正確");
        logger.error("3. 確認域名在 reCAPTCHA Console 白名單中");
        break;

      case "app-check/throttled":
        logger.warn("⏳ App Check 請求被節流");
        logger.info("解決方法: 等待 1-2 分鐘後重試");
        break;

      case "app-check/fetch-status-error":
        logger.error("🌐 網路連接問題");
        logger.info("檢查網路連接和 Firebase 服務狀態");
        break;

      default:
        logger.error("❓ 未知錯誤，建議檢查:");
        logger.error("1. Firebase 專案配置");
        logger.error("2. 網路連接");
        logger.error("3. reCAPTCHA 設定");
    }

    // 環境資訊
    logger.info("環境資訊:", {
      userAgent: navigator.userAgent,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
    });
  } catch (diagError) {
    logger.error("診斷過程發生錯誤:", diagError);
  } finally {
    logger.groupEnd();
  }
};

// 改進的 token 獲取函數
const fetchAppCheckToken = async (retries = 3, forceRefresh = false) => {
  if (!appCheck) {
    logger.warn("[AppCheck] App Check 未初始化");
    return null;
  }

  try {
    const token = await getToken(appCheck, forceRefresh);
    logger.info("[AppCheck] Token 獲取成功");
    return token;
  } catch (error) {
    logger.error("[AppCheck] Token 獲取失敗:", error);

    if (error.code === "app-check/throttled" && retries > 0) {
      const delay = Math.min(2000 * (4 - retries), 10000);
      logger.info(`[AppCheck] ${delay}ms 後重試 (剩餘 ${retries} 次)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchAppCheckToken(retries - 1, forceRefresh);
    }

    await diagnoseAppCheckError(error);
    return null;
  }
};

// 網路連接優化
const enableFirebaseNetwork = async () => {
  try {
    await enableNetwork(db);
    logger.info("🚀 Firebase 網路連接已啟用");
  } catch (error) {
    logger.warn("⚠️ Firebase 網路連接啟用失敗:", error);
  }
};

// 初始化所有服務
const initializeServices = async () => {
  try {
    logger.info("[Firebase] 開始初始化服務...");

    // 並行初始化 App Check 和網路連接
    const [appCheckResult] = await Promise.allSettled([
      initializeAppCheckForHosting(),
      enableFirebaseNetwork(),
    ]);

    if (appCheckResult.status === "fulfilled") {
      logger.info("[Firebase] App Check 初始化完成");
    } else {
      logger.error("[Firebase] App Check 初始化失敗:", appCheckResult.reason);
    }

    logger.info("[Firebase] 所有服務初始化完成");
  } catch (error) {
    logger.error("[Firebase] 服務初始化失敗:", error);
  }
};

// 延遲初始化
if (typeof window !== "undefined") {
  // 使用 requestIdleCallback 或 setTimeout 延遲初始化
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => initializeServices(), { timeout: 2000 });
  } else {
    setTimeout(initializeServices, 500);
  }
}

// Performance Monitoring
let perf;
if (typeof window !== "undefined") {
  import("firebase/performance")
    .then(({ getPerformance }) => {
      try {
        perf = getPerformance(app);
      } catch (err) {
        logger.warn("[Performance] 初始化失敗:", err);
      }
    })
    .catch(() => {
      // Performance SDK 載入失敗可忽略
    });
}

export {
  app,
  db,
  auth,
  perf,
  analytics,
  appCheck,
  functions,
  fetchAppCheckToken,
  initializeServices,
};

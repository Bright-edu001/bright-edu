/**
 * Firebase App Check 客戶端模組
 * 按需載入，包含完整的錯誤診斷和重試邏輯
 */
import logger from "../utils/logger";
import {
  isBrowser,
  isLocalDevelopment,
  isFirebaseHosting,
  waitForDOMReady,
  waitForGlobal,
} from "./envUtils";

let appCheck = null;
let appCheckInitialized = false;

/**
 * App Check 錯誤診斷
 */
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
    if (isBrowser()) {
      logger.info("環境資訊:", {
        userAgent: navigator.userAgent,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
      });
    }
  } catch (diagError) {
    logger.error("診斷過程發生錯誤:", diagError);
  } finally {
    logger.groupEnd();
  }
};

/**
 * 初始化 App Check
 */
const initializeAppCheck = async () => {
  if (appCheckInitialized) return appCheck;

  if (!isBrowser()) {
    logger.info("[AppCheck] 非瀏覽器環境，跳過初始化");
    appCheckInitialized = true;
    return null;
  }

  if (isLocalDevelopment()) {
    logger.info("[AppCheck] 本地開發環境，跳過 App Check 初始化");
    appCheckInitialized = true;
    return null;
  }

  try {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      logger.warn("[AppCheck] 缺少 REACT_APP_RECAPTCHA_SITE_KEY");
      appCheckInitialized = true;
      return null;
    }

    logger.info(`[AppCheck] 當前域名: ${window.location.hostname}`);

    // 動態載入 App Check SDK 和核心模組
    const [
      { initializeAppCheck: initAppCheck, ReCaptchaV3Provider, getToken },
      { app },
    ] = await Promise.all([
      import("firebase/app-check"),
      import("./firebaseCore"),
    ]);

    // Firebase Hosting 環境的特殊處理
    if (isFirebaseHosting()) {
      logger.info("[AppCheck] 檢測到 Firebase Hosting 環境");

      // 確保 DOM 完全載入
      await waitForDOMReady();

      // 額外等待，確保 reCAPTCHA 腳本載入
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 等待 reCAPTCHA 載入
      const recaptchaLoaded = await waitForGlobal("grecaptcha", 10000);

      if (!recaptchaLoaded) {
        logger.error("[AppCheck] reCAPTCHA 載入失敗");
        appCheckInitialized = true;
        return null;
      }

      // 初始化 App Check
      appCheck = initAppCheck(app, {
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
        await diagnoseAppCheckError(tokenError);
      }
    } else {
      // 非 Firebase Hosting 環境
      logger.info("[AppCheck] 非 Firebase Hosting 環境，但不是本地開發環境");

      appCheck = initAppCheck(app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });

      logger.info("[AppCheck] 生產環境初始化完成");
    }

    appCheckInitialized = true;
    return appCheck;
  } catch (error) {
    logger.error("[AppCheck] 初始化失敗:", error);
    await diagnoseAppCheckError(error);
    appCheckInitialized = true;
    return null;
  }
};

/**
 * 獲取 App Check Token（帶重試機制）
 */
export const fetchAppCheckToken = async (retries = 3, forceRefresh = false) => {
  try {
    if (!appCheck && !appCheckInitialized) {
      await initializeAppCheck();
    }

    if (!appCheck) {
      logger.warn("[AppCheck] App Check 未初始化");
      return null;
    }

    const { getToken } = await import("firebase/app-check");
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

/**
 * 獲取 App Check 實例
 */
export const getAppCheckInstance = async () => {
  if (!appCheck && !appCheckInitialized) {
    await initializeAppCheck();
  }
  return appCheck;
};

/**
 * 檢查 App Check 是否可用
 */
export const isAppCheckAvailable = () => {
  return appCheck !== null;
};

/**
 * 初始化 App Check（供外部調用）
 */
export const initializeAppCheckForHosting = initializeAppCheck;

/**
 * 優化版本的 App Check 客戶端
 * 採用非阻塞初始化和智能重試策略
 */
import logger from "../utils/logger";
import { isBrowser, isLocalDevelopment, waitForDOMReady } from "./envUtils";

let appCheck = null;
let appCheckInitialized = false;
let initializationPromise = null;

/**
 * 優化版的 App Check 初始化（非阻塞）
 */
export const initializeAppCheckOptimized = async () => {
  // 如果已經在初始化中，返回同一個 Promise
  if (initializationPromise) {
    return initializationPromise;
  }

  // 如果已經初始化過，直接返回
  if (appCheckInitialized) {
    return appCheck;
  }

  initializationPromise = performOptimizedInitialization();
  return initializationPromise;
};

/**
 * 執行優化的初始化流程
 */
const performOptimizedInitialization = async () => {
  try {
    // 本地開發環境直接跳過
    if (!isBrowser() || isLocalDevelopment()) {
      logger.info("[AppCheck] 本地環境，跳過初始化");
      appCheckInitialized = true;
      return null;
    }

    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      logger.warn("[AppCheck] 缺少 reCAPTCHA site key，跳過初始化");
      appCheckInitialized = true;
      return null;
    }

    logger.info("[AppCheck] 開始優化版初始化...");

    // 動態載入必要模組
    const [
      { initializeAppCheck: initAppCheck, ReCaptchaV3Provider, getToken },
      { app },
    ] = await Promise.all([
      import("firebase/app-check"),
      import("./firebaseCore"),
    ]);

    // 使用超時機制，避免無限等待
    const initWithTimeout = async () => {
      return Promise.race([
        initializeWithReCaptcha(
          initAppCheck,
          ReCaptchaV3Provider,
          app,
          siteKey
        ),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("初始化超時")), 5000)
        ),
      ]);
    };

    appCheck = await initWithTimeout();

    // 非阻塞的 token 預取
    if (appCheck) {
      // 不等待 token 獲取完成
      getToken(appCheck, false).catch((error) => {
        logger.warn("[AppCheck] 初始 token 獲取失敗:", error);
      });
    }

    logger.info("[AppCheck] 優化版初始化完成");
    appCheckInitialized = true;
    return appCheck;
  } catch (error) {
    logger.warn("[AppCheck] 初始化失敗，但應用可繼續運行:", error);
    appCheckInitialized = true;
    return null;
  }
};

/**
 * 使用 reCAPTCHA 進行初始化
 */
const initializeWithReCaptcha = async (
  initAppCheck,
  ReCaptchaV3Provider,
  app,
  siteKey
) => {
  // 確保 DOM 載入完成
  await waitForDOMReady();

  // 智能等待 reCAPTCHA（縮短等待時間）
  const recaptchaLoaded = await waitForReCaptchaOptimized();

  if (!recaptchaLoaded) {
    logger.warn("[AppCheck] reCAPTCHA 載入失敗，嘗試降級初始化");
    // 降級：嘗試直接初始化，讓 Firebase 處理
  }

  // 初始化 App Check
  return initAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });
};

/**
 * 優化的 reCAPTCHA 等待邏輯
 */
const waitForReCaptchaOptimized = async () => {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 20; // 減少到 2 秒總等待時間

    const checkReCaptcha = () => {
      if (typeof window.grecaptcha !== "undefined") {
        resolve(true);
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        logger.warn("[AppCheck] reCAPTCHA 等待超時");
        resolve(false);
        return;
      }

      setTimeout(checkReCaptcha, 100); // 每 100ms 檢查一次
    };

    checkReCaptcha();
  });
};

/**
 * 快速 token 獲取（帶超時）
 */
export const fetchAppCheckTokenOptimized = async (timeoutMs = 3000) => {
  try {
    if (!appCheck && !appCheckInitialized) {
      await initializeAppCheckOptimized();
    }

    if (!appCheck) {
      return null;
    }

    const { getToken } = await import("firebase/app-check");

    // 使用超時機制避免長時間等待
    const tokenPromise = getToken(appCheck, false);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Token 獲取超時")), timeoutMs)
    );

    const token = await Promise.race([tokenPromise, timeoutPromise]);
    return token;
  } catch (error) {
    logger.debug("[AppCheck] Token 獲取失敗，但不影響應用運行:", error);
    return null;
  }
};

/**
 * 獲取 App Check 實例
 */
export const getAppCheckInstance = async () => {
  if (!appCheck && !appCheckInitialized) {
    await initializeAppCheckOptimized();
  }
  return appCheck;
};

/**
 * 檢查 App Check 是否可用
 */
export const isAppCheckAvailable = () => {
  return appCheck !== null;
};

// 向後相容
export const initializeAppCheckForHosting = initializeAppCheckOptimized;
export const fetchAppCheckToken = fetchAppCheckTokenOptimized;

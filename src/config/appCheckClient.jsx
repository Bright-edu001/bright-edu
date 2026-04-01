/**
 * 強化版 App Check 客戶端 - 專門處理 reCAPTCHA 配置錯誤
 * 包含完整的錯誤診斷、降級策略和強健的錯誤處理
 */
import logger from "../utils/logger";
import { isBrowser, isLocalDevelopment, waitForDOMReady } from "./envUtils";

let appCheck = null;
let appCheckInitialized = false;
let initializationPromise = null;
let configurationValid = null; // 快取配置驗證結果

/**
 * 詳細的 reCAPTCHA 配置診斷
 */
const diagnoseReCaptchaConfiguration = async () => {
  logger.group("[AppCheck] reCAPTCHA 配置診斷");

  try {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const appId = import.meta.env.VITE_APP_ID;
    const projectId = import.meta.env.VITE_PROJECT_ID;
    const currentDomain = window.location.hostname;

    logger.info("=== 配置檢查 ===");
    logger.info(
      "Site Key:",
      siteKey ? `${siteKey.substring(0, 10)}...` : "❌ 未設定"
    );
    logger.info("App ID:", appId || "❌ 未設定");
    logger.info("Project ID:", projectId || "❌ 未設定");
    logger.info("當前域名:", currentDomain);

    // 檢查必要環境變數
    if (!siteKey) {
      logger.error("❌ REACT_APP_RECAPTCHA_SITE_KEY 未設定");
      return false;
    }

    if (!appId || !projectId) {
      logger.error("❌ Firebase 配置不完整");
      return false;
    }

    logger.info("=== 可能的問題和解決方案 ===");

    // 常見問題診斷
    if (siteKey === "6Ldx4aErAAAAACXAX0jz7DtlCP4_Z01gJ0Mvrnrh") {
      logger.warn("⚠️ 使用測試用的 reCAPTCHA Site Key");
      logger.info("解決方案:");
      logger.info("1. 前往 Firebase Console > App Check");
      logger.info("2. 選擇您的應用程式");
      logger.info("3. 註冊 reCAPTCHA v3 提供者");
      logger.info("4. 確保域名已加入允許清單");
      logger.info("5. 複製正確的 Site Key 到環境變數");
    }

    // 域名檢查
    const allowedDomains = [
      "localhost",
      "127.0.0.1",
      "bright-edu-data.web.app",
      "bright-edu-data.firebaseapp.com",
      // 請根據實際部署域名添加
    ];

    if (!allowedDomains.some((domain) => currentDomain.includes(domain))) {
      logger.warn(
        `⚠️ 當前域名 '${currentDomain}' 可能未在 reCAPTCHA 允許清單中`
      );
      logger.info("解決方案:");
      logger.info("1. 前往 Google Cloud Console");
      logger.info("2. 搜尋 'reCAPTCHA Enterprise'");
      logger.info("3. 找到對應的 Site Key");
      logger.info("4. 將當前域名加入允許清單");
    }

    return true;
  } catch (error) {
    logger.error("配置診斷失敗:", error);
    return false;
  } finally {
    logger.groupEnd();
  }
};

/**
 * 強化版 App Check 初始化（含完整錯誤處理）
 */
export const initializeAppCheckRobust = async () => {
  // 如果已經在初始化中，返回同一個 Promise
  if (initializationPromise) {
    return initializationPromise;
  }

  // 如果已經初始化過，直接返回
  if (appCheckInitialized) {
    return appCheck;
  }

  initializationPromise = performRobustInitialization();
  return initializationPromise;
};

/**
 * 執行強健的初始化流程
 */
const performRobustInitialization = async () => {
  try {
    // 本地開發環境直接跳過
    if (!isBrowser() || isLocalDevelopment()) {
      logger.info("[AppCheck] 本地開發環境，跳過 App Check");
      appCheckInitialized = true;
      configurationValid = true;
      return null;
    }

    logger.info("[AppCheck] 開始強健版初始化...");

    // 第一步：配置診斷
    const configValid = await diagnoseReCaptchaConfiguration();
    configurationValid = configValid;

    if (!configValid) {
      logger.warn("[AppCheck] 配置無效，啟用降級模式");
      appCheckInitialized = true;
      return null;
    }

    // 第二步：載入必要模組
    const [
      { initializeAppCheck: initAppCheck, ReCaptchaV3Provider, getToken },
      { app },
    ] = await Promise.all([
      import("firebase/app-check"),
      import("./firebaseCore"),
    ]);

    // 第三步：初始化 App Check（含錯誤處理）
    appCheck = await initializeWithErrorHandling(
      initAppCheck,
      ReCaptchaV3Provider,
      app
    );

    if (appCheck) {
      logger.info("[AppCheck] 初始化成功");

      // 非阻塞的初始 token 測試
      setTimeout(async () => {
        try {
          await getToken(appCheck, false);
          logger.info("[AppCheck] 初始 token 獲取成功");
        } catch (tokenError) {
          logger.warn("[AppCheck] 初始 token 獲取失敗:", tokenError.message);
          await handleTokenError(tokenError);
        }
      }, 1000);
    }

    appCheckInitialized = true;
    return appCheck;
  } catch (error) {
    logger.error("[AppCheck] 初始化失敗:", error);
    await handleInitializationError(error);
    appCheckInitialized = true;
    return null;
  }
};

/**
 * 帶錯誤處理的初始化
 */
const initializeWithErrorHandling = async (
  initAppCheck,
  ReCaptchaV3Provider,
  app
) => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // 確保 DOM 載入完成
  await waitForDOMReady();

  // 等待 reCAPTCHA（短時間）
  const recaptchaReady = await waitForReCaptchaWithTimeout(3000);

  if (!recaptchaReady) {
    logger.warn("[AppCheck] reCAPTCHA 載入超時，嘗試直接初始化");
  }

  try {
    // 嘗試初始化 App Check
    const appCheckInstance = initAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });

    return appCheckInstance;
  } catch (error) {
    // 特殊處理 reCAPTCHA 配置錯誤
    if (
      error.code === "app-check/recaptcha-error" ||
      error.message?.includes("Invalid reCAPTCHA configuration")
    ) {
      logger.error(
        "[AppCheck] reCAPTCHA 配置錯誤，請檢查 Firebase Console 設定"
      );
      await diagnoseReCaptchaConfiguration();
      throw new Error("reCAPTCHA 配置無效，請檢查 Firebase App Check 設定");
    }

    throw error;
  }
};

/**
 * 等待 reCAPTCHA 載入（含超時）
 */
const waitForReCaptchaWithTimeout = async (timeoutMs = 3000) => {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const checkReCaptcha = () => {
      if (typeof window.grecaptcha !== "undefined") {
        resolve(true);
        return;
      }

      if (Date.now() - startTime > timeoutMs) {
        resolve(false);
        return;
      }

      setTimeout(checkReCaptcha, 200);
    };

    checkReCaptcha();
  });
};

/**
 * 處理初始化錯誤
 */
const handleInitializationError = async (error) => {
  logger.group("[AppCheck] 錯誤處理");

  if (error.message?.includes("Invalid reCAPTCHA configuration")) {
    logger.error("🚨 reCAPTCHA 配置錯誤 - 這是最常見的問題");
    logger.info("解決步驟:");
    logger.info(
      "1. 確認 Firebase Console > App Check > reCAPTCHA v3 已正確設定"
    );
    logger.info(
      "2. 確認 Site Key 與環境變數中的 REACT_APP_RECAPTCHA_SITE_KEY 一致"
    );
    logger.info("3. 確認當前域名已加入 reCAPTCHA 允許清單");
    logger.info("4. 等待設定生效（可能需要幾分鐘）");
  } else if (error.code === "app-check/throttled") {
    logger.warn("⏳ App Check 請求被節流，這是暫時性問題");
  } else {
    logger.error("❌ 未知錯誤:", error.message);
  }

  logger.groupEnd();
};

/**
 * 處理 Token 錯誤
 */
const handleTokenError = async (error) => {
  if (error.message?.includes("Invalid reCAPTCHA configuration")) {
    logger.warn("[AppCheck] Token 獲取失敗 - reCAPTCHA 配置問題");
    return;
  }

  logger.debug("[AppCheck] Token 獲取失敗，但應用可繼續運行:", error.message);
};

/**
 * 安全的 Token 獲取（含超時和重試）
 */
export const fetchAppCheckTokenSafe = async (timeoutMs = 5000, retries = 1) => {
  try {
    // 如果配置無效，直接返回 null
    if (configurationValid === false) {
      return null;
    }

    if (!appCheck && !appCheckInitialized) {
      await initializeAppCheckRobust();
    }

    if (!appCheck) {
      return null;
    }

    const { getToken } = await import("firebase/app-check");

    // 超時保護
    const tokenPromise = getToken(appCheck, false);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Token 獲取超時")), timeoutMs)
    );

    const token = await Promise.race([tokenPromise, timeoutPromise]);
    return token;
  } catch (error) {
    if (retries > 0 && error.code === "app-check/throttled") {
      logger.info(`[AppCheck] 重試獲取 token (剩餘 ${retries} 次)`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetchAppCheckTokenSafe(timeoutMs, retries - 1);
    }

    logger.debug("[AppCheck] Token 獲取失敗:", error.message);
    return null;
  }
};

/**
 * 檢查 App Check 配置狀態
 */
export const getAppCheckStatus = () => {
  return {
    initialized: appCheckInitialized,
    hasInstance: appCheck !== null,
    configurationValid: configurationValid,
    isLocalDev: isLocalDevelopment(),
  };
};

/**
 * 獲取 App Check 實例
 */
export const getAppCheckInstance = async () => {
  if (!appCheck && !appCheckInitialized) {
    await initializeAppCheckRobust();
  }
  return appCheck;
};

// 向後相容的導出
export const initializeAppCheckForHosting = initializeAppCheckRobust;
export const initializeAppCheckOptimized = initializeAppCheckRobust;
export const fetchAppCheckToken = fetchAppCheckTokenSafe;
export const isAppCheckAvailable = () => appCheck !== null;

/**
 * Firebase Analytics 客戶端模組
 * 按需載入，減少主 bundle 體積
 */
import logger from "../utils/logger";
import { isBrowser, isLocalDevelopment } from "./envUtils";

let analytics = null;
let analyticsInitialized = false;

/**
 * 延遲初始化 Analytics
 */
const initializeAnalytics = async () => {
  if (analyticsInitialized) return analytics;

  if (!isBrowser()) {
    logger.info("[Analytics] 非瀏覽器環境，跳過初始化");
    analyticsInitialized = true;
    return null;
  }

  if (isLocalDevelopment()) {
    logger.info("[Analytics] 本地開發環境，跳過 Analytics 初始化");
    analyticsInitialized = true;
    return null;
  }

  // 檢查是否有 measurementId
  if (!process.env.REACT_APP_MEASUREMENT_ID) {
    logger.info("[Analytics] 缺少 REACT_APP_MEASUREMENT_ID，跳過初始化");
    analyticsInitialized = true;
    return null;
  }

  try {
    // 動態載入 Analytics SDK
    const [{ getAnalytics }, { app }] = await Promise.all([
      import("firebase/analytics"),
      import("./firebaseCore"),
    ]);

    analytics = getAnalytics(app);
    analyticsInitialized = true;

    logger.info("[Analytics] 初始化成功");
    return analytics;
  } catch (error) {
    logger.error("[Analytics] 初始化失敗:", error);
    analyticsInitialized = true; // 避免重複嘗試
    return null;
  }
};

/**
 * 記錄 Analytics 事件
 */
export const logAnalyticsEvent = async (eventName, eventParams = {}) => {
  try {
    if (!analytics && !analyticsInitialized) {
      await initializeAnalytics();
    }

    if (!analytics) {
      logger.debug("[Analytics] Analytics 未可用，跳過事件記錄");
      return;
    }

    const { logEvent } = await import("firebase/analytics");
    logEvent(analytics, eventName, eventParams);

    logger.debug("[Analytics] 事件已記錄:", { eventName, eventParams });
  } catch (error) {
    logger.error("[Analytics] 記錄事件失敗:", error);
  }
};

/**
 * 記錄頁面瀏覽
 */
export const logPageView = async (pagePath, pageTitle) => {
  await logAnalyticsEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * 記錄使用者互動
 */
export const logUserInteraction = async (action, element) => {
  await logAnalyticsEvent("user_interaction", {
    action,
    element,
  });
};

/**
 * 記錄表單提交
 */
export const logFormSubmit = async (formType, success = true) => {
  await logAnalyticsEvent("form_submit", {
    form_type: formType,
    success,
  });
};

/**
 * 獲取 Analytics 實例（如果需要直接使用）
 */
export const getAnalyticsInstance = async () => {
  if (!analytics && !analyticsInitialized) {
    await initializeAnalytics();
  }
  return analytics;
};

/**
 * 檢查 Analytics 是否可用
 */
export const isAnalyticsAvailable = () => {
  return analytics !== null;
};

/**
 * Firebase 服務主入口
 * 提供模組化的 Firebase 服務初始化和管理
 */
import logger from "../utils/logger";
import { isLocalDevelopment, getEnvironmentInfo } from "./envUtils";

// 核心服務（總是載入）
export {
  app,
  db,
  auth,
  enableFirebaseNetwork,
  initializeCoreServices,
} from "./firebaseCore";

// 按需載入的服務
let performanceInstance = null;

/**
 * 延遲載入 Performance Monitoring
 */
const initializePerformance = async () => {
  if (performanceInstance) return performanceInstance;

  try {
    if (!window) return null;

    const [{ getPerformance }, { app }] = await Promise.all([
      import("firebase/performance"),
      import("./firebaseCore"),
    ]);

    performanceInstance = getPerformance(app);
    logger.info("[Performance] 初始化成功");
    return performanceInstance;
  } catch (error) {
    logger.warn("[Performance] 初始化失敗:", error);
    return null;
  }
};

/**
 * 初始化所有必要的 Firebase 服務
 */
export const initializeServices = async () => {
  try {
    logger.info("[Firebase] 開始初始化服務...");

    const envInfo = getEnvironmentInfo();
    logger.info("[Firebase] 環境資訊:", envInfo);

    // 總是初始化核心服務
    const { initializeCoreServices } = await import("./firebaseCore");
    await initializeCoreServices();

    if (isLocalDevelopment()) {
      logger.info("[Firebase] 本地開發環境，跳過額外服務初始化");
      return;
    }

    // 生產環境非同步初始化 App Check（使用強健版），不阻塞渲染或主執行緒
    try {
      import("./appCheckClient.robust").then(({ initializeAppCheckRobust }) => {
        initializeAppCheckRobust()
          .then(() => logger.info("[Firebase] App Check 初始化完成"))
          .catch((error) =>
            logger.warn(
              "[Firebase] App Check 初始化失敗，但應用可繼續運行:",
              error.message,
            ),
          );
      });
    } catch (error) {
      logger.warn("[Firebase] App Check 模組載入失敗:", error.message);
      // 不拋出錯誤，讓應用繼續運行
    }

    // 延遲載入 Performance Monitoring
    setTimeout(() => {
      initializePerformance().catch((err) => {
        logger.warn("[Performance] 延遲初始化失敗:", err);
      });
    }, 2000);

    logger.info("[Firebase] 所有服務初始化完成");
    return { performance: performanceInstance };
  } catch (error) {
    logger.error("[Firebase] 服務初始化失敗:", error);

    // 本地開發環境中，某些錯誤可以忽略
    if (process.env.NODE_ENV === "development") {
      logger.info("[Firebase] 本地開發環境，部分錯誤可忽略");
    }

    throw error;
  }
};

/**
 * 獲取 Performance 實例
 */
export const getPerformance = async () => {
  if (!performanceInstance) {
    performanceInstance = await initializePerformance();
  }
  return performanceInstance;
};

// 為了向後相容，導出常用別名
export { getAppCheckInstance as appCheck } from "./appCheckClient";
export { getFunctionsInstance as functions } from "./functionsClient";
export { getAnalyticsInstance as analytics } from "./analyticsClient";

// 導出常用的服務方法
export { fetchAppCheckToken } from "./appCheckClient";
export { callCloudFunction } from "./functionsClient";
export {
  logAnalyticsEvent,
  logPageView,
  logFormSubmit,
} from "./analyticsClient";

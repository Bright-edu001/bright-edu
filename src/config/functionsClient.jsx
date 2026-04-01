/**
 * Firebase Functions 客戶端模組
 * 按需載入，僅在需要時初始化
 */
import logger from "../utils/logger";
import { isBrowser, isLocalDevelopment } from "./envUtils";

let functions = null;
let functionsInitialized = false;

/**
 * 延遲初始化 Functions
 */
const initializeFunctions = async () => {
  if (functionsInitialized) return functions;

  if (!isBrowser()) {
    logger.info("[Functions] 非瀏覽器環境，跳過初始化");
    return null;
  }

  try {
    // 動態載入 Functions SDK
    const [{ getFunctions, connectFunctionsEmulator }, { app }] =
      await Promise.all([
        import("firebase/functions"),
        import("./firebaseCore"),
      ]);

    functions = getFunctions(app, "asia-east1");

    // 本地開發環境連接到模擬器
    if (isLocalDevelopment()) {
      try {
        connectFunctionsEmulator(functions, "localhost", 5001);
        logger.info("[Functions] 已連接到本地模擬器");
      } catch (error) {
        logger.warn("[Functions] 連接本地模擬器失敗:", error);
      }
    }

    functionsInitialized = true;
    logger.info("[Functions] 初始化成功");
    return functions;
  } catch (error) {
    logger.error("[Functions] 初始化失敗:", error);
    functionsInitialized = true; // 避免重複嘗試
    return null;
  }
};

/**
 * 調用 Cloud Function
 */
export const callCloudFunction = async (functionName, data = {}) => {
  try {
    if (!functions && !functionsInitialized) {
      await initializeFunctions();
    }

    if (!functions) {
      throw new Error("Functions 未可用");
    }

    const { httpsCallable } = await import("firebase/functions");
    const callable = httpsCallable(functions, functionName);

    logger.debug("[Functions] 調用函數:", functionName, data);
    const result = await callable(data);

    logger.debug("[Functions] 函數調用成功:", result.data);
    return result.data;
  } catch (error) {
    logger.error("[Functions] 調用函數失敗:", error);
    throw error;
  }
};

/**
 * 批量處理數據的雲函數調用
 */
export const processBatchData = async (functionName, items, batchSize = 10) => {
  const results = [];
  const errors = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    try {
      const batchResult = await callCloudFunction(functionName, {
        items: batch,
      });
      results.push(...(batchResult.results || []));
    } catch (error) {
      logger.error(
        `[Functions] 批次 ${Math.floor(i / batchSize) + 1} 處理失敗:`,
        error
      );
      errors.push({ batch: Math.floor(i / batchSize) + 1, error });
    }
  }

  return { results, errors };
};

/**
 * 獲取 Functions 實例（如果需要直接使用）
 */
export const getFunctionsInstance = async () => {
  if (!functions && !functionsInitialized) {
    await initializeFunctions();
  }
  return functions;
};

/**
 * 檢查 Functions 是否可用
 */
export const isFunctionsAvailable = () => {
  return functions !== null;
};

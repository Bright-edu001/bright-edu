/**
 * 優化版本的 Firebase 初始化上下文
 * 採用漸進式載入和非阻塞初始化策略
 */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useEffectEvent,
  startTransition,
} from "react";
import { FirebaseAppProvider } from "reactfire";
import { app, initializeCoreServices } from "../config/firebaseCore";
import { isLocalDevelopment } from "../config/envUtils";
import logger from "../utils/logger";

// Firebase 初始化狀態
const FirebaseInitContext = createContext({
  isInitialized: false,
  isInitializing: false,
  initError: null,
  isBasicReady: false, // 新增：基礎服務是否就緒
  retryInitialization: () => {},
});

// Firebase 初始化 Provider（優化版）
export const FirebaseInitProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initError, setInitError] = useState(null);
  const [isBasicReady, setIsBasicReady] = useState(false);

  const completeAdditionalInitialization = useEffectEvent(async () => {
    try {
      await initializeAdditionalServices();

      startTransition(() => {
        setIsInitialized(true);
        setIsInitializing(false);
        logger.info("[Firebase Init] 完整初始化完成");
      });
    } catch (error) {
      logger.warn(
        "[Firebase Init] 額外服務初始化失敗，但不影響基本功能:",
        error,
      );
      // 即使額外服務失敗，仍標記為已初始化
      startTransition(() => {
        setIsInitialized(true);
        setIsInitializing(false);
      });
    }
  });

  useEffect(() => {
    const performOptimizedInitialization = async () => {
      if (isInitialized || isInitializing) return;

      setIsInitializing(true);
      setInitError(null);

      try {
        logger.info("[Firebase Init] 開始優化版初始化...");

        // 階段 1: 立即初始化核心服務（非阻塞）
        await initializeCoreServices();

        // 立即標記基礎服務就緒，讓 UI 開始渲染
        startTransition(() => {
          setIsBasicReady(true);
          logger.info("[Firebase Init] 基礎服務就緒，UI 可開始渲染");
        });

        // 階段 2: 背景初始化額外服務（非阻塞）
        setTimeout(async () => {
          await completeAdditionalInitialization();
        }, 0); // 立即開始，但不阻塞
      } catch (error) {
        logger.error("[Firebase Init] 核心服務初始化失敗:", error);
        startTransition(() => {
          setInitError(error);
          setIsInitializing(false);
        });
      }
    };

    // 立即開始初始化，不延遲
    performOptimizedInitialization();
  }, [isInitialized, isInitializing]);

  const retryInitialization = () => {
    setInitError(null);
    setIsInitialized(false);
    setIsInitializing(false);
    setIsBasicReady(false);
  };

  const contextValue = {
    isInitialized,
    isInitializing,
    initError,
    isBasicReady,
    retryInitialization,
  };

  return (
    <FirebaseInitContext.Provider value={contextValue}>
      <FirebaseAppProvider firebaseApp={app}>{children}</FirebaseAppProvider>
    </FirebaseInitContext.Provider>
  );
};

/**
 * 初始化額外服務（App Check 等）
 */
const initializeAdditionalServices = async () => {
  if (isLocalDevelopment()) {
    logger.info("[Firebase Init] 本地開發環境，跳過額外服務");
    return;
  }

  // 優化的 App Check 初始化
  try {
    const { initializeAppCheckOptimized } =
      await import("../config/appCheckClient.robust");
    await initializeAppCheckOptimized();
  } catch (error) {
    logger.warn("[Firebase Init] App Check 初始化失敗，繼續執行:", error);
  }

  // 延後載入 Performance Monitoring
  setTimeout(async () => {
    try {
      const { getPerformance } = await import("firebase/performance");
      getPerformance(app);
      logger.info("[Performance] 延後初始化完成");
    } catch (error) {
      logger.warn("[Performance] 延後初始化失敗:", error);
    }
  }, 3000); // 3秒後再載入
};

// Hook 來使用 Firebase 初始化狀態
export const useFirebaseInit = () => {
  const context = useContext(FirebaseInitContext);
  if (!context) {
    throw new Error("useFirebaseInit must be used within FirebaseInitProvider");
  }
  return context;
};

// Hook 來檢查 Firebase 基礎服務是否可用
export const useFirebaseBasicReady = () => {
  const { isBasicReady, initError } = useFirebaseInit();
  return isBasicReady && !initError;
};

// Hook 來檢查 Firebase 是否完全就緒
export const useFirebaseReady = () => {
  const { isInitialized, initError } = useFirebaseInit();
  return isInitialized && !initError;
};

export default FirebaseInitContext;

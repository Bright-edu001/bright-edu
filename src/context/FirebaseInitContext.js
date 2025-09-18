import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  startTransition,
} from "react";
import logger from "../utils/logger";
import { initializeServices } from "../config/firebaseServices";
import { contactService } from "../services/contactService";

// Firebase 初始化狀態
const FirebaseInitContext = createContext({
  isInitialized: false,
  isInitializing: false,
  initError: null,
  retryInitialization: () => {},
});

// Firebase 初始化 Provider
export const FirebaseInitProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    const performInitialization = async () => {
      if (isInitialized || isInitializing) return;

      setIsInitializing(true);
      setInitError(null);

      try {
        logger.info("[Firebase Init] 開始背景初始化...");
        await initializeServices();

        // 使用 startTransition 來確保狀態更新不會阻塞 UI
        startTransition(() => {
          setIsInitialized(true);
          setIsInitializing(false);
          // 通知 contactService Firebase 已就緒
          contactService.setFirebaseReady(true);
          logger.info("[Firebase Init] 背景初始化完成");
        });
      } catch (error) {
        logger.error("[Firebase Init] 背景初始化失敗:", error);
        startTransition(() => {
          setInitError(error);
          setIsInitializing(false);
        });
      }
    };

    // 延遲一小段時間再開始初始化，讓首次渲染先完成
    const timeoutId = setTimeout(() => {
      performInitialization();
    }, 100); // 100ms 延遲，確保首次渲染完成

    return () => clearTimeout(timeoutId);
  }, [isInitialized, isInitializing]);

  const retryInitialization = () => {
    setInitError(null);
    setIsInitialized(false);
    setIsInitializing(false);
  };

  const contextValue = {
    isInitialized,
    isInitializing,
    initError,
    retryInitialization,
  };

  return (
    <FirebaseInitContext.Provider value={contextValue}>
      {children}
    </FirebaseInitContext.Provider>
  );
};

// Hook 來使用 Firebase 初始化狀態
export const useFirebaseInit = () => {
  const context = useContext(FirebaseInitContext);
  if (!context) {
    throw new Error("useFirebaseInit must be used within FirebaseInitProvider");
  }
  return context;
};

// Hook 來檢查 Firebase 是否可用
export const useFirebaseReady = () => {
  const { isInitialized, initError } = useFirebaseInit();
  return isInitialized && !initError;
};

export default FirebaseInitContext;

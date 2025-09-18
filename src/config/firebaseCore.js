/**
 * Firebase 核心配置模組
 * 包含基本的 App、Firestore、Auth 初始化
 */
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import logger from "../utils/logger";
import { isLocalDevelopment } from "./envUtils";

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

// 初始化 Firebase 應用程式（立即執行）
export const app = initializeApp(firebaseConfig);

// 基本服務（立即初始化）
export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * 啟用 Firestore 網路連接
 */
export const enableFirebaseNetwork = async () => {
  try {
    // 本地開發環境跳過網路連接優化
    if (isLocalDevelopment()) {
      logger.info("🏠 本地開發環境，跳過網路連接優化");
      return;
    }

    await enableNetwork(db);
    logger.info("🚀 Firebase 網路連接已啟用");
  } catch (error) {
    logger.warn("⚠️ Firebase 網路連接啟用失敗:", error);
    // 本地開發環境中，這個錯誤可以忽略
    if (process.env.NODE_ENV === "development") {
      logger.info("本地開發環境，此錯誤可忽略");
    }
  }
};

/**
 * 核心服務初始化（僅網路連接）
 */
export const initializeCoreServices = async () => {
  try {
    logger.info("[Firebase Core] 開始初始化核心服務...");
    await enableFirebaseNetwork();
    logger.info("[Firebase Core] 核心服務初始化完成");
  } catch (error) {
    logger.error("[Firebase Core] 核心服務初始化失敗:", error);
    throw error;
  }
};

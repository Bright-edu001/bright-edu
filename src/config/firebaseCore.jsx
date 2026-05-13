/**
 * Firebase 核心配置模組
 * 包含基本的 App、Firestore、Auth 初始化
 */
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  enableNetwork,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import logger from "../utils/logger.jsx";
import { isLocalDevelopment } from "./envUtils.jsx";

// 安全的模擬器佔位設定（僅供本機開發 + localhost 使用，永不用於正式環境）
const EMULATOR_DEMO_CONFIG = {
  apiKey: "demo-api-key",
  authDomain: "bright-edu-data.firebaseapp.com",
  projectId: "bright-edu-data",
  storageBucket: "bright-edu-data.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:local",
};

const env = import.meta.env || {};
const isOnLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");
const hasRequiredEnv = Boolean(env.VITE_API_KEY && env.VITE_PROJECT_ID);

// 解析要使用的 Firebase 設定
let firebaseConfig;
let _usingEmulatorFallback = false;

if (hasRequiredEnv) {
  // 正常路徑：使用已設定的環境變數
  firebaseConfig = {
    apiKey: env.VITE_API_KEY,
    authDomain: env.VITE_AUTH_DOMAIN,
    projectId: env.VITE_PROJECT_ID,
    storageBucket: env.VITE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_MESSAGING_SENDER_ID,
    appId: env.VITE_APP_ID,
    measurementId: env.VITE_MEASUREMENT_ID,
  };
} else if (env.DEV && isOnLocalhost) {
  // 本機開發回退路徑：使用模擬器佔位設定，避免白畫面
  firebaseConfig = EMULATOR_DEMO_CONFIG;
  _usingEmulatorFallback = true;
  logger.warn(
    "⚠️ 未找到 Firebase 環境變數（VITE_API_KEY 等），已自動切換為本機模擬器佔位設定。" +
      " 請複製 .env.example 為 .env.local 並填入正確值，或確認 VITE_USE_FIREBASE_EMULATOR=true。"
  );
} else {
  // 正式環境或非 localhost 缺少設定：拋出明確錯誤
  throw new Error(
    "[Firebase] 缺少必要的環境變數（VITE_API_KEY、VITE_PROJECT_ID）。" +
      " 請確認 .env.local 已正確設定。詳情請參考 .env.example。"
  );
}

// 初始化 Firebase 應用程式（立即執行）
export const app = initializeApp(firebaseConfig);

// 基本服務（立即初始化）
export const db = getFirestore(app);
const isTestEnvironment =
  env.MODE === "test" || env.VITEST === "true";
export const auth = isTestEnvironment ? {} : getAuth(app);
export const storage = getStorage(app);

// 判斷是否需要連接模擬器
// 條件：localhost + (明確設定 VITE_USE_FIREBASE_EMULATOR=true 或使用了模擬器回退設定)
const shouldConnectEmulator =
  isOnLocalhost &&
  (env.VITE_USE_FIREBASE_EMULATOR === "true" || _usingEmulatorFallback);

if (shouldConnectEmulator) {
  try {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    logger.info("🔌 已連接到 Firestore 本地模擬器 (port 8080)");
  } catch (err) {
    logger.warn("⚠️ Firestore 模擬器連接失敗 (可能已初始化過):", err);
  }
  if (!isTestEnvironment && auth && typeof auth.emulatorConfig === "undefined") {
    try {
      connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
      logger.info("🔌 已連接到 Auth 本地模擬器 (port 9099)");
    } catch (err) {
      logger.warn("⚠️ Auth 模擬器連接失敗 (可能已初始化過):", err);
    }
  }
  try {
    connectStorageEmulator(storage, "127.0.0.1", 9199);
    logger.info("🔌 已連接到 Storage 本地模擬器 (port 9199)");
  } catch (err) {
    logger.warn("⚠️ Storage 模擬器連接失敗 (可能已初始化過):", err);
  }
}

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
    if ((import.meta.env || {}).MODE === "development") {
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

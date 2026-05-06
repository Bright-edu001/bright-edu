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
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import logger from "../utils/logger.jsx";
import { isLocalDevelopment } from "./envUtils.jsx";

// Firebase 配置
const firebaseConfig = {
  apiKey: (import.meta.env || {}).VITE_API_KEY,
  authDomain: (import.meta.env || {}).VITE_AUTH_DOMAIN,
  projectId: (import.meta.env || {}).VITE_PROJECT_ID,
  storageBucket: (import.meta.env || {}).VITE_STORAGE_BUCKET,
  messagingSenderId: (import.meta.env || {}).VITE_MESSAGING_SENDER_ID,
  appId: (import.meta.env || {}).VITE_APP_ID,
  measurementId: (import.meta.env || {}).VITE_MEASUREMENT_ID,
};

// 初始化 Firebase 應用程式（立即執行）
export const app = initializeApp(firebaseConfig);

// 基本服務（立即初始化）
export const db = getFirestore(app);
const isTestEnvironment =
  (import.meta.env || {}).MODE === "test" ||
  (import.meta.env || {}).VITEST === "true";
export const auth = isTestEnvironment ? {} : getAuth(app);
export const storage = getStorage(app);

// 判斷是否為本地環境且明確啟用模擬器，若是則連接到 Firebase Emulators
// 目前僅連接 Firestore emulator（port 8080），Auth 和 Storage 仍走正式環境
// 待 Auth / Storage emulator 啟動後可再開啟對應的 connect 行
if (
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1") &&
  (import.meta.env || {}).VITE_USE_FIREBASE_EMULATOR === "true"
) {
  try {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    logger.info("🔌 已連接到 Firestore 本地模擬器 (port 8080)");
  } catch (err) {
    logger.warn("⚠️ Firestore 模擬器連接失敗 (可能已初始化過):", err);
  }
  // Auth emulator（需先執行 firebase emulators:start 含 auth）
  // try { connectAuthEmulator(auth, "http://127.0.0.1:9099"); } catch {}
  // Storage emulator（需先執行 firebase emulators:start 含 storage）
  // try { connectStorageEmulator(storage, "127.0.0.1", 9199); } catch {}
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

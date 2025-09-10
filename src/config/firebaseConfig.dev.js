// 開發環境專用的 Firebase 配置
// 用於避免本地開發中的 App Check 和 Firestore 錯誤

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import logger from "../utils/logger";

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

// 初始化 Firebase 應用程式
const app = initializeApp(firebaseConfig);

// 開發環境的 Firebase 服務（不包含 App Check）
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app, "asia-east1");

// 開發環境不需要 App Check
const appCheck = null;

// 簡化的初始化函數
const initializeServices = async () => {
  logger.info("[Firebase Dev] 開發環境初始化完成");
};

// 空的 token 獲取函數
const fetchAppCheckToken = async () => {
  logger.info("[Firebase Dev] 開發環境跳過 App Check token");
  return null;
};

let analytics = null;
let perf = null;

// 只在生產環境載入 Analytics
if (process.env.NODE_ENV === "production") {
  import("firebase/analytics")
    .then(({ getAnalytics }) => {
      try {
        analytics = getAnalytics(app);
      } catch (err) {
        logger.warn("[Analytics] 初始化失敗:", err);
      }
    })
    .catch(() => {
      // Analytics SDK 載入失敗可忽略
    });
}

export {
  app,
  db,
  auth,
  perf,
  analytics,
  appCheck,
  functions,
  fetchAppCheckToken,
  initializeServices,
};

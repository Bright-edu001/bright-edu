// ===== 所有 import 必須放最上方 =====
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
} from "firebase/app-check";
import logger from "../utils/logger";
// 如需其他 Firebase 產品，請在此引入對應 SDK
// 參考官方文件：https://firebase.google.com/docs/web/setup#available-libraries
// ===== Firebase 設定區塊 =====

// ===== Firebase 設定區塊 =====
// 使用環境變數設定金鑰資訊，避免敏感資料外洩
// measurementId 僅部分服務（如 Analytics）需用到，可選填
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY, // API 金鑰
  authDomain: process.env.REACT_APP_AUTH_DOMAIN, // 授權網域
  projectId: process.env.REACT_APP_PROJECT_ID, // 專案 ID
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, // 雲端儲存桶名稱
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, // 訊息發送者 ID
  appId: process.env.REACT_APP_APP_ID, // 應用程式 ID
  measurementId: process.env.REACT_APP_MEASUREMENT_ID, // 分析用 ID（可選）
};

// ===== Firebase 初始化區塊 =====
// 初始化 Firebase 應用程式
const app = initializeApp(firebaseConfig);
// ===== App Check（reCAPTCHA v3）初始化 =====
// 初始化 App Check，防止未授權存取 Firebase 服務
// 請確保此 site key 來自 Firebase Console > App Check 的 Web reCAPTCHA v3 提供者
let appCheck;
try {
  const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    // 若未設定，會導致所有請求為「未驗證」。
    logger.warn(
      "[AppCheck] 缺少 REACT_APP_RECAPTCHA_SITE_KEY，App Check 未啟用。"
    );
  } else if (typeof window !== "undefined") {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  }
} catch (e) {
  // 初始化失敗時記錄，但不阻擋應用啟動
  logger.error("[AppCheck] 初始化失敗: ", e);
}

// 取得 Firestore 資料庫實例，供全站資料存取（須在 App Check 設定之後）
const db = getFirestore(app);

// 🔥 優化 1: 預先啟用 Firebase 網路連接以提升效能
try {
  enableNetwork(db)
    .then(() => {
      logger.performance("🚀 Firebase 網路連接已預先啟用");
    })
    .catch((error) => {
      logger.warn("⚠️ Firebase 網路連接啟用失敗:", error);
    });
} catch (error) {
  logger.warn("⚠️ Firebase enableNetwork 初始化失敗:", error);
}

// 取得 Google Analytics 實例（用於網站流量分析）
const analytics = getAnalytics(app);
// 取得 Cloud Functions 實例 (設定為 asia-east1 區域)
const functions = getFunctions(app, "asia-east1");
// 若需要手動取得 App Check token，可呼叫此函式
const fetchAppCheckToken = async (retries = 1) => {
  try {
    if (appCheck) {
      await getToken(appCheck, /* forceRefresh */ false);
    }
  } catch (err) {
    if (retries > 0) {
      setTimeout(() => fetchAppCheckToken(retries - 1), 1000);
    } else {
      logger.error("App Check token fetch failed:", err);
      if (typeof window !== "undefined") {
        alert("驗證服務暫時不可用，請稍後再試。");
      }
    }
  }
};

// ===== 效能監控（Performance Monitoring）初始化 =====
// 僅在瀏覽器端動態載入 Performance SDK，避免 SSR 報錯
let perf;
if (typeof window !== "undefined") {
  import("firebase/performance")
    .then(({ getPerformance }) => {
      try {
        perf = getPerformance(app); // 初始化效能監控
      } catch (err) {
        // 效能監控為選用功能，初始化失敗可忽略
      }
    })
    .catch(() => {
      // 若 Performance SDK 載入失敗則忽略
    });
}

// ===== 匯出區塊 =====
// 匯出 Firestore、效能監控、Analytics、App Check、Functions 實例，供其他模組使用
export { app, db, perf, analytics, appCheck, functions, fetchAppCheckToken };

// ===== 所有 import 必須放最上方 =====
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
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
// 取得 Firestore 資料庫實例，供全站資料存取
const db = getFirestore(app);
// 取得 Google Analytics 實例（用於網站流量分析）
const analytics = getAnalytics(app);

// ===== App Check（reCAPTCHA v3）初始化 =====
// 初始化 App Check，防止未授權存取 Firebase 服務
// 請確保此 site key 已在 Google reCAPTCHA 註冊並加到 Firebase App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ldx4aErAAAAACXAX0jz7DtlCP4_Z01gJ0Mvrnrh"),
  isTokenAutoRefreshEnabled: true, // 建議開啟自動刷新
});

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
// 匯出 Firestore、效能監控、Analytics、App Check 實例，供其他模組使用
export { db, perf, analytics, appCheck };

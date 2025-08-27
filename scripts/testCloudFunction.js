/**
 * 測試 Cloud Function 同步功能
 * 這個腳本會直接呼叫已部署的 Cloud Function 來測試同步功能
 */

const {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} = require("firebase/functions");
const { initializeApp } = require("firebase/app");

// Firebase 設定
const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_API_KEY || "AIzaSyBKy3x_2QcZCyQX1TrZEcuG4X_3LZZOtss",
  authDomain:
    process.env.REACT_APP_AUTH_DOMAIN || "bright-edu-data.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID || "bright-edu-data",
  storageBucket:
    process.env.REACT_APP_STORAGE_BUCKET || "bright-edu-data.appspot.com",
  messagingSenderId:
    process.env.REACT_APP_MESSAGING_SENDER_ID || "374467618073",
  appId:
    process.env.REACT_APP_APP_ID || "1:374467618073:web:f735e6dff24e00c6c13f15",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID || "G-B1BWHCPMKZ",
};

/**
 * 測試 Cloud Function 同步功能
 */
async function testCloudFunctionSync() {
  try {
    console.log("🚀 開始測試 Cloud Function 同步功能...\n");

    // 初始化 Firebase
    const app = initializeApp(firebaseConfig);
    const functions = getFunctions(app);

    console.log("✅ Firebase 初始化成功");

    // 如果在本地開發環境，連接到 Functions 模擬器
    if (
      process.env.NODE_ENV === "development" &&
      process.env.USE_EMULATOR === "true"
    ) {
      connectFunctionsEmulator(functions, "localhost", 5001);
      console.log("🔧 已連接到 Functions 模擬器");
    }

    // 創建 Cloud Function 呼叫
    const syncGoogleSheets = httpsCallable(
      functions,
      "syncGoogleSheetsToFirestore"
    );

    console.log("📡 呼叫 Cloud Function: syncGoogleSheetsToFirestore");
    console.log("⏳ 請稍等，正在同步資料...\n");

    // 執行同步
    const result = await syncGoogleSheets();

    console.log("🎉 同步完成！");
    console.log("📊 同步結果:");
    console.log(`   - 狀態: ${result.data.success ? "成功" : "失敗"}`);

    if (result.data.success) {
      console.log(`   - 新增資料: ${result.data.count} 筆`);
      console.log(`   - 跳過重複: ${result.data.skipCount} 筆`);
      console.log(`   - 總處理數: ${result.data.totalProcessed} 筆`);
      console.log(`   - 執行時間: ${result.data.durationMs}ms`);
      console.log(`   - 訊息: ${result.data.message}`);
    } else {
      console.log(`   - 錯誤: ${result.data.error}`);
      console.log(`   - 訊息: ${result.data.message}`);
    }
  } catch (error) {
    console.error("❌ Cloud Function 測試失敗:");
    console.error(`   - 錯誤類型: ${error.code || "Unknown"}`);
    console.error(`   - 錯誤訊息: ${error.message}`);

    if (error.details) {
      console.error(`   - 詳細資訊: ${error.details}`);
    }

    console.error("\n🔧 可能的解決方案:");
    console.error("   1. 檢查 Firebase 身份驗證");
    console.error("   2. 確認 Cloud Function 已正確部署");
    console.error("   3. 檢查 Google Cloud 權限設定");
    console.error("   4. 驗證 Google Sheets API 存取權限");

    throw error;
  }
}

// 執行測試
if (require.main === module) {
  testCloudFunctionSync()
    .then(() => {
      console.log("\n✅ Cloud Function 測試完成");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 測試失敗");
      process.exit(1);
    });
}

module.exports = { testCloudFunctionSync };

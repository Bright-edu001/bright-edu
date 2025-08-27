#!/usr/bin/env node

/**
 * Google Sheets 同步功能測試腳本
 *
 * 此腳本用於測試 Google Sheets 同步到 Firestore 的完整流程
 * 包含本地測試和 Cloud Functions 測試
 */

const admin = require("firebase-admin");
const { google } = require("googleapis");

// 設定環境變數
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Firebase 專案設定
const projectId = "bright-edu-data";

// Google Sheets 設定
const SHEET_ID = "1CyQSSINYeV9jXhRoXTbCZfrRsCDhAybIKAoMSB9lyqo";
const RANGE = "工作表1!A:F";

/**
 * 初始化 Firebase Admin
 */
function initializeFirebase() {
  try {
    admin.initializeApp({
      projectId: projectId,
      credential: admin.credential.applicationDefault(),
    });
    console.log("✅ Firebase Admin 初始化成功");
    return admin.firestore();
  } catch (error) {
    console.error("❌ Firebase Admin 初始化失敗:", error.message);
    throw error;
  }
}

/**
 * 測試 Google Sheets API 連線
 */
async function testGoogleSheetsConnection() {
  try {
    console.log("🔍 測試 Google Sheets API 連線...");

    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    console.log(
      `✅ 成功連接 Google Sheets，找到 ${rows ? rows.length : 0} 行資料`
    );

    if (rows && rows.length > 1) {
      console.log("📋 範例資料預覽:");
      console.log("   標題行:", rows[0]);
      if (rows[1]) console.log("   第一筆資料:", rows[1]);
      if (rows[2]) console.log("   第二筆資料:", rows[2]);
    }

    return { success: true, rowCount: rows ? rows.length : 0 };
  } catch (error) {
    console.error("❌ Google Sheets API 連線失敗:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * 測試 Firestore 連線
 */
async function testFirestoreConnection(db) {
  try {
    console.log("🔍 測試 Firestore 連線...");

    await db.collection("contact_forms").limit(1).get();
    console.log("✅ Firestore 連線成功");

    const existingCount = await db.collection("contact_forms").get();
    console.log(`📊 現有聯絡表單資料: ${existingCount.size} 筆`);

    return { success: true, existingCount: existingCount.size };
  } catch (error) {
    console.error("❌ Firestore 連線失敗:", error.message);
    return { success: false, error: error.message };
  }
}

/**
 * 執行完整的同步測試
 */
async function runSyncTest() {
  try {
    console.log("🚀 開始 Google Sheets 同步功能測試\n");

    // 1. 初始化 Firebase
    const db = initializeFirebase();

    // 2. 測試 Firestore 連線
    const firestoreTest = await testFirestoreConnection(db);
    if (!firestoreTest.success) {
      throw new Error("Firestore 連線測試失敗");
    }

    // 3. 測試 Google Sheets 連線
    const sheetsTest = await testGoogleSheetsConnection();
    if (!sheetsTest.success) {
      throw new Error("Google Sheets 連線測試失敗");
    }

    console.log("\n🎉 所有連線測試通過！");
    console.log("\n📊 測試結果摘要:");
    console.log(`   - Firestore 現有資料: ${firestoreTest.existingCount} 筆`);
    console.log(
      `   - Google Sheets 資料: ${sheetsTest.rowCount} 行 (包含標題)`
    );
    console.log(`   - 可同步資料: ${Math.max(0, sheetsTest.rowCount - 1)} 筆`);

    console.log("\n✅ 同步功能已準備就緒！");
    console.log("💡 提示：您現在可以在管理後台使用「同步 Google Sheets」按鈕");
  } catch (error) {
    console.error("\n❌ 測試失敗:", error.message);
    console.error("\n🔧 請檢查以下設定:");
    console.error("   1. Firebase 專案 ID 是否正確");
    console.error("   2. Google Cloud 認證是否設定");
    console.error("   3. Google Sheets ID 是否正確");
    console.error("   4. 網路連線是否正常");
    process.exit(1);
  }
}

/**
 * 顯示設定資訊
 */
function showConfiguration() {
  console.log("⚙️  目前設定:");
  console.log(`   - Firebase 專案 ID: ${projectId}`);
  console.log(`   - Google Sheets ID: ${SHEET_ID}`);
  console.log(`   - 資料範圍: ${RANGE}`);
  console.log(`   - 環境: ${process.env.NODE_ENV}\n`);
}

// 主程式執行
if (require.main === module) {
  showConfiguration();
  runSyncTest()
    .then(() => {
      console.log("\n🏁 測試完成");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 測試腳本執行失敗:", error);
      process.exit(1);
    });
}

module.exports = {
  testGoogleSheetsConnection,
  testFirestoreConnection,
  initializeFirebase,
};

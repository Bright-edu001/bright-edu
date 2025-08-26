// 測試 Google Sheets 同步功能的本地腳本
const admin = require("firebase-admin");
const { google } = require("googleapis");

// 設定環境變數
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// 初始化 Firebase Admin
admin.initializeApp({
  projectId: "bright-edu-data",
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

// Google Sheets 設定
const SHEET_ID = "1CyQSSINYeV9jXhRoXTbCZfrRsCDhAybIKAoMSB9lyqo";
const RANGE = "工作表1!A:F";

async function testGoogleSheetsSync() {
  const start = Date.now();

  try {
    console.log("開始從 Google Sheets 同步聯絡表單資料...");

    // 建立 Google Sheets 客戶端
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // 從 Google Sheets 讀取資料
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.log("Google Sheets 中沒有找到資料");
      return { success: true, count: 0, message: "沒有資料需要同步" };
    }

    console.log(`從 Google Sheets 讀取到 ${rows.length - 1} 行資料`);

    // 處理資料
    const dataRows = rows.slice(1); // 跳過標題行
    const contactForms = [];

    for (let index = 0; index < dataRows.length; index++) {
      const row = dataRows[index];
      try {
        // 欄位順序: A=時間, B=姓名, C=lineId, D=email, E=message
        const timestamp = row[0] || "";
        const name = row[1] || "";
        const lineId = row[2] === "未提供" ? "" : row[2] || "";
        const email = (row[3] || "").toLowerCase();
        const message = row[4] || "";

        // 跳過空行或無效資料
        if (!name || !email || !message) {
          console.log(`跳過第 ${index + 2} 行：缺少必要資料`);
          continue;
        }

        contactForms.push({
          name: name,
          email: email,
          lineId: lineId,
          message: message,
          timestamp: timestamp,
          source: "google_sheets_sync",
          status: "pending",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          metadata: {
            originalRowIndex: index + 2,
            syncedAt: admin.firestore.FieldValue.serverTimestamp(),
            userAgent: "Test Script",
            url: "local-test-sync",
            referrer: "",
            originalTimestamp: timestamp,
          },
        });
      } catch (error) {
        console.error(`處理第 ${index + 2} 行資料時發生錯誤:`, error);
      }
    }

    if (contactForms.length === 0) {
      console.log("沒有有效資料需要同步");
      return { success: true, count: 0, message: "沒有有效資料需要同步" };
    }

    console.log(`準備同步 ${contactForms.length} 筆有效資料到 Firestore...`);

    // 寫入 Firestore
    const collectionRef = db.collection("contact_forms");
    const batch = db.batch();

    let successCount = 0;
    let skipCount = 0;

    for (const formData of contactForms) {
      try {
        // 檢查是否已存在相同的資料（基於 email 和 timestamp）
        const existingQuery = await collectionRef
          .where("email", "==", formData.email)
          .where("timestamp", "==", formData.timestamp)
          .get();

        if (existingQuery.empty) {
          const docRef = collectionRef.doc();
          batch.set(docRef, formData);
          successCount++;
        } else {
          console.log(
            `跳過重複資料: ${formData.email} (${formData.timestamp})`
          );
          skipCount++;
        }
      } catch (error) {
        console.error("處理單筆資料時發生錯誤:", error);
      }
    }

    if (successCount > 0) {
      await batch.commit();
      console.log(`成功寫入 ${successCount} 筆資料到 Firestore`);
    }

    const durationMs = Date.now() - start;
    console.log("Google Sheets 同步完成", {
      successCount,
      skipCount,
      totalProcessed: contactForms.length,
      durationMs,
    });

    return {
      success: true,
      count: successCount,
      skipCount: skipCount,
      totalProcessed: contactForms.length,
      message: `成功同步 ${successCount} 筆新資料，跳過 ${skipCount} 筆重複資料`,
      durationMs,
    };
  } catch (error) {
    console.error("Google Sheets 同步失敗:", error);
    return {
      success: false,
      error: "SYNC_FAILED",
      message: error.message,
    };
  }
}

// 執行測試
testGoogleSheetsSync()
  .then((result) => {
    console.log("\n=== 同步結果 ===");
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  })
  .catch((error) => {
    console.error("測試失敗:", error);
    process.exit(1);
  });

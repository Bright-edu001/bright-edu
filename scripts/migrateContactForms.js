const admin = require("firebase-admin");
const { google } = require("googleapis");

// 設定環境變數
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// 設定 Firebase 專案 ID
const projectId = "bright-edu-data"; // 從您的 gcloud 設定中取得

// 初始化 Firebase Admin
admin.initializeApp({
  projectId: projectId,
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

// Google Sheets 設定
const SHEET_ID = "1CyQSSINYeV9jXhRoXTbCZfrRsCDhAybIKAoMSB9lyqo"; // 您的 Google Sheets ID
const RANGE = "工作表1!A:F"; // 您的資料範圍

/**
 * 建立 Google Sheets 客戶端
 * 注意：您需要設定 Google Cloud 服務帳戶或 OAuth2 憑證
 */
async function createSheetsClient() {
  try {
    // 方法 1: 使用服務帳戶 (推薦用於伺服器端)
    // const auth = new google.auth.GoogleAuth({
    //   keyFile: path.join(__dirname, "path/to/your/service-account-key.json"),
    //   scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    // });

    // 方法 2: 使用應用程式預設憑證
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    return google.sheets({ version: "v4", auth });
  } catch (error) {
    console.error("建立 Google Sheets 客戶端失敗:", error);
    throw error;
  }
}

/**
 * 從 Google Sheets 讀取聯絡表單資料
 */
async function readContactFormsFromSheets() {
  try {
    const sheets = await createSheetsClient();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.log("Google Sheets 中沒有找到資料");
      return [];
    }

    // 假設第一行是標題行
    const dataRows = rows.slice(1);

    // 將每一行轉換為物件
    const contactForms = dataRows
      .map((row, index) => {
        try {
          // 您的欄位順序: A=時間, B=姓名, C=lineId, D=email, E=message
          const timestamp = row[0] || "";
          const name = row[1] || "";
          const lineId = row[2] === "未提供" ? "" : row[2] || "";
          const email = (row[3] || "").toLowerCase();
          const message = row[4] || "";

          // 跳過空行或無效資料
          if (!name || !email || !message) {
            console.log(`跳過第 ${index + 2} 行：缺少必要資料`);
            return null;
          }

          return {
            name: name,
            email: email,
            lineId: lineId,
            message: message,
            timestamp: timestamp,
            source: "google_sheets_migration",
            status: "pending",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            metadata: {
              originalRowIndex: index + 2, // +2 因為從第二行開始，且索引從0開始
              migratedAt: admin.firestore.FieldValue.serverTimestamp(),
              userAgent: "Migration Script",
              url: "google-sheets-migration",
              referrer: "",
              originalTimestamp: timestamp,
            },
          };
        } catch (error) {
          console.error(`處理第 ${index + 2} 行資料時發生錯誤:`, error);
          return null;
        }
      })
      .filter(Boolean); // 過濾掉空值

    return contactForms;
  } catch (error) {
    console.error("從 Google Sheets 讀取資料失敗:", error);
    throw error;
  }
}

/**
 * 將聯絡表單資料寫入 Firestore
 */
async function writeContactFormsToFirestore(contactForms) {
  try {
    const batch = db.batch();
    const collectionRef = db.collection("contact_forms");

    let successCount = 0;
    let errorCount = 0;

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
        }
      } catch (error) {
        console.error("處理單筆資料時發生錯誤:", error);
        errorCount++;
      }
    }

    if (successCount > 0) {
      await batch.commit();
      console.log(`✅ 成功遷移 ${successCount} 筆聯絡表單資料到 Firestore`);
    }

    if (errorCount > 0) {
      console.log(`⚠️ ${errorCount} 筆資料處理失敗`);
    }

    return { successCount, errorCount };
  } catch (error) {
    console.error("寫入 Firestore 失敗:", error);
    throw error;
  }
}

/**
 * 主要遷移函式
 */
async function migrateContactForms() {
  try {
    console.log("🚀 開始遷移 Google Sheets 聯絡表單資料到 Firestore...");

    // 檢查 Firestore 連線
    await db.collection("contact_forms").limit(1).get();
    console.log("✅ Firestore 連線成功");

    // 從 Google Sheets 讀取資料
    console.log("📊 正在從 Google Sheets 讀取資料...");
    const contactForms = await readContactFormsFromSheets();
    console.log(`📋 找到 ${contactForms.length} 筆聯絡表單資料`);

    if (contactForms.length === 0) {
      console.log("沒有資料需要遷移");
      return;
    }

    // 寫入 Firestore
    console.log("💾 正在寫入 Firestore...");
    const result = await writeContactFormsToFirestore(contactForms);

    console.log("🎉 遷移完成！");
    console.log(`📊 結果統計:`);
    console.log(`  - 成功: ${result.successCount} 筆`);
    console.log(`  - 失敗: ${result.errorCount} 筆`);
  } catch (error) {
    console.error("❌ 遷移過程中發生錯誤:", error);
    process.exit(1);
  }
}

// 如果直接執行此腳本，則開始遷移
if (require.main === module) {
  migrateContactForms()
    .then(() => {
      console.log("腳本執行完成");
      process.exit(0);
    })
    .catch((error) => {
      console.error("腳本執行失敗:", error);
      process.exit(1);
    });
}

module.exports = {
  migrateContactForms,
  readContactFormsFromSheets,
  writeContactFormsToFirestore,
};

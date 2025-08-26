// 本地 Express 服務器，用於處理 Google Sheets 同步
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { google } = require("googleapis");

const app = express();
const PORT = 3002;

// 啟用 CORS 和 JSON 解析
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// 初始化 Firebase Admin
try {
  admin.initializeApp({
    projectId: "bright-edu-data",
    credential: admin.credential.applicationDefault(),
  });
  console.log("Firebase Admin 初始化成功");
} catch (error) {
  console.error("Firebase Admin 初始化失敗:", error.message);
  console.log('請確保已執行 "gcloud auth application-default login"');
}

const db = admin.firestore();

// Google Sheets 設定
const SHEET_ID = "1CyQSSINYeV9jXhRoXTbCZfrRsCDhAybIKAoMSB9lyqo";
const RANGE = "工作表1!A:F";

// 同步端點
app.post("/api/sync-google-sheets", async (req, res) => {
  const start = Date.now();

  try {
    console.log("開始從 Google Sheets 同步聯絡表單資料...");

    // 建立 Google Sheets 客戶端
    const auth = new google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    // 從 Google Sheets 讀取資料
    console.log(
      `正在從 Google Sheets 讀取資料 (ID: ${SHEET_ID}, Range: ${RANGE})`
    );

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      console.log("從 Google Sheets 沒有找到資料或只有標題行");

      // 檢查 Firestore 中是否有來自 Google Sheets 同步的資料需要清除
      const collectionRef = db.collection("contact_forms");
      const existingQuery = await collectionRef
        .where("source", "==", "google_sheets_sync_local")
        .get();

      if (!existingQuery.empty) {
        console.log(
          `發現 Firestore 中有 ${existingQuery.size} 筆來自 Google Sheets 的資料，因為 Google Sheets 已清空，將清除這些資料...`
        );

        const batch = db.batch();
        let deleteCount = 0;

        existingQuery.docs.forEach((doc) => {
          batch.delete(doc.ref);
          deleteCount++;
        });

        if (deleteCount > 0) {
          await batch.commit();
          console.log(
            `成功清除 ${deleteCount} 筆過時的 Google Sheets 同步資料`
          );
        }

        return res.json({
          success: true,
          count: 0,
          cleanedCount: deleteCount,
          message: `Google Sheets 中沒有資料，已清除 Firestore 中 ${deleteCount} 筆過時的同步資料`,
          sheetInfo: {
            spreadsheetId: SHEET_ID,
            range: RANGE,
            totalRows: rows ? rows.length : 0,
          },
        });
      }

      return res.json({
        success: true,
        count: 0,
        message: "Google Sheets 中沒有資料需要同步",
        sheetInfo: {
          spreadsheetId: SHEET_ID,
          range: RANGE,
          totalRows: rows ? rows.length : 0,
        },
      });
    }

    console.log(`從 Google Sheets 讀取到 ${rows.length} 行資料 (包含標題行)`);
    console.log(`標題行: ${JSON.stringify(rows[0])}`);
    console.log(`準備處理 ${rows.length - 1} 行資料`);

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
          console.log(
            `跳過第 ${index + 2} 行：缺少必要資料 (name: ${
              name ? "✓" : "✗"
            }, email: ${email ? "✓" : "✗"}, message: ${message ? "✓" : "✗"})`
          );
          continue;
        }

        console.log(`處理第 ${index + 2} 行：${name} (${email})`);

        contactForms.push({
          name: name,
          email: email,
          lineId: lineId,
          message: message,
          timestamp: timestamp,
          source: "google_sheets_sync_local",
          status: "pending",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          metadata: {
            originalRowIndex: index + 2,
            syncedAt: admin.firestore.FieldValue.serverTimestamp(),
            userAgent: "Local Sync Server",
            url: "local-sync-api",
            referrer: "",
            originalTimestamp: timestamp,
          },
        });
      } catch (error) {
        console.error(`處理第 ${index + 2} 行資料時發生錯誤:`, error);
      }
    }

    if (contactForms.length === 0) {
      return res.json({
        success: true,
        count: 0,
        message: "沒有有效資料需要同步",
      });
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
    console.log("=== Google Sheets 同步完成 ===", {
      spreadsheetId: SHEET_ID,
      range: RANGE,
      successCount,
      skipCount,
      totalProcessed: contactForms.length,
      durationMs: `${durationMs}ms`,
    });

    res.json({
      success: true,
      count: successCount,
      skipCount: skipCount,
      totalProcessed: contactForms.length,
      message: `成功從 Google Sheets 同步 ${successCount} 筆新資料，跳過 ${skipCount} 筆重複資料`,
      durationMs,
      sheetInfo: {
        spreadsheetId: SHEET_ID,
        range: RANGE,
        totalRows: rows.length - 1,
      },
    });
  } catch (error) {
    console.error("Google Sheets 同步失敗:", error);
    res.status(500).json({
      success: false,
      error: "SYNC_FAILED",
      message: error.message,
    });
  }
});

// 清除 Firestore 中的聯絡表單資料端點
app.post("/api/clear-contact-forms", async (req, res) => {
  const start = Date.now();

  try {
    console.log("開始清除 Firestore 中的聯絡表單資料...");

    const collectionRef = db.collection("contact_forms");

    // 獲取所有文檔
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      console.log("Firestore 中沒有聯絡表單資料需要清除");
      return res.json({
        success: true,
        count: 0,
        message: "Firestore 中沒有資料需要清除",
        durationMs: Date.now() - start,
      });
    }

    console.log(`找到 ${snapshot.size} 筆聯絡表單資料，準備清除...`);

    // 批次刪除
    const batch = db.batch();
    let deleteCount = 0;

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      deleteCount++;
    });

    // 執行批次刪除
    await batch.commit();

    const durationMs = Date.now() - start;
    console.log(`=== Firestore 清除完成 ===`, {
      deletedCount: deleteCount,
      durationMs: `${durationMs}ms`,
    });

    res.json({
      success: true,
      count: deleteCount,
      message: `成功清除 ${deleteCount} 筆聯絡表單資料`,
      durationMs,
    });
  } catch (error) {
    console.error("清除 Firestore 資料失敗:", error);
    res.status(500).json({
      success: false,
      error: "CLEAR_FAILED",
      message: error.message,
    });
  }
});

// 健康檢查端點
app.get("/api/health", (req, res) => {
  console.log("收到健康檢查請求");
  res.json({ status: "ok", message: "Local sync server is running" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`本地同步服務器正在 http://localhost:${PORT} 運行`);
  console.log(`也可以通過 http://0.0.0.0:${PORT} 訪問`);
  console.log('請確保已執行 "gcloud auth application-default login"');
  console.log("按 Ctrl+C 停止服務器");
});

// 錯誤處理
process.on("uncaughtException", (error) => {
  console.error("未捕獲的異常:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("未處理的 Promise 拒絕:", reason);
});

module.exports = app;

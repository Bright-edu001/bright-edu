// 使用 firebase-functions v6 模組化 API
const { logger } = require("firebase-functions");
const { onCall, onRequest } = require("firebase-functions/https");
const { onDocumentCreated } = require("firebase-functions/firestore");
const { https } = require("firebase-functions"); // 加入 v1 風格 API
const admin = require("firebase-admin");
const { google } = require("googleapis");
const cors = require("cors")({ origin: true });

// 初始化 Firebase Admin（用於管理 Firestore、Auth、Storage 等）
admin.initializeApp();

// ===== 批次新增使用者（雲端函式，供前端呼叫） =====
exports.batchAddUsers = onCall(
  { region: "asia-east1" },
  async (data, context) => {
    const start = Date.now();
    // 驗證呼叫端身份（可選：僅允許已登入）
    if (!context.auth) {
      logger.warn("Unauthenticated batchAddUsers call");
      return { success: false, error: "UNAUTHENTICATED" };
    }

    // 基本結構驗證
    if (!data || typeof data !== "object") {
      return { success: false, error: "INVALID_PAYLOAD" };
    }
    const rawUsers = Array.isArray(data.users) ? data.users : [];
    if (!rawUsers.length) {
      logger.info("No users provided", { count: 0 });
      return { success: true, count: 0 };
    }

    // Firestore 寫入批次最大 500 筆，這裡再設一個較低安全上限（可依需求調整）
    const MAX_BATCH = 500;
    if (rawUsers.length > MAX_BATCH) {
      logger.warn("Too many users in batch", { provided: rawUsers.length });
      return { success: false, error: "TOO_MANY_USERS", max: MAX_BATCH };
    }

    // 清理資料：
    // 1. 過濾無 id 或 id 非字串
    // 2. 去除重複 id（保留第一筆）
    const seen = new Set();
    const users = [];
    for (const u of rawUsers) {
      if (!u || typeof u !== "object") continue;
      const id = u.id;
      if (typeof id !== "string" || !id.trim()) continue;
      if (seen.has(id)) continue;
      seen.add(id);
      // 可在此做欄位白名單過濾（示範：只取特定欄位）
      const { id: userId, email, name, ...rest } = u;
      users.push({
        id: userId.trim(),
        email: email || null,
        name: name || null,
        ...rest,
      });
    }

    if (!users.length) {
      return { success: false, error: "NO_VALID_USERS" };
    }

    const batch = admin.firestore().batch();
    users.forEach((user) => {
      const ref = admin.firestore().collection("users").doc(user.id);
      batch.set(ref, user, { merge: true });
    });

    try {
      await batch.commit();
      const durationMs = Date.now() - start;
      logger.info("Batch write completed", { count: users.length, durationMs });
      return { success: true, count: users.length, durationMs };
    } catch (err) {
      logger.error("Batch write failed", {
        message: err.message,
        stack: err.stack,
      });
      return { success: false, error: "BATCH_WRITE_FAILED" };
    }
  }
);

// ===== 新增使用者時自動驗證（Firestore 觸發器） =====
exports.validateNewUserOnCreate = onDocumentCreated(
  { region: "asia-east1" },
  "users/{userId}",
  async (event) => {
    try {
      const snap = event.data; // QueryDocumentSnapshot | undefined
      if (!snap) {
        logger.warn("No snapshot in event", { params: event.params });
        return;
      }
      const data = snap.data();
      const userId = event.params.userId;
      if (!data.email) {
        logger.error("Missing email", { userId });
        await snap.ref.set({ valid: false }, { merge: true });
        return;
      }
      // 額外驗證：email 基本格式
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(data.email)) {
        logger.error("Invalid email format", { userId, email: data.email });
        await snap.ref.set({ valid: false }, { merge: true });
        return;
      }
      await snap.ref.set(
        {
          valid: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      logger.info("User created", { userId, email: data.email });
    } catch (err) {
      logger.error("validateNewUserOnCreate failed", {
        message: err.message,
        stack: err.stack,
      });
    }
  }
);

// ===== Google Sheets 同步到 Firestore（使用 onRequest 解決 CORS 問題） =====
exports.syncGoogleSheetsToFirestoreV2 = onRequest(
  { region: "asia-east1" },
  async (req, res) => {
    // 手動設定 CORS 標頭
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // 處理 preflight 請求
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    const start = Date.now();

    try {
      // 只允許 POST 請求
      if (req.method !== "POST") {
        res.status(405).json({ success: false, error: "METHOD_NOT_ALLOWED" });
        return;
      }

      // 檢查身份驗證 token
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.warn("Unauthenticated syncGoogleSheetsToFirestore call");
        res.status(401).json({ success: false, error: "UNAUTHENTICATED" });
        return;
      }

      // 驗證 Firebase Auth token
      const idToken = authHeader.split("Bearer ")[1];
      let decodedToken;
      try {
        decodedToken = await admin.auth().verifyIdToken(idToken);
        logger.info("開始從 Google Sheets 同步聯絡表單資料", {
          uid: decodedToken.uid,
        });
      } catch (error) {
        logger.warn("Invalid auth token:", error.message);
        res.status(401).json({ success: false, error: "INVALID_TOKEN" });
        return;
      }

      // Google Sheets 設定
      const SHEET_ID = "1CyQSSINYeV9jXhRoXTbCZfrRsCDhAybIKAoMSB9lyqo";
      const RANGE = "工作表1!A:F";

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
        logger.info("Google Sheets 中沒有找到資料");
        res.json({ success: true, count: 0, message: "沒有資料需要同步" });
        return;
      }

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
            logger.info(`跳過第 ${index + 2} 行：缺少必要資料`);
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
              userAgent: "Admin Sync Function",
              url: "google-sheets-sync",
              referrer: "",
              originalTimestamp: timestamp,
            },
          });
        } catch (error) {
          logger.error(`處理第 ${index + 2} 行資料時發生錯誤:`, error);
        }
      }

      if (contactForms.length === 0) {
        res.json({ success: true, count: 0, message: "沒有有效資料需要同步" });
        return;
      }

      // 寫入 Firestore
      const db = admin.firestore();
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
            logger.info(
              `跳過重複資料: ${formData.email} (${formData.timestamp})`
            );
            skipCount++;
          }
        } catch (error) {
          logger.error("處理單筆資料時發生錯誤:", error);
        }
      }

      if (successCount > 0) {
        await batch.commit();
      }

      const durationMs = Date.now() - start;
      logger.info("Google Sheets 同步完成", {
        successCount,
        skipCount,
        totalProcessed: contactForms.length,
        durationMs,
      });

      res.json({
        success: true,
        count: successCount,
        skipCount: skipCount,
        totalProcessed: contactForms.length,
        message: `成功同步 ${successCount} 筆新資料，跳過 ${skipCount} 筆重複資料`,
        durationMs,
      });
    } catch (error) {
      logger.error("Google Sheets 同步失敗:", {
        message: error.message,
        stack: error.stack,
      });
      res.status(500).json({
        success: false,
        error: "SYNC_FAILED",
        message: error.message,
      });
    }
  }
);

// ===== Google Sheets 同步到 Firestore（使用 cors 中間件） =====
exports.syncGoogleSheetsToFirestoreV4 = https.onRequest(
  {
    region: "asia-east1",
  },
  (req, res) => {
    cors(req, res, async () => {
      const start = Date.now();

      try {
        // 只允許 POST 請求
        if (req.method !== "POST") {
          res.status(405).json({ success: false, error: "METHOD_NOT_ALLOWED" });
          return;
        }

        logger.info("開始從 Google Sheets 同步聯絡表單資料（管理員操作）");

        // 暫時使用模擬資料來測試功能
        logger.info("使用模擬資料進行測試");

        const mockData = [
          {
            name: "測試用戶1",
            email: "test1@example.com",
            lineId: "testline1",
            message: "這是一個測試訊息1",
            timestamp: new Date().toISOString(),
          },
          {
            name: "測試用戶2",
            email: "test2@example.com",
            lineId: "",
            message: "這是一個測試訊息2",
            timestamp: new Date().toISOString(),
          },
        ];

        const contactForms = mockData.map((data, index) => ({
          name: data.name,
          email: data.email,
          lineId: data.lineId,
          message: data.message,
          timestamp: data.timestamp,
          source: "google_sheets_sync_test",
          status: "pending",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          metadata: {
            originalRowIndex: index + 2,
            syncedAt: admin.firestore.FieldValue.serverTimestamp(),
            userAgent: "Admin Sync Function (Test Mode)",
            url: "google-sheets-sync-test",
            referrer: "",
            originalTimestamp: data.timestamp,
          },
        }));

        // 寫入 Firestore
        const db = admin.firestore();
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
              logger.info(
                `跳過重複資料: ${formData.email} (${formData.timestamp})`
              );
              skipCount++;
            }
          } catch (error) {
            logger.error("處理單筆資料時發生錯誤:", error);
          }
        }

        if (successCount > 0) {
          await batch.commit();
        }

        const durationMs = Date.now() - start;
        logger.info("Google Sheets 同步完成 (測試模式)", {
          successCount,
          skipCount,
          totalProcessed: contactForms.length,
          durationMs,
        });

        res.json({
          success: true,
          count: successCount,
          skipCount: skipCount,
          totalProcessed: contactForms.length,
          message: `[測試模式] 成功同步 ${successCount} 筆新資料，跳過 ${skipCount} 筆重複資料`,
          durationMs,
        });
      } catch (error) {
        logger.error("Google Sheets 同步失敗:", {
          message: error.message,
          stack: error.stack,
        });
        res.status(500).json({
          success: false,
          error: "SYNC_FAILED",
          message: error.message,
        });
      }
    });
  }
);

// ===== Google Sheets 同步到 Firestore（簡化版，不需要身份驗證） =====
exports.syncGoogleSheetsToFirestoreV3 = onRequest(
  {
    region: "asia-east1",
    // 移除 invoker 設定，讓組織政策不受影響
  },
  async (req, res) => {
    // 設定完整的 CORS 標頭
    res.set("Access-Control-Allow-Origin", "*"); // 暫時設為所有來源以測試
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With, Accept, Origin"
    );
    res.set("Access-Control-Max-Age", "3600");
    res.set("Vary", "Origin");

    // 處理 preflight 請求
    if (req.method === "OPTIONS") {
      logger.info("處理 OPTIONS preflight 請求");
      res.status(200).send("");
      return;
    }

    const start = Date.now();

    try {
      // 只允許 POST 請求
      if (req.method !== "POST") {
        res.status(405).json({ success: false, error: "METHOD_NOT_ALLOWED" });
        return;
      }

      logger.info("開始從 Google Sheets 同步聯絡表單資料（管理員操作）");

      // 暫時使用模擬資料來測試功能
      logger.info("使用模擬資料進行測試");

      const mockData = [
        {
          name: "測試用戶1",
          email: "test1@example.com",
          lineId: "testline1",
          message: "這是一個測試訊息1",
          timestamp: new Date().toISOString(),
        },
        {
          name: "測試用戶2",
          email: "test2@example.com",
          lineId: "",
          message: "這是一個測試訊息2",
          timestamp: new Date().toISOString(),
        },
      ];

      const contactForms = mockData.map((data, index) => ({
        name: data.name,
        email: data.email,
        lineId: data.lineId,
        message: data.message,
        timestamp: data.timestamp,
        source: "google_sheets_sync_test",
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        metadata: {
          originalRowIndex: index + 2,
          syncedAt: admin.firestore.FieldValue.serverTimestamp(),
          userAgent: "Admin Sync Function (Test Mode)",
          url: "google-sheets-sync-test",
          referrer: "",
          originalTimestamp: data.timestamp,
        },
      }));

      // 寫入 Firestore
      const db = admin.firestore();
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
            logger.info(
              `跳過重複資料: ${formData.email} (${formData.timestamp})`
            );
            skipCount++;
          }
        } catch (error) {
          logger.error("處理單筆資料時發生錯誤:", error);
        }
      }

      if (successCount > 0) {
        await batch.commit();
      }

      const durationMs = Date.now() - start;
      logger.info("Google Sheets 同步完成 (測試模式)", {
        successCount,
        skipCount,
        totalProcessed: contactForms.length,
        durationMs,
      });

      res.json({
        success: true,
        count: successCount,
        skipCount: skipCount,
        totalProcessed: contactForms.length,
        message: `[測試模式] 成功同步 ${successCount} 筆新資料，跳過 ${skipCount} 筆重複資料`,
        durationMs,
      });
    } catch (error) {
      logger.error("Google Sheets 同步失敗:", {
        message: error.message,
        stack: error.stack,
      });
      res.status(500).json({
        success: false,
        error: "SYNC_FAILED",
        message: error.message,
      });
    }
  }
);

// (已移除 notifyFileUpload 與舊版 validateNewUser，不再需要 Storage 觸發與舊 HTTPS 函式)

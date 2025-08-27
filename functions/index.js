// 使用 firebase-functions v6 模組化 API
const { logger } = require("firebase-functions");
const { onCall } = require("firebase-functions/https");
const { onDocumentCreated } = require("firebase-functions/firestore");
const admin = require("firebase-admin");

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

// 清理完成，保留有用的函數：batchAddUsers 和 validateNewUserOnCreate

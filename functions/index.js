// 匯入 Firebase Functions 與 Firebase Admin SDK
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// 初始化 Firebase Admin（用於管理 Firestore、Auth、Storage 等）
admin.initializeApp();

// ===== 批次新增使用者（雲端函式，供前端呼叫） =====
exports.batchAddUsers = functions.https.onCall(async (data, context) => {
  // 建立 Firestore 批次操作
  const batch = admin.firestore().batch();
  // 將每個 user 寫入 users 集合
  (data.users || []).forEach((user) => {
    const ref = admin.firestore().collection("users").doc(user.id);
    batch.set(ref, user);
  });
  // 提交批次寫入
  await batch.commit();
  // 記錄操作日誌
  console.log(
    JSON.stringify({
      severity: "INFO",
      message: "Batch write completed",
      count: (data.users || []).length,
    })
  );
  return { success: true };
});

// ===== 新增使用者時自動驗證（Firestore 觸發器） =====
exports.validateNewUser = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    // 檢查 email 欄位是否存在
    if (!data.email) {
      // 若缺少 email，記錄錯誤並標記無效
      console.log(
        JSON.stringify({
          severity: "ERROR",
          message: "Missing email",
          userId: context.params.userId,
        })
      );
      await snap.ref.set({ valid: false }, { merge: true });
      return;
    }
    // 若有 email，記錄成功日誌
    console.log(
      JSON.stringify({
        severity: "INFO",
        message: "User created",
        userId: context.params.userId,
        email: data.email,
      })
    );
  });

// ===== 檔案上傳通知（Storage 觸發器） =====
exports.notifyFileUpload = functions.storage.object().onFinalize((object) => {
  // 當有新檔案上傳到 Cloud Storage 時，記錄日誌
  console.log(
    JSON.stringify({
      severity: "INFO",
      message: "File uploaded",
      name: object.name,
      bucket: object.bucket,
    })
  );
});

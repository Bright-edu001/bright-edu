import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./src/config/firebaseConfig.js";

const auth = getAuth(app);
const storage = getStorage(app);

async function testFirebaseStorage() {
  try {
    console.log("開始測試 Firebase Storage...");

    // 測試認證
    console.log("當前認證狀態:", auth.currentUser ? "已登入" : "未登入");

    if (!auth.currentUser) {
      console.log("用戶未登入，Storage 上傳將會失敗");
      return;
    }

    console.log("已登入用戶:", auth.currentUser.email);

    // 創建測試檔案
    const testData = new Blob(["測試內容"], { type: "text/plain" });
    const testRef = ref(storage, `blog/test_${Date.now()}.txt`);

    console.log("嘗試上傳測試檔案...");
    await uploadBytes(testRef, testData);
    console.log("✅ 測試檔案上傳成功！");
  } catch (error) {
    console.error("❌ 測試失敗:", error);
    console.error("錯誤代碼:", error.code);
    console.error("錯誤訊息:", error.message);
  }
}

// 等待認證狀態確定後執行測試
auth.onAuthStateChanged((user) => {
  if (user) {
    testFirebaseStorage();
  } else {
    console.log("等待用戶登入...");
  }
});

export { testFirebaseStorage };

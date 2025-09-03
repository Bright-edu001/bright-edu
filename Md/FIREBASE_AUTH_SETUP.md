# Firebase Authentication 設定指南

## 概述

此專案已經設定了 Firebase Authentication，支援：

- 開發環境：傳統帳號密碼登入 (admin/0000)
- 生產環境：Firebase Authentication + 限制 @bright-edu.com 域名

## 設定步驟

### 1. Firebase Console 設定

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇你的專案
3. 在左側選單點選 "Authentication"
4. 點選 "開始使用"

### 2. 啟用登入方式

#### Email/Password 驗證

1. 在 Authentication > Sign-in method 頁面
2. 點選 "電子郵件/密碼"
3. 啟用 "電子郵件/密碼" 選項
4. 點選 "儲存"

#### Google 登入 (選用)

1. 在 Authentication > Sign-in method 頁面
2. 點選 "Google"
3. 啟用 Google 登入
4. 設定專案的公開名稱
5. 選擇支援電子郵件
6. 點選 "儲存"

### 3. 建立用戶帳號

#### 方法一：Firebase Console 手動建立

1. 前往 Authentication > Users
2. 點選 "新增使用者"
3. 輸入 @bright-edu.com 結尾的電子郵件
4. 設定密碼
5. 點選 "新增使用者"

#### 方法二：程式碼建立 (一次性)

在 Firebase Console 的 Functions 或本地環境執行：

```javascript
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(
  auth,
  "admin@bright-edu.com",
  "your_secure_password"
)
  .then((userCredential) => {
    console.log("用戶建立成功:", userCredential.user);
  })
  .catch((error) => {
    console.error("建立用戶失敗:", error);
  });
```

### 4. 設定授權網域

1. 在 Authentication > Settings 頁面
2. 在 "授權網域" 區段
3. 確保包含你的線上網域 (例如: yourdomain.com)
4. 開發時 localhost 會自動包含

### 5. 環境變數設定

確保 `.env` 文件包含正確的 Firebase 設定：

```bash
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_MEASUREMENT_ID=your_measurement_id
```

## 功能說明

### 環境檢測

- **開發環境** (localhost:3000): 使用傳統帳號密碼 (admin/0000)
- **生產環境** (線上 Hosting): 使用 Firebase Authentication

### 電子郵件域名限制

- 只允許 `@bright-edu.com` 結尾的電子郵件登入
- 其他域名會被拒絕並顯示錯誤訊息

### 登入方式

- **電子郵件/密碼登入**: 輸入完整電子郵件地址和密碼
- **Google 登入**: 點選 Google 按鈕，選擇@bright-edu.com 帳號

## 測試建議

### 開發環境測試

1. 啟動開發伺服器：`npm start`
2. 前往 `http://localhost:3000/admin`
3. 使用 admin/0000 登入

### 生產環境測試

1. 部署到 Firebase Hosting
2. 前往你的線上網址 `/admin`
3. 使用 @bright-edu.com 帳號登入

## 安全性注意事項

1. **定期更新密碼**: 建議定期更新用戶密碼
2. **監控登入活動**: 在 Firebase Console 查看 Authentication 日誌
3. **備用管理員**: 建立多個管理員帳號以防單點故障
4. **雙因素驗證**: 考慮在 Gmail 帳號啟用 2FA

## 故障排除

### 常見錯誤

1. **"only @bright-edu.com emails allowed"**

   - 確保使用正確的電子郵件域名

2. **"Firebase Auth not initialized"**

   - 檢查環境變數是否正確設定
   - 確認 Firebase 專案設定

3. **"Unauthorized domain"**

   - 在 Firebase Console 新增你的網域到授權網域清單

4. **Google 登入失敗**
   - 確認 Google 登入已在 Firebase Console 啟用
   - 檢查 OAuth 設定

### 除錯方式

1. 開啟瀏覽器開發者工具
2. 查看 Console 錯誤訊息
3. 檢查 Network 標籤的 API 呼叫
4. 確認 localStorage 中的認證狀態

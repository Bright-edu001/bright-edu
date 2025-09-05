# Firebase App Check 故障排除指南

## 常見錯誤與解決方案

### 1. reCAPTCHA v3 Token 交換失敗 (400 Bad Request)

**錯誤訊息:**

```
POST https://content-firebaseappcheck.googleapis.com/v1/projects/PROJECT_ID/apps/APP_ID:exchangeRecaptchaV3Token 400 (Bad Request)
```

**可能原因:**

- reCAPTCHA 站點金鑰配置錯誤
- Firebase Console 中 App Check 設定不正確
- 網域未在 reCAPTCHA 中註冊
- App Check 服務暫時不可用

**解決步驟:**

#### 步驟 1: 檢查 Firebase Console 設定

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇專案 `bright-edu-data`
3. 進入 **App Check** 設定
4. 確認 Web 應用程式已註冊
5. 檢查 reCAPTCHA v3 提供者設定

#### 步驟 2: 驗證 reCAPTCHA 設定

1. 前往 [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. 選擇對應的站點
3. 確認以下設定：
   - 站點類型：reCAPTCHA v3
   - 網域列表包含：
     - `bright-edu-data.web.app`
     - `bright-edu-data.firebaseapp.com`
     - `localhost` (開發環境)

#### 步驟 3: 更新環境變數

確認 `.env.production` 中的 reCAPTCHA 站點金鑰正確：

```bash
REACT_APP_RECAPTCHA_SITE_KEY="正確的站點金鑰"
```

#### 步驟 4: 檢查網路環境

- 確認用戶端網路允許存取 Google 服務
- 檢查是否有防火牆或 VPN 阻擋

### 2. App Check 節流錯誤

**錯誤訊息:**

```
[Firebase/app-check]: AppCheck: 400 error. Attempts allowed again after 00m:01s (appCheck/initial-throttle)
```

**解決方案:**

- 這是正常的保護機制，等待指定時間後會自動重試
- 避免頻繁刷新頁面或重複請求
- 檢查代碼中是否有過度頻繁的 token 請求

### 3. 開發環境 App Check 問題

**現象:**
本地開發時 App Check 無法正常工作

**解決方案:**

1. 在開發環境中添加 localhost 到 reCAPTCHA 網域列表
2. 或者在開發環境中禁用 App Check：

```javascript
// 在 firebaseConfig.js 中
if (process.env.NODE_ENV === "development") {
  // 開發環境跳過 App Check
  logger.warn("[AppCheck] 開發環境中跳過 App Check");
} else {
  // 生產環境啟用 App Check
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });
}
```

### 4. 監控與除錯

#### 啟用詳細日誌

在瀏覽器開發者工具中設定：

```javascript
// 啟用 Firebase 詳細日誌
localStorage.setItem("firebase:logging", "true");
```

#### 檢查 Network 標籤

監控以下請求：

- `exchangeRecaptchaV3Token` - reCAPTCHA token 交換
- `getToken` - App Check token 獲取

#### 常用除錯指令

```javascript
// 檢查 App Check 狀態
console.log("App Check initialized:", !!appCheck);

// 手動獲取 token
fetchAppCheckToken().then((token) => console.log("Token:", token));
```

## 最佳實務

1. **錯誤處理**: 總是為 App Check 失敗提供降級方案
2. **用戶體驗**: 避免因 App Check 錯誤導致應用程式完全無法使用
3. **監控**: 定期檢查 Firebase Console 中的 App Check 指標
4. **更新**: 保持 Firebase SDK 版本最新

## 緊急處理

如果 App Check 持續失敗且影響服務，可以暫時禁用：

```javascript
// 緊急禁用 App Check
const EMERGENCY_DISABLE_APP_CHECK = false; // 設為 true 來禁用

if (!EMERGENCY_DISABLE_APP_CHECK && siteKey) {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(siteKey),
    isTokenAutoRefreshEnabled: true,
  });
}
```

**注意**: 禁用 App Check 會降低安全性，只應在緊急情況下使用。

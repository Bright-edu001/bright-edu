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
VITE_RECAPTCHA_SITE_KEY="正確的站點金鑰"
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

---

# 🔧 Firebase App Check reCAPTCHA 配置修復指南

## 🚨 問題診斷

您遇到的錯誤：

```
Invalid reCAPTCHA configuration for app: 1:156805168089:web:90755d1a4c81a0a27477c8
```

這表示 Firebase App Check 的 reCAPTCHA v3 配置有問題。

## 🎯 解決步驟

### 第一步：檢查 Firebase Console App Check 設定

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇專案 `bright-edu-data`
3. 左側選單點選 **App Check**
4. 確認您的 Web 應用程式 (`1:156805168089:web:90755d1a4c81a0a27477c8`) 已註冊

### 第二步：配置 reCAPTCHA v3 提供者

1. 在 App Check 頁面中，點選您的 Web 應用程式
2. 如果尚未配置，點選 **註冊** reCAPTCHA v3 提供者
3. 系統會引導您到 Google Cloud Console

### 第三步：設定 reCAPTCHA Enterprise（重要）

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 確保已選擇正確的專案 `bright-edu-data`
3. 搜尋並前往 **reCAPTCHA Enterprise**
4. 找到或創建對應的 reCAPTCHA 金鑰

#### 金鑰設定檢查清單：

- ✅ **金鑰類型**：網站金鑰
- ✅ **reCAPTCHA 類型**：Challenge (v2) 或 Score based (v3)
- ✅ **域名**：確保包含以下域名
  ```
  localhost
  127.0.0.1
  bright-edu-data.web.app
  bright-edu-data.firebaseapp.com
  [您的自訂域名]
  ```

### 第四步：驗證環境變數

確認 `.env` 檔案中的 Site Key 正確：

```bash
# 確認這個值與 Google Cloud Console 中的 Site Key 一致
VITE_RECAPTCHA_SITE_KEY="6Ldx4aErAAAAACXAX0jz7DtlCP4_Z01gJ0Mvrnrh"
```

### 第五步：等待配置生效

reCAPTCHA 配置變更可能需要 **5-10 分鐘** 才會生效。

## 🛠️ 使用強健版 App Check

我已經為您創建了強健版的 App Check 客戶端，它會：

1. **自動診斷配置問題**
2. **提供詳細的錯誤資訊**
3. **啟用降級模式**（當配置無效時應用仍可運行）
4. **非阻塞初始化**（不會延遲頁面載入）

### 啟用強健版本：

```bash
# 將強健版覆蓋原版本
cp src/config/appCheckClient.robust.js src/config/appCheckClient.js
```

或者手動更新 `firebaseServices.js` 中的引用：

```javascript
// 將這行
const { initializeAppCheckForHosting } = await import("./appCheckClient");

// 改為
const { initializeAppCheckRobust } = await import("./appCheckClient.robust");
```

## 🧪 測試配置

### 方法一：檢查瀏覽器 Console

1. 開啟開發者工具 (F12)
2. 查看 Console 標籤
3. 強健版會提供詳細的診斷資訊：

```
[AppCheck] reCAPTCHA 配置診斷
=== 配置檢查 ===
Site Key: 6Ldx4aEr...
App ID: 1:156805168089:web:90755d1a4c81a0a27477c8
Project ID: bright-edu-data
當前域名: bright-edu-data.web.app
```

### 方法二：使用 App Check 狀態 API

在瀏覽器 Console 中執行：

```javascript
// 檢查 App Check 狀態
import { getAppCheckStatus } from "./src/config/appCheckClient.robust.js";
console.log(getAppCheckStatus());
```

## 🚀 立即解決方案

如果您需要立即解決載入問題，可以暫時在 **本地開發環境** 停用 App Check：

### 臨時修改 `src/config/envUtils.js`

```javascript
export const isLocalDevelopment = () => {
  // 臨時返回 true 以停用 App Check
  return true; // 或者 process.env.NODE_ENV === 'development';
};
```

⚠️ **注意**：這只適用於測試，生產環境仍需正確配置 App Check。

## 📋 完整檢查清單

- [ ] Firebase Console App Check 已設定
- [ ] reCAPTCHA Enterprise 金鑰已創建
- [ ] 域名已加入 reCAPTCHA 允許清單
- [ ] 環境變數 `VITE_RECAPTCHA_SITE_KEY` 正確
- [ ] 等待 5-10 分鐘讓配置生效
- [ ] 使用強健版 App Check 客戶端
- [ ] 測試在不同環境下的運行狀況

## 🔍 常見問題

### Q: 為什麼本地開發正常，線上環境出錯？

A: 通常是域名問題。確保線上域名已加入 reCAPTCHA 允許清單。

### Q: 配置正確但仍然出錯？

A: 嘗試清除瀏覽器快取，或等待更長時間讓配置生效。

### Q: 如何確認 Site Key 是否正確？

A: 在 Google Cloud Console 中檢查 reCAPTCHA Enterprise 設定，確保 Site Key 與環境變數一致。

---

**預期結果**：修復後 App Check 錯誤消失，頁面載入速度大幅提升（從 10-13 秒降至 2-4 秒）。

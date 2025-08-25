# Google Sheets 到 Firestore 遷移指南

## 📋 概述

此指南將幫助您將現有 Google Sheets 中的聯絡表單資料遷移到 Cloud Firestore。

## 🔧 設置步驟

### 1. 建立 Cloud Firestore 資料庫

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇您的專案
3. 點擊「Firestore Database」
4. 點擊「建立資料庫」
5. 選擇模式：
   - **測試模式**（開發階段，60 天後自動停用寫入）
   - **正式環境模式**（需要安全規則，請參考 `FIRESTORE_SECURITY_RULES.md`）
6. 選擇資料庫位置：建議選擇 `asia-east1` (台灣)

### 2. 安裝相依套件

```bash
npm install googleapis firebase-admin
```

### 3. 設定 Google Sheets API 權限

#### 方法 A：使用服務帳戶 (推薦)

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 選擇您的專案
3. 啟用 Google Sheets API
4. 建立服務帳戶：
   - 前往「IAM 與管理」→「服務帳戶」
   - 點擊「建立服務帳戶」
   - 給予權限：「編輯者」或「Sheets API 使用者」
5. 下載 JSON 金鑰檔案
6. 將服務帳戶 email 加入到您的 Google Sheets 共用清單中

#### 方法 B：使用應用程式預設憑證

```bash
gcloud auth application-default login
```

### 4. 設定腳本參數

編輯 `scripts/migrateContactForms.js`：

```javascript
// 替換為您的 Google Sheets ID
const SHEET_ID = "1ABC123def456ghi789"; // 從 URL 中取得

// 調整資料範圍 (假設您的資料在 A-F 欄)
const RANGE = "Sheet1!A:F";
```

### 5. 確認 Google Sheets 格式

確保您的 Google Sheets 格式如下：

| A (姓名) | B (Email)         | C (Line ID) | D (訊息)     | E (時間戳記)        | F (其他) |
| -------- | ----------------- | ----------- | ------------ | ------------------- | -------- |
| 張三     | zhang@example.com | line123     | 我想了解課程 | 2024-01-15 10:30:00 |          |
| 李四     | li@example.com    | line456     | 請提供資料   | 2024-01-16 14:20:00 |          |

## 🚀 執行遷移

### 預覽模式（建議先執行）

```bash
node scripts/migrateContactForms.js --dry-run
```

### 正式執行遷移

```bash
node scripts/migrateContactForms.js
```

## ✅ 遷移後檢查

1. 前往 Firebase Console → Firestore Database
2. 檢查 `contact_forms` 集合
3. 確認資料格式正確
4. 測試後台聯絡表單頁面：`http://localhost:3000/admin/contact-forms`

## 📊 資料結構說明

遷移後的 Firestore 文件結構：

```javascript
{
  name: "張三",
  email: "zhang@example.com",
  lineId: "line123",
  message: "我想了解課程",
  timestamp: "2024-01-15T10:30:00.000Z",
  source: "google_sheets_migration",
  status: "pending",
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp(),
  metadata: {
    originalRowIndex: 2,
    migratedAt: serverTimestamp(),
    userAgent: "Migration Script",
    url: "google-sheets-migration",
    referrer: ""
  }
}
```

## ⚠️ 注意事項

1. **備份資料**：遷移前請備份您的 Google Sheets
2. **重複檢查**：腳本會自動檢查重複資料（基於 email + timestamp）
3. **權限設定**：確保服務帳戶有足夠的權限
4. **費用考量**：大量資料可能產生 Firestore 讀寫費用
5. **逐步測試**：建議先用少量資料測試

## 🔧 故障排除

### 常見錯誤

1. **權限不足**

   ```
   Error: The caller does not have permission
   ```

   → 檢查服務帳戶權限和 Google Sheets 共用設定

2. **找不到 Sheets**

   ```
   Error: Requested entity was not found
   ```

   → 檢查 SHEET_ID 是否正確

3. **Firestore 連線失敗**
   ```
   Error: Could not load the default credentials
   ```
   → 檢查 Firebase 設定和憑證

### 取得協助

如遇到問題，請檢查：

1. Firebase 專案設定
2. Google Cloud 專案權限
3. API 啟用狀態
4. 服務帳戶設定

## 🎯 建議的遷移策略

### 選項 1：完全遷移（推薦給新系統）

- 將所有現有資料遷移到 Firestore
- 統一使用 Firestore 作為主要資料源

### 選項 2：混合模式（推薦給現有系統）

- 保留現有 Google Sheets 資料
- 新提交的表單使用雙重備份
- 逐步淘汰 Google Sheets

### 選項 3：僅新資料

- 不遷移現有資料
- 僅對新表單啟用 Firestore 備份
- 風險最低的方案

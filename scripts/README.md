# Bright Education 資料同步工具

## 概述

此目錄包含 Bright Education 專案的資料同步和管理工具。

## 主要功能

### 1. Firestore 到 Google Sheets 同步

系統採用 **Firestore 優先** 的架構：

- 📝 前端表單直接儲存到 Firestore
- 🔄 透過管理後台手動同步到 Google Sheets
- ☁️ 使用 Google Apps Script 作為同步橋接
- 🔒 Firebase Authentication 確保安全性

### 2. 資料遷移工具

提供從 Google Sheets 遷移歷史資料到 Firestore 的腳本。

### 3. 效能分析

包含效能分析工具，用於監控和優化應用程式效能。

## 架構說明

```
前端表單提交
    ↓
儲存到 Firestore (主要資料庫)
    ↓
管理後台手動觸發同步
    ↓
透過 Google Apps Script
    ↓
同步到 Google Sheets (備份/報表用途)
```

## 快速開始

### 前置需求

- Node.js 18+
- Firebase 專案與 Firestore 設定
- Google Apps Script 部署 (用於同步功能)

### 安裝依賴

```bash
npm install
```

## 可用工具

### 1. 資料遷移 (Google Sheets → Firestore)

適用於首次設定或遷移歷史資料：

```bash
# 請參考 GOOGLE_SHEETS_MIGRATION_GUIDE.md 了解詳細步驟
node migrateContactForms.js
```

### 2. 效能分析

```bash
npm run analyze
```

## 同步機制

### Firestore → Google Sheets

同步是透過管理後台手動觸發：

1. 登入管理後台 (`/admin`)
2. 前往「聯絡表單管理」頁面
3. 點擊「同步到 Google Sheets」按鈕
4. 系統會將所有 Firestore 資料同步到 Google Sheets

**技術實作：**

- 使用 `firestoreToSheetsSync.js` 服務
- 透過 Google Apps Script Web App 接收資料
- 支援批次處理和錯誤重試

### Google Apps Script 設定

同步功能需要部署 Google Apps Script：

1. 建立新的 Google Apps Script 專案
2. 部署為 Web 應用程式
3. 設定執行身份為「我」
4. 允許「任何人」存取
5. 將部署的 URL 更新到 `firestoreToSheetsSync.js`

## 疑難排解

### 常見問題

1. **同步失敗**

   - 檢查 Google Apps Script URL 是否正確
   - 確認 Script 部署設定允許外部存取
   - 查看瀏覽器 Console 是否有 CORS 錯誤

2. **無法連接 Firestore**

   - 確認 Firebase 設定正確
   - 檢查 Firestore 安全規則
   - 驗證使用者身份驗證狀態

3. **資料格式問題**
   - 確保 Firestore 文件結構符合預期
   - 檢查必填欄位是否完整

## 資料結構

### Firestore Collection: `contact_forms`

```javascript
{
  name: "姓名",
  email: "email@example.com",
  lineId: "LINE ID (可選)",
  message: "訊息內容",
  timestamp: "ISO 8601 格式時間",
  status: "pending",
  createdAt: Firestore Timestamp,
  updatedAt: Firestore Timestamp,
  metadata: {
    userAgent: "瀏覽器資訊",
    url: "來源頁面",
    referrer: "引薦來源"
  }
}
```

### Google Sheets 格式

| 姓名 | Email | Line ID | 訊息 | 時間戳記 | 狀態 |
| ---- | ----- | ------- | ---- | -------- | ---- |
| ...  | ...   | ...     | ...  | ...      | ...  |

## 相關文件

- `GOOGLE_SHEETS_MIGRATION_GUIDE.md` - 資料遷移詳細指南
- `../src/services/firestoreToSheetsSync.js` - 同步服務實作
- `../src/admin/pages/ContactFormsPage.js` - 管理後台介面

## 安全性考量

- ✅ 使用 Firebase Authentication 進行身份驗證
- ✅ Firestore 安全規則限制存取權限
- ✅ 管理後台僅限授權使用者
- ✅ Google Apps Script 使用 POST 請求避免資料外洩
- ✅ 敏感資料不儲存在前端

## 授權

MIT License

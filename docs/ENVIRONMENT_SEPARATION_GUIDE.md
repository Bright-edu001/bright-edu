# 環境分離用戶管理功能說明

## 📋 功能概述

這個功能實現了根據環境（本地開發環境 vs 正式環境）顯示不同的用戶帳號列表，避免在用戶管理介面中混合顯示所有環境的帳號。

## 🔧 實現原理

### 環境判斷邏輯

```javascript
const isProduction =
  process.env.NODE_ENV === "production" ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost");
```

- **本地開發環境**：`NODE_ENV !== "production"` 且 `hostname === "localhost"`
- **正式環境**：`NODE_ENV === "production"` 或 `hostname !== "localhost"`

### 帳號配置分離

#### 本地開發環境帳號

```javascript
const DEVELOPMENT_USER_ROLES = {
  // 開發環境超級管理員
  "dev-admin@bright-edu.com": USER_ROLES.SUPER_ADMIN,
  "test-admin@bright-edu.com": USER_ROLES.SUPER_ADMIN,
  "local-admin@bright-edu.com": USER_ROLES.SUPER_ADMIN,

  // 開發環境管理員
  "dev-manager@bright-edu.com": USER_ROLES.ADMIN,
  "test-manager@bright-edu.com": USER_ROLES.ADMIN,

  // 開發環境編輯者
  "dev-editor@bright-edu.com": USER_ROLES.EDITOR,
  "test-editor@bright-edu.com": USER_ROLES.EDITOR,

  // 開發環境檢視者
  "dev-viewer@bright-edu.com": USER_ROLES.VIEWER,
  "test-viewer@bright-edu.com": USER_ROLES.VIEWER,
};
```

#### 正式環境帳號

```javascript
const PRODUCTION_USER_ROLES = {
  // 正式環境超級管理員
  "admin@bright-edu.com": USER_ROLES.SUPER_ADMIN,
  "ceo@bright-edu.com": USER_ROLES.SUPER_ADMIN,
  "web@bright-edu.com": USER_ROLES.SUPER_ADMIN,

  // 正式環境管理員
  "manager@bright-edu.com": USER_ROLES.ADMIN,
  "operations@bright-edu.com": USER_ROLES.ADMIN,

  // 正式環境編輯者
  "editor@bright-edu.com": USER_ROLES.EDITOR,
  "content@bright-edu.com": USER_ROLES.EDITOR,

  // 正式環境檢視者
  "viewer@bright-edu.com": USER_ROLES.VIEWER,
};
```

## 🚀 使用方式

### 1. 查看環境資訊

在用戶管理頁面頂部會顯示：

- 當前環境類型（本地開發環境/正式環境）
- 可用帳號數量
- 可用帳號列表

### 2. 測試環境功能（開發環境限定）

在開發環境中，用戶管理頁面會顯示一個「測試環境」按鈕，點擊後會在控制台輸出詳細的環境資訊。

### 3. 資料儲存分離

每個環境的用戶資料會分別儲存在 localStorage：

- 本地環境：`bright-edu-users-本地開發環境`
- 正式環境：`bright-edu-users-正式環境`

## 📝 主要修改的檔案

### 1. `src/config/permissions.js`

- 新增環境判斷邏輯
- 分離本地和正式環境的帳號配置
- 新增 `getEnvironmentInfo()` 函數

### 2. `src/admin/pages/UserManagePage.js`

- 整合環境資訊顯示
- 更新資料儲存機制（按環境分離）
- 新增環境測試功能

### 3. `src/utils/environmentTest.js`（新增）

- 環境測試工具
- 提供開發環境的除錯功能

## 🔄 切換環境效果

### 在本地開發環境 (localhost:3000)

- 顯示：「當前環境：本地開發環境」
- 可用帳號：dev-admin@bright-edu.com, test-admin@bright-edu.com 等
- 顯示測試按鈕

### 在正式環境 (已部署網址)

- 顯示：「當前環境：正式環境」
- 可用帳號：admin@bright-edu.com, ceo@bright-edu.com 等
- 不顯示測試按鈕

## ⚡ 優點

1. **環境隔離**：避免在開發時看到正式環境帳號，在正式環境看到測試帳號
2. **安全性**：降低在錯誤環境操作的風險
3. **清晰度**：管理者能清楚知道當前操作的環境
4. **除錯便利**：開發環境提供額外的測試工具

## 🛠 維護說明

### 新增帳號

1. 確定要新增到哪個環境
2. 在對應的 `DEVELOPMENT_USER_ROLES` 或 `PRODUCTION_USER_ROLES` 中新增
3. 重新載入頁面查看效果

### 修改環境判斷邏輯

如需修改環境判斷條件，請編輯 `src/config/permissions.js` 中的 `isProduction` 變數。

### 測試環境切換

使用 `src/utils/environmentTest.js` 中的測試函數：

```javascript
import { testEnvironmentInfo } from "../utils/environmentTest";
testEnvironmentInfo(); // 查看當前環境資訊
```

## 🚨 注意事項

1. **環境判斷依賴**：依賴 `NODE_ENV` 和 `window.location.hostname`，確保這些值正確設定
2. **資料分離**：不同環境的用戶資料完全分離，不會互相影響
3. **部署考慮**：確保正式環境的 `NODE_ENV` 設為 `production`
4. **測試功能**：測試相關功能僅在開發環境可用，正式環境會自動隱藏

---

**開發團隊：** Bright Education  
**最後更新：** 2025 年 9 月 2 日

# 權限管理系統使用指南

## 🎯 權限系統概述

此系統採用基於角色的權限控制（RBAC - Role-Based Access Control），為不同類型的用戶提供適當的系統訪問權限。

## 👥 角色層級

### 1. 超級管理員 (Super Admin)

- **圖示**: 👑 紅色皇冠
- **權限**: 擁有系統所有權限
- **適用對象**: 系統最高管理員、技術負責人
- **特殊功能**:
  - 可以管理其他管理員的角色
  - 可以訪問系統設定
  - 擁有所有數據的完整控制權

### 2. 管理員 (Admin)

- **圖示**: 👤 藍色用戶
- **權限**: 擁有大部分管理權限
- **適用對象**: 部門主管、運營經理
- **可執行操作**:
  - 管理文章內容
  - 處理聯絡表單
  - 檢視和編輯用戶資料
  - 系統基本設定

### 3. 編輯者 (Editor)

- **圖示**: ✏️ 綠色編輯
- **權限**: 內容編輯相關權限
- **適用對象**: 內容編輯人員、行銷人員
- **可執行操作**:
  - 建立和編輯文章
  - 檢視聯絡表單
  - 檢視用戶資料

### 4. 檢視者 (Viewer)

- **圖示**: 👁️ 橘色眼睛
- **權限**: 只讀權限
- **適用對象**: 實習生、臨時協助人員
- **可執行操作**:
  - 檢視儀表板
  - 檢視文章和聯絡表單（只讀）

## 📧 用戶角色分配

### 自動分配規則

系統根據電子郵件地址自動分配角色：

```javascript
// 預設角色配置
const DEFAULT_USER_ROLES = {
  // 超級管理員
  "admin@bright-edu.com": "super_admin",
  "ceo@bright-edu.com": "super_admin",

  // 管理員
  "manager@bright-edu.com": "admin",
  "operations@bright-edu.com": "admin",

  // 編輯者
  "editor@bright-edu.com": "editor",
  "content@bright-edu.com": "editor",

  // 其他 @bright-edu.com 用戶預設為檢視者
};
```

### 修改用戶角色

1. 登入具有用戶管理權限的帳號
2. 前往「用戶管理」頁面
3. 點選要修改的用戶「編輯」按鈕
4. 選擇新的角色並保存

## 🔐 權限詳細列表

### 儀表板權限

- `view_dashboard` - 檢視儀表板

### 文章管理權限

- `view_articles` - 檢視文章
- `create_articles` - 建立文章
- `edit_articles` - 編輯文章
- `delete_articles` - 刪除文章
- `publish_articles` - 發布文章

### 聯絡表單權限

- `view_contact_forms` - 檢視聯絡表單
- `delete_contact_forms` - 刪除聯絡表單
- `export_contact_forms` - 匯出聯絡表單

### 用戶管理權限

- `view_users` - 檢視用戶
- `create_users` - 建立用戶
- `edit_users` - 編輯用戶
- `delete_users` - 刪除用戶
- `manage_roles` - 管理角色

### 系統設定權限

- `view_settings` - 檢視設定
- `edit_settings` - 編輯設定
- `manage_system` - 系統管理

## 🛠️ 開發者指南

### 在程式碼中檢查權限

#### 在組件中使用權限檢查

```javascript
import { useAuth } from "../../context/AuthContext";
import { PERMISSIONS } from "../../config/permissions";

const MyComponent = () => {
  const { checkPermission } = useAuth();

  // 檢查單一權限
  const canEditArticles = checkPermission(PERMISSIONS.EDIT_ARTICLES);

  return <div>{canEditArticles && <Button>編輯文章</Button>}</div>;
};
```

#### 使用 PermissionGuard 組件

```javascript
import PermissionGuard from "../components/PermissionGuard";
import { PERMISSIONS } from "../../config/permissions";

<PermissionGuard permission={PERMISSIONS.VIEW_ARTICLES} showNoPermissionMessage>
  <ArticleList />
</PermissionGuard>;
```

#### 路由級別的權限保護

```javascript
<Route
  path="/articles"
  element={
    <PermissionGuard
      permission={PERMISSIONS.VIEW_ARTICLES}
      showNoPermissionMessage
    >
      <ArticlesPage />
    </PermissionGuard>
  }
/>
```

### 新增權限

1. 在 `src/config/permissions.js` 中新增權限常數
2. 將權限分配給適當的角色
3. 在組件中使用新權限

```javascript
// 1. 新增權限
export const PERMISSIONS = {
  // 現有權限...
  MANAGE_ANALYTICS: "manage_analytics", // 新權限
};

// 2. 分配給角色
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: [
    // 現有權限...
    PERMISSIONS.MANAGE_ANALYTICS, // 新增到超級管理員
  ],
  // 其他角色...
};

// 3. 在組件中使用
const { checkPermission } = useAuth();
const canManageAnalytics = checkPermission(PERMISSIONS.MANAGE_ANALYTICS);
```

## 🔧 設定說明

### Firebase Authentication 設定

1. 在 Firebase Console 啟用 Authentication
2. 設定登入方式：電子郵件/密碼 + Google 登入
3. 在授權網域中新增你的線上網域

### 環境變數設定

確保 `.env` 檔案包含：

```bash
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
# ... 其他Firebase設定
```

## 🚨 安全性考量

### 前端權限檢查

- 前端權限檢查主要用於 UI 控制
- 不應依賴前端檢查作為唯一的安全措施
- 重要操作應在後端再次驗證權限

### 後端權限驗證

- 所有 API 請求都應驗證用戶權限
- 使用 Firebase Admin SDK 驗證用戶身份
- 根據用戶角色控制數據訪問

### 最佳實踐

1. **最小權限原則**: 只給用戶必要的權限
2. **定期審查**: 定期檢查用戶權限是否仍然適當
3. **權限繼承**: 高級角色自動包含低級角色的權限
4. **日誌記錄**: 記錄重要操作的執行者和時間

## 📋 常見問題

### Q: 如何新增新用戶？

A: 在 Firebase Console 的 Authentication 頁面手動建立用戶，或由超級管理員在用戶管理頁面新增。

### Q: 用戶看不到某個功能怎麼辦？

A: 檢查用戶的角色和權限，確認是否有相應的訪問權限。

### Q: 如何修改預設角色分配？

A: 修改 `src/config/permissions.js` 中的 `DEFAULT_USER_ROLES` 配置。

### Q: 權限變更何時生效？

A: 權限變更在用戶下次登入時生效，或可以要求用戶重新登入。

### Q: 開發環境和生產環境的權限有差異嗎？

A: 開發環境使用 admin/0000 登入自動獲得超級管理員權限，生產環境基於 Firebase Authentication 和電子郵件域名分配權限。

---

## 🎉 結語

這個權限系統提供了靈活且安全的用戶管理機制，可以根據組織需求輕鬆調整角色和權限。如有任何問題或需要協助，請聯絡技術團隊。

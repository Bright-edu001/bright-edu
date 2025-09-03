# 後台登入系統使用說明

## 功能概述

此專案已成功設定了雙環境認證系統：

### 🔧 開發環境 (localhost:3000)

- **登入方式**: 傳統帳號密碼
- **帳號**: `admin`
- **密碼**: `0000`
- **特點**: 快速開發測試，無需網路連線

### 🌐 生產環境 (線上 Hosting)

- **登入方式**: Firebase Authentication
- **限制**: 只允許 `@bright-edu.com` 域名的電子郵件
- **支援**: 電子郵件/密碼登入 + Google 登入
- **安全性**: 完整的身份驗證和授權

## 🚀 立即開始

### 1. 開發環境測試

```bash
# 啟動開發伺服器
npm start

# 訪問後台
http://localhost:3000/admin

# 使用開發帳號登入
帳號: admin
密碼: 0000
```

### 2. 生產環境設定

#### 步驟一：Firebase Authentication 設定

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 啟用 Authentication
3. 設定登入方式：電子郵件/密碼 + Google (選用)
4. 新增授權網域

#### 步驟二：建立管理員帳號

```javascript
// 在Firebase Console建立用戶
電子郵件: admin@bright-edu.com
密碼: [設定安全密碼]
```

#### 步驟三：環境變數設定

```bash
# 複製範例檔案
cp .env.example .env

# 編輯.env檔案，填入Firebase設定
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
# ... 其他設定
```

## 📱 使用方式

### 環境自動檢測

系統會自動檢測執行環境：

- `localhost` = 開發環境
- 其他域名 = 生產環境

### 登入流程

#### 開發環境

1. 訪問 `/admin`
2. 輸入 `admin` / `0000`
3. 點選「登入」

#### 生產環境

1. 訪問 `/admin`
2. **方式一**: 電子郵件登入

   - 輸入 `@bright-edu.com` 電子郵件
   - 輸入密碼
   - 點選「登入」

3. **方式二**: Google 登入 (如已啟用)
   - 點選「使用 Google 帳號登入」
   - 選擇 `@bright-edu.com` Google 帳號
   - 完成授權

### 安全機制

- ✅ 域名限制：只允許 `@bright-edu.com`
- ✅ 自動登出：非法域名會被自動登出
- ✅ 會話管理：登入狀態持久化
- ✅ 錯誤處理：清楚的錯誤提示

## 🔐 安全性特色

### 域名白名單

```javascript
// 只允許這個域名的電子郵件
const allowedDomain = "@bright-edu.com";

// 其他域名會看到此錯誤
("只允許 @bright-edu.com 的電子郵件帳號登入");
```

### 雙重驗證流程

1. **Firebase 驗證**: 確認帳號密碼正確
2. **域名驗證**: 確認是組織內部電子郵件
3. **會話管理**: 維持登入狀態直到主動登出

## 📋 管理功能

### 用戶界面

- 顯示當前登入用戶資訊
- 清楚標示執行環境 (開發/正式)
- 一鍵登出功能

### 路由保護

所有後台頁面都受到保護：

- `/admin/` - 儀表板
- `/admin/articles` - 文章管理
- `/admin/contact-forms` - 聯絡表單
- 其他後台功能...

## 🛠️ 開發者資訊

### 檔案結構

```
src/
├── context/
│   └── AuthContext.js          # 認證上下文
├── admin/
│   ├── App.js                  # 後台主應用 (包含AuthProvider)
│   ├── pages/
│   │   └── LoginPage.js        # 登入頁面
│   ├── components/
│   │   ├── PrivateRoute.js     # 路由保護元件
│   │   └── ProtectedRoute.js   # 進階保護元件
│   └── layouts/
│       └── AdminLayout.js      # 後台佈局 (含登出功能)
└── config/
    └── firebaseConfig.js       # Firebase設定
```

### 關鍵功能

1. **AuthContext**: 統一認證邏輯
2. **環境檢測**: 自動切換認證方式
3. **域名限制**: 硬編碼的安全限制
4. **錯誤處理**: 用戶友善的錯誤訊息

## 🚨 注意事項

### 開發階段

- 開發環境帳號密碼是硬編碼的，請勿在生產環境使用
- 確保 `.env` 檔案不會被提交到版本控制

### 生產階段

- 定期更新管理員密碼
- 監控 Firebase Authentication 使用情況
- 備份重要的 Firebase 設定

### 疑難排解

1. **看不到登入畫面**: 檢查路由是否正確 (`/admin`)
2. **登入失敗**: 確認電子郵件域名正確
3. **Google 登入問題**: 檢查 Firebase Console 設定
4. **環境變數錯誤**: 確認 `.env` 檔案設定

## 📞 技術支援

如遇到問題，請檢查：

1. 瀏覽器開發者工具的 Console 錯誤
2. Firebase Console 的 Authentication 日誌
3. 環境變數是否正確設定
4. 網路連線是否正常

---

✅ **設定完成！你的後台已具備企業級的雙環境認證系統**

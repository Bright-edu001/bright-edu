# Bright Education API 接口文檔

> **專案名稱：** Bright Education  
> **版本：** 1.0.0  
> **最後更新：** 2025 年 9 月 2 日

## 📋 目錄

- [API 總覽](#-api-總覽)
- [Firebase Firestore API](#-firebase-firestore-api)
- [外部 API 服務](#-外部-api-服務)
- [Firebase 配置 API](#-firebase-配置-api)
- [前端 Context API](#-前端-context-api)
- [API 呼叫範例](#-api-呼叫範例)
- [部署服務](#-部署服務)
- [安全設定](#-安全設定)
- [錯誤處理](#-錯誤處理)

## 🚀 API 總覽

Bright Education 專案採用現代化的 API 架構，結合 Firebase 生態系統與外部同步服務，提供完整的內容管理和資料同步功能。

### 技術棧

- **前端框架：** React.js
- **資料庫：** Firebase Firestore
- **認證系統：** Firebase Authentication
- **檔案儲存：** Firebase Storage
- **雲端函數：** Firebase Functions
- **外部同步：** Google Cloud Run + Google Sheets API

## 🔥 Firebase Firestore API

### 📰 部落格/新聞管理 API

**檔案位置：**

- `src/services/blogService.jsx` (前端服務)
- `src/admin/data/blogApi.jsx` (管理後台)

#### 前端部落格服務

| 功能                    | 方法 | Collection                 | 描述                 | 回傳格式                 |
| ----------------------- | ---- | -------------------------- | -------------------- | ------------------------ |
| `getAllBlogPosts()`     | GET  | `enrollmentEvents`, `news` | 取得所有部落格文章   | `Array<BlogPost>`        |
| `getEnrollmentEvents()` | GET  | `enrollmentEvents`         | 取得招生活動         | `Array<EnrollmentEvent>` |
| `getNews()`             | GET  | `news`                     | 取得新聞文章         | `Array<NewsArticle>`     |
| `getBlogPost(id)`       | GET  | `enrollmentEvents`, `news` | 根據 ID 取得單一文章 | `BlogPost \| null`       |

**資料結構範例：**

```javascript
// BlogPost 結構
{
  id: "string",
  title: "string",
  content: "string",
  image: "string", // Firebase Storage URL
  thumbnail: "string", // Firebase Storage URL
  category: "string",
  type: "enrollment" | "article",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

#### 管理後台文章 API

| 功能                               | 方法   | Collection                 | 描述                   | 參數                                                  |
| ---------------------------------- | ------ | -------------------------- | ---------------------- | ----------------------------------------------------- |
| `getAllArticles()`                 | GET    | `enrollmentEvents`, `news` | 取得所有文章（管理用） | -                                                     |
| `getArticle(type, id)`             | GET    | 動態                       | 取得單一文章           | `type: "enrollment"\|"article"`, `id: string`         |
| `createArticle(type, data)`        | POST   | 動態                       | 新增文章               | `type: "enrollment"\|"article"`, `data: ArticleData`  |
| `updateArticle(type, docId, data)` | PUT    | 動態                       | 更新文章               | `type`, `docId: string`, `data: Partial<ArticleData>` |
| `deleteArticle(type, docId)`       | DELETE | 動態                       | 刪除文章               | `type`, `docId: string`                               |

**使用範例：**

```javascript
// 新增招生活動
const newEvent = await createArticle("enrollment", {
  title: "2025年春季招生",
  content: "招生內容...",
  category: "enrollment",
  image: "/images/event.jpg",
});

// 更新新聞文章
await updateArticle("article", "doc123", {
  title: "更新後的標題",
  updatedAt: new Date(),
});
```

### 📝 聯絡表單 API

**檔案位置：** `src/services/contactService.jsx`

#### ContactService 類別

| 功能                                        | 方法 | Collection      | 描述                                  | 參數                   |
| ------------------------------------------- | ---- | --------------- | ------------------------------------- | ---------------------- |
| `saveToFirestore(formData)`                 | POST | `contact_forms` | 儲存表單到 Firestore                  | `FormData`             |
| `saveToBoth(formData, googleSheetsRequest)` | POST | `contact_forms` | 同時儲存到 Firestore 和 Google Sheets | `FormData`, `Function` |
| `checkCache(cacheKey)`                      | GET  | -               | 檢查快取避免重複提交                  | `string`               |

**表單資料結構：**

```javascript
// FormData 結構
{
  name: "string", // 必填
  email: "string", // 必填
  lineId: "string", // 選填
  message: "string", // 必填
  phone: "string", // 選填
  timestamp: "ISO string",
  source: "website" | "admin",
  status: "pending" | "processed"
}
```

**使用範例：**

```javascript
const contactService = new ContactService();

// 儲存到 Firestore
const result = await contactService.saveToFirestore({
  name: "張三",
  email: "zhang@example.com",
  message: "詢問課程資訊",
});

// 同時儲存到兩個系統
const dualResult = await contactService.saveToBoth(
  formData,
  async (data) => await sendToGoogleSheets(data),
);
```

### 👥 使用者管理 API (Firebase Functions)

**檔案位置：** `functions/index.js`  
**部署區域：** `asia-east1`

#### Cloud Functions

| 功能                      | 類型              | Collection | 描述             | 觸發條件   |
| ------------------------- | ----------------- | ---------- | ---------------- | ---------- |
| `batchAddUsers`           | HTTP Callable     | `users`    | 批次新增使用者   | 前端呼叫   |
| `validateNewUserOnCreate` | Firestore Trigger | `users`    | 自動驗證新使用者 | 文件建立時 |

**batchAddUsers 參數：**

```javascript
// 請求格式
{
  users: [
    {
      id: "string", // 必填，唯一識別
      email: "string", // 必填
      name: "string", // 選填
      // 其他自定義欄位
    }
  ]
}

// 回應格式
{
  success: boolean,
  count: number, // 成功處理的使用者數量
  durationMs: number, // 處理時間
  error?: string // 錯誤訊息（如果失敗）
}
```

**使用範例：**

```javascript
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebaseServices";

const batchAddUsers = httpsCallable(functions, "batchAddUsers");

const result = await batchAddUsers({
  users: [
    { id: "user1", email: "user1@example.com", name: "使用者1" },
    { id: "user2", email: "user2@example.com", name: "使用者2" },
  ],
});
```

## 🌐 外部 API 服務

### 📊 Google Sheets 同步 API

**檔案位置：**

- `src/services/firestoreToSheetsSync.jsx`
- `src/config/syncConfig.jsx`

> Note: Based on repo callers, the active contact form sync path currently appears to be `src/admin/pages/ContactFormsPage.jsx` -> `src/services/firestoreToSheetsSync.jsx` -> the hard-coded Google Apps Script endpoint in `src/services/firestoreToSheetsSync.jsx`. `src/config/syncConfig.jsx` exposes a separate Cloud Run-based sync configuration (`VITE_SYNC_SERVICE_URL`, `VITE_DEV_SYNC_SERVICE_URL`, `VITE_SYNC_API_KEY`) and should not be assumed to be the active contact form sync path without implementation changes.

**基礎 URL：** `https://bright-edu-sync-156805168089.asia-east1.run.app`

#### API 端點

| 端點                       | 方法 | 描述                    | 認證    | 回應格式       |
| -------------------------- | ---- | ----------------------- | ------- | -------------- |
| `/`                        | GET  | 服務資訊                | 無      | `ServiceInfo`  |
| `/health`                  | GET  | 健康檢查                | 無      | `HealthStatus` |
| `/api/sync-google-sheets`  | POST | 同步 Google Sheets 資料 | API Key | `SyncResult`   |
| `/api/clear-contact-forms` | POST | 清除聯絡表單資料        | API Key | `ClearResult`  |

**認證方式：**

```javascript
// 請求標頭
{
  'Content-Type': 'application/json',
  'x-api-key': 'your-sync-api-key'
}
```

#### 同步服務類別 (FirestoreToSheetsSync)

| 功能                       | 方法 | 描述                           | 參數       |
| -------------------------- | ---- | ------------------------------ | ---------- |
| `checkHealth()`            | GET  | 檢查服務健康狀態               | -          |
| `sendToSheets(data)`       | POST | 發送資料到 Google Sheets       | `SyncData` |
| `sendToSheetsViaGet(data)` | GET  | 使用 GET 方式發送（避免 CORS） | `SyncData` |
| `syncAllContactForms()`    | POST | 同步所有聯絡表單               | -          |

**使用範例：**

```javascript
import { syncGoogleSheets, checkSyncServiceHealth } from "../config/syncConfig";

// 執行同步
try {
  const result = await syncGoogleSheets();
  console.log("同步完成:", result);
} catch (error) {
  console.error("同步失敗:", error);
}

// 健康檢查
const health = await checkSyncServiceHealth();
```

### 🔗 HTTP 請求實作說明

**檔案位置：** `src/services/contactService.jsx`、`src/config/syncConfig.jsx`

目前 repo 沒有獨立的通用 request helper 檔案。前端 API 呼叫由現行 service/helper 模組處理：

- `ContactService`（`src/services/contactService.jsx`）負責聯絡表單資料處理與 Firestore 寫入。
- `syncConfig`（`src/config/syncConfig.jsx`）提供 Google Sheets 同步與健康檢查請求封裝。

**使用範例：**

```javascript
import { syncGoogleSheets, checkSyncServiceHealth } from "../config/syncConfig";

const syncResult = await syncGoogleSheets();
const health = await checkSyncServiceHealth();
```

## 🔐 Firebase 配置 API

**檔案位置：** `src/config/firebaseCore.jsx`、`src/config/firebaseServices.jsx`

### Firebase 服務

| 服務               | 用途         | 配置                   |
| ------------------ | ------------ | ---------------------- |
| **Authentication** | 使用者認證   | Google, Email/Password |
| **Firestore**      | NoSQL 資料庫 | 多區域複寫             |
| **Storage**        | 檔案儲存     | 圖片、文件上傳         |
| **Functions**      | 雲端函數     | 後端邏輯處理           |
| **App Check**      | 應用程式驗證 | reCAPTCHA v3           |
| **Analytics**      | 使用分析     | 使用者行為追蹤         |

### 環境變數配置

```bash
# Firebase 配置
VITE_API_KEY=your-api-key
VITE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_PROJECT_ID=your-project-id
VITE_STORAGE_BUCKET=your-project.appspot.com
VITE_MESSAGING_SENDER_ID=123456789
VITE_APP_ID=1:123456789:web:abcdef

# Google Sheets 同步
VITE_FORM_ENDPOINT=https://script.google.com/...
VITE_SYNC_SERVICE_URL=https://your-sync-service.run.app
VITE_SYNC_API_KEY=your-sync-api-key

# reCAPTCHA
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-key
```

## 📱 前端 Context API

**檔案位置：** `src/context/`

### Context 提供者

| Context         | 檔案                | 功能           | 狀態管理              |
| --------------- | ------------------- | -------------- | --------------------- |
| `AuthContext`   | `AuthContext.jsx`   | 使用者認證狀態 | 登入/登出、使用者資訊 |
| `BlogContext`   | `BlogContext.jsx`   | 部落格資料狀態 | 文章列表、載入狀態    |
| `SearchContext` | `SearchContext.jsx` | 搜尋功能狀態   | 搜尋關鍵字、結果      |

### AuthContext API

```javascript
// 使用方式
import { useAuth } from '../context/AuthContext';

const { user, login, logout, loading } = useAuth();

// 狀態結構
{
  user: User | null,
  loading: boolean,
  login: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>
}
```

### BlogContext API

```javascript
// 使用方式
import { useBlog } from '../context/BlogContext';

const { posts, loading, error, refreshPosts } = useBlog();

// 狀態結構
{
  posts: BlogPost[],
  loading: boolean,
  error: string | null,
  refreshPosts: () => Promise<void>
}
```

## 🛠 API 呼叫範例

### 1. Firestore 資料操作

```javascript
// 取得部落格文章
import { getAllBlogPosts, getBlogPost } from "../services/blogService";

// 獲取所有文章
const posts = await getAllBlogPosts();

// 獲取特定文章
const post = await getBlogPost("article-id");
```

### 2. 聯絡表單提交

```javascript
import ContactService from "../services/contactService";

const contactService = new ContactService();

const formData = {
  name: "使用者姓名",
  email: "user@example.com",
  message: "詢問內容",
  lineId: "@lineid",
};

// 儲存到 Firestore
const result = await contactService.saveToFirestore(formData);

// 同時儲存到 Google Sheets
const dualResult = await contactService.saveToBoth(formData, async (data) => {
  // Google Sheets 請求函數
  return await sendToGoogleSheets(data);
});
```

### 3. 管理後台操作

```javascript
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../admin/data/blogApi";

// 獲取所有文章
const articles = await getAllArticles();

// 新增文章
const newArticle = await createArticle("enrollment", {
  title: "新招生活動",
  content: "內容...",
  category: "enrollment",
});

// 更新文章
await updateArticle("article", "doc-id", {
  title: "更新標題",
});

// 刪除文章
await deleteArticle("enrollment", "doc-id");
```

### 4. Firebase Functions 呼叫

```javascript
import { httpsCallable } from "firebase/functions";
import { functions } from "../config/firebaseServices";

// 批次新增使用者
const batchAddUsers = httpsCallable(functions, "batchAddUsers");

const result = await batchAddUsers({
  users: [
    { id: "user1", email: "user1@example.com", name: "使用者1" },
    { id: "user2", email: "user2@example.com", name: "使用者2" },
  ],
});

console.log(`成功新增 ${result.data.count} 個使用者`);
```

### 5. Google Sheets 同步

```javascript
import { syncGoogleSheets, checkSyncServiceHealth } from "../config/syncConfig";

// 執行同步
try {
  console.log("開始同步...");
  const result = await syncGoogleSheets();

  if (result.success) {
    console.log(`同步完成，處理了 ${result.count} 筆資料`);
  }
} catch (error) {
  console.error("同步失敗:", error.message);
}

// 健康檢查
const health = await checkSyncServiceHealth();
if (health.status === "healthy") {
  console.log("同步服務運行正常");
}
```

## 🚀 部署服務

### 1. Firebase Hosting

- **URL：** `https://bright-edu-data.web.app/`
- **用途：** 前端應用程式托管
- **配置檔：** `firebase.json`

### 2. Firebase Functions

- **URL：** `https://asia-east1-bright-edu-data.cloudfunctions.net/`
- **用途：** 後端雲端函數
- **區域：** `asia-east1`

### 3. Google Cloud Run

- **URL：** `https://bright-edu-sync-156805168089.asia-east1.run.app`
- **用途：** Google Sheets 同步服務
- **容器化：** Docker

### 4. Firebase Firestore

- **用途：** NoSQL 資料庫
- **Collections：**
  - `enrollmentEvents` - 招生活動
  - `news` - 新聞文章
  - `contact_forms` - 聯絡表單
  - `users` - 使用者資料

## 🔒 安全設定

### 1. API 認證

#### Firebase App Check

```javascript
// reCAPTCHA v3 驗證
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("recaptcha-site-key"),
  isTokenAutoRefreshEnabled: true,
});
```

#### API Key 驗證

```javascript
// Google Sheets 同步服務
const headers = {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_SYNC_API_KEY,
};
```

### 2. CORS 設定

```javascript
// 允許的來源
const CORS_ORIGINS = [
  "https://bright-edu-data.web.app",
  "https://bright-edu-data.firebaseapp.com",
  "http://localhost:3000", // 開發環境
];
```

### 3. Firestore 安全規則

```javascript
// 範例安全規則
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 公開讀取部落格文章
    match /enrollmentEvents/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // 聯絡表單需要認證
    match /contact_forms/{document} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 4. 資料驗證

```javascript
// 表單資料驗證
const validateFormData = (data) => {
  const errors = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("姓名至少需要 2 個字元");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("請輸入有效的電子郵件");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("訊息至少需要 10 個字元");
  }

  return errors;
};
```

## ⚠️ 錯誤處理

### 1. HTTP 狀態碼

| 狀態碼 | 描述       | 處理方式         |
| ------ | ---------- | ---------------- |
| `200`  | 成功       | 正常處理回應     |
| `400`  | 請求錯誤   | 檢查請求格式     |
| `401`  | 未認證     | 重新登入         |
| `403`  | 權限不足   | 檢查使用者權限   |
| `404`  | 資源不存在 | 提示使用者       |
| `500`  | 伺服器錯誤 | 重試或聯絡管理員 |

### 2. 錯誤處理範例

```javascript
// 統一錯誤處理
const handleApiError = (error) => {
  console.error("API 錯誤:", error);

  if (error.code === "permission-denied") {
    throw new Error("權限不足，請檢查登入狀態");
  } else if (error.code === "not-found") {
    throw new Error("請求的資源不存在");
  } else if (error.code === "unavailable") {
    throw new Error("服務暫時無法使用，請稍後再試");
  } else {
    throw new Error(`操作失敗: ${error.message}`);
  }
};

// 使用範例
try {
  const result = await getAllBlogPosts();
  return result;
} catch (error) {
  handleApiError(error);
}
```

### 3. 重試機制

```javascript
// 自動重試函數
const retryOperation = async (operation, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      const delay = Math.pow(2, attempt) * 1000; // 指數退避
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// 使用範例
const result = await retryOperation(async () => {
  return await syncGoogleSheets();
});
```

## 📊 效能優化

### 1. 快取策略

```javascript
// ContactService 快取機制
class ContactService {
  constructor() {
    this.recentSubmissions = new Map();
    this.CACHE_DURATION = 60000; // 1分鐘
    this.MAX_CACHE_SIZE = 100;
  }

  checkCache(cacheKey) {
    if (this.recentSubmissions.has(cacheKey)) {
      const cached = this.recentSubmissions.get(cacheKey);
      if (Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.result;
      }
    }
    return null;
  }
}
```

### 2. 資料預載

```javascript
// BlogContext 中的資料預載
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const [enrollmentEvents, news] = await Promise.all([
        getEnrollmentEvents(),
        getNews(),
      ]);
      const allPosts = [...enrollmentEvents, ...news];
      setPosts(allPosts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
```

## 📚 相關文檔

- [Firebase 官方文檔](https://firebase.google.com/docs)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [React Context API](https://reactjs.org/docs/context.html)
- [Firebase Functions](https://firebase.google.com/docs/functions)

---

**維護團隊：** Bright Education 開發團隊  
**聯絡方式：** 透過專案 Issues 或 Pull Requests  
**版權聲明：** © 2025 Bright Education. All rights reserved.

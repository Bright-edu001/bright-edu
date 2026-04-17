# Bright-Edu 專案指令

## 專案概要

Bright-Edu 是一個多校園教育平台，提供 MSU（密蘇里州立大學）、UIC（伊利諾大學芝加哥分校）、OU（奧克拉荷馬大學）的 MBA / MS 課程資訊、部落格、招生活動、聯絡表單等功能。包含前台網站與後台管理系統。

## 技術棧

- **前端框架**: React 19 + React Router 6
- **建置工具**: Vite 5
- **樣式**: SCSS (模組化) + Ant Design 5 + Mantine 8
- **狀態管理**: React Query (@tanstack/react-query) + React Context
- **富文字編輯器**: BlockNote
- **雲端服務**: Firebase 12 (Auth, Firestore, Functions, Storage, Hosting, App Check)
- **Cloud Functions**: Node 20 + Firebase Admin SDK + googleapis
- **錯誤追蹤**: Sentry
- **測試**: Vitest 4 (單元) + Playwright 1.58 (E2E) + Testing Library
- **部署**: Firebase Hosting + GitHub Actions CI/CD + gh-pages

## 目錄結構

```
src/
├── admin/          # 後台管理系統（獨立的 App、元件、頁面、佈局）
├── components/     # 前台可複用元件（23 個元件目錄）
├── pages/          # 前台頁面（Home, Blog, Msu, Uic, Ou）
├── routes/         # 路由配置（含中英文路由）
├── services/       # 服務層（blogService, contactService, dataSyncService）
├── config/         # 設定檔（Firebase、權限、環境變數、URL 對應）
├── context/        # React Context（Auth, Blog, Search, FirebaseInit）
├── hooks/          # 自訂 Hooks（useBlogData, useFormSubmit 等）
├── utils/          # 工具函式（sanitizeHtml, debounce, logger 等）
├── data/           # 靜態資料與 JSON
├── constants/      # 常數定義
├── styles/         # 全域 SCSS（_variables, _mixins, _base）
├── App.jsx         # 應用入口（Firebase 初始化 + Provider 結構）
├── router.jsx      # 路由設定
└── index.jsx       # 進入點
functions/           # Firebase Cloud Functions
docs/                # 技術文件（12 份）
e2e/                 # Playwright E2E 測試
scripts/             # 自動化腳本（效能分析、Storage 測試）
```

## 常用指令

| 指令                  | 說明                       |
| --------------------- | -------------------------- |
| `npm run start`       | 啟動開發伺服器 (port 3000) |
| `npm run build`       | 開發環境建置               |
| `npm run build:prod`  | 生產環境建置               |
| `npm test`            | 執行 Vitest 單元測試       |
| `npm run test:watch`  | 測試監聽模式               |
| `npx playwright test` | 執行 E2E 測試              |
| `npm run deploy`      | 部署到 GitHub Pages        |
| `npm run analyze`     | 分析打包大小               |

## 開發規範

- 所有 React 檔案使用 `.jsx` 副檔名
- 元件使用函式元件 + PropTypes 驗證
- 樣式使用 SCSS 模組化，全域變數定義在 `src/styles/_variables.scss`
- SCSS 若 mixin 內含 `@media`、`&:hover` 等巢狀規則，呼叫端不可在 `@include` 後繼續寫一般 declaration；應拆成 base mixin 與巢狀規則 mixin，或把 declaration 移到 `@include` 前，以避免 Sass `mixed-decls` 問題與 responsive 覆蓋順序錯誤
- 資料取得使用 React Query，不直接在元件中呼叫 Firebase
- 服務層需包含 Firebase 就緒狀態檢查與錯誤處理
- 路由支援中英文雙語（如 msuRoutes + msuChineseRoutes）
- 使用 `@` 路徑別名指向 `src/`
- HTML 內容必須經過 `sanitizeHtml()` 處理以防止 XSS

## 權限系統

四層角色：super_admin > admin > editor > viewer
權限控制使用 `PermissionGuard` 元件，定義在 `src/config/permissions.jsx`
詳見 `docs/PERMISSION_MANAGEMENT_GUIDE.md`

## 環境配置

- 環境變數以 `VITE_` 前綴定義，參考 `.env.example`
- 環境判斷工具：`src/config/envUtils.jsx`
- Firebase 設定：`src/config/firebaseCore.jsx`
- 環境分離指南：`docs/ENVIRONMENT_SEPARATION_GUIDE.md`

## ⚠️ 安全規則（所有助手必須遵守）

1. **畫面變動確認**：任何涉及 UI 畫面、版面佈局、樣式的修改，必須先向使用者描述具體變更內容，取得明確確認後才可執行。
2. **部署確認**：任何部署、發版操作（deploy、firebase deploy、git push）必須先列出變更清單，取得使用者確認後才可執行。
3. **安全規則修改**：修改 `firestore.rules` 或 `storage.rules` 前必須向使用者說明影響範圍。
4. **環境變數**：不可在程式碼中硬編碼密鑰或敏感資訊。
5. **生產環境**：Firestore 規則中標註為「開發用」的寬鬆規則，不可原樣部署到生產環境。
6. **Firestore 資料操作（Emulator-First）**：任何涉及 Firestore 資料新增、修改、刪除的操作（包括執行腳本如 `migrate-slugs.mjs`），必須先在 Firebase Emulator 虛擬環境中執行並驗證。使用者在本地確認資料與前端畫面無誤後，再由使用者自行決定是否同步到線上環境。**所有 Agent 嚴禁直接對生產環境 Firestore 執行任何資料寫入操作。**

## 現有文件參考

- API 文件：`docs/API_DOCUMENTATION.md`
- 效能優化：`docs/PERFORMANCE_OPTIMIZATION_GUIDE.md`
- Firebase 認證：`docs/FIREBASE_AUTH_SETUP.md`
- App Check 排錯：`docs/APP_CHECK_TROUBLESHOOTING.md`
- 表單效能優化：`docs/FORM_PERFORMANCE_OPTIMIZATION.md`

## 🔄 工作流程

本專案使用結構化的多 Agent 協作工作流程，所有助手必須遵守以下協議：

### 流程概覽

```
使用者 → @reviewer(分析) → @pm(規格書) → @frontend/@admin/@cloud(開發) → @testing(測試) → @reviewer+@pm(審核) → 使用者(最終確認)
```

- **完整流程**：中大型任務經過上述所有階段
- **簡化流程**：小修改/bug fix 由 @reviewer 快速分析後直接指派開發 Agent

### 共享工作區

任務檔案存放在 `.workflow/active/TASK-XXX/`（已加入 `.gitignore`，不上傳 GitHub）：

| 檔案             | 產出者   | 說明             |
| ---------------- | -------- | ---------------- |
| `status.md`      | 各 Agent | 任務狀態追蹤     |
| `analysis.md`    | reviewer | 可行性分析報告   |
| `spec.md`        | pm       | 規格書與任務分派 |
| `test-report.md` | testing  | 測試報告         |
| `review.md`      | reviewer | 最終審核報告     |

### 交接協議

每個 Agent 完成工作後，必須輸出交接區塊：

```
### 📋 交接
- 狀態：✅ 完成 / ❌ 有問題 / ⚠️ 需要使用者介入
- 下一步：請呼叫 `@xxx` 並告知 [具體指示]
- 任務檔案：`.workflow/active/TASK-XXX/xxx.md`
```

### 升級機制

遇到以下情況時，必須暫停並通知使用者介入：

- 技術方案無法確定，需要決策
- 任務描述模糊到無法拆解
- 涉及安全規則或生產環境的重大變更
- 多個方案各有優缺點，需要使用者選擇

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
- `src/` 下新增或修改 SCSS 時，統一使用 `@use` / `@forward`，不可新增 `@import`
- SCSS 若 mixin 內含 `@media`、`&:hover` 等巢狀規則，呼叫端不可在 `@include` 後繼續寫一般 declaration；應拆成 base mixin 與巢狀規則 mixin，或把 declaration 移到 `@include` 前，以避免 Sass `mixed-decls` 問題與 responsive 覆蓋順序錯誤
- 資料取得使用 React Query，不直接在元件中呼叫 Firebase
- 服務層需包含 Firebase 就緒狀態檢查與錯誤處理
- 若功能使用 slug、path、link 或其他可公開引用的唯一識別碼，必須明確定義唯一性範圍，並在 create / update 兩條路徑都套用相同約束；若需跨 collection 唯一，查重不得只檢查單一 collection
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

本專案使用 **Director 單一入口** 架構，使用者只需與 Director 對話，所有任務編排由 Director 自動完成。

## 🧠 Workflow Memory 原則（Notion + Repo）

為了降低每次重建上下文成本，本專案採用以下分工：

- **Repo = 程式碼與規範真相來源**：code / agents / instructions / hooks / skills
- **Notion Task Database = workflow 真相來源**：task state / analysis / spec summary / test summary / review summary / decision log

### Board 定位

- Board 只是 Task Database 的一個 View。
- 不可把 Board 與 Task Database 當作兩套資料來源。

### Notion 優先與 fallback

- 若 Notion MCP 可用：優先讀寫 Notion task page（狀態、摘要、owner、決策）。
- 若 Notion MCP 不可用：改用 `.workflow/active/TASK-XXX/` 作為暫時 fallback。
- Notion 恢復後由 Director 在階段切換時補同步，避免長期雙寫造成漂移。

### Director 編排責任

- 使用者只與 Director 對話。
- 不要求使用者手動切換 worker。
- Director 在階段切換時同步三項欄位：一句話摘要、Current Owner、是否需要使用者決策。

### 架構概覽

```
使用者 ↔ Director（唯一入口）
              ├── Reviewer（分析 / 審核）
              ├── Planner（規格 / 文件）
              ├── Frontend（前台開發）
              ├── Admin（後台開發）
              ├── Firebase（雲端 / 服務層）
              └── Testing（測試）
```

- **Director** 是唯一對外入口，負責需求理解、風險判斷、委派 worker、彙總結果、向使用者回報
- **Worker agents**（Reviewer、Planner、Frontend、Admin、Firebase、Testing）為內部 worker，由 Director 委派
- 使用者**不需要**手動切換 agent

### 流程模式

- **簡化流程**：小修改 / bug fix → Director 直接委派開發 worker → 完成回報
- **標準流程**：中型任務 → Director 委派開發 → Testing 驗證 → 回報使用者
- **完整流程**：大型任務 → Reviewer 分析 → Planner 規格 → 開發 workers → Testing → Reviewer + Planner 審核 → 回報使用者

### Local Agent vs Copilot CLI 分層

| 場景                                  | 建議執行方式               |
| ------------------------------------- | -------------------------- |
| 需求釐清、即時互動、畫面確認          | Local Agent                |
| Playwright / 瀏覽器 MCP / IDE context | Local Agent                |
| UI 驗證與截圖比對                     | Local Agent                |
| 需求明確、可背景施工                  | Copilot CLI                |
| 適合 worktree 隔離的批次修改          | Copilot CLI                |
| 相對獨立的平行子任務                  | Copilot CLI（/fleet 模式） |

**原則**：不要預設所有任務都用 CLI；Playwright 或需要 IDE 工具的工作必須留在 Local。

### 共享工作區

大型任務使用 `.workflow/active/TASK-XXX/`（已加入 `.gitignore`）：

| 檔案             | 產出者             | 說明             |
| ---------------- | ------------------ | ---------------- |
| `status.md`      | Director / Planner | 任務狀態追蹤     |
| `analysis.md`    | Reviewer           | 可行性分析報告   |
| `spec.md`        | Planner            | 規格書與任務分派 |
| `test-report.md` | Testing            | 測試報告         |
| `review.md`      | Reviewer           | 最終審核報告     |

`.workflow/active/TASK-XXX/` 在新流程中的定位：

- Notion MCP 不可用時的 fallback 工作區
- 本地快取 / 導出區
- CLI 或無 MCP 情境下的替代結構化儲存

原則上不做長期雙寫，避免 Notion 與本地資料長期漂移。

### 升級機制

遇到以下情況時，Director 必須暫停並向使用者回報：

- 技術方案無法確定，需要決策
- 任務描述模糊到無法拆解
- 涉及安全規則或生產環境的重大變更
- 多個方案各有優缺點，需要使用者選擇

## Agent 共通原則

以下原則為所有 `.github/agents/*.agent.md` 的共同基線；各 Agent 文件只補充角色差異，不重複定義同一套通用規則：

- **Director 為唯一入口**：使用者只與 Director 對話；其餘 worker agents（Reviewer、Planner、Frontend、Admin、Firebase、Testing）由 Director 內部委派，不要求使用者手動切換
- **Notion 為 workflow 主來源**：Notion Task Database 優先承接任務狀態與摘要；Board 只是一個視圖，不是獨立資料源
- **fallback 一致性**：Notion MCP 不可用時改寫 `.workflow/active/TASK-XXX/`，恢復後由 Director 補同步，不做長期雙寫
- **安全與確認**：涉及 UI 畫面、樣式、版面佈局的修改，必須先描述具體變更並取得使用者確認；涉及部署、發版、安全規則或生產資料寫入，必須先取得使用者確認。Worker 遇到需確認事項時回報 Director，由 Director 統一向使用者溝通
- **回報格式**：所有 worker 完成後回報 Director，使用各自的 `### 📋 [Worker名] 回報` 格式，不要求使用者手動呼叫下一個 agent
- **任務讀取優先序**：先讀 Notion task page 的規格摘要 / 限制 / 驗收標準；Notion 不可用才讀 `.workflow/active/TASK-XXX/`
- **權責分工**：每個 Agent 只處理其職責範圍內的檔案；若任務跨模組，由 Director 協調委派，而非 worker 越權修改
- **規則優先序**：主規則檔定義共通原則；instructions 檔定義技術領域規範；agents 檔只定義角色差異與角色專屬限制

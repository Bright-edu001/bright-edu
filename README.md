# Bright Edu

## 專案概覽

Bright Edu 是一個現代化的線上教育平台，提供課程瀏覽、內容管理與學習相關功能，並整合 Firebase 與前端工具鏈支援開發與部署。

## AI Workflow Pointer

Bright-Edu 的 AI 協作 workflow 以 Notion current records 為 source of truth。

- Notion current records are the workflow source of truth.
- `.github/` is the repo-local bootstrap / execution layer.
- Use `.github/copilot-instructions.md` for repo-local execution guidance.

This README remains a product / platform overview, not the workflow policy document.

## 網址資訊

- 測試環境網址: <https://super-caramel-093673.netlify.app/>
- 正式環境網址: <https://bright-edu-data.web.app/>

## 功能概覽

- 多元化課程內容
- 專業講師團隊
- 彈性的學習方式
- 學習進度追蹤
- 學習社群互動

## 技術棧

- 前端核心: React 19、React Router 6
- 狀態與快取: `@tanstack/react-query`
- 建置工具: Vite 5
- UI 套件: Ant Design 5、styled-components、SCSS
- 富文字編輯器: BlockNote 0.47
- 後端服務: Firebase（Firestore、Authentication、Storage、Functions、Hosting）
- 效能與監控: Sentry、Firebase App Check（reCAPTCHA v3）
- 測試框架: Vitest、Playwright

## 環境需求

- Node.js 20 或以上版本（建議 LTS）
- npm 9 或以上版本

## 專案結構

```text
.
├─ .github/
│  ├─ workflows/          # CI/CD 自動化流程
│  ├─ instructions/       # repo-local bootstrap / instruction files
│  └─ copilot-instructions.md
├─ docs/                  # 專案技術文件與使用參考
├─ e2e/                   # Playwright E2E 測試
├─ public/                # 靜態資源
├─ src/
│  ├─ admin/              # 後台管理模組
│  ├─ components/         # 可重用元件
│  ├─ pages/              # 對外頁面
│  ├─ context/            # 全域狀態 Context
│  ├─ hooks/              # 自訂 Hooks
│  ├─ services/           # Firebase 服務與外部 API
│  ├─ config/             # 前端與 Firebase 環境設定
│  └─ utils/              # 工具函式
├─ vite.config.mjs        # Vite 設定
├─ vitest.config.js       # Vitest 設定
└─ playwright.config.js   # Playwright 設定
```

## 本機開發

### 1. 安裝依賴

```bash
npm install --legacy-peer-deps
```

### 2. 設定環境變數

本機開發請使用 `.env.local`（`.env.example` 僅作為範本）。

```bash
cp .env.example .env.local
```

### 3. 啟動開發伺服器

```bash
npm run start
```

預設開發網址為：

```text
http://localhost:3000
```

## Firebase Emulator / 離線資料

本專案包含 Firebase 相關設定。若要進行離線或本機驗證，可使用 Firebase Emulator。

```bash
firebase emulators:start
```

如需切換為本機 Firestore，設定：

```env
VITE_USE_FIREBASE_EMULATOR=true
```

如需使用匯入資料，請依團隊現行流程準備本機資料後再啟動 Emulator。

## 常用 Scripts

以下 scripts 以 `package.json` 為準。

| 指令                          | 說明                                  |
| ----------------------------- | ------------------------------------- |
| `npm run start`               | 啟動 Vite 開發伺服器                  |
| `npm run build`               | 建立 production 版本                  |
| `npm run build:prod`          | 建立 production 版本並關閉 Source Map |
| `npm run preview`             | 預覽打包後結果                        |
| `npm run test`                | 執行 Vitest                           |
| `npm run test:run`            | Vitest 單次執行（驗收用）             |
| `npm run test:watch`          | 以 watch 模式執行 Vitest              |
| `npm run analyze`             | 建置後分析 bundle 大小                |
| `npm run analyze:performance` | 執行效能分析腳本                      |
| `npm run predeploy`           | 部署前建置                            |
| `npm run deploy`              | 使用 gh-pages 部署靜態版              |

## 環境變數

| 變數                         | 說明                                 |
| ---------------------------- | ------------------------------------ |
| `VITE_API_KEY`               | Firebase 設定所需金鑰                |
| `VITE_SENTRY_DSN`            | Sentry 錯誤回報用 DSN                |
| `VITE_RECAPTCHA_SITE_KEY`    | reCAPTCHA v3 / App Check 用 Site Key |
| `VITE_USE_FIREBASE_EMULATOR` | `true` 時優先連線本機 Firestore      |

實際是否需要上述變數，請以目前功能與 `.env.example` 為準。

## CI/CD

專案包含 `.github/workflows/` 與 Firebase Hosting 相關設定。

實際的建置、預覽與部署流程請以倉庫內對應 workflow 檔案與 Firebase 設定為準。

## 品質閘門基線（TASK-AUD-008A）

目前 repo 已存在且穩定的本地驗證品質閘門如下：

- `npm run test:run`：Vitest 單次執行模式（提交前測試基線）。
- `npm run build`：Vite production build 驗證（提交前建置基線）。

每個 task 完成前，至少需在本機通過以上兩個指令。

目前尚未導入以下 gate：

- lint（尚無 lint script）
- typecheck（尚無 typecheck script）
- 完整 QA CI（需另行批准後導入）

以下 scripts 不屬於一般 PR 品質閘門：

- `npm run analyze`
- `npm run analyze:performance`
- `npm run deploy`
- `npm run predeploy`

### Build Warning Triage（目前狀態）

- Header/Footer redundant prefetch warning：已修正。
- Firebase/envUtils dynamic/static import warning：暫時記錄，本階段不重構。
- chunk size warning：暫時記錄，本階段不做大規模 chunk split。
- Vite CJS deprecation：暫時記錄。
- React Router future flag warning：暫時記錄。

### 後續範圍（非本階段）

- 導入 ESLint（需另行批准）。
- 評估 TypeScript 或 checkJs（需另行評估與批准）。
- 新增 QA CI workflow（需另行批准）。

## 相關文件

- `docs/README.md`
- `.github/copilot-instructions.md`

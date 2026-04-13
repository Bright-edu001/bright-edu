# Bright Edu - 智慧教育平台

Bright Edu 是一個現代化的線上教育平台，提供高品質的課程內容，協助學習者提升專業能力。

## 🌐 網址資訊

- **測試環境網址**: [https://super-caramel-093673.netlify.app/](https://super-caramel-093673.netlify.app/)
- **正式環境網址**: [https://bright-edu-data.web.app/](https://bright-edu-data.web.app/)

## ✨ 功能特色

- 多元化課程內容
- 專業講師團隊
- 靈活的學習方式
- 學習進度追蹤
- 學習社群互動

## 🛠 技術架構

- **前端核心**: React 19, React Router 6
- **狀態與快取**: `@tanstack/react-query` (React Query)
- **建置工具**: Vite 5 (極速開發啟動與模組熱更新)
- **UI 套件**: Ant Design 5, styled-components, SCSS
- **富文字編輯器**: BlockNote 0.47 (後台最新消息編輯器)
- **後端服務**: Firebase (Firestore, Authentication, Storage, Functions, Hosting)
- **效能與監控**: Sentry (錯誤追蹤), Firebase App Check (reCAPTCHA v3)
- **測試框架**: Vitest (單元測試) & Playwright (E2E 端到端測試)

## 📋 系統需求

- Node.js 20 或以上版本 (建議 LTS)
- npm 9 或以上版本

## 📂 專案結構

```
.
├─ .github/workflows/     # CI/CD 自動化部署設定 (GitHub Actions)
├─ e2e/                   # Playwright End-to-End 測試案例
├─ public/                # 靜態資源 (圖檔、PWA manifest)
├─ src/
│  ├─ admin/              # 後台管理模組
│  ├─ components/         # 可重用的共用元件
│  ├─ pages/              # 對外的頁面模組
│  ├─ context/            # 全域狀態 Context
│  ├─ hooks/              # 自訂 React Hooks
│  ├─ services/           # Firebase 服務與外部 API
│  ├─ config/             # 前端及 Firebase 環境配置
│  └─ utils/              # 實用工具函式
├─ vite.config.js         # Vite 建置與開發伺服器配置
├─ vitest.config.js       # Vitest 測試框架配置
└─ playwright.config.js   # 瀏覽器 E2E 測試配置
```

## 🚀 快速開始

### 1. 取得專案並安裝依賴

```bash
git clone <repo-url>
cd bright-edu
npm install --legacy-peer-deps
```

### 2. 環境變數設定

複製環境變數範例檔來建立你的本機開發設定：

```bash
cp .env.example .env.local
```

### 3. 啟動開發伺服器 (Vite)

```bash
npm run start
```

預設於 `http://localhost:3000` 提供服務，提供極速 HMR (Hot Module Replacement) 熱重載。

---

## 💻 本地端 Firebase 模擬器測試 (Offline 模式)

如果不想影響雲端正式資料，可以將雲端資料下載回本機，並利用本地模擬器開發。

1. **匯出雲端資料並下載** (需要 gcloud 環境與權限):

```bash
gcloud firestore export gs://bright-edu-data.firebasestorage.app/firestore_export --project=bright-edu-data
gsutil -m cp -r gs://bright-edu-data.firebasestorage.app/firestore_export ./firebase_data/
```

2. **啟動本機 Firebase 模擬器**:

```bash
firebase emulators:start --import=./firebase_data/firestore_export
```

3. **在 `.env` 加上開關以使用本機資料庫**:

```env
VITE_USE_FIREBASE_EMULATOR=true
```

---

## 📜 可用腳本 Scripts

| 指令                  | 說明                              |
| --------------------- | --------------------------------- |
| `npm run start`       | 啟動 Vite 本機開發伺服器          |
| `npm run build`       | 建立 Production 版本至 `build/`   |
| `npm run build:prod`  | 建立 Production 且關閉 Source Map |
| `npm run preview`     | 預覽打包後的 Production `build/`  |
| `npm run test`        | 執行 Vitest 單元測試              |
| `npx playwright test` | 執行 E2E 網頁端到端測試           |
| `npm run analyze`     | 打包後分析 bundle JS 大小         |
| `npm run deploy`      | 手動透過 GitHub Pages 部署靜態版  |

---

## 🌍 環境變數列表 (Vite 規範)

| 變數 (須以 `VITE_` 開頭)     | 說明                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `VITE_SENTRY_DSN`            | Sentry 用來接收錯誤回報的唯一金鑰                                                   |
| `VITE_RECAPTCHA_SITE_KEY`    | reCAPTCHA v3 的 Site Key (用於 App Check)                                           |
| `VITE_API_KEY`               | Firebase API 與設定                                                                 |
| `VITE_USE_FIREBASE_EMULATOR` | `true` 時，Firestore 將會預設連線到本機 `127.0.0.1:8080`；Auth/Storage 仍用正式環境 |

---

## 🔄 CI/CD 自動化與部署

專案已整合 **GitHub Actions**：

- **Pull Request**: 發起 PR 時會自動觸發測試與打包，並透過 Firebase Hosting 生成臨時的 Preview URL，方便團隊檢閱修改結果。
- **Merge to Main**: 合併進 `main` 分支時，會自動編譯並部署發布到 Firebase 的正試站點 (`live` channel)。

## 📈 性能與文件

關於性能優化與架構的相關更新文件，請參考：

- [`docs/PERFORMANCE_OPTIMIZATION_GUIDE.md`](./docs/PERFORMANCE_OPTIMIZATION_GUIDE.md)

## 📄 授權

此專案目前尚未指定開源授權條款，所有程式碼與設計版權歸原開發團隊所有。

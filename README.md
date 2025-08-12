# Bright Edu - 智慧教育平台

Bright Edu 是一個現代化的線上教育平台，提供高品質的課程內容，協助學習者提升專業能力。

## 功能特色

- 多元化課程內容
- 專業講師團隊
- 靈活的學習方式
- 學習進度追蹤
- 學習社群互動

## 技術架構

- React 18 與 React Router 6
- Ant Design 與 styled-components
- SCSS 樣式編寫與自動編譯
- Firebase 服務與 Sentry 錯誤追蹤
- Express 與 compression 提供簡易伺服器支援

## 系統需求

- Node.js 18 或以上版本
- npm 9 或以上版本

## 專案結構

```
.
├─ public/                # 靜態資源與 HTML 樣板
├─ src/
│  ├─ components/         # 可重用 UI 元件
│  ├─ pages/              # 頁面模組
│  ├─ routes/             # 路由配置
│  ├─ services/           # Firebase 與其他服務
│  ├─ styles/             # SCSS/CSS 樣式
│  ├─ hooks/              # 自訂 React Hooks
│  ├─ utils/              # 工具函式
│  ├─ context/            # React Context
│  └─ index.js            # 程式進入點
└─ scripts/               # 建置與分析腳本
```

## 快速開始

1. 取得專案
   ```bash
   git clone <repo-url>
   cd bright-edu
   ```
2. 安裝依賴
   ```bash
   npm install
   ```
3. 啟動開發伺服器
   ```bash
   npm start
   ```
   預設於 <http://localhost:3000> 提供服務，程式碼變更會自動重新載入。

## 可用腳本

| 指令                          | 說明                              |
| ----------------------------- | --------------------------------- |
| `npm start`                   | 啟動開發伺服器                    |
| `npm test`                    | 以互動式監看模式執行測試          |
| `npm run build`               | 建置 production 版本於 `build/`   |
| `npm run build:prod`          | 建置 production 並關閉 Source Map |
| `npm run analyze`             | 打包完成後分析 bundle 大小        |
| `npm run analyze:performance` | 執行性能分析腳本                  |
| `npm run deploy`              | 透過 GitHub Pages 部署            |

## 環境變數

| 變數                           | 說明                                       |
| ------------------------------ | ------------------------------------------ |
| `REACT_APP_FORM_ENDPOINT`      | 表單送出的 Google Apps Script 端點         |
| `REACT_APP_SENTRY_DSN`         | Sentry 用來接收錯誤回報的 DSN              |
| `REACT_APP_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 的 Site Key（用於 App Check） |
| `NODE_ENV`                     | 設為 `production` 時啟用錯誤追蹤與最佳化   |

可以在 `.env` 檔案或部署平台的環境設定中加入上述變數。

## 部署

專案預設使用 GitHub Pages 部署靜態檔案：

```bash
npm run deploy
```

在 Heroku 等平台部署時，建置流程會觸發 `heroku-postbuild` 腳本。

## 性能與測試

關於性能優化與測試流程，請參考 `PERFORMANCE_OPTIMIZATION_SUMMARY.md` 與 `PERFORMANCE_TEST_GUIDE.md`。

## 授權

此專案目前尚未指定授權條款。

## 測試環境網址:https://super-caramel-093673.netlify.app/

## 正式環境網址:https://bright-edu-data.web.app/

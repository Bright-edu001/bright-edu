# Bright Education Google Sheets 同步服務

## 概述

這是一個 Express.js 服務，用於將 Google Sheets 中的聯絡表單資料同步到 Firebase Firestore。

## 功能特色

- 🔄 Google Sheets 到 Firestore 自動同步
- 🧹 智能資料清理和去重
- 🔒 安全的身份驗證機制
- 🐳 Docker 容器化部署
- 💊 健康檢查端點
- 📊 詳細的日誌記錄

## API 端點

| 端點                       | 方法 | 描述                    |
| -------------------------- | ---- | ----------------------- |
| `/`                        | GET  | 服務資訊                |
| `/health`                  | GET  | 健康檢查                |
| `/api/sync-google-sheets`  | POST | 同步 Google Sheets 資料 |
| `/api/clear-contact-forms` | POST | 清除聯絡表單資料        |

## 快速開始

### 前置需求

- Node.js 18+ 或 Docker
- Google Cloud 帳戶
- Firebase 專案
- Google Sheets API 權限

### 環境設定

1. 複製環境變數範例：

```bash
cp .env.example .env
```

2. 編輯 `.env` 檔案：

```bash
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_SHEETS_ID=your-sheet-id
NODE_ENV=production
PORT=3002
CORS_ORIGINS=https://yourdomain.com,http://localhost:3000
```

### 本地開發

```bash
# 安裝依賴
npm install

# 設定 Google Cloud 身份驗證
gcloud auth application-default login --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/spreadsheets"

# 啟動開發服務器
npm run dev
```

### Docker 部署

#### Windows PowerShell

```powershell
# 執行部署腳本
.\deploy.ps1
```

#### Linux/Mac

```bash
# 給腳本執行權限
chmod +x deploy.sh

# 執行部署腳本
./deploy.sh
```

#### 手動 Docker 命令

```bash
# 建構映像
docker build -t bright-edu-sync .

# 執行容器
docker run -d --name bright-edu-sync -p 3002:3002 --env-file .env bright-edu-sync
```

### 驗證部署

```bash
# 檢查服務狀態
curl http://localhost:3002/health

# 測試同步功能
curl -X POST http://localhost:3002/api/sync-google-sheets \
  -H "Content-Type: application/json" \
  -d "{}"
```

## 監控和維護

### 查看日誌

```bash
docker logs bright-edu-sync
```

### 重啟服務

```bash
docker restart bright-edu-sync
```

### 停止服務

```bash
docker stop bright-edu-sync
docker rm bright-edu-sync
```

### 更新服務

```bash
# 重新建構並部署
./deploy.ps1  # Windows
# 或
./deploy.sh   # Linux/Mac
```

## 疑難排解

### 常見問題

1. **身份驗證失敗**

   - 確保已執行 `gcloud auth application-default login`
   - 檢查服務帳戶權限

2. **無法連接 Firebase**

   - 確認 `FIREBASE_PROJECT_ID` 設定正確
   - 檢查網路連接

3. **Google Sheets API 錯誤**
   - 確認 Sheet ID 正確
   - 檢查 API 配額和權限

### 日誌級別

- `INFO`: 正常操作日誌
- `WARN`: 警告訊息
- `ERROR`: 錯誤訊息

## 生產環境考量

- 設定適當的記憶體和 CPU 限制
- 使用外部日誌聚合服務
- 實施監控和告警
- 定期備份資料
- 使用 HTTPS
- 設定防火牆規則

## 授權

MIT License

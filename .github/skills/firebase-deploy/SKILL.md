---
name: firebase-deploy
description: "Firebase 部署前檢查流程。Use when: 部署、發版、firebase deploy、npm run deploy、git push、上線、發佈。執行部署前的完整檢查清單並要求使用者確認。"
argument-hint: "部署目標，例如: hosting 或 functions"
---

# Firebase 部署前檢查流程

## 使用時機

- 準備部署到 Firebase Hosting
- 準備部署 Cloud Functions
- 準備部署到 GitHub Pages
- 任何涉及「上線」「發版」「部署」的操作

## ⚠️ 核心規則

**任何部署操作必須取得使用者明確確認後才可執行。**

## 流程

### 1. 確認部署目標

向使用者確認：

- 部署目標：Hosting / Functions / 全部
- 部署環境：開發 / 生產
- 是否已在本地測試通過

### 2. 環境變數檢查

確認 `.env` 或環境設定已正確配置：

- `VITE_API_KEY` — Firebase API Key
- `VITE_PROJECT_ID` — Firebase 專案 ID
- `VITE_STORAGE_BUCKET` — Storage Bucket
- 其他必要的 `VITE_` 前綴變數

```bash
# 檢查 .env 檔案是否存在
test -f .env && echo "OK" || echo "MISSING"
```

### 3. 安全規則檢查

檢查 `firestore.rules`：

- 是否有「開發用」的寬鬆規則（`allow write: if true`）
- 如果要部署到生產環境，必須修改為正確的認證檢查

檢查 `storage.rules`：

- 寫入操作是否限制為認證用戶

### 4. 建置與測試

```bash
# 執行單元測試
npm test

# 執行生產建置
npm run build:prod

# 確認建置輸出
ls -la build/
```

### 5. 變更清單

列出自上次部署以來的所有變更：

```bash
git log --oneline --since="last deploy date"
git diff --stat HEAD~5
```

### 6. 向使用者確認

在執行部署前，必須向使用者展示：

1. **部署目標**：Firebase Hosting / Functions / GitHub Pages
2. **部署環境**：開發 / 生產
3. **變更清單**：列出所有修改的檔案與功能
4. **安全規則狀態**：是否有寬鬆規則需要修正
5. **測試結果**：單元測試是否通過

然後明確詢問：**「以上變更確認無誤，是否執行部署？」**

### 7. 執行部署（取得確認後）

```bash
# Firebase Hosting
firebase deploy --only hosting

# Cloud Functions
firebase deploy --only functions

# GitHub Pages
npm run deploy

# 全部
firebase deploy
```

### 8. 部署後驗證

- 訪問部署後的 URL 確認網站正常
- 檢查 Firebase Console 確認部署狀態
- 確認 Cloud Functions 日誌無錯誤

## CI/CD 參考

專案已有 GitHub Actions：

- `firebase-hosting.yml` — push 到 `prod` 分支自動部署
- `firebase-preview.yml` — PR 自動建立預覽環境（7 天有效）

## 檢查清單

- [ ] 環境變數已正確設定
- [ ] 安全規則已檢查（無開發用寬鬆規則）
- [ ] 單元測試通過
- [ ] 生產建置成功
- [ ] 變更清單已列出
- [ ] **使用者已確認部署**

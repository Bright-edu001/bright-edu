---
description: "Firebase 與服務層開發規範。Use when: 修改 Firebase 設定、Cloud Functions、Firestore 查詢、服務層模組、環境變數。"
applyTo: "src/config/**,src/services/**,functions/**"
---

# Firebase 與服務層開發規範

## Firebase 設定檔

| 檔案                              | 用途                                        |
| --------------------------------- | ------------------------------------------- |
| `src/config/firebaseCore.jsx`     | Firebase 核心初始化（App、Firestore、Auth） |
| `src/config/firebaseServices.jsx` | Firebase 服務配置                           |
| `src/config/appCheckClient.jsx`   | App Check 防護                              |
| `src/config/functionsClient.jsx`  | Cloud Functions 客戶端                      |
| `src/config/analyticsClient.jsx`  | Google Analytics                            |
| `src/config/envUtils.jsx`         | 環境判斷工具                                |
| `src/config/syncConfig.jsx`       | 資料同步設定                                |

## 服務層模式

所有服務模組必須包含：

1. **Firebase 就緒狀態檢查** — 確認 Firebase 已初始化再執行操作
2. **錯誤處理** — 捕捉並記錄所有 Firebase 錯誤
3. **日誌記錄** — 使用 `@/utils/logger` 記錄關鍵操作

```jsx
// 標準服務模式（參考 contactService.jsx）
import { logger } from "@/utils/logger";

export async function submitForm(data) {
  try {
    // 1. 檢查 Firebase 就緒狀態
    // 2. 資料驗證
    // 3. 去重檢查（防止重複提交）
    // 4. 寫入 Firestore
    // 5. 記錄日誌
    return { success: true };
  } catch (error) {
    logger.error("表單提交失敗", error);
    throw error;
  }
}
```

## Cloud Functions 模式

- 使用 Firebase Functions v6 模組化 API
- `onCall` — 前端呼叫的函式（需驗證 `request.auth`）
- `onDocumentCreated` — Firestore 觸發器
- 批次操作上限 500 筆
- Node 20 環境

## 環境變數

- 所有前端環境變數必須使用 `VITE_` 前綴
- 不在程式碼中硬編碼密鑰或敏感資訊
- 使用 `src/config/envUtils.jsx` 判斷環境：
  - `isLocalDevelopment()` — 本地開發
  - `isFirebaseHosting()` — Firebase 託管
  - `isProduction()` — 生產環境

## ⚠️ 安全規則

- 修改 `firestore.rules` 或 `storage.rules` 前必須向使用者說明
- 「開發用」的寬鬆規則（`allow write: if true`）不可部署到生產環境
- 所有用戶輸入必須驗證後再寫入 Firestore

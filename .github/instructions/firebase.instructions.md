---
description: "Firebase 與服務層開發規範。Use when: 修改 Firebase 設定、Cloud Functions、Firestore 查詢、服務層模組、環境變數。"
applyTo: "src/config/**,src/services/**,functions/**"
---

# Firebase 與服務層開發規範

> 共通安全、流程與生產環境變更確認原則以 `.github/copilot-instructions.md` 為準；本檔僅補充 Firebase / 服務層技術規範。

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
4. **唯一識別碼一致性** — 若服務層負責產生或驗證 slug、公開 path、link 或其他唯一識別碼，必須明確定義唯一性範圍，並在 create / update 兩條路徑套用同一套查重規則；若需跨 collection 唯一，查重必須覆蓋所有相關 collection

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

- 所有前端環境變數使用 `VITE_` 前綴
- 使用 `src/config/envUtils.jsx` 判斷環境：
  - `isLocalDevelopment()` — 本地開發
  - `isFirebaseHosting()` — Firebase 託管
  - `isProduction()` — 生產環境

## Emulator-First 開發模式

任何涉及 Firestore 資料新增、修改、刪除的操作（包括執行腳本），必須先在 Firebase Emulator 虛擬環境中進行，嚴禁直接操作生產環境 Firestore。

### 標準流程

1. 啟動 Emulator：`firebase emulators:start`（Firestore 在 `localhost:8080`）
2. 如需最新生產資料：`node scripts/sync-prod-to-emulator.mjs`
3. 設定環境變數指向 Emulator：`$env:FIRESTORE_EMULATOR_HOST="localhost:8080"`
4. 在 Emulator 中執行資料變更（腳本或服務層操作）
5. 啟動本地前端 (`npm run start`) 驗證資料與畫面正確
6. 驗證通過後由使用者自行決定是否同步到線上環境

### 注意事項

- 所有腳本（如 `migrate-slugs.mjs`）執行前必須確認 `FIRESTORE_EMULATOR_HOST` 已設定
- 未設定該環境變數時，腳本會直接操作生產 Firestore，造成不可逆的影響
- Agent 不可自行將 Emulator 中的變更推送到生產環境

## Firebase / 服務層專屬安全補充

- 所有用戶輸入必須驗證後再寫入 Firestore
- 對外可見的唯一識別碼若允許手動輸入，在確認無衝突時應原樣保留，不可因流程順序錯誤而平白附加後綴；衍生欄位（如 `link`）需與最終識別碼同步更新

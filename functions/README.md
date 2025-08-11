# Cloud Functions (bright-edu)

此資料夾包含 Firebase 2nd Gen Cloud Functions 原始碼。部署指令會由專案根目錄執行：

```
firebase deploy --only functions
```

## 環境與架構

- Runtime: Node.js 20
- 套件: firebase-functions v6 (模組化 API), firebase-admin v12
- 地區 (region): 目前所有函式配置 `asia-east1` (與 Firestore 同區)
- 觸發來源: Cloud Firestore (`users` collection), HTTPS Callable

## 目前函式清單

| 名稱                      | 類型              | 觸發                      | 目的                                                    | 重要行為 / 限制                                             |
| ------------------------- | ----------------- | ------------------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| `batchAddUsers`           | Callable (onCall) | 前端 / Admin SDK 呼叫     | 批次新增/合併使用者資料到 `users` 集合                  | 驗證登入、最大 500 筆、安全欄位清理、錯誤代碼回傳、log 耗時 |
| `validateNewUserOnCreate` | Firestore Trigger | `users/{userId}` 文件建立 | 建立時驗證 email 格式，寫入 `valid` 與 `createdAt` 欄位 | 無 email / 格式錯誤 -> `valid:false`，成功 -> `valid:true`  |

(已移除的歷史函式：`validateNewUser`、`notifyFileUpload`)

## 設計重點

- 採用 per-function region，避免多區資源衝突。
- Firestore 位置：`asia-east1`，故觸發函式同區以降低延遲。
- 批次寫入限制：Firestore 單批次最大 500；程式中也設定同樣上限並可視需求下調。
- 錯誤處理：每個函式使用 `logger`（Firebase 內建）記錄 `info` / `warn` / `error`。
- 安全性：`batchAddUsers` 要求 `context.auth`；可再加強角色 / claims 檢查。

## 回傳格式約定

### batchAddUsers 成功:

```
{ "success": true, "count": <寫入筆數>, "durationMs": <耗時毫秒> }
```

失敗 (範例):

```
{ "success": false, "error": "UNAUTHENTICATED" }
{ "success": false, "error": "INVALID_PAYLOAD" }
{ "success": false, "error": "TOO_MANY_USERS", "max": 500 }
{ "success": false, "error": "NO_VALID_USERS" }
{ "success": false, "error": "BATCH_WRITE_FAILED" }
```

### validateNewUserOnCreate 結果欄位

- 新增/修改欄位：`valid: boolean`, `createdAt: Timestamp` (僅成功驗證時新增)
- 失敗情況：仍會寫入 `valid:false`

## 開發與部署流程

1. 在本資料夾修改 `index.js`。
2. （可選）於本機先執行模擬：目前未加入 emulator 設定，如需可新增 `firebase emulators:start --only functions,firestore`。
3. 部署：

```
firebase deploy --only functions
```

4. 查看日誌：

```
firebase functions:log --only batchAddUsers
firebase functions:log --only validateNewUserOnCreate
```

## 常見維護操作

| 需求            | 建議動作                                                            |
| --------------- | ------------------------------------------------------------------- |
| 調整批次上限    | 修改 `MAX_BATCH` 常數                                               |
| 增加欄位白名單  | 在清理迴圈中改為挑選可允許欄位而非 `...rest`                        |
| 強制 email 小寫 | 在驗證前 `data.email = data.email.toLowerCase()`                    |
| 加入角色檢查    | 於 `batchAddUsers` 內判斷 `context.auth.token.role` 或自訂 claims   |
| 新增新函式      | 引入對應模組 API（例如 Firestore onUpdate）並 `exports.newFn = ...` |
| 刪除舊函式      | 移除 export 並執行 `firebase functions:delete <name>`               |

## 改進建議 (待選)

- 加入 ESLint / Prettier 以統一風格。
- 建立 `__tests__` 單元測試，模擬 callable payload 驗證。
- 改寫為 TypeScript 以增加型別安全。
- 將重複 Firestore 操作抽成 util 模組。
- 將錯誤碼集中定義（例如 constants/errorCodes.js）。

## 安全與成本提示

- 避免濫用：Callable 應限制使用者角色或來源域名（前端可配合 Auth Custom Claims）。
- 監控日誌：定期檢查大量 `TOO_MANY_USERS` 或 `UNAUTHENTICATED` 事件，可早期偵測濫用。
- 成本優化：若新增高頻觸發函式，可考慮緩存/合併寫入或移往 Cloud Run。

---

如需補充說明或新增示例程式碼，可提出再擴充本文件。

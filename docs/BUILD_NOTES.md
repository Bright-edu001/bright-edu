# Build Warning Triage Notes

記錄 `npm run build`（Vite production build）產生的 warning 現況。本文件由 TASK-AUD-013 建立，後續處理請另開任務。

## 已解決

### /static/css/main.css stale reference（TASK-AUD-013 已移除）

- **原因**：`index.html` 中殘留一個 CRA 時代的 `<noscript>` fallback，引用 `/static/css/main.css`。
- **狀態**：Vite 從不產出此路徑，且 repo 內無此檔案。
- **處理**：已在 TASK-AUD-013 移除整個 `<noscript>` 區塊。

---

## 仍存在（需另開任務才處理）

### Firebase dynamic/static import warning

**訊息（摘要）**：

```
(!) src/config/envUtils.jsx is dynamically imported by FirebaseInitContext.jsx but also statically imported by analyticsClient.jsx, appCheckClient.robust.jsx, firebaseCore.jsx, firebaseServices.jsx, functionsClient.jsx — dynamic import will not move module into another chunk.

(!) src/config/firebaseCore.jsx is dynamically imported by multiple config/context modules but also statically imported by multiple admin/service/context files — dynamic import will not move module into another chunk.
```

**原因**：Firebase 初始化模組（`envUtils.jsx`、`firebaseCore.jsx`）在部分路徑使用 dynamic import，同時在其他路徑使用 static import，導致 Rollup/Vite 無法將其分割到獨立 chunk。

**影響**：不影響 build 成功或 runtime 正確性；可能造成 chunk 分割效益降低。

**處理方向**：需重整 Firebase import graph（將 dynamic/static import 統一）。屬 import-graph-cleanup 範疇，需另開任務並取得批准後處理。

---

### Chunk size warning

**訊息（摘要）**：

```
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

**受影響 chunks（截至 TASK-AUD-013）**：

- `index-Kj6IgtNu.js`：1,503 kB（gzip 413 kB）
- `App-DVkfW-5R.js`：1,731 kB（gzip 535 kB）

**影響**：不影響 build 成功或正確性；可能影響首屏載入效能。

**處理方向**：需 bundle analysis 與 code splitting（例如 `manualChunks` 設定或 route-level lazy loading）。屬獨立 performance optimization 範疇，需另開任務並取得批准後處理。

---

## 備注

- 以上 warning 均不阻斷 `npm run build` 成功。
- 目前未有 CI 強制 gate 針對這些 warning。
- 每次移除或解決 warning 請在本文件更新狀態。

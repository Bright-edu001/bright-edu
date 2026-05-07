# Build Warning Triage Notes

記錄 `npm run build`（Vite production build）產生的 warning 現況。本文件由 TASK-AUD-013 建立，後續處理請另開任務。

## 已解決

### /static/css/main.css stale reference（TASK-AUD-013 已移除）

- **原因**：`index.html` 中殘留一個 CRA 時代的 `<noscript>` fallback，引用 `/static/css/main.css`。
- **狀態**：Vite 從不產出此路徑，且 repo 內無此檔案。
- **處理**：已在 TASK-AUD-013 移除整個 `<noscript>` 區塊。

### Firebase dynamic/static import warning（TASK-AUD-016 已消除）

**訊息（摘要）**：

```
(!) src/config/envUtils.jsx is dynamically imported by FirebaseInitContext.jsx but also statically imported by analyticsClient.jsx, appCheckClient.robust.jsx, firebaseCore.jsx, firebaseServices.jsx, functionsClient.jsx — dynamic import will not move module into another chunk.

(!) src/config/firebaseCore.jsx is dynamically imported by multiple config/context modules but also statically imported by multiple admin/service/context files — dynamic import will not move module into another chunk.
```

**原因**：Firebase 初始化模組（`envUtils.jsx`、`firebaseCore.jsx`）在部分路徑使用 dynamic import，同時在其他路徑使用 static import，導致 Rollup/Vite 無法將其分割到獨立 chunk。

**處理**：已在 TASK-AUD-016 將 `src/context/FirebaseInitContext.jsx` 中的 dynamic import 改為 static import，消除混用情況。後續 TASK-AUD-017G / 017H build 均未出現此 warning，確認無回歸。

---

## 仍存在（需另開任務才處理）

### Chunk size warning

**訊息（摘要）**：

```
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

**歷史進展**：

| 任務                 | 變更                                                                                                                                       | 效果                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| TASK-AUD-013（基線） | —                                                                                                                                          | App-DVkfW-5R.js ≈ 1,731 kB；index ≈ 1,503 kB                                            |
| TASK-AUD-017G        | AdminLayout.jsx 將 DashboardPage / ArticlesPage / ContactFormsPage / UserManagePage 改為 React.lazy                                        | App chunk 從 ≈ 1,731 kB 降至 ≈ 168 kB                                                   |
| TASK-AUD-017H        | ArticlesPage.jsx 將 NewsEditor / EnrollmentEditor / StructuredContentViewer / NewsContentViewer 改為 React.lazy，僅在 modal 開啟時按需載入 | ArticlesPage chunk 從 ≈ 1,455 kB 降至 ≈ 12.81 kB；NewsEditor 拆出為獨立 on-demand chunk |

**受影響 chunks（截至 TASK-AUD-017H，2026-05-07 build）**：

觸發 >500 kB warning 的 chunk：

| 檔名                     | raw size    | gzip      | 推測主要來源                                                                                                      |
| ------------------------ | ----------- | --------- | ----------------------------------------------------------------------------------------------------------------- |
| `index-bKi3Ob4e.js`      | 1,492.83 kB | 409.25 kB | 共用 vendor chunk（Firebase、React ecosystem、Ant Design core 等）                                                |
| `NewsEditor-g7oSHW4q.js` | 1,352.76 kB | 415.64 kB | @blocknote/core、@blocknote/mantine、@blocknote/react、@mantine（僅在 admin article editor modal 開啟時按需載入） |

未觸發 warning 但仍較大的 chunk：

| 檔名                 | raw size  | gzip     | 備注                                                |
| -------------------- | --------- | -------- | --------------------------------------------------- |
| `native-B5Vb9Oiz.js` | 380.35 kB | 82.06 kB | Ant Design / native 相關                            |
| `Table-BWkJgOcP.js`  | 276.14 kB | 86.83 kB | Ant Design Table 元件                               |
| `index-qyQv1x86.js`  | 248.64 kB | 83.13 kB | 共用 vendor                                         |
| `App-DAajo7WC.js`    | 167.82 kB | 54.19 kB | Public app root shell（TASK-AUD-017G 後已大幅縮小） |

**影響**：不影響 build 成功或正確性；chunk size warning 不阻斷 build。`NewsEditor` 雖然體積大，但已為 on-demand chunk，僅在 admin 使用者開啟 article editor modal 時載入，不影響一般用戶的首屏效能。`index` shared vendor chunk 體積仍大，但若進一步拆分需評估 HTTP round-trip 的 trade-off。

**下一步（需另開任務）**：

若要繼續優化，建議：

- **TASK-AUD-017J**：`NewsEditor` / BlockNote / @mantine editor chunk follow-up analysis — 評估是否可進一步拆分或延遲載入部分 @mantine 依賴。
- **TASK-AUD-017K**：shared `index` vendor chunk 分析 — 識別可移出的大型 library，評估 `manualChunks` 設定的 trade-off。

以上均需取得批准後另開任務執行，不在本任務範圍內。

---

## 備注

- 以上 warning 均不阻斷 `npm run build` 成功。
- 目前未有 CI 強制 gate 針對這些 warning。
- 每次移除或解決 warning 請在本文件更新狀態。

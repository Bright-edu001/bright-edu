# Bright-Edu Notion Workflow Architecture

## 定位

本專案採用三層分工：

- **Repo**：程式碼、agents、instructions、hooks、skills 的唯一真相來源
- **Notion Task Database**：任務流轉、規格摘要、測試結果、審核結果、決策紀錄的唯一真相來源
- **`.workflow/active/TASK-XXX/`**：Notion 不可用時的 fallback / local cache

這個設計延續目前 repo 已建立的多 agent 結構與本地 fallback 機制，不把 Notion 當程式碼規範來源，也不讓任務上下文只存在聊天紀錄中。

## 為什麼這樣分

你目前的 agents 與規則已經把責任切得很清楚：

- `Director` 負責流程編排與風險確認
- `Planner` / `Reviewer` / `Testing` 負責分析、規格、審核與測試
- `Frontend` / `Admin` / `Firebase` 負責實作
- `.workflow/active/TASK-XXX/` 已被設計成共享工作區與 fallback 工作流

因此 Notion 最適合承接的是：**狀態、摘要、決策、追蹤**，而不是程式碼本身。

## 單一資料主來源

### Repo 負責

- 程式碼與設定
- `copilot-instructions.md`
- `.github/agents/*`
- `.github/instructions/*`
- `.github/hooks/*`
- `.github/skills/*`
- 測試與建置腳本

### Notion 負責

- 任務狀態與流轉
- Analysis 摘要
- Spec / Acceptance 摘要
- Implementation summary
- Test result
- Review result
- Block reason / Decision log

### Fallback `.workflow` 負責

- Notion MCP 不可用時的任務暫存
- CLI / 本地 worker 之間的低耦合共享文字工件
- 階段邊界後再由 Director 補同步回 Notion

## Task Database 設計

建議資料庫名稱：`Bright-Edu Workflow Tasks`

### 必要欄位

| 欄位 | 類型 | 說明 |
| --- | --- | --- |
| Task | Title | 建議格式：`TASK-001 - 任務標題` |
| Task ID | Text | 例如 `TASK-001` |
| Status | Status | Backlog / Analysis / Planned / In Progress / Testing / Review / Blocked / Done |
| Route | Select | Full / Simple |
| Module | Multi-select | frontend / admin / firebase / testing / reviewer |
| Risk | Select | low / medium / high |
| Current Owner | Select | Director / Planner / Frontend / Admin / Firebase / Testing / Reviewer |
| Execution Mode | Select | Local / CLI / Cline |
| Branch / Worktree | Text | 對應 branch 或 worktree |
| Needs UI Confirmation | Checkbox | 是否涉及畫面變動 |
| Needs Deploy Confirmation | Checkbox | 是否涉及 deploy / release |
| Needs Rules Confirmation | Checkbox | 是否涉及 `firestore.rules` / `storage.rules` |
| Emulator Required | Checkbox | 是否需 Emulator 驗證 |
| Acceptance Summary | Text | 驗收標準摘要 |
| Test Result | Select | not-run / passed / failed |
| Review Result | Select | pending / passed / changes-requested |
| Updated At | Last edited time | 最後更新時間 |

### 建議 views

1. **Board - Delivery Flow**：按 `Status` 分組
2. **Table - All Tasks**：完整欄位檢視
3. **Active**：`Status != Done`
4. **Testing Queue**：`Status = Testing`
5. **Review Queue**：`Status = Review`
6. **Blocked**：`Status = Blocked`
7. **Deploy Risk**：`Needs Deploy Confirmation = true OR Needs Rules Confirmation = true`

## Director 主控狀態同步

只有 `Director` 負責正式狀態切換與最終摘要回寫：

- 新任務：`Analysis`
- 規格完成：`Planned`
- 開發開始：`In Progress`
- 測試：`Testing`
- 審核：`Review`
- 卡住：`Blocked`
- 完成：`Done`

每次切換時同步：

- `Status`
- `Current Owner`
- 一句話摘要
- 是否需使用者決策

## Cline 的定位

Cline **可以加入 workflow**，但建議只扮演「執行層」，不要扮演「流程主控」或「規則主來源」。

### 建議分工

- **Director / Planner / Reviewer / Testing**：仍以 Copilot agents 為主
- **Cline**：可接手長上下文實作、重構、修 bug、跑測試、修改多檔案
- **Notion**：保留任務狀態與摘要

### 原則

1. 不讓 Cline 直接決定任務狀態
2. 不讓 Cline 直接修改全域流程規則
3. 不讓 Cline 與 Copilot 同時在同一 working tree 自動改檔
4. 若要並行，使用獨立 branch / worktree

## 建議的閉環

1. 使用者對 Director 下任務
2. Director 建立或更新 Notion task
3. Planner 產分析 / 規格 / 驗收標準
4. Director 決定實作層：Local / CLI / Cline
5. Frontend / Admin / Firebase 實作
6. Testing 更新測試結果
7. Reviewer 更新審核結論
8. Director 決定 Done / Rework / Blocked
9. 可重用經驗先進 Candidate Rules / Decision Log
10. 經人工確認後再回寫 repo 規則層

## 規則回寫原則

不要把所有任務中的修法都直接升級成全域規則。建議分三層：

- **Task-local note**：只留在當前 task page
- **Candidate rule / pattern**：先進 Notion 的候選區
- **正式專案規則**：人工確認後再回 repo（`copilot-instructions` / `.instructions` / hooks / skills）

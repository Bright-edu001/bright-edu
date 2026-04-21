# Notion Workflow Architecture

## 目的與原則

本專案採用雙主軸：

- Repo 是程式碼與執行規範的唯一真相來源（code / agents / instructions / hooks / skills）。
- Notion Task Database 是工作流與任務狀態的唯一真相來源（workflow / project memory / task state）。

這個設計目標是降低每次對話都重建上下文的成本，同時保持單人維護可控，不引入過度複雜的多資料庫流程。

## 權責分界

### Repo 負責

- 實際程式碼與設定
- Agent 角色定義與邏輯邊界
- 開發規範與安全規則
- hooks 與 skills
- 測試程式與建置腳本

### Notion 負責

- 任務狀態流轉
- 分析、規格、測試、審核摘要
- 決策紀錄與阻塞原因
- 任務 owner 與當前路由

### 明確限制

- Notion 不取代 Git、Repo、agents、instructions、hooks、skills。
- Board 是 Task Database 的一個 View，不是獨立資料來源。
- 不建立多個重複資料庫；預設維持單一 Task Database。

## Task Database 設計

建議資料庫名稱：Bright-Edu Workflow Tasks

最低欄位如下（必填欄位可依 Notion 實作加上 default）：

| 欄位                      | 類型             | 用途                                                                           |
| ------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| Task ID                   | Title 或 Text    | 例如 TASK-001                                                                  |
| Title                     | Text             | 任務名稱                                                                       |
| Status                    | Status           | Backlog / Analysis / Planned / In Progress / Testing / Review / Blocked / Done |
| Route                     | Select           | Full / Simple                                                                  |
| Module                    | Multi-select     | frontend / admin / firebase / testing / reviewer                               |
| Risk                      | Select           | low / medium / high                                                            |
| Needs UI Confirmation     | Checkbox         | 是否有 UI 變動                                                                 |
| Needs Deploy Confirmation | Checkbox         | 是否涉及 deploy                                                                |
| Needs Rules Confirmation  | Checkbox         | 是否涉及 firestore.rules / storage.rules                                       |
| Emulator Required         | Checkbox         | 是否需 Emulator 驗證                                                           |
| Execution Mode            | Select           | Local / CLI                                                                    |
| Current Owner             | Select 或 Person | Director / Planner / Frontend / Admin / Firebase / Testing / Reviewer          |
| Branch / Worktree         | Text             | 對應 git worktree / branch                                                     |
| Acceptance Summary        | Text             | 驗收標準摘要                                                                   |
| Test Result               | Select           | not-run / passed / failed                                                      |
| Review Result             | Select           | pending / passed / changes-requested                                           |
| Updated At                | Last edited time | 最後更新                                                                       |

可選擴充欄位（不建議過度增加）：

- Needs User Decision（Checkbox）：是否需使用者決策
- Block Reason（Text）：Blocked 時一句話說明
- Repo Links（URL）：PR 或關聯文件連結

## Views 設計

以下全部來自同一個 Task Database：

1. Board - Delivery Flow

- Group by：Status
- 目的：主流程看板

2. Table - All Tasks

- 欄位完整展開
- 目的：主資料維護與查詢

3. My Focus / Active

- Filter：Status != Done
- 可再加 Current Owner 條件
- 目的：當前進行任務聚焦

4. Testing Queue

- Filter：Status = Testing
- 目的：待測試清單

5. Review Queue

- Filter：Status = Review
- 目的：待審核清單

6. Blocked

- Filter：Status = Blocked
- 目的：阻塞追蹤與解鎖

7. Deploy Risk

- Filter：Needs Deploy Confirmation = true OR Needs Rules Confirmation = true
- 目的：高風險發佈前清單

## 狀態同步規則（Director 主控）

狀態切換由 Director 統一更新，並同步記錄：

- 一句話摘要
- Current Owner
- 是否需要使用者決策

標準流轉：

- 新任務建立：Status = Analysis
- 分析完成：Status = Planned 或 In Progress
- 開發中：Status = In Progress
- 測試中：Status = Testing
- 審查中：Status = Review
- 卡住：Status = Blocked
- 完成：Status = Done

## Agent 與 Notion 的互動

### Director

- 預設以 Notion Task Database 作為 workflow memory。
- 讀取任務時優先讀 Notion task page；失敗才讀本地 fallback。
- 階段切換時同步狀態與摘要，不要求使用者切換 agent。
- 只下發該階段最小必要上下文給 worker。

### Planner

- 產生 analysis/spec/acceptance 時，優先寫入 Notion task page 對應區段。
- 若 Notion 不可用，改寫本地 `.workflow/active/TASK-XXX/spec.md` 與 `status.md`。

### Frontend / Admin / Firebase

- 優先讀取 task page 的「規格摘要」「限制」「驗收標準」。
- 回報 Director：變更摘要、修改檔案、風險限制、建議測試方式。

### Testing

- 測試結果優先寫到 task page 的「測試結果」。
- Notion 不可用時寫回 `.workflow/active/TASK-XXX/test-report.md`。

### Reviewer

- 審核結論優先寫到 task page 的「Review 結論」。
- Notion 不可用時寫回 `.workflow/active/TASK-XXX/review.md`。

## Fallback 機制

當 Notion MCP 可用：

- Notion 為主要 workflow 記憶。
- `.workflow/active/TASK-XXX/` 僅作本地快取或 CLI 互通需求。

當 Notion MCP 不可用：

- 啟用 `.workflow/active/TASK-XXX/` 作為暫時 fallback 工作區。
- 僅維護當前任務必要內容，避免長期雙系統並行。

恢復後同步原則：

- 由 Director 在階段邊界做一次收斂同步。
- 不做長期雙寫，避免資料漂移。
- 同步失敗時明確標記 pending，等待下一次可用時補同步。

## 單人專案複雜度控制

- 使用單一 Task Database + 多 Views。
- 不將 Notion 當程式碼規範來源。
- 不在 Notion 儲存完整 diff 或冗長 log。
- 只存「決策可追蹤、狀態可追蹤、流程可追蹤」的摘要資訊。

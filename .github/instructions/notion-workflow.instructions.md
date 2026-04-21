---
description: "Notion 工作流規範。Use when: 任務分析、規格追蹤、狀態同步、測試與審核摘要、決策紀錄。"
applyTo: ".github/agents/**,docs/NOTION*.md,.workflow/**"
---

# Notion Workflow Instructions

> 本檔補充 Notion 與本地 fallback 的工作流規範；共通安全規則仍以 `.github/copilot-instructions.md` 為準。

## 何時應使用 Notion

以下情境優先寫入 Notion Task Database，而不是把大量內容留在對話中：

- 任務分析結論（analysis）
- 規格摘要與驗收標準（spec / acceptance）
- 任務狀態流轉（status）
- 測試結果摘要（test result）
- 審核結論摘要（review result）
- 需追蹤的決策紀錄（decision log）

目標是讓 Director 與 workers 透過 task page 快速取得上下文，降低每次重建對話記憶成本。

## 應寫進 Notion 的內容

- 一句話任務摘要
- 階段狀態與 owner
- 風險旗標（UI / deploy / rules / emulator）
- 驗收標準摘要
- 測試與審核結論摘要
- 決策與阻塞理由

## 不應寫進 Notion 的內容

- 實際程式碼
- 敏感金鑰、token、憑證
- 低層級且冗長的原始 log
- 可直接由 Git 取得的完整 diff

## Fallback 規範（Notion 不可用）

當 Notion MCP 不可用時，改用 `.workflow/active/TASK-XXX/`：

- `status.md`：狀態與 owner
- `analysis.md`：分析內容
- `spec.md`：規格與驗收標準
- `test-report.md`：測試摘要
- `review.md`：審核摘要

MCP 恢復後，由 Director 在階段切換時回填 Notion。避免長期雙寫，避免資料漂移。

## 實務原則

- Notion 是 workflow memory；Repo 是 code memory。
- Board 只是 Task Database 的一個 view。
- 不要求使用者手動切換 agent，由 Director 編排下一步。
- 高風險規則（UI / deploy / rules / production data）不可弱化。

# Notion MCP Setup (VS Code Workspace)

## 目標

在 VS Code 工作區啟用 Notion MCP，讓 Director 與 workers 能在有授權時讀寫 Notion 任務資料。

本設定適用於本地、human-in-the-loop 的協作流程，不應假設可直接套用到完全無人值守的雲端 agent。

## 工作區設定檔

本專案使用工作區層級設定：`.vscode/mcp.json`

最少需要的 Notion server 設定如下：

```json
{
  "servers": {
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp"
    }
  }
}
```

本專案已保留既有 MCP servers，並新增 notion server。

## 啟用步驟

1. 開啟專案工作區。
2. 確認 VS Code 已啟用 MCP 功能與支援的 Copilot 版本。
3. 載入工作區的 `.vscode/mcp.json`。
4. 在 VS Code / Copilot 介面完成 Notion OAuth 授權。
5. 授權後測試讀取 Notion workspace（例如列出可見頁面或資料庫）。

## 驗證清單

- 可看到 notion server 已載入。
- 授權狀態為已連線。
- 可讀取目標 workspace 中的 Task Database。
- 有需要時可更新 task page 欄位（Status、Current Owner、摘要）。

## 常見問題

### 1) notion server 顯示但無法讀寫

- 多半是 OAuth 未完成，或授權 scope 不足。
- 重新授權並確認該 workspace 已分享給整合。

### 2) 找不到目標資料庫

- 檢查資料庫是否與 Notion integration 共享。
- 檢查目前登入帳號是否有該頁面權限。

### 3) 可讀不可寫

- 檢查 integration 權限是否為可編輯。
- 避免將資料庫放在僅檢視頁面。

## 安全與責任邊界

- 不在 repo 硬編碼任何金鑰或敏感資訊。
- Notion 僅保存 workflow 狀態與摘要，不存程式碼或敏感憑證。
- 高風險操作（UI 變更、deploy、rules、生產資料）仍依 repo 規則先取得使用者確認。

## 與 fallback 的關係

- Notion MCP 可用：優先在 Notion 更新任務狀態。
- Notion MCP 不可用：改用 `.workflow/active/TASK-XXX/` 暫存。
- MCP 恢復後由 Director 在階段邊界補同步，不做長期雙寫。

# Notion MCP Setup (Bright-Edu)

## 先回答一個重點

**不需要把 Notion API key 提供給我，也不要把任何 token 貼在聊天裡。**

這個專案目前最適合的做法是：

- **VS Code + MCP + Notion OAuth**：給 Copilot / agent 在本地 IDE 中使用
- 若之後你要自行寫 Notion REST API 腳本，再在你本機或 CI 的 secrets 中配置 integration token

## 你現在的情況

repo 已有 `.vscode/mcp.json`，並且已放入 `notion` server。你要做的是完成本機授權，而不是把 token 寫進 repo。

## 推薦做法

### A. MCP（目前主方案）

使用 `.vscode/mcp.json`：

```json
{
  "servers": {
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp",
      "description": "Notion MCP — 任務與工作流資料庫"
    }
  }
}
```

### B. REST API（未來選配）

只有在以下情境才建議加：

- 需要批次同步 Notion database
- 需要從 scripts / CI 更新 Notion
- 需要固定欄位 mapping 與 API 寫入

此時應把 token 放在：

- 本機 `.env.local`
- OS secret store
- GitHub Actions secrets

**不要**：

- 貼在聊天裡
- 寫死在 repo
- 放到 `.vscode/mcp.json`

## VS Code 啟用步驟

1. 開啟專案 workspace
2. 確認 VS Code 與 Copilot 版本支援 MCP
3. 讀取 `.vscode/mcp.json`
4. 在 VS Code 內完成 Notion OAuth
5. 驗證能否列出可見的 workspace 頁面或 database

## Notion 端需要先準備什麼

目前你說公司帳號下還沒有 database，所以先準備這兩件事：

1. 建立一個主頁，例如：`Bright-Edu Dev Workflow`
2. 在該頁內建立 `Bright-Edu Workflow Tasks` database

然後把你之後要用的整合授權到這個 workspace / page。

## 最小驗證清單

- Notion MCP server 已載入
- VS Code 內顯示已授權
- 可看到 `Bright-Edu Workflow Tasks`
- 可讀寫 task 的 `Status` / `Current Owner` / 摘要欄位

## 常見錯誤

### 找不到資料庫

- database 沒建在目前授權的 workspace
- page / database 沒分享給 integration
- 你登入的是不同 Notion 帳號

### 可讀不可寫

- integration 權限是 read only
- database 所在頁面未允許編輯

### MCP 可用但 agent 不穩定

- 讓 Director 只同步「狀態與摘要」
- 不要求 worker 每一步都回寫 Notion
- Notion 失敗時退回 `.workflow/active/TASK-XXX/`

## 安全邊界

- Notion 不存憑證
- Notion 不存完整程式碼 diff
- 高風險操作仍依 repo 規則先取你確認

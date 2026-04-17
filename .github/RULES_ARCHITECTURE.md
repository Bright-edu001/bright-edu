# .github 規則架構說明

本文件定義 `.github` 規則檔案的責任分層，目標是降低重複、避免矛盾與規則漂移。

## 架構總覽

本專案採用 **Director 單一入口 + 多隱藏 Worker** 架構：

- **Director**（`director.agent.md`）是唯一對外入口，負責需求理解、任務委派、結果彙整
- **Worker agents**（Frontend、Admin、Firebase、Testing、Reviewer、Planner）為 `user-invocable: false` 的內部 worker
- 使用者不需要手動切換 agent

## 分層設計

### Layer 1：主規則（Single Source of Truth）

- 檔案：`.github/copilot-instructions.md`
- 角色：專案級共通原則與流程主檔
- 應放內容：
  - 全專案共用安全規則（UI 確認、部署確認、生產資料寫入限制）
  - Director 架構與工作流程（Director 委派 → worker 執行 → 回報）
  - Agent 共通原則與規則優先序
  - 升級機制（何時必須暫停請使用者決策）
  - Local / CLI 分層原則
- 不應放內容：
  - 特定技術棧的細部語法規範
  - 某單一角色專屬的操作細節

### Layer 2：技術領域規範（Instructions）

- 目錄：`.github/instructions/`
- 角色：技術面「如何做」的專業規範
- 應放內容：
  - React 元件實作細節（元件結構、PropTypes、效能模式）
  - SCSS 技術規範（`@use/@forward`、mixin 使用、`mixed-decls` 避免方式）
  - Firebase/服務層技術規範（Emulator 流程、服務層錯誤處理模式）
- 不應放內容：
  - 共通流程、回報模板、通用安全條款（這些在主規則）

### Layer 3：角色執行規範（Agents）

- 目錄：`.github/agents/`
- 角色：各 Agent 的權責範圍與角色差異
- 應放內容：
  - `director.agent.md` — 唯一入口、委派邏輯、風險判斷、回報格式
  - Worker agents — 可修改檔案範圍、禁止範圍、角色專屬限制、回報格式
- 不應放內容：
  - 主規則已定義的共通流程全文
  - instructions 已定義的技術語法細節全文

### Layer 4：安全閘門（Hooks）

- 目錄：`.github/hooks/`
- 角色：自動化安全提醒，在工具執行前/後注入 system message
- 檔案：
  - `pre-edit-ui.json` — 編輯 UI 檔案前提醒確認
  - `post-edit-test.json` — 編輯 src/ 後提醒檢查測試
  - `safety-gates.json` — 高風險操作（安全規則、Functions、部署、Firestore 腳本）前提醒確認

## 規則優先序

1. `.github/copilot-instructions.md`（共通主規則）
2. `.github/instructions/*.instructions.md`（技術領域規範）
3. `.github/agents/*.agent.md`（角色差異）
4. `.github/hooks/*.json`（自動化安全閘門）

若同一主題在多層出現，以上層為準；下層只保留補充，不得覆蓋上層原則。

## Agent 檔案對照

| 檔案                | 角色     | 對外        | 說明                             |
| ------------------- | -------- | ----------- | -------------------------------- |
| `director.agent.md` | Director | ✅ 唯一入口 | 需求理解、任務委派、結果彙整     |
| `frontend.agent.md` | Frontend | ❌ 隱藏     | 前台元件、頁面、路由、SCSS       |
| `admin.agent.md`    | Admin    | ❌ 隱藏     | 後台管理面板、權限、CRUD         |
| `firebase.agent.md` | Firebase | ❌ 隱藏     | Firebase 設定、Functions、服務層 |
| `testing.agent.md`  | Testing  | ❌ 隱藏     | 單元測試、E2E 測試               |
| `reviewer.agent.md` | Reviewer | ❌ 隱藏     | 程式碼審查、分析、審核           |
| `planner.agent.md`  | Planner  | ❌ 隱藏     | 規格書、任務拆解、文件管理       |

## 維護準則

### 新增規則時

1. 先判斷是「共通原則」還是「技術細節」或「角色差異」。
2. 只寫入對應層，避免在三層同時複製。
3. 若必須在下層提及上層規則，使用「引用主檔」而非重寫全文。

### 修改規則時

1. 先改主來源（Source of Truth）。
2. 檢查其他層是否僅需更新引用語句。
3. 避免出現同主題的雙份完整描述。

### Review Checklist（規則檔）

- 是否把共通規則錯放到 agent 檔？
- 是否把流程/交接格式重複貼在多個 agent 檔？
- instructions 是否混入非技術流程條款？
- 新增規則是否與主規則矛盾？
- 是否能明確回答「這條規則為何在這一層」？

## 建議檔案定位速查

- 要改 UI 確認、部署確認、Director 流程：改 `.github/copilot-instructions.md`
- 要改 React/SCSS/Firebase 實作細節：改 `.github/instructions/` 對應檔
- 要改某 Agent 的權限或責任：改 `.github/agents/` 對應檔
- 要改自動化安全提醒：改 `.github/hooks/` 對應檔

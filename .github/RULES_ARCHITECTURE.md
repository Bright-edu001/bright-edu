# .github 規則架構說明

本文件定義 `.github` 規則檔案的責任分層，目標是降低重複、避免矛盾與規則漂移。

## 分層設計

### Layer 1：主規則（Single Source of Truth）

- 檔案：`.github/copilot-instructions.md`
- 角色：專案級共通原則與流程主檔
- 應放內容：
  - 全專案共用安全規則（UI 確認、部署確認、生產資料寫入限制）
  - 工作流程（reviewer → pm → 開發 → testing → reviewer+pm）
  - 交接格式（`### 📋 交接`）
  - 升級機制（何時必須暫停請使用者決策）
  - Agent 共通原則與規則優先序
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
  - 共通流程、交接模板、通用安全條款（這些在主規則）

### Layer 3：角色執行規範（Agents）

- 目錄：`.github/agents/`
- 角色：各 Agent 的權責範圍與角色差異
- 應放內容：
  - 可修改檔案範圍 / 禁止範圍
  - 角色專屬限制與補充流程（例如 testing 的測試交接方向）
  - 角色專屬關注點（例如 reviewer 的審查維度）
- 不應放內容：
  - 主規則已定義的共通流程與交接格式全文
  - instructions 已定義的技術語法細節全文

## 規則優先序

1. `.github/copilot-instructions.md`（共通主規則）
2. `.github/instructions/*.instructions.md`（技術領域規範）
3. `.github/agents/*.agent.md`（角色差異）

若同一主題在多層出現，以上層為準；下層只保留補充，不得覆蓋上層原則。

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

- 要改 UI 確認、部署確認、交接格式：改 `.github/copilot-instructions.md`
- 要改 React/SCSS/Firebase 實作細節：改 `.github/instructions/` 對應檔
- 要改某 Agent 的權限或責任：改 `.github/agents/` 對應檔

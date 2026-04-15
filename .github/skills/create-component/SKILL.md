---
name: create-component
description: "建立新的 React 元件。Use when: 需要新增元件、建立元件資料夾、scaffold component。自動產生元件主體、SCSS 模組樣式、PropTypes 驗證。"
argument-hint: "元件名稱，例如: StudentCard"
---

# 建立新 React 元件

## 使用時機

- 需要在 `src/components/` 下新增一個可複用元件
- 需要在 `src/pages/` 下新增一個頁面子元件

## 流程

### 1. 確認元件資訊

向使用者確認以下資訊：

- 元件名稱（PascalCase，例如 `StudentCard`）
- 放置位置（`src/components/` 或 `src/pages/XXX/`）
- 元件用途簡述
- 需要哪些 props

### 2. 建立資料夾結構

```
src/components/ComponentName/
├── ComponentName.jsx          # 元件主體
├── ComponentName.module.scss  # 模組化樣式
└── index.jsx                  # 匯出入口
```

### 3. 建立元件主體 (`ComponentName.jsx`)

```jsx
import PropTypes from "prop-types";
import styles from "./ComponentName.module.scss";

function ComponentName(
  {
    /* props */
  },
) {
  return <div className={styles.container}>{/* 元件內容 */}</div>;
}

ComponentName.propTypes = {
  // 定義所有 props 類型
};

export default ComponentName;
```

### 4. 建立樣式檔 (`ComponentName.module.scss`)

```scss
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.container {
  // 基礎容器樣式
}
```

### 5. 建立匯出入口 (`index.jsx`)

```jsx
export { default } from "./ComponentName";
```

### 6. 建立測試檔（選用）

如果需要測試，在 `src/components/ComponentName/__tests__/` 下建立：

```jsx
import { render, screen } from "@testing-library/react";
import ComponentName from "../ComponentName";

describe("ComponentName", () => {
  it("應該正確渲染", () => {
    render(<ComponentName /* 必要 props */ />);
    // 驗證邏輯
  });
});
```

## 檢查清單

- [ ] 元件使用函式元件（非 class）
- [ ] 所有 props 都有 PropTypes 驗證
- [ ] 樣式使用 SCSS 模組（`*.module.scss`）
- [ ] 使用 `@` 路徑別名引入共用模組
- [ ] 顏色、間距等使用 `_variables.scss` 變數
- [ ] 如涉及畫面變動，已向使用者確認

---
description: "React 元件開發規範。Use when: 建立或修改 React 元件、頁面元件、PropTypes 驗證、元件結構設計。"
applyTo: "src/components/**,src/pages/**"
---

# React 元件開發規範

> 共通安全、流程、交接與跨模組原則以 `.github/copilot-instructions.md` 為準；本檔僅補充 React 元件與頁面開發的技術規範。

## 元件結構

新建可複用元件時，預設使用獨立資料夾結構，包含：

- `ComponentName.jsx` — 元件主體（函式元件）
- `ComponentName.module.scss` — SCSS 模組化樣式
- `index.jsx` — 匯出入口（選用，用於簡化 import 路徑）

若任務是修改既有頁面或既有全域樣式結構，應優先沿用原檔案模式，不強制把既有 `.scss` 全面改寫成 `.module.scss`，除非任務本身就是樣式模組化重構。

## 函式元件範本

```jsx
import PropTypes from "prop-types";
import styles from "./ComponentName.module.scss";

function ComponentName({ title, children }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
}

ComponentName.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ComponentName;
```

## 規則

1. **必須使用 PropTypes** 驗證所有 props
2. **新建可複用元件時使用 SCSS 模組** — `import styles from './X.module.scss'`；修改既有頁面或既有全域 `.scss` 時，沿用現有模式，不在同一元件內混用多種樣式組織方式
3. **錯誤邊界** — 關鍵區塊使用 `ErrorBoundary` 包裹
4. **效能** — 大型列表或計算密集的元件使用 `React.memo`、`useMemo`、`useCallback`

## 現有元件清單

Accordion, ActionButton, Application, AppSkeleton, AreaCards, ArticleCard, AttractionCard, CourseList, ErrorBoundary, FloatingButtons, Footer, GallerySection, Header, Hero, ImageTextSection, InfoCard, MbaAreasHero, Ms, ProgressiveImage, RankingNumberFlip, ScrollToTop, SearchBar, SectionContainer, UrlRedirect

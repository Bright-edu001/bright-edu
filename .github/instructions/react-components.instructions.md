---
description: "React 元件開發規範。Use when: 建立或修改 React 元件、頁面元件、PropTypes 驗證、元件結構設計。"
applyTo: "src/components/**,src/pages/**"
---

# React 元件開發規範

## 元件結構

每個元件為獨立資料夾，包含：

- `ComponentName.jsx` — 元件主體（函式元件）
- `ComponentName.module.scss` — SCSS 模組化樣式
- `index.jsx` — 匯出入口（選用，用於簡化 import 路徑）

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
2. **必須使用 SCSS 模組** — `import styles from './X.module.scss'`，不使用行內樣式
3. **路徑別名** — 使用 `@/` 引入 src 下的模組（如 `import { logger } from '@/utils/logger'`）
4. **資料取得** — 使用 React Query hooks，不在元件中直接呼叫 Firebase
5. **懶加載** — 頁面級元件使用 `React.lazy()` + `Suspense`
6. **XSS 防護** — 渲染 HTML 內容前必須經過 `sanitizeHtml()` 處理
7. **錯誤邊界** — 關鍵區塊使用 `ErrorBoundary` 包裹
8. **效能** — 大型列表或計算密集的元件使用 `React.memo`、`useMemo`、`useCallback`

## 現有元件清單

Accordion, ActionButton, Application, AppSkeleton, AreaCards, ArticleCard, AttractionCard, CourseList, ErrorBoundary, FloatingButtons, Footer, GallerySection, Header, Hero, ImageTextSection, InfoCard, MbaAreasHero, Ms, ProgressiveImage, RankingNumberFlip, ScrollToTop, SearchBar, SectionContainer, UrlRedirect

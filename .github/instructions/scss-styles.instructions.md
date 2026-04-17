---
description: "SCSS 樣式開發規範。Use when: 撰寫或修改 SCSS 樣式、CSS 變數、響應式設計、mixin 使用。"
applyTo: "**/*.scss"
---

# SCSS 樣式開發規範

> 共通安全、流程與畫面變動確認原則以 `.github/copilot-instructions.md` 為準；本檔僅補充 SCSS 技術規範。

## 全域樣式結構

| 檔案                         | 用途                               |
| ---------------------------- | ---------------------------------- |
| `src/styles/_variables.scss` | 全域變數（顏色、字體、間距、斷點） |
| `src/styles/_mixins.scss`    | 可複用 mixin（響應式、排版）       |
| `src/styles/_base.scss`      | 基礎樣式重置與全域設定             |
| `src/styles/index.scss`      | 樣式進入點                         |

## 規則

1. **使用全域變數** — 顏色、字體大小、間距等必須引用 `_variables.scss` 中的變數，不硬編碼
2. **SCSS 模組** — 元件樣式使用 `*.module.scss`（CSS Modules），避免全域污染
3. **命名規範** — 類別名稱使用 camelCase（配合 CSS Modules）
4. **響應式設計** — 優先使用 `_mixins.scss` 中定義的斷點 mixin
5. **巢狀層級** — 最多 3 層巢狀，避免過深的選擇器
6. **避免 !important** — 除非覆蓋第三方元件庫樣式
7. **禁止新增 `@import`** — `src/` 下 SCSS 一律使用 `@use` / `@forward`；若需共用變數與 mixin，優先透過 `styles/index.scss` 的 `@forward` 輸出後再以 `@use ".../styles/index" as *` 引入
8. **避免 Sass mixed-decls 結構** — 若 mixin 內含 `@media`、`&:hover` 或其他巢狀規則，呼叫端不可在 `@include` 後面再接一般 declaration。這種寫法在新版本 Sass 會改變輸出順序，可能破壞 responsive 覆蓋。應改為拆分成 base mixin 與 nested-rule mixin，或讓一般 declaration 排在 `@include` 之前

## Sass 巢狀規則注意事項

### 不可使用的模式

```scss
.container {
  @include container;
  padding: 0 1.5rem;
}
```

如果 `container` mixin 內含 `@media`，以上寫法會觸發 Sass `mixed-decls` 警告，未來版本還可能改變 CSS 輸出順序。

### 建議模式

```scss
.container {
  @include container-base;
  padding: 0 1.5rem;
  @include container-mobile-padding;
}
```

或是讓所有一般 declaration 都排在含巢狀規則的 `@include` 之前。

## 模組化樣式範本

```scss
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.container {
  padding: $spacing-md;
  background-color: $color-background;

  .title {
    font-size: $font-size-lg;
    color: $color-primary;
  }

  .content {
    margin-top: $spacing-sm;
  }
}
```

## 第三方元件庫樣式覆蓋

- Ant Design：使用 `ConfigProvider` 的 `theme` 設定為主，避免直接覆蓋 CSS
- Mantine：使用 Mantine 的 theme 系統
- 必要時才使用 `:global()` 覆蓋特定類別

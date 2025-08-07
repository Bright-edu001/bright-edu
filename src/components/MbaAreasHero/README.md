# MbaAreasHero 元件

簡潔的橫幅標題元件，用於顯示頁面主標題。

## 使用方式

```jsx
import MbaAreasHero from './components/MbaAreasHero/MbaAreasHero';

// 基本使用（使用預設標題）
<MbaAreasHero />

// 自訂標題
<MbaAreasHero title="MSU MSF" />

// 自訂背景色
<MbaAreasHero
  title="Custom Title"
  bgColor="#19453c"
/>

// 添加自訂 className
<MbaAreasHero
  title="MSU MSF"
  className="msf-hero"
  bgColor="#19453c"
/>
```

## Props

| 屬性        | 類型   | 預設值         | 說明           |
| ----------- | ------ | -------------- | -------------- |
| `title`     | string | "UIC Business" | 顯示的標題文字 |
| `className` | string | -              | 自訂 CSS class |
| `bgColor`   | string | "#c71432"      | 背景顏色       |

## 樣式特點

- 固定高度 80px
- 文字水平垂直置中
- 響應式字體大小：
  - 桌面版：28px
- 文字溢出時顯示省略號
- 使用 `!important` 防止樣式被覆蓋

## 修正的問題

1. **字體大小不一致**：明確定義了字體大小，並使用 `!important` 防止被其他 CSS 覆蓋
2. **邊距問題**：重置了 margin 和 padding
3. **響應式支援**：針對不同螢幕尺寸設定適當的字體大小
4. **容錯處理**：當 title 為空或非字串時，會使用預設值

## 測試

```bash
npm test MbaAreasHero.test.js
```

測試涵蓋：

- 預設 title 顯示
- 自訂 title 顯示
- 空值處理
- className 傳遞
- 元件結構驗證

# CLS 效能測試指南

## 已實施的修復

我們已經對以下主要 CLS 問題來源實施了修復：

### 1. Footer ICEF 圖片 (之前 CLS 分數: 0.605)

- **修復**: 設定明確尺寸 120px x 120px，加入 min/max 限制和 object-fit: contain
- **位置**: `src/components/Footer/Footer.scss` 中的 `.brand-image` 類別

### 2. Header Logo 圖片

- **修復**: 設定明確尺寸 150px x 60px，加入 min/max 限制和 object-fit: contain
- **位置**: `src/components/Header/Header.scss` 中的 `.brand` 類別

### 3. Footer 社交圖示

- **修復**:
  - 電話圖示：設定 min-width/min-height 24px
  - Line 圖示：設定 min-width/min-height 30px
- **位置**: `src/components/Footer/Footer.scss`

### 4. Hero 圖片

- **修復**: 加入 aspect-ratio: 1280/450 防止載入期間的版面跳動
- **位置**: `src/components/Hero/Hero.scss`

### 5. 首頁功能圖片

- **修復**:
  - 背景圖片：加入 aspect-ratio: 16/9
  - Logo 圖片：設定明確尺寸 120px x 60px
- **位置**: `src/pages/Home/Home.scss`

### 6. ImageTextSection 圖片

- **修復**: 加入 aspect-ratio: 4/3 和 object-fit: contain
- **位置**: `src/components/ImageTextSection/ImageTextSection.scss`

## 測試步驟

### 1. 手動視覺測試

1. 開啟 http://localhost:3001
2. 觀察頁面載入過程中是否有明顯的版面跳動
3. 特別注意：
   - Header logo 區域
   - Hero 圖片載入
   - Footer ICEF logo
   - 各頁面的內容圖片

### 2. Chrome DevTools 測試

1. 打開 Chrome DevTools (F12)
2. 前往 **Lighthouse** 標籤
3. 選擇 **Performance** 類別
4. 設定 **Mobile** 和 **Simulated Fast 3G, 4x CPU Slowdown**
5. 點擊 **Analyze page load**
6. 查看 **Cumulative Layout Shift** 分數

**目標 CLS 分數**: ≤ 0.1 (好)，理想情況下 ≤ 0.05 (優秀)

### 3. Network 標籤測試

1. 在 Chrome DevTools 中前往 **Network** 標籤
2. 勾選 **Disable cache**
3. 設定網路節流為 **Slow 3G**
4. 重新載入頁面
5. 觀察圖片載入順序和版面穩定性

### 4. Performance 標籤測試

1. 在 Chrome DevTools 中前往 **Performance** 標籤
2. 開始錄製
3. 重新載入頁面
4. 停止錄製
5. 在 **Experience** 區塊查看是否有 **Layout Shift** 事件

## 預期改善

- **Footer ICEF 圖片**: CLS 分數應從 0.605 大幅降低
- **整體頁面**: CLS 分數應降至 0.1 以下
- **視覺穩定性**: 頁面載入過程中不應有明顯跳動
- **載入體驗**: 圖片載入時版面應保持穩定

## 額外建議

如果仍有輕微的 CLS 問題，可考慮：

1. 對其他內容圖片加入 `loading="lazy"` 屬性
2. 使用 `font-display: swap` 優化字體載入
3. 對動態內容加入骨架畫面 (skeleton screens)
4. 預載入關鍵圖片資源

## 測試各頁面

建議測試以下頁面的 CLS 改善：

- `/` (首頁)
- `/about` (關於頁面)
- `/msu/*` (MSU 相關頁面)
- `/uic/*` (UIC 相關頁面)
- `/blog/*` (部落格頁面)

測試完成後，請記錄改善前後的 CLS 分數對比。

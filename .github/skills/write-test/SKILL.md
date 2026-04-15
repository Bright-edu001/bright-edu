---
name: write-test
description: "撰寫測試。Use when: 需要撰寫單元測試、E2E 測試、測試 React 元件、測試 hooks、測試服務層、Vitest、Playwright、Testing Library、mock Firebase。"
argument-hint: "目標檔案路徑，例如: src/hooks/useBlogData.jsx"
---

# 撰寫測試

## 使用時機

- 為現有模組新增單元測試
- 為頁面功能新增 E2E 測試
- 修改程式碼後需要更新測試

## 判斷測試類型

| 目標                       | 測試類型 | 框架                     | 位置                      |
| -------------------------- | -------- | ------------------------ | ------------------------- |
| 工具函式 (`src/utils/`)    | 單元測試 | Vitest                   | `src/utils/__tests__/`    |
| 服務層 (`src/services/`)   | 單元測試 | Vitest                   | `src/services/__tests__/` |
| React Hooks (`src/hooks/`) | 單元測試 | Vitest + renderHook      | `src/hooks/__tests__/`    |
| React 元件                 | 單元測試 | Vitest + Testing Library | 元件目錄下 `__tests__/`   |
| Context                    | 單元測試 | Vitest + Testing Library | `src/context/`            |
| 頁面流程/排版              | E2E 測試 | Playwright               | `e2e/`                    |

## 單元測試流程

### 1. Mock 宣告（檔案頂部）

使用 `vi.hoisted()` + `vi.mock()` 模式：

```jsx
// 1. 先宣告 mock 函式
const mockGetFirestoreDb = vi.hoisted(() => vi.fn());
const mockGetDocs = vi.hoisted(() => vi.fn());

// 2. Mock 模組
vi.mock("@/config/firebaseCore", () => ({
  getFirestoreDb: mockGetFirestoreDb,
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: mockGetDocs,
  query: vi.fn(),
  orderBy: vi.fn(),
}));
```

### 2. 重置 Mock（beforeEach）

```jsx
beforeEach(() => {
  vi.clearAllMocks();
});
```

### 3. 工具函式測試

```jsx
import { describe, it, expect } from "vitest";
import { myFunction } from "../myFunction";

describe("myFunction", () => {
  it("應該正確處理正常輸入", () => {
    expect(myFunction("input")).toBe("expected");
  });

  it("應該處理邊界情況", () => {
    expect(myFunction("")).toBe("");
    expect(myFunction(null)).toBe("");
    expect(myFunction(undefined)).toBe("");
  });
});
```

### 4. React Hook 測試

```jsx
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Query wrapper
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useMyHook", () => {
  it("應該載入資料", async () => {
    const { result } = renderHook(() => useMyHook(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  });
});
```

### 5. 虛擬計時器（debounce 等）

```jsx
vi.useFakeTimers();

it("應該在延遲後執行", () => {
  const fn = vi.fn();
  const debounced = debounce(fn, 300);
  debounced();
  expect(fn).not.toHaveBeenCalled();
  vi.advanceTimersByTime(300);
  expect(fn).toHaveBeenCalledOnce();
});

afterEach(() => {
  vi.useRealTimers();
});
```

## E2E 測試流程

### 1. 基本結構

```javascript
import { test, expect } from "@playwright/test";

test.describe("頁面名稱", () => {
  test("功能描述", async ({ page }) => {
    await page.goto("/path");

    // 等待頁面載入
    const root = page.locator("#root");
    await expect(root).toBeVisible();

    // 驗證邏輯
  });
});
```

### 2. 輔助函數提取

```javascript
async function getFirstArticleHref(page) {
  const link = page.locator(".article-link").first();
  return await link.getAttribute("href");
}
```

### 3. 導航與返回測試

```javascript
test("導航後返回不破壞排版", async ({ page }) => {
  await page.goto("/blog");
  // 記錄初始 CSS 狀態
  const initialPadding = await getComputedStyle(page, ".container");
  // 導航到子頁面
  await page.click(".article-link");
  // 返回
  await page.goBack();
  // 驗證排版不變
  const afterPadding = await getComputedStyle(page, ".container");
  expect(afterPadding).toEqual(initialPadding);
});
```

## 常用指令

```bash
npm test                          # 執行所有單元測試
npm run test:watch                # 監聽模式
npx vitest --coverage             # 含覆蓋率
npx vitest src/utils/__tests__/   # 指定目錄
npx playwright test               # 執行 E2E
npx playwright test --ui          # Playwright UI
```

## Mock 策略

- **Firebase 服務** — Mock `firebaseCore`、`firebase/firestore` 等模組
- **Ant Design** — Mock `message` 等 UI 回饋元件
- **React Query** — 使用 `QueryClientProvider` wrapper
- **網路請求** — Mock 服務層函式，不 Mock fetch/axios
- **不要 Mock** 被測試的模組本身

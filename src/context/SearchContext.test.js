// 匯入必要的 React 及測試工具
import React, { useContext } from "react";
import { renderHook, act } from "@testing-library/react";
import { SearchProvider, SearchContext } from "./SearchContext";

// 建立一個 mock 的 useNavigate，攔截路由跳轉
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SearchContext", () => {
  // wrapper 用於包裹 context provider，讓 hook 能取得 context
  const wrapper = ({ children }) => <SearchProvider>{children}</SearchProvider>;

  // 每次測試前重置 mockNavigate
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  // 測試 handleSearch 是否正確導向並清空 keyword
  it("handleSearch navigates and clears keyword", () => {
    // 透過 renderHook 取得 context
    const { result } = renderHook(() => useContext(SearchContext), {
      wrapper,
    });

    // 設定 keyword
    act(() => {
      result.current.setKeyword("hello world");
    });

    // 建立假的 event 物件
    const fakeEvent = { preventDefault: jest.fn() };

    // 執行 handleSearch
    act(() => {
      result.current.handleSearch(fakeEvent);
    });

    // 應該導向正確路徑，並清空 keyword
    expect(mockNavigate).toHaveBeenCalledWith("/blog/search/hello%20world");
    expect(result.current.keyword).toBe("");
  });

  // 測試 handleCategoryClick 是否導向正確分類
  it("handleCategoryClick navigates to correct paths", () => {
    // 取得 context
    const { result } = renderHook(() => useContext(SearchContext), {
      wrapper,
    });

    // 依序點擊 enrollment 與 news 分類
    act(() => {
      result.current.handleCategoryClick("enrollment");
    });
    act(() => {
      result.current.handleCategoryClick("news");
    });

    // 應該分別導向正確的路徑
    expect(mockNavigate).toHaveBeenNthCalledWith(
      1,
      "/blog?category=enrollment"
    );
    expect(mockNavigate).toHaveBeenNthCalledWith(2, "/blog?category=news");
  });
});

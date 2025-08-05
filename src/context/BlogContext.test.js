// 匯入必要的函式庫與元件
import React, { useContext } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { BlogProvider, BlogContext } from "./BlogContext";
import { getEnrollmentEvents, getNews } from "../services/blogService";

// 模擬 blogService 相關 API
jest.mock("../services/blogService");

// 測試 searchByKeyword 函式
describe("searchByKeyword", () => {
  // 測試用的假資料
  const arrayItem = {
    title: "Array Item",
    content: ["First part", "Second part"],
  };
  const objectItem = {
    title: "Object Item",
    content: { excerpt: "Short desc", details: "Longer text" },
  };
  const stringItem = { title: "String Item", content: "Just a string" };

  // 每次測試前重設 mock 回傳值
  beforeEach(() => {
    getEnrollmentEvents.mockResolvedValue([arrayItem, objectItem, stringItem]);
    getNews.mockResolvedValue([]);
  });

  // 驗證 searchByKeyword 能正確搜尋不同型態的 content
  it("finds keywords within array and object content structures", async () => {
    // 使用 BlogProvider 包裹 context
    const wrapper = ({ children }) => <BlogProvider>{children}</BlogProvider>;
    // 取得 context
    const { result } = renderHook(() => useContext(BlogContext), { wrapper });

    // 等待資料載入完成
    await waitFor(() => expect(result.current.loading).toBe(false));

    // 驗證搜尋結果
    expect(result.current.searchByKeyword("second")).toEqual([arrayItem]);
    expect(result.current.searchByKeyword("longer")).toEqual([objectItem]);
    expect(result.current.searchByKeyword("just")).toEqual([stringItem]);
  });
});

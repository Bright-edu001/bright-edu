// 匯入必要的函式庫與元件
import React, { useContext } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { BlogProvider, BlogContext } from "./BlogContext";
import { getEnrollmentEvents, getNews } from "../services/blogService";

// 模擬 blogService 相關 API
jest.mock("../services/blogService");

// 測試 searchByKeyword 函式
describe("BlogContext", () => {
  const enrollmentData = [
    {
      title: "Enrollment Fair",
      content: "Join the enrollment event",
    },
  ];

  const newsData = [
    {
      title: "School News",
      content: "Breaking updates from campus",
    },
  ];

  // 每次測試前重設 mock 回傳值
  beforeEach(() => {
    getEnrollmentEvents.mockResolvedValue(enrollmentData);
    getNews.mockResolvedValue(newsData);
  });

  it("filterByCategory returns posts in each category", async () => {
    const wrapper = ({ children }) => <BlogProvider>{children}</BlogProvider>;
    const { result } = renderHook(() => useContext(BlogContext), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.searchByKeyword("enrollment")).toEqual(
      enrollmentData
    );
    expect(result.current.searchByKeyword("breaking")).toEqual(newsData);
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
    expect(result.current.filterByCategory("enrollment")).toEqual(
      enrollmentData
    );
    expect(result.current.filterByCategory("news")).toEqual(newsData);
    expect(result.current.filterByCategory()).toEqual([
      ...enrollmentData,
      ...newsData,
    ]);
  });
});

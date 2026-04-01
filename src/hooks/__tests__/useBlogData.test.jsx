import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from "@testing-library/react";
import { useBlogData, clearBlogCache } from "../useBlogData";
import * as blogService from "../../services/blogService";

// Mock blogService
vi.mock("../../services/blogService");

describe("useBlogData", () => {
  const mockEnrollmentEvents = [
    { id: 1, title: "Event 1", content: "Content 1" },
    { id: 2, title: "Event 2", content: "Content 2" },
  ];

  const mockNews = [
    { id: 3, title: "News 1", content: "News content 1" },
    { id: 4, title: "News 2", content: "News content 2" },
  ];

  beforeEach(() => {
    // 清除緩存
    clearBlogCache();

    // 重置 mocks
    vi.clearAllMocks();

    // 設定 mock 返回值 (配合新的分頁回傳格式)
    blogService.getEnrollmentEvents.mockResolvedValue({
      data: mockEnrollmentEvents,
      hasMore: false,
    });
    blogService.getNews.mockResolvedValue({ data: mockNews, hasMore: false });
  });

  test("should not load data when no dataTypes provided", () => {
    const { result } = renderHook(() => useBlogData(), { wrapper: ({ children }) => React.createElement(QueryClientProvider, { client: new QueryClient({ defaultOptions: { queries: { retry: false } } }) }, children) });

    expect(result.current.loading).toBe(false);
        
    expect(result.current.enrollmentEvents).toEqual([]);
    expect(result.current.news).toEqual([]);
  });

  test("should load enrollment events", async () => {
    const { result } = renderHook(() => useBlogData(["enrollmentEvents"]), { wrapper: ({ children }) => React.createElement(QueryClientProvider, { client: new QueryClient({ defaultOptions: { queries: { retry: false } } }) }, children) });

    await waitFor(() => expect(result.current.enrollmentEvents).toEqual(mockEnrollmentEvents), { timeout: 3000 });
    expect(result.current.news).toEqual([]);
    expect(blogService.getEnrollmentEvents).toHaveBeenCalledTimes(1);
  });

  test("should handle errors gracefully", async () => {
    const errorMessage = "Network error";
    blogService.getEnrollmentEvents.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useBlogData(["enrollmentEvents"]), { wrapper: ({ children }) => React.createElement(QueryClientProvider, { client: new QueryClient({ defaultOptions: { queries: { retry: false } } }) }, children) });

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error), { timeout: 3000 });
    expect(result.current.enrollmentEvents).toEqual([]);
  });
});

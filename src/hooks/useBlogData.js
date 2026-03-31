import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEnrollmentEvents, getNews } from "../services/blogService";
import logger from "../utils/logger";

/**
 * 清除所有緩存 - 給測試或外部特定情境使用
 */
export const clearBlogCache = (queryClient) => {
  if (queryClient) {
    queryClient.removeQueries({ queryKey: ["blog"] });
  }
};

/**
 * 使用 React Query 最佳化的 hook，提供自動快取管理、重新嘗試與背景更新
 */
export const useBlogData = (dataTypes = []) => {
  const queryClient = useQueryClient();

  const enrollmentQuery = useQuery({
    queryKey: ["blog", "enrollmentEvents"],
    queryFn: async () => {
      logger.info(`[useBlogData] 開始載入: enrollmentEvents using React Query`);
      const result = await getEnrollmentEvents(null, 100);
      return result.data || [];
    },
    enabled: dataTypes.includes("enrollmentEvents"),
    staleTime: 5 * 60 * 1000, // 5分鐘內不重新請求
  });

  const newsQuery = useQuery({
    queryKey: ["blog", "news"],
    queryFn: async () => {
      logger.info(`[useBlogData] 開始載入: news using React Query`);
      const result = await getNews(null, 100);
      return result.data || [];
    },
    enabled: dataTypes.includes("news"),
    staleTime: 5 * 60 * 1000,
  });

  const loading =
    (dataTypes.includes("enrollmentEvents") && enrollmentQuery.isLoading) ||
    (dataTypes.includes("news") && newsQuery.isLoading);

  const error = enrollmentQuery.error || newsQuery.error;

  const refetch = useCallback(
    (types = dataTypes) => {
      if (types.includes("enrollmentEvents")) enrollmentQuery.refetch();
      if (types.includes("news")) newsQuery.refetch();
    },
    [dataTypes, enrollmentQuery, newsQuery],
  );

  const loadEnrollmentEvents = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["blog", "enrollmentEvents"],
      queryFn: async () => {
        const result = await getEnrollmentEvents(null, 100);
        return result.data || [];
      },
    });
  }, [queryClient]);

  const loadNews = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: ["blog", "news"],
      queryFn: async () => {
        const result = await getNews(null, 100);
        return result.data || [];
      },
    });
  }, [queryClient]);

  const loadAll = useCallback(() => {
    loadEnrollmentEvents();
    loadNews();
  }, [loadEnrollmentEvents, loadNews]);

  const getCachedDataByType = useCallback(
    (type) => {
      return queryClient.getQueryData(["blog", type]);
    },
    [queryClient],
  );

  return {
    enrollmentEvents: enrollmentQuery.data || [],
    news: newsQuery.data || [],
    loading,
    error,
    refetch,
    loadEnrollmentEvents,
    loadNews,
    loadAll,
    getCachedData: getCachedDataByType,
  };
};

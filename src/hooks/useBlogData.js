import { useState, useEffect, useCallback, useRef } from "react";
import { getEnrollmentEvents, getNews } from "../services/blogService";
import logger from "../utils/logger";

/**
 * 全域緩存管理
 */
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5分鐘

/**
 * 檢查緩存是否有效
 */
const isCacheValid = (cacheEntry) => {
  if (!cacheEntry) return false;
  return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

/**
 * 獲取緩存的資料
 */
const getCachedData = (key) => {
  const cacheEntry = cache.get(key);
  return isCacheValid(cacheEntry) ? cacheEntry.data : null;
};

/**
 * 設定緩存資料
 */
const setCacheData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

/**
 * 清除所有緩存
 */
export const clearBlogCache = () => {
  cache.clear();
};

/**
 * 按需載入部落格資料的 Hook
 */
export const useBlogData = (dataTypes = []) => {
  const [state, setState] = useState({
    enrollmentEvents: [],
    news: [],
    loading: false,
    error: null,
  });

  // 使用 ref 追蹤載入狀態，避免依賴循環
  const loadingRef = useRef(new Set());
  const mountedRef = useRef(true);

  // 載入指定類型的資料
  const fetchDataType = useCallback(async (type) => {
    // 檢查緩存
    const cachedData = getCachedData(type);
    if (cachedData) {
      logger.debug(`[useBlogData] 使用緩存資料: ${type}`);
      return cachedData;
    }

    // 檢查是否已在載入中
    if (loadingRef.current.has(type)) {
      // 等待載入完成
      while (loadingRef.current.has(type)) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      return getCachedData(type) || [];
    }

    // 開始載入
    loadingRef.current.add(type);

    try {
      logger.info(`[useBlogData] 開始載入: ${type}`);

      let result;
      let data; // 宣告 data 變數
      switch (type) {
        case "enrollmentEvents":
          result = await getEnrollmentEvents(null, 100); // 為了相容舊版，先抓取較多資料，後續可再優化為真正的無限捲動
          data = result.data;
          break;
        case "news":
          result = await getNews(null, 100);
          data = result.data;
          break;
        default:
          throw new Error(`Unknown data type: ${type}`);
      }

      // 設定緩存
      setCacheData(type, data);

      logger.debug(`[useBlogData] 載入完成: ${type}`, data.length, "項目");
      return data;
    } catch (error) {
      logger.error(`[useBlogData] 載入失敗: ${type}`, error);
      throw error;
    } finally {
      loadingRef.current.delete(type);
    }
  }, []);

  // 載入所有需要的資料類型
  const loadData = useCallback(
    async (types) => {
      if (!types || types.length === 0 || !mountedRef.current) return;

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // 並行載入所有資料類型
        const results = await Promise.allSettled(
          types.map((type) => fetchDataType(type)),
        );

        if (!mountedRef.current) return;

        // 處理結果
        const newState = {
          enrollmentEvents: [],
          news: [],
          loading: false,
          error: null,
        };

        results.forEach((result, index) => {
          const type = types[index];

          if (result.status === "fulfilled") {
            newState[type] = result.value || [];
          } else {
            newState.error = result.reason;
          }
        });

        setState(newState);
      } catch (error) {
        if (mountedRef.current) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error,
          }));
        }
      }
    },
    [fetchDataType],
  );

  // 初始載入效果 - 使用 useRef 避免依賴循環
  const previousTypesKey = useRef("");

  useEffect(() => {
    const typesKey = dataTypes.sort().join(",");

    if (typesKey !== previousTypesKey.current) {
      previousTypesKey.current = typesKey;

      if (typesKey) {
        loadData(dataTypes);
      }
    }
  }); // 不使用依賴陣列，每次 render 都檢查但只在需要時執行

  // 組件卸載時清理
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 手動重新載入資料
  const refetch = useCallback(
    (types = dataTypes) => {
      // 清除緩存
      types.forEach((type) => cache.delete(type));
      loadData(types);
    },
    [dataTypes, loadData],
  );

  // 便利方法
  const loadEnrollmentEvents = useCallback(() => {
    loadData(["enrollmentEvents"]);
  }, [loadData]);

  const loadNews = useCallback(() => {
    loadData(["news"]);
  }, [loadData]);

  const loadAll = useCallback(() => {
    loadData(["enrollmentEvents", "news"]);
  }, [loadData]);

  const getCachedDataByType = useCallback((type) => {
    return getCachedData(type);
  }, []);

  return {
    ...state,
    refetch,
    loadEnrollmentEvents,
    loadNews,
    loadAll,
    getCachedData: getCachedDataByType,
  };
};

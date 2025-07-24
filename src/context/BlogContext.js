import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { getEnrollmentEvents, getNews } from "../services/blogService";

// 建立 BlogContext，用於全域分享部落格資料與操作方法
export const BlogContext = createContext();

// BlogProvider 包裹元件，提供招生活動、最新消息資料及操作函式
export const BlogProvider = ({ children }) => {
  // 儲存招生活動、最新消息、載入狀態與錯誤訊息
  const [enrollmentEvents, setEnrollmentEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 使用 useEffect 在元件掛載時從 API 獲取資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 同時獲取招生活動與最新消息
        const [enrollmentData, newsData] = await Promise.all([
          getEnrollmentEvents(),
          getNews(),
        ]);
        setEnrollmentEvents(enrollmentData);
        setNews(newsData);
        setError(null); // 成功後清除錯誤
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch blog data:", err);
      } finally {
        setLoading(false); // 完成後設定為非載入狀態
      }
    };

    fetchData();
  }, []); // 空依賴陣列確保只在掛載時執行一次

  // 使用 useMemo 將招生活動與最新消息合併，避免不必要的重新計算
  const all = useMemo(
    () => [...enrollmentEvents, ...news],
    [enrollmentEvents, news]
  );

  // 根據關鍵字搜尋文章，回傳符合標題或內容包含關鍵字的清單
  const searchByKeyword = useCallback(
    (keyword) => {
      const kw = (keyword || "").trim().toLowerCase();
      if (!kw) return [];
      return all.filter(
        (item) =>
          item.title.toLowerCase().includes(kw) ||
          (item.content && item.content.toLowerCase().includes(kw))
      );
    },
    [all]
  );

  // 根據分類參數過濾文章，支援 "enrollment"、"news" 或回傳全部
  const filterByCategory = useCallback(
    (category) => {
      if (category === "enrollment") return enrollmentEvents;
      if (category === "news") return news;
      return all;
    },
    [enrollmentEvents, news, all]
  );

  // 使用 useMemo 穩定 context value，只在相關數據改變時重新計算
  const contextValue = useMemo(
    () => ({
      enrollmentEvents,
      news,
      all,
      loading, // 新增 loading 狀態
      error, // 新增 error 狀態
      searchByKeyword,
      filterByCategory,
    }),
    [
      enrollmentEvents,
      news,
      all,
      loading,
      error,
      searchByKeyword,
      filterByCategory,
    ]
  );

  // 提供全域資料與操作函式給子元件
  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

import React, { createContext, useState, useMemo } from "react";
import {
  enrollmentEvents as initialEnrollment,
  news as initialNews,
} from "../data/blog";

// 建立 BlogContext，用於全域分享部落格資料與操作方法
export const BlogContext = createContext();

// BlogProvider 包裹元件，提供招生活動、最新消息資料及操作函式
export const BlogProvider = ({ children }) => {
  // 儲存招生活動資料，初始值來自 data/blog.js
  const [enrollmentEvents] = useState(initialEnrollment);
  // 儲存最新消息資料，初始值來自 data/blog.js
  const [news] = useState(initialNews);

  // 使用 useMemo 將招生活動與最新消息合併，避免不必要的重新計算
  const all = useMemo(
    () => [...enrollmentEvents, ...news],
    [enrollmentEvents, news]
  );

  // 根據關鍵字搜尋文章，回傳符合標題或內容包含關鍵字的清單
  const searchByKeyword = (keyword) => {
    const kw = (keyword || "").trim().toLowerCase();
    if (!kw) return [];
    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(kw) ||
        (item.content && item.content.toLowerCase().includes(kw))
    );
  };

  // 根據分類參數過濾文章，支援 "enrollment"、"news" 或回傳全部
  const filterByCategory = (category) => {
    if (category === "enrollment") return enrollmentEvents;
    if (category === "news") return news;
    return all;
  };

  // 提供全域資料與操作函式給子元件
  return (
    <BlogContext.Provider
      value={{ enrollmentEvents, news, all, searchByKeyword, filterByCategory }}
    >
      {children}
    </BlogContext.Provider>
  );
};

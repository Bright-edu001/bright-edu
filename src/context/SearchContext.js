import React, { createContext, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// 建立搜尋上下文，管理全站關鍵字與分類導向功能
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // 關鍵字狀態
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // 處理關鍵字搜尋表單提交，導向搜尋結果頁面並清空輸入
  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const kw = keyword.trim();
      if (kw) {
        navigate(`/blog/search/${encodeURIComponent(kw)}`);
        setKeyword("");
      }
    },
    [keyword, navigate]
  );

  // 處理分類點擊，導向對應分類列表
  const handleCategoryClick = useCallback(
    (category) => {
      if (category === "enrollment") {
        navigate("/blog?category=enrollment");
      } else if (category === "news") {
        navigate("/blog?category=news");
      }
    },
    [navigate]
  );

  const contextValue = useMemo(
    () => ({ keyword, setKeyword, handleSearch, handleCategoryClick }),
    [keyword, setKeyword, handleSearch, handleCategoryClick]
  );
  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

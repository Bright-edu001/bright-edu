import React, { useContext, useCallback } from "react";
import "./SearchBar.scss";
import { SearchContext } from "../../context/SearchContext";
import PropTypes from "prop-types";

// 全站搜尋輸入元件，使用 SearchContext 管理狀態與行為
function SearchBar({ placeholder = "搜尋..." }) {
  const { keyword, setKeyword, handleSearch, handleCategoryClick } =
    useContext(SearchContext);
  const onChange = useCallback((e) => setKeyword(e.target.value), [setKeyword]);
  // 使用 Context 中的 handleSearch，可以假設已為 useCallback
  return (
    <>
      <form className="blog-detail-searchbar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder={placeholder}
          value={keyword}
          onChange={onChange}
        />
        <button type="submit" aria-label="搜尋">
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
            <line
              x1="14.2"
              y1="14.2"
              x2="18"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </form>
      <div className="blog-detail-categories">
        <h3>分類</h3>
        <ul>
          <li>
            <button
              className="blog-detail-category-btn"
              onClick={() => handleCategoryClick("enrollment")}
            >
              招生活動
            </button>
          </li>
          <li>
            <button
              className="blog-detail-category-btn"
              onClick={() => handleCategoryClick("news")}
            >
              最新消息
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

// PropTypes 驗證及預設值
SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

export default React.memo(SearchBar);

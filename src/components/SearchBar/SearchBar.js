import React, { useContext } from "react";
import "./SearchBar.scss";
import { SearchContext } from "../../context/SearchContext";

// 全站搜尋輸入元件，使用 SearchContext 管理狀態與行為
function SearchBar({ placeholder }) {
  const { keyword, setKeyword, handleSearch } = useContext(SearchContext);
  return (
    <form className="blog-detail-searchbar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
  );
}

export default SearchBar;

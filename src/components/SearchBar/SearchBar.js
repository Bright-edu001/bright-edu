import React from "react";
import "./SearchBar.scss";

function SearchBar({ placeholder, value, onChange, onSubmit }) {
  return (
    <form className="blog-detail-searchbar" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
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
  );
}

export default SearchBar;

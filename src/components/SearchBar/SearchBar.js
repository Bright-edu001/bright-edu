import React, { useContext, useCallback } from "react";
import {
  StyledSearchForm,
  StyledSearchInput,
  StyledSearchButton,
} from "./SearchBarStyles";
import { SearchContext } from "../../context/SearchContext";
import PropTypes from "prop-types";

// 全站搜尋輸入元件，使用 SearchContext 管理狀態與行為
function SearchBar({ placeholder }) {
  const { keyword, setKeyword, handleSearch } = useContext(SearchContext);
  const onChange = useCallback((e) => setKeyword(e.target.value), [setKeyword]);
  // 使用 Context 中的 handleSearch，可以假設已為 useCallback
  return (
    <StyledSearchForm onSubmit={handleSearch}>
      <StyledSearchInput
        placeholder={placeholder}
        value={keyword}
        onChange={onChange}
      />
      <StyledSearchButton type="submit" aria-label="搜尋">
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
      </StyledSearchButton>
    </StyledSearchForm>
  );
}

// PropTypes 驗證及預設值
SearchBar.propTypes = {
  placeholder: PropTypes.string,
};
SearchBar.defaultProps = {
  placeholder: "搜尋...",
};
export default React.memo(SearchBar);

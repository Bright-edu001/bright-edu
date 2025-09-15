import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import MbaAreasHero from "../../components/MbaAreasHero/MbaAreasHero";
import SearchBar from "../../components/SearchBar/SearchBar";

import "./BlogDetail.scss";
import "./BlogSearch.scss"; // 新增：引入樣式
import "../../pages/Home/Blog.scss";

// 直接複製 Blog.js 的 BlogSection 結構
function BlogSection({ items }) {
  return (
    <section className="blog-section">
      <div className="blog-grid">
        {items.map((item) => (
          <Link to={`/blog/${item.id}`} className="blog-card" key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="blog-card-img"
              width="473"
              height="253"
            />
            <div className="blog-card-content">
              <h3 className="blog-card-title">{item.title}</h3>
              <p className="blog-card-excerpt">{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BlogSearch() {
  const { keyword } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const { searchByKeyword, loading, error } = useContext(BlogContext);

  useEffect(() => {
    if (!loading && !error) {
      setSearchResults(searchByKeyword(keyword));
    }
  }, [keyword, searchByKeyword, loading, error]);

  if (loading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>讀取資料時發生錯誤: {error}</div>;
  }

  return (
    <div>
      <MbaAreasHero />
      <div className="blog-detail-mainrow">
        <div className="blog-detail-main">
          <h1 className="blog-detail-title">搜尋關鍵字: {keyword}</h1>
          {searchResults.length > 0 ? (
            <BlogSection items={searchResults} />
          ) : (
            <div>查無相關文章</div>
          )}
          <Link to="/blog" className="blog-detail-back">
            ← 返回部落格
          </Link>
        </div>
        <aside className="blog-detail-sidebar">
          <SearchBar placeholder="搜尋..." />
        </aside>
      </div>
    </div>
  );
}

export default BlogSearch;

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import { useBlogData } from "../../hooks/useBlogData";
import MbaAreasHero from "../../components/MbaAreasHero/MbaAreasHero";
import SearchBar from "../../components/SearchBar/SearchBar";
import AppSkeleton from "../../components/AppSkeleton/AppSkeleton";
import ProgressiveImage from "../../components/ProgressiveImage/ProgressiveImage";

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
            <ProgressiveImage
              src={item.image || item.thumbnail}
              placeholderSrc={item.thumbnail}
              alt={item.title}
              className="blog-card-img"
              style={{ width: "100%", height: "253px", objectFit: "cover" }}
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
  const {
    enrollmentEvents = [],
    news = [],
    loading,
    error,
  } = useBlogData(["enrollmentEvents", "news"]);
  const { searchByKeyword } = useContext(BlogContext);

  useEffect(() => {
    if (!loading && !error) {
      // 合併所有資料進行搜尋
      const allData = [...enrollmentEvents, ...news];
      const results = searchByKeyword(allData, keyword);
      setSearchResults(results);
    }
  }, [keyword, searchByKeyword, loading, error, enrollmentEvents, news]);

  if (loading) {
    return (
      <div>
        <MbaAreasHero />
        <div className="blog-detail-mainrow">
          <div className="blog-detail-main">
            <AppSkeleton />
          </div>
        </div>
      </div>
    );
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

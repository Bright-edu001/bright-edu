import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import ImageTextSection from "../../components/ImageTextSection/ImageTextSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import { SearchContext } from "../../context/SearchContext";

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
            <img src={item.image} alt={item.title} className="blog-card-img" />
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
  const { searchByKeyword } = useContext(BlogContext);
  const { handleCategoryClick } = useContext(SearchContext);

  useEffect(() => {
    setSearchResults(searchByKeyword(keyword));
  }, [keyword, searchByKeyword]);

  return (
    <div>
      <ImageTextSection
        title=" 活動與文章"
        subtitle={`搜索關鍵字:${keyword}`}
        imageUrl="https://imgur.com/JQLEfaj.png"
        imageAlt="搜尋結果"
      />
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
        </aside>
      </div>
    </div>
  );
}

export default BlogSearch;

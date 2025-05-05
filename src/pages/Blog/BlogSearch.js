import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { enrollmentEvents, news } from "../../data/blog";
import "./BlogDetail.scss";
import "./BlogSearch.scss"; // 新增：引入樣式
import "../../pages/Home/Blog.scss";
import ImageTextSection from "../../components/ImageTextSection/ImageTextSection";

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
  const [inputKeyword, setInputKeyword] = useState(keyword || "");
  const navigate = useNavigate();

  useEffect(() => {
    const kw = (keyword || "").trim().toLowerCase();
    const all = [...enrollmentEvents, ...news];
    if (kw) {
      setSearchResults(
        all.filter(
          (item) =>
            item.title.toLowerCase().includes(kw) ||
            (item.content && item.content.toLowerCase().includes(kw))
        )
      );
    } else {
      setSearchResults([]);
    }
  }, [keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputKeyword.trim()) {
      navigate(`/blog/search/${encodeURIComponent(inputKeyword.trim())}`);
      setInputKeyword(""); // 新增：搜尋後清空輸入欄
    }
  };

  const handleCategoryClick = (category) => {
    if (category === "enrollment") {
      navigate("/blog?category=enrollment");
    } else if (category === "news") {
      navigate("/blog?category=news");
    }
  };

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
          <form className="blog-detail-searchbar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="搜尋..."
              value={inputKeyword}
              onChange={(e) => setInputKeyword(e.target.value)}
            />
            <button type="submit" aria-label="搜尋">
              <svg viewBox="0 0 20 20" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
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
        </aside>
      </div>
    </div>
  );
}

export default BlogSearch;

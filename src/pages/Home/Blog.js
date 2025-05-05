import React, { useState } from "react";
import "./Blog.scss";
import ImageTextSection from "../../components/ImageTextSection/ImageTextSection";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { enrollmentEvents, news } from "../../data/blog";

function BlogSection({ title, items }) {
  return (
    <section className="blog-section">
      <h2 className="blog-section-title">{title}</h2>
      <div className="blog-grid">
        {items.map((item) => (
          <Link to={item.link} className="blog-card" key={item.id}>
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

function Blog() {
  // 取得網址 query string
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  // 側邊欄搜尋功能
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/blog/search/${encodeURIComponent(keyword.trim())}`);
      setKeyword("");
    }
  };
  const handleCategoryClick = (category) => {
    if (category === "enrollment") {
      navigate("/blog?category=enrollment");
    } else if (category === "news") {
      navigate("/blog?category=news");
    }
  };

  // 根據 category 過濾顯示
  let sections = [];
  if (category === "enrollment") {
    sections = [{ title: "招生活動", items: enrollmentEvents }];
  } else if (category === "news") {
    sections = [{ title: "最新消息", items: news }];
  } else {
    sections = [
      { title: "招生活動", items: enrollmentEvents },
      { title: "最新消息", items: news },
    ];
  }

  return (
    <div className="blog-page">
      <ImageTextSection
        title="活動與文章"
        imageUrl="https://imgur.com/JQLEfaj.png"
        imageAlt="活動與文章"
      />

      <div className="blog-detail-mainrow">
        <div className="blog-detail-main">
          <div className="blog-content">
            {sections.map((section) => (
              <BlogSection
                key={section.title}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </div>
        <aside className="blog-detail-sidebar">
          {/* 關鍵字搜尋欄 */}
          <form className="blog-detail-searchbar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="搜尋..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" aria-label="搜尋">
              {/* 放大鏡 SVG */}
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

export default Blog;

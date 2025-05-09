import React, { useContext } from "react";
import "./Blog.scss";
import ImageTextSection from "../../components/ImageTextSection/ImageTextSection";
import { useLocation, useNavigate } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import { SearchContext } from "../../context/SearchContext";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import SearchBar from "../../components/SearchBar/SearchBar";

function BlogSection({ title, items, imageType }) {
  return (
    <section className="blog-section">
      <h2 className="blog-section-title">{title}</h2>
      <div className="blog-grid">
        {items.map((item) => (
          <ArticleCard key={item.id} item={item} imageType={imageType} />
        ))}
      </div>
    </section>
  );
}

function Blog() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const { enrollmentEvents, news } = useContext(BlogContext);
  const { handleCategoryClick } = useContext(SearchContext);
  const navigate = useNavigate();

  // 根據 category 過濾顯示
  let sections = [];
  let subtitle = "";
  if (category === "enrollment") {
    sections = [
      { title: "招生活動", items: enrollmentEvents, imageType: "enrollment" },
    ];
    subtitle = "招生活動";
  } else if (category === "news") {
    sections = [{ title: "最新消息", items: news, imageType: "news" }];
    subtitle = "最新消息";
  } else {
    sections = [
      { title: "招生活動", items: enrollmentEvents, imageType: "enrollment" },
      { title: "最新消息", items: news, imageType: "news" },
    ];
    subtitle = "";
  }

  return (
    <div className="blog-page">
      <ImageTextSection
        title="活動與文章"
        imageUrl="https://imgur.com/JQLEfaj.png"
        imageAlt="活動與文章"
        subtitle={subtitle ? `目前分類：${subtitle}` : undefined}
      />

      <div className="blog-detail-mainrow">
        <div className="blog-detail-main">
          <div className="blog-content">
            {sections.map((section) => (
              <BlogSection
                key={section.title}
                title={section.title}
                items={section.items}
                imageType={section.imageType}
              />
            ))}
          </div>
          {/* 新增：分類頁面時顯示返回按鈕 */}
          {(category === "enrollment" || category === "news") && (
            <button className="blog-back-btn" onClick={() => navigate("/blog")}>
              ← 返回活動與文章
            </button>
          )}
        </div>
        <aside className="blog-detail-sidebar">
          {/* 關鍵字搜尋欄 */}
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

export default Blog;

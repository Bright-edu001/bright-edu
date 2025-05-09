import React, { useState } from "react";
import "./BlogDetail.scss";
import { useParams, Link, useNavigate } from "react-router-dom";
import { enrollmentEvents, news } from "../../data/blog";
import ImageTextSection from "../../components/ImageTextSection/ImageTextSection";
import SearchBar from "../../components/SearchBar/SearchBar";

function findBlogById(id) {
  const all = [...enrollmentEvents, ...news];
  return all.find((item) => String(item.id) === String(id));
}

function BlogDetail() {
  const { id } = useParams();
  const blog = findBlogById(id);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  // 新增：判斷分類
  let subtitle = "";
  if (blog) {
    if (enrollmentEvents.some((item) => String(item.id) === String(blog.id))) {
      subtitle = "招生活動";
    } else if (news.some((item) => String(item.id) === String(blog.id))) {
      subtitle = "最新消息";
    }
  }

  // 分類點擊導向
  const handleCategoryClick = (category) => {
    if (category === "enrollment") {
      navigate("/blog?category=enrollment");
    } else if (category === "news") {
      navigate("/blog?category=news");
    }
  };
  // 計算分類參數用於Link
  const categoryParam = subtitle === "招生活動" ? "enrollment" : "news";

  // 搜尋功能：導向搜尋結果頁面
  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/blog/search/${encodeURIComponent(keyword.trim())}`);
      setKeyword(""); // 新增：搜尋後清空輸入欄
    }
  };

  if (!blog) {
    return (
      <div className="blog-detail-notfound">
        <h2>找不到文章</h2>
        <Link to="/blog">回部落格列表</Link>
      </div>
    );
  }

  return (
    <div>
      <ImageTextSection
        title="活動與文章"
        imageUrl="https://imgur.com/JQLEfaj.png"
        imageAlt="活動與文章"
        subtitle={subtitle ? `目前分類：${subtitle}` : undefined}
      />
      <div className="blog-detail-mainrow">
        <div className="blog-detail-main">
          <img
            className="blog-detail-image"
            src={blog.image}
            alt={blog.title}
          />
          <h1 className="blog-detail-title">{blog.title}</h1>
          {/* 分類標籤：改用Link以提供href */}
          <Link
            className="blog-detail-category-label"
            to={`/blog?category=${categoryParam}`}
            title={`查看${subtitle}分類`}
          >
            {subtitle}
          </Link>
          <p className="blog-detail-excerpt">{blog.excerpt}</p>
          <div className="blog-detail-content">
            {blog.content
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
          </div>
          <Link to="/blog" className="blog-detail-back">
            ← 返回部落格
          </Link>
          {/* 這裡可根據需求擴充更多內容 */}
        </div>
        <aside className="blog-detail-sidebar">
          {/* 關鍵字搜尋欄 */}
          <SearchBar
            placeholder="搜尋..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onSubmit={handleSearch}
          />
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

export default BlogDetail;

import React, { useContext } from "react";
import "./BlogDetail.scss";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import ImageTextSection from "../../components/ImageTextSection/ImageTextSection";
import SearchBar from "../../components/SearchBar/SearchBar";

function BlogDetail() {
  const { id } = useParams();
  const { enrollmentEvents, news, all } = useContext(BlogContext);
  const blog = all.find((item) => String(item.id) === String(id));

  // 新增：判斷分類
  let subtitle = "";
  if (blog) {
    if (enrollmentEvents.some((item) => String(item.id) === String(blog.id))) {
      subtitle = "招生活動";
    } else if (news.some((item) => String(item.id) === String(blog.id))) {
      subtitle = "最新消息";
    }
  }

  // 計算分類參數用於Link
  const categoryParam = subtitle === "招生活動" ? "enrollment" : "news";

  // 搜尋與分類按鈕導向由 SearchContext handleSearch, handleCategoryClick 管理

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
          <SearchBar placeholder="搜尋..." />
        </aside>
      </div>
    </div>
  );
}

export default BlogDetail;

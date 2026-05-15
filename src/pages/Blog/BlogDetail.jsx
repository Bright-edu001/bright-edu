import React from "react";
import "./BlogDetail.scss";
import { useParams, Link } from "react-router-dom";
import { useBlogData } from "../../hooks/useBlogData";
import MbaAreasHero from "../../components/MbaAreasHero/MbaAreasHero";
import SearchBar from "../../components/SearchBar/SearchBar";
import BlogContentRenderer from "./BlogContentRenderer";
// import "../../styles/critical.css";

function BlogDetail() {
  const { slug } = useParams();
  const {
    enrollmentEvents = [],
    news = [],
    loading,
    error,
  } = useBlogData(["enrollmentEvents", "news"]);

  // 合併所有資料
  const all = [...enrollmentEvents, ...news];
  // 優先比對 slug，再 fallback 比對舊版數字 id（向後相容）
  const blog =
    all.find((item) => item.slug === slug) ||
    all.find((item) => String(item.id) === String(slug));

  // 新增：處理載入與錯誤狀態
  if (loading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>讀取文章時發生錯誤: {error}</div>;
  }

  // 新增：判斷分類
  let subtitle = "";
  if (blog) {
    if (enrollmentEvents.some((item) => item.id === blog.id)) {
      subtitle = "招生活動";
    } else if (news.some((item) => item.id === blog.id)) {
      subtitle = "最新消息";
    }
  }

  // 計算分類參數用於Link
  const categoryParam = subtitle === "招生活動" ? "enrollment" : "news";

  // 搜尋與分類按鈕導向由 SearchContext handleSearch, handleCategoryClick 管理

  if (!blog) {
    return <div>找不到文章</div>;
  }

  return (
    <div className="blog-detail-page">
      <MbaAreasHero />
      <div className="blog-detail-mainrow">
        <div className="blog-detail-main">
          <img
            className="blog-detail-image"
            src={blog.image}
            alt={blog.title}
            width={blog.imageWidth ?? 1000}
            height={blog.imageHeight ?? 571}
            fetchPriority="high"
          />
          <h1 className="blog-detail-title emoji-support">{blog.title}</h1>
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
            <BlogContentRenderer blog={blog} />
          </div>
          <Link to="/blog" className="blog-back-btn blog-detail-back">
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

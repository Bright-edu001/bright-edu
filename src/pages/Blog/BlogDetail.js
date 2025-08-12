import React, { useContext } from "react";
import "./BlogDetail.scss";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import MbaAreasHero from "../../components/MbaAreasHero/MbaAreasHero";
import SearchBar from "../../components/SearchBar/SearchBar";
import "../../styles/critical.css";
import sanitizeHtml from "../../utils/sanitizeHtml";

const hashText = (text = "") => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
};

// 遞迴渲染詳細資訊的函式
const renderDetails = (details, isNested = false) => {
  return details.map((detail) => {
    const key = detail.id || hashText(detail.text || JSON.stringify(detail));
    return (
      <div key={key} className={`detail-item ${isNested ? "nested" : ""}`}>
        <p>
          {detail.icon && <span className="detail-icon">{detail.icon}</span>}
          {detail.text}
        </p>
        {detail.list && (
          <ul>
            {detail.list.map((item) => (
              <li key={hashText(item)}>{item}</li>
            ))}
          </ul>
        )}
        {detail.subDetails && renderDetails(detail.subDetails, true)}
      </div>
    );
  });
};

function BlogDetail() {
  const { id } = useParams();
  const { enrollmentEvents, news, all, loading, error } =
    useContext(BlogContext);
  const blog = all.find((item) => String(item.id) === String(id));

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
    return <div>找不到文章</div>;
  }

  return (
    <div>
      <MbaAreasHero />
      <div className="blog-detail-mainrow">
        <div className="blog-detail-main">
          <img
            className="blog-detail-image"
            src={blog.image}
            alt={blog.title}
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
            {typeof blog.content === "string"
              ? blog.content
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, idx) => <p key={idx}>{line}</p>)
              : blog.type === "enrollment"
              ? blog.content.map((semesterInfo, index) => (
                  <div key={index} className="semester-section">
                    <h2
                      className="emoji-support"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(semesterInfo.title),
                      }}
                    />
                    {renderDetails(semesterInfo.details)}
                  </div>
                ))
              : blog.type === "article" && typeof blog.content === "object"
              ? renderDetails(blog.content.details)
              : null}
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

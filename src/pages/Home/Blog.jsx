import React from "react";
import "./Blog.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlogData } from "../../hooks/useBlogData";
import SearchBar from "../../components/SearchBar/SearchBar";
import AppSkeleton from "../../components/AppSkeleton/AppSkeleton";
import BlogGridSection from "../Blog/BlogGridSection";

function Blog() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const {
    enrollmentEvents = [],
    news = [],
    loading,
  } = useBlogData(["enrollmentEvents", "news"]);
  const navigate = useNavigate();

  // 根據 category 過濾顯示
  let sections = [];

  if (category === "enrollment") {
    sections = [
      { title: "招生活動", items: enrollmentEvents, imageType: "enrollment" },
    ];
  } else if (category === "news") {
    sections = [{ title: "最新消息", items: news, imageType: "news" }];
  } else {
    sections = [
      { title: "招生活動", items: enrollmentEvents, imageType: "enrollment" },
      { title: "最新消息", items: news, imageType: "news" },
    ];
  }

  return (
    <div className="blog-page">
      <div className="blog-detail-mainrow">
        <div className="blog-detail-main">
          <div className="blog-content">
            {loading ? (
              <AppSkeleton />
            ) : (
              sections.map((section) => (
                <BlogGridSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  imageType={section.imageType}
                />
              ))
            )}
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
        </aside>
      </div>
    </div>
  );
}

export default Blog;

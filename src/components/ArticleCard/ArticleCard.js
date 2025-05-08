import React from "react";
import "./ArticleCard.scss";

function ArticleCard({ item, imageType }) {
  // imageType: "enrollment" | "news"，用於決定背景圖
  return (
    <div className="card-container">
      <a href={item.link} className="card-link" title={item.title}>
        {/* 若有 item.image 則顯示圖片，否則用背景卡片 */}
        {item.image ? (
          <img src={item.image} alt={item.title} className="article-card-img" />
        ) : (
          <div
            className={`course-card ${imageType ? imageType + "-bg" : ""}`}
          ></div>
        )}
        <div className="card-description">
          <p>{item.excerpt}</p>
        </div>
      </a>
    </div>
  );
}

export default ArticleCard;

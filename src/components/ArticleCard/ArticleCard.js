import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./ArticleCard.scss";

/**
 * 通用文章卡片元件
 * @param {object} props
 * @param {{ title: string, link: string, image?: string, excerpt: string }} props.item - 包含標題、連結、可選縮圖與摘要的資料物件
 * @param {string} props.imageType - 佔位背景類型 (如 'enrollment', 'news')
 * @param {'vertical'|'horizontal'} [props.layout='vertical'] - 卡片排版方向，預設為垂直(vertical)
 */
function ArticleCard({ item, imageType, layout = "vertical" }) {
  // 提取內外部連結判斷
  const isInternal = item.link?.startsWith("/");
  const Wrapper = isInternal ? Link : "a";
  // 構建 Wrapper 屬性：內部路由使用 to，外部連結使用 href 並加上安全屬性
  const wrapperProps = item.link
    ? isInternal
      ? { to: item.link }
      : { href: item.link, target: "_blank", rel: "noopener noreferrer" }
    : {};
  // 組合 BEM 類名並加上排版修飾符
  const cardClass = `article-card article-card--${layout}`;
  // 決定圖片樣式：有 image 則顯示 <img>，否則顯示對應背景的佔位容器
  const imgClass = item.image
    ? "article-card__img"
    : `article-card__placeholder article-card__placeholder--${
        imageType || "default"
      }`;
  return (
    <div className={cardClass} title={item.title}>
      <Wrapper className="article-card__link" {...wrapperProps}>
        {/* 渲染圖片或背景佔位 */}
        {item.image ? (
          <img src={item.image} alt={item.title} className={imgClass} />
        ) : (
          <div className={imgClass}></div>
        )}
        {/* 內容區塊：標題與摘要 */}
        <div className="article-card__content">
          <h3 className="article-card__title">{item.title}</h3>
          <p className="article-card__excerpt">{item.excerpt}</p>
        </div>
      </Wrapper>
    </div>
  );
}

export default memo(ArticleCard);

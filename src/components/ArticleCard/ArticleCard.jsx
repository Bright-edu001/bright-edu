import React, { memo } from "react";
import { Link } from "react-router-dom";
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";
import "./ArticleCard.scss";

/**
 * 通用文章卡片元件
 * @param {object} props
 * @param {{ title: string, link: string, image?: string, excerpt: string }} props.item - 包含標題、連結、可選縮圖與摘要的資料物件
 * @param {string} props.imageType - 佔位背景類型 (如 'enrollment', 'news')
 * @param {'vertical'|'horizontal'} [props.layout='vertical'] - 卡片排版方向，預設為垂直(vertical)
 */
function ArticleCard({ item, imageType, layout = "vertical" }) {
  // link 優先使用 item.link，若無則依序 fallback：slug → id
  const resolvedLink =
    item.link ||
    (item.slug ? `/blog/${item.slug}` : item.id ? `/blog/${item.id}` : null);

  // 提取內外部連結判斷
  const isInternal = resolvedLink?.startsWith("/");
  const Wrapper = isInternal ? Link : "a";

  // 構建 Wrapper 屬性：內部路由使用 to，外部連結使用 href 並加上安全屬性
  const wrapperProps = resolvedLink
    ? isInternal
      ? { to: resolvedLink }
      : { href: resolvedLink, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="article-card" title={item.title}>
      <Wrapper
        className={`article-card__link article-card__link--${layout}`}
        {...wrapperProps}
      >
        {/* 圖片區塊：優先使用 thumbnail，無則 fallback image */}
        {item.thumbnail || item.image ? (
          <ProgressiveImage
            src={item.image || item.thumbnail}
            placeholderSrc={item.thumbnail}
            alt={item.title}
            className={`article-card__image ${layout === "horizontal" ? "article-card__image--horizontal" : ""}`}
            width={item.imageWidth}
            height={item.imageHeight}
          />
        ) : (
          <div
            className={`article-card__placeholder article-card__placeholder--${layout} article-card__placeholder--${imageType || "default"}`}
          />
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

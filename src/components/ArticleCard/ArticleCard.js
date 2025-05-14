import React, { memo } from "react";
import {
  StyledArticleCard,
  StyledLink,
  StyledAnchor,
  StyledImage,
  StyledPlaceholder,
  StyledContent,
  StyledTitle,
  StyledExcerpt,
} from "./ArticleCardStyles";

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
  const Wrapper = isInternal ? StyledLink : StyledAnchor;
  // 構建 Wrapper 屬性：內部路由使用 to，外部連結使用 href 並加上安全屬性
  const wrapperProps = item.link
    ? isInternal
      ? { to: item.link }
      : { href: item.link, target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <StyledArticleCard title={item.title}>
      <Wrapper $layout={layout} $imageType={imageType} {...wrapperProps}>
        {/* 渲染圖片或背景佔位 */}
        {item.image ? (
          <StyledImage
            src={item.image}
            alt={item.title}
            $layout={layout}
            loading="lazy"
          />
        ) : (
          <StyledPlaceholder
            $layout={layout}
            $imageType={imageType || "default"}
          />
        )}
        {/* 內容區塊：標題與摘要 */}
        <StyledContent>
          <StyledTitle>{item.title}</StyledTitle>
          <StyledExcerpt>{item.excerpt}</StyledExcerpt>
        </StyledContent>
      </Wrapper>
    </StyledArticleCard>
  );
}

export default memo(ArticleCard);

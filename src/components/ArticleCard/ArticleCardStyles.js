import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// ArticleCard 外框
export const StyledArticleCard = styled.div`
  text-align: left;
`;

// 連結樣式：內外部共用
const sharedLinkStyles = css`
  text-decoration: none;
  display: flex;
  transition: transform 0.1s ease, opacity 0.1s ease;
  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

export const StyledLink = styled(Link)`
  ${sharedLinkStyles}
  flex-direction: ${({ $layout }) =>
    $layout === "vertical" ? "column" : "row"};
  align-items: ${({ $layout }) =>
    $layout === "vertical" ? "stretch" : "flex-start"};
`;

export const StyledAnchor = styled.a`
  ${sharedLinkStyles}
  flex-direction: ${({ $layout }) =>
    $layout === "vertical" ? "column" : "row"};
  align-items: ${({ $layout }) =>
    $layout === "vertical" ? "stretch" : "flex-start"};
`;

// 圖片樣式
export const StyledImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-size: contain;
  background-position: center;

  ${({ $layout }) =>
    $layout === "horizontal" &&
    css`
      width: 40%;
      height: auto;
      margin-right: 1rem;
    `}
`;

// Placeholder 背景
export const StyledPlaceholder = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 8px;
  background-size: contain;
  background-position: center;

  ${({ $layout }) =>
    $layout === "horizontal" &&
    css`
      width: 40%;
      height: auto;
      margin-right: 1rem;
    `}

  background: #e0e0e0;
  ${({ $imageType }) =>
    $imageType === "enrollment" &&
    css`
      background-image: url("https://imgur.com/6n3nCHp.png");
    `}
  ${({ $imageType }) =>
    $imageType === "news" &&
    css`
      background-image: url("https://imgur.com/1EoFLTI.png");
    `}
`;

// 內文區塊
export const StyledContent = styled.div`
  margin-top: 1rem;
  &:empty {
    display: none;
  }
`;

export const StyledTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1c184a;
  @media (max-width: 1024px) {
  text-align: left;
`;

export const StyledExcerpt = styled.p`
  font-size: 18px;
  color: #211700;
  @media (max-width: 1024px) {
    text-align: left;
  }
`;

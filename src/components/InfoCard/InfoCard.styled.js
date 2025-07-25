import styled, { css } from "styled-components";

// 變數
const colorNav = "#1c184a";
const spacingSm = "1rem";
const spacingMd = "1.5rem";
const spacingLg = "2rem";
const spacingXl = "3rem";
const fontSizeLg = "18px";

// mixins
const headingMedium = css`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 1rem;
`;
const labelStyle = css`
  font-size: ${fontSizeLg};
  font-weight: 400;
`;

// 調整卡片外框樣式，加上背景色、圓角和動畫
export const InfoCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${spacingXl} auto;
  overflow: hidden;
  background-color: #ffffff; /* 白色背景讓陰影明顯 */
  border-radius: 12px; /* 圓角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 初始陰影 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* hover 放大與加深陰影的效果 */
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  &.info-card-right {
    flex-direction: row;
  }
  &.info-card-left {
    flex-direction: row-reverse;
  }

  /* 行動裝置排版：取消放大效果，改為單欄排版 */
  @media (max-width: 700px) {
    flex-direction: column !important;
    align-items: center;
    transform: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .info-card-img {
      order: -1;
      width: 100%;
      max-width: 100%;
      margin-bottom: 12px;
    }
    .info-card-content {
      width: 100%;
      padding: 0;
      h4 {
        margin-top: ${spacingMd};
        color: ${colorNav};
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
`;

export const InfoCardContent = styled.div`
  padding: ${spacingSm} ${spacingLg};
  h4 {
    ${headingMedium}
    color: ${colorNav};
    text-align: left;
  }
  p {
    ${labelStyle}
    margin: 0 auto;
    text-align: left;
  }
`;

export const InfoCardImg = styled.img`
  width: 100%;
  max-width: 40%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 4/3;

  @media (max-width: 700px) {
    order: -1;
    width: 100%;
    max-width: 100%;
    margin-bottom: 12px;
  }
`;

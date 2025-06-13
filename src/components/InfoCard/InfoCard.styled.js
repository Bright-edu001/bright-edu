import styled, { css } from "styled-components";

// 變數
const colorNav = "#1c184a";
const spacingSm = "1rem";
const spacingMd = "1.5rem";
const fontSizeLg = "18px";

// mixins
const headingMedium = css`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 1.5rem;
`;
const labelStyle = css`
  font-size: ${fontSizeLg};
  font-weight: 400;
`;

export const InfoCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${spacingMd} auto;
  overflow: hidden;

  &.info-card-right {
    flex-direction: row;
  }
  &.info-card-left {
    flex-direction: row-reverse;
  }

  @media (max-width: 700px) {
    flex-direction: column !important;
    align-items: center;

    .info-card-img {
      order: -1;
      width: 100%;
      max-width: 100%;
      margin-bottom: 12px;
    }
    .info-card-left {
      margin-right: 0;
    }
    .info-card-content {
      width: 100%;
      padding: 0;
      h4 {
        margin-top: ${spacingMd};
        color: ${colorNav};
      }
    }
  }
`;

export const InfoCardContent = styled.div`
  padding: ${spacingSm};
  h4 {
    ${headingMedium}
    color: ${colorNav};
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

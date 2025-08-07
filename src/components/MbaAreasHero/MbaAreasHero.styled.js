import styled from "styled-components";

export const HeroWrapper = styled.div`
  height: 80px;
  background-color: ${({ $bgColor }) => $bgColor || "#c71432"};
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 確保樣式不被其他 CSS 覆蓋 */
  && {
    margin: 0 !important;
    padding: 0 !important;
  }
`;

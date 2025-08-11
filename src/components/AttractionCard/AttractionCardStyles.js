import styled from "styled-components";

// AttractionCard 外框
export const StyledAttractionCard = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  @media (max-width: 850px) {
    width: 100%;
  }
`;

// 圖片區塊
export const StyledAttractionImage = styled.div`
  width: 100%;
  height: 0;
  padding-top: 75%; /* 4:3 ratio */
  position: relative;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
  background: ${({ $src }) =>
    $src ? `url(${$src}) center/cover no-repeat` : "none"};
  /* 當沒圖片時不佔空間 (由父層控制不渲染) */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $src }) => ($src ? "rgba(0,0,0,0)" : "transparent")};
    transition: opacity 0.3s ease;
  }
`;

// 文字資訊容器
export const StyledAttractionInfo = styled.div`
  width: 100%;
`;

// 標題
export const StyledAttractionName = styled.div`
  font-weight: 700;
  color: #19453c;
  font-size: 24px;
  margin-bottom: 6px;
  text-align: left;
`;

// 說明文字
export const StyledAttractionDesc = styled.div`
  color: #000000;
  font-size: 18px;
  text-align: left;
`;

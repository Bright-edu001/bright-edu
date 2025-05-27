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
  height: 300px;
  background: #d3d3d3;
  border-radius: 12px;
  margin-bottom: 16px;
`;

// 文字資訊容器
export const StyledAttractionInfo = styled.div`
  width: 100%;
`;

// 標題
export const StyledAttractionName = styled.div`
  font-weight: 900;
  color: #19453c;
  font-size: 20px;
  margin-bottom: 6px;
  text-align: left;
`;

// 說明文字
export const StyledAttractionDesc = styled.div`
  color: #000000;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 700;
  text-align: left;
`;

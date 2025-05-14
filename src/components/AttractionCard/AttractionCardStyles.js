import styled from "styled-components";

// AttractionCard 外框
export const StyledAttractionCard = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 0;
`;

// 圖片區塊
export const StyledAttractionImage = styled.div`
  width: 100%;
  height: 200px;
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
  color: #7c5f31;
  font-size: 20px;
  margin-bottom: 6px;
  text-align: left;
`;

// 說明文字
export const StyledAttractionDesc = styled.div`
  color: #211700;
  font-size: 0.98rem;
  line-height: 1.6;
  font-weight: 700;
  text-align: left;
`;

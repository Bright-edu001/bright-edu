import styled from "styled-components";

// 搜尋表單容器
export const StyledSearchForm = styled.form`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  gap: 0.3rem;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0.5rem 0.5rem;
    box-shadow: none;
  }
`;

// 文字輸入欄
export const StyledSearchInput = styled.input.attrs({ type: "text" })`
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #f2f3f5;
  color: #333;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  height: 40px;
`;

// 提交按鈕
export const StyledSearchButton = styled.button`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.2rem;
  border: none;
  border-radius: 4px;
  background: #f5bf00;
  color: #211700;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 1.1rem;

  &:hover {
    background: #cccccc;
  }

  svg {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

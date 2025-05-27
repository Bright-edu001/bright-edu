import styled from "styled-components";

// 表單容器與共用樣式
export const StyledApplicationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: -2rem;

  input,
  textarea {
    width: 700px;
    max-width: 700px;
    min-width: 260px;
    align-self: center;
    border: 1px solid #c71432;
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 18px;
    font-weight: 700;
    outline: none;
    transition: border 0.2s;
    &:focus {
      border-color: #f5b82e;
    }
  }

  textarea {
    min-height: 150px;
  }

  button {
    background: #c71432;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    padding: 8px 24px;
    font-size: 1rem;
    font-weight: 400;
    margin: 0 auto;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 1.5rem;
    margin-bottom: 5rem;
    &:hover {
      background: #1c184a;
      color: #ffffff;
    }
  }

  @media (max-width: 700px) {
    input,
    textarea {
      width: 90%;
      max-width: 100%;
      min-width: unset;
      font-size: 1rem;
      padding: 10px 8px;
    }
    button {
      width: 90%;
      font-size: 1rem;
      padding: 10px 0;
      display: block;
    }
  }
`;

// 申請條件與標題
export const StyledSectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  margin-bottom: 5rem;
  color: #c71432;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 32px;
    margin-bottom: 2rem;
    padding: 0 8px;
  }
`;

// 條件描述文字
export const StyledConditionDesc = styled.div`
  color: #211700;
  font-size: 1rem;
  text-align: left;
  margin-bottom: 2rem;
  margin-left: 2rem;

  @media (max-width: 700px) {
    font-size: 0.95rem;
    margin-left: 0;
    padding: 0 8px;
    text-align: justify;
  }
`;

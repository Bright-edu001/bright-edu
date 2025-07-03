import styled from "styled-components";

// 表單容器與共用樣式
export const StyledApplicationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 5rem;
  @media (max-width: 850px) {
    padding: 0;
  }

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
    resize: none;
    &:focus {
      border-color: #1c184a;
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
    font-size: 18px;
    margin: 1.5rem auto 2rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #1c184a;
      color: #ffffff;
    }
  }

  @media (max-width: 700px) {
    input,
    textarea {
      width: 100%;
      max-width: 100%;
      min-width: unset;
      font-size: 18px;
      padding: 10px 8px;
    }
    button {
      width: 100%;
      font-size: 18px;
      display: block;
    }
  }
`;

// 申請條件與標題
export const StyledSectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 40px;
  margin-bottom: 1rem;
  color: #c71432;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 32px;
    margin-bottom: 0rem;
  }
`;

// 條件描述文字
export const StyledConditionDesc = styled.div`
  color: #211700;
  font-size: 18px;
  text-align: left;
  margin-bottom: 1rem;

  @media (max-width: 700px) {
    margin-left: 0;
    text-align: left;
  }
`;

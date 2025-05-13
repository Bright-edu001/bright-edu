import styled from "styled-components";

// 浮動按鈕容器
export const StyledFloatingButtons = styled.div`
  position: fixed;
  right: 3rem;
  bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 9999;

  @media screen and (max-width: 500px) {
    right: 1.5rem;
    bottom: 2rem;
  }
`;

// 個別按鈕
export const StyledFloatingBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  transition: box-shadow 0.2s, background 0.2s;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: contain;

    @media screen and (max-width: 500px) {
      width: 50px;
      height: 50px;
    }
  }
`;

import styled from "styled-components";

// Styled component for ActionButton
export const StyledActionButton = styled.a`
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #1c184a;
  max-width: 120px;
  max-height: 36px;

  &:hover {
    background: #ffffff;
    color: #1c184a;
    border: 1px solid #1c184a;
  }
`;

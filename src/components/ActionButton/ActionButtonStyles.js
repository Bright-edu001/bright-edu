import styled from "styled-components";

// Styled component for ActionButton
export const StyledActionButton = styled.a`
  color: #000000;
  border: none;
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f5bf00;
  max-width: 120px;
  max-height: 36px;

  &:hover {
    background: #ddd;
    color: #000000;
  }
`;

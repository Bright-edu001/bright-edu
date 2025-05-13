import styled from "styled-components";

// Gallery section container
export const StyledGallerySection = styled.section`
  padding: 2rem 0;
`;

// Title
export const StyledGalleryTitle = styled.h3`
  font-size: 32px;
  font-weight: 900;
  line-height: 39px;
  text-align: center;
  margin-bottom: 2rem;
  color: #211700;
`;

// Gallery section container wrapper (max-width, center, padding)
export const StyledGalleryContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  overflow-x: visible;
`;

// Grid container
export const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 300px) {
    grid-template-columns: 1fr;
  }
`;

// Individual gallery item
export const StyledGalleryItem = styled.div`
  margin-bottom: 0;

  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }
  }
`;

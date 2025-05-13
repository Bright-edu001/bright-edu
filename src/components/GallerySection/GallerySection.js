import React from "react";
import {
  StyledGallerySection,
  StyledGalleryTitle,
  StyledGalleryContainer,
  StyledContainer,
  StyledGalleryItem,
} from "./GallerySectionStyles";

function GallerySection({ images, ariaLabel = "圖片畫廊", title = null }) {
  return (
    <StyledGallerySection aria-label={ariaLabel}>
      <StyledGalleryContainer>
        <StyledContainer>
          {title && <StyledGalleryTitle>{title}</StyledGalleryTitle>}
          {images.map((image, index) => (
            <StyledGalleryItem key={index}>
              <img src={image.src} alt={image.alt} />
            </StyledGalleryItem>
          ))}
        </StyledContainer>
      </StyledGalleryContainer>
    </StyledGallerySection>
  );
}

export default GallerySection;

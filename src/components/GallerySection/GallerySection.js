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
              <img
                className="responsive-img"
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </StyledGalleryItem>
          ))}
        </StyledContainer>
      </StyledGalleryContainer>
    </StyledGallerySection>
  );
}

export default GallerySection;

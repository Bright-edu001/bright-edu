import React, { memo } from "react";
import {
  StyledGallerySection,
  StyledGalleryTitle,
  StyledGalleryContainer,
  StyledContainer,
  StyledGalleryItem,
} from "./GallerySectionStyles";
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";

function GallerySection({ images, ariaLabel = "圖片畫廊", title = null }) {
  return (
    <StyledGallerySection aria-label={ariaLabel}>
      <StyledGalleryContainer>
        <StyledContainer>
          {title && <StyledGalleryTitle>{title}</StyledGalleryTitle>}
          {images.map((image, index) => (
            <StyledGalleryItem key={image.src || index}>
              <ProgressiveImage
                className="responsive-img"
                src={image.src}
                placeholderSrc={image.thumbnail || image.src}
                alt={image.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </StyledGalleryItem>
          ))}
        </StyledContainer>
      </StyledGalleryContainer>
    </StyledGallerySection>
  );
}

export default memo(GallerySection);

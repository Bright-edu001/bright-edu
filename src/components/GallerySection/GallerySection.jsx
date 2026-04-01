import React, { memo } from "react";
import ProgressiveImage from "../ProgressiveImage/ProgressiveImage";
import "./GallerySection.scss";

function GallerySection({ images, ariaLabel = "圖片畫廊", title = null }) {
  return (
    <section className="gallery-section" aria-label={ariaLabel}>
      <div className="gallery-section__container">
        {title && <h3 className="gallery-section__title">{title}</h3>}
        <div className="gallery-section__grid">
          {images.map((image, index) => (
            <div className="gallery-section__item" key={image.src || index}>
              <ProgressiveImage
                className="responsive-img"
                src={image.src}
                placeholderSrc={image.thumbnail || image.src}
                alt={image.alt}
                // width/height/objectFit 已在 SCSS 中設定，但保留 props 確保相容性
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(GallerySection);

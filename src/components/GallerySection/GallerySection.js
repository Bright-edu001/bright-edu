import React from "react";
import "./GallerySection.scss";

function GallerySection({ images, ariaLabel = "圖片畫廊", title = null }) {
  return (
    <section className="gallery" aria-label={ariaLabel}>
      <div className="container">
        {title && <h3 className="gallery-title">{title}</h3>}
        {images.map((image, index) => (
          <div className="gallery-item" key={index}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;

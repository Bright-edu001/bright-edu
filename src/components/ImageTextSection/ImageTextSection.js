import React from "react";
import "./ImageTextSection.scss";

function ImageTextSection({
  title,
  subtitle,
  intro,
  imageUrl,
  imageAlt = "Section image",
  bgImageUrl, // 新增背景圖 prop
}) {
  return (
    <section className="image-text-section">
      {/* 背景圖與遮罩層，層級最低 */}
      {bgImageUrl && (
        <>
          <img
            className="section-bg-img"
            src={bgImageUrl}
            alt="背景圖"
            aria-hidden="true"
            loading="lazy"
          />
          <div className="section-bg-mask" />
        </>
      )}
      <div className="container">
        <div className="text-content">
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <p>{intro}</p>
        </div>
        <div className="image-content">
          <img
            className="responsive-img"
            src={imageUrl}
            alt={imageAlt}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default ImageTextSection;

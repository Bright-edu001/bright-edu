import React from "react";
import "./ImageTextSection.scss";

function ImageTextSection({
  title,
  subtitle,
  intro,
  imageUrl,
  imageAlt = "Section image",
}) {
  return (
    <section className="image-text-section">
      <div className="container">
        <div className="text-content">
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <p>{intro}</p>
        </div>
        <div className="image-content">
          <img src={imageUrl} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
}

export default ImageTextSection;

import React, { memo } from "react";
import "./AttractionCard.scss";

function AttractionCard({ name, desc, image }) {
  // 將背景圖片作為內聯樣式處理
  const imageStyle = image ? { backgroundImage: `url(${image})` } : {};

  return (
    <div className="attraction-card">
      {/* 僅在有提供圖片時才顯示圖片區塊 */}
      {image && (
        <div
          className="attraction-card__image"
          role="img"
          aria-label={name}
          style={imageStyle}
        />
      )}
      <div className="attraction-card__info">
        <div className="attraction-card__name">{name}</div>
        <div className="attraction-card__desc">
          {desc.map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < desc.length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(AttractionCard);

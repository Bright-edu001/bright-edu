import React, { memo } from "react";
import "./AttractionCard.scss";

function AttractionCard({ name, desc }) {
  return (
    <div className="attraction-card">
      <div className="attraction-image" />
      <div className="attraction-info">
        <div className="attraction-name">{name}</div>
        <div className="attraction-desc">
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

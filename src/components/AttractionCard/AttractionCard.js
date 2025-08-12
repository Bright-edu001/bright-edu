import React, { memo } from "react";
import {
  StyledAttractionCard,
  StyledAttractionImage,
  StyledAttractionInfo,
  StyledAttractionName,
  StyledAttractionDesc,
} from "./AttractionCardStyles";

function AttractionCard({ name, desc, image }) {
  return (
    <StyledAttractionCard>
      {/* 僅在有提供圖片時才顯示圖片區塊 */}
      {image && (
        <StyledAttractionImage $src={image} role="img" aria-label={name} />
      )}
      <StyledAttractionInfo>
        <StyledAttractionName>{name}</StyledAttractionName>
        <StyledAttractionDesc>
          {desc.map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < desc.length - 1 && <br />}
            </span>
          ))}
        </StyledAttractionDesc>
      </StyledAttractionInfo>
    </StyledAttractionCard>
  );
}

export default memo(AttractionCard);

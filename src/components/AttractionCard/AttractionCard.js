import React, { memo } from "react";
import {
  StyledAttractionCard,
  StyledAttractionImage,
  StyledAttractionInfo,
  StyledAttractionName,
  StyledAttractionDesc,
} from "./AttractionCardStyles";

function AttractionCard({ name, desc }) {
  return (
    <StyledAttractionCard>
      <StyledAttractionImage />
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

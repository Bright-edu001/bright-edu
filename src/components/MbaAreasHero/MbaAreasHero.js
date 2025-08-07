import React from "react";
import { HeroWrapper, HeroTitle } from "./MbaAreasHero.styled";

const MbaAreasHero = ({
  title = "UIC Business",
  className,
  bgColor,
  ...props
}) => {
  // 確保 title 是字串且不為空
  const displayTitle =
    typeof title === "string" && title.trim() ? title.trim() : "UIC Business";

  return (
    <HeroWrapper className={className} $bgColor={bgColor} {...props}>
      <HeroTitle>{displayTitle}</HeroTitle>
    </HeroWrapper>
  );
};

export default MbaAreasHero;

import React from "react";
import { HeroWrapper, HeroTitle } from "./MbaAreasHero.styled";

const MbaAreasHero = ({ title = "UIC Business", className, bgColor }) => {
  return (
    <HeroWrapper className={className} bgColor={bgColor}>
      <HeroTitle>{title}</HeroTitle>
    </HeroWrapper>
  );
};

export default MbaAreasHero;

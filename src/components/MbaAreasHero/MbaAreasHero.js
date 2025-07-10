import React from "react";
import { HeroWrapper, HeroTitle } from "./MbaAreasHero.styled";

const MbaAreasHero = ({ title = "UIC Business", className }) => {
  return (
    <HeroWrapper className={className}>
      <HeroTitle>{title}</HeroTitle>
    </HeroWrapper>
  );
};

export default MbaAreasHero;

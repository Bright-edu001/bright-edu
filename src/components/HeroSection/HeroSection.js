import React from "react";
import "./HeroSection.scss";

function HeroSection({ title, subtitle, ariaLabel }) {
  return (
    <section className="hero" aria-label={ariaLabel}>
      <div className="container">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </section>
  );
}

export default HeroSection;

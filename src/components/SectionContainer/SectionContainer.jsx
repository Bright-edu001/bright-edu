import React from "react";

function SectionContainer({ className = "", ariaLabel, children }) {
  return (
    <section className={className} aria-label={ariaLabel}>
      <div className="container">{children}</div>
    </section>
  );
}

export default SectionContainer;

import React from "react";

/**
 * Renders a school facts card (div.stats-card-school) with a heading and a
 * left-aligned label/value list. Pass the <li> elements as children.
 *
 * Used by: AboutUic, AboutMsu
 */
function SchoolStatsCard({ title, children }) {
  return (
    <div className="stats-card-school">
      <h3>{title}</h3>
      <ul className="left-aligned">{children}</ul>
    </div>
  );
}

export default SchoolStatsCard;

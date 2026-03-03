import React, { memo } from "react";
import "./MbaAreasHero.scss";

const MbaAreasHero = ({
  title = "UIC Business",
  className,
  bgColor = "#c71432",
  ...props
}) => {
  // 確保 title 是字串且不為空
  const displayTitle =
    typeof title === "string" && title.trim() ? title.trim() : "UIC Business";

  return (
    <div
      className={`mba-hero ${className || ""}`}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      <h1 className="mba-hero__title">{displayTitle}</h1>
    </div>
  );
};

export default memo(MbaAreasHero);

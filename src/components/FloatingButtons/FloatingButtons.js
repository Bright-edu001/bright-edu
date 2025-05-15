import React, { memo } from "react";
import {
  StyledFloatingButtons,
  StyledFloatingBtn,
} from "./FloatingButtonsStyles";

// 按鈕資料陣列，避免重複程式碼
const buttonData = [
  {
    href: "https://lin.ee/1WTpxdf",
    title: "加入LINE",
    aria: "加入LINE",
    imgSrc: `${process.env.PUBLIC_URL}/images/social_icon/line.webp`,
    imgAlt: "LINE",
    external: true,
  },
  {
    href: "tel:077227407",
    title: "撥打電話",
    aria: "撥打電話",
    imgSrc: `${process.env.PUBLIC_URL}/images/social_icon/phone.webp`,
    imgAlt: "電話",
    external: false,
  },
];

const FloatingButtons = () => (
  <StyledFloatingButtons>
    {buttonData.map(({ href, title, aria, imgSrc, imgAlt, external }) => (
      <StyledFloatingBtn
        key={href}
        href={href}
        title={title}
        aria-label={aria}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <img src={imgSrc} alt={imgAlt} loading="lazy" />
      </StyledFloatingBtn>
    ))}
  </StyledFloatingButtons>
);

export default memo(FloatingButtons);

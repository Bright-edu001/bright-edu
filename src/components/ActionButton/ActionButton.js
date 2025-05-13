import React, { memo } from "react";
import PropTypes from "prop-types";
import { StyledActionButton } from "./ActionButtonStyles";
/**
 * 可重用的動作按鈕元件
 * @param {object} props
 * @param {string} props.text - 按鈕文字
 * @param {string} props.link - 按鈕連結 (內部使用相對路由，外部自動加上安全屬性)
 * @param {string} props.className - 額外的自訂樣式類名
 */
const ActionButton = ({ text, link, className, ...props }) => {
  // 判斷是否為外部連結，自動增加 target 和 rel 安全屬性
  const isExternal = link && /^https?:\/\//.test(link);
  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  // 組合按鈕類名
  return (
    <StyledActionButton
      href={link}
      className={className}
      {...externalProps}
      {...props}
    >
      {text}
    </StyledActionButton>
  );
};

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  className: PropTypes.string,
};

ActionButton.defaultProps = {
  link: "#",
  className: "",
};

export default memo(ActionButton);

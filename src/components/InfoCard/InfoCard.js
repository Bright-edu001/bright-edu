import React, { memo, useMemo, isValidElement } from "react";
import PropTypes from "prop-types";
import {
  InfoCardWrapper,
  InfoCardContent,
  InfoCardImg,
} from "./InfoCard.styled";

/**
 * 可重用的資訊卡片組件
 * @param {object} props
 * @param {string} props.title - 資訊卡片標題
 * @param {string|array|object} props.content - 主要內容，可為字串、陣列或物件
 * @param {string} props.imageSrc - 圖片來源路徑
 * @param {string} [props.imageAlt] - 圖片替代文字，預設為 title
 * @param {'left'|'right'} [props.imagePosition='left'] - 圖片顯示位置
 */
function InfoCard({
  title = "",
  content = "",
  imageSrc,
  imageAlt = "",
  imagePosition = "left",
}) {
  // 記憶化 content 節點，避免重複渲染
  // 遞迴展開巢狀內容，並自動包 <p>，但 ReactNode 不包 <p>
  const contentNodes = useMemo(() => {
    const renderContent = (val, keyPrefix = "") => {
      if (isValidElement(val)) return val;
      if (typeof val === "string" || typeof val === "number")
        return <p key={keyPrefix}>{val}</p>;
      if (Array.isArray(val)) {
        return val.map((item, idx) => renderContent(item, keyPrefix + idx));
      }
      if (val && typeof val === "object") {
        return Object.values(val).map((item, idx) =>
          renderContent(item, keyPrefix + idx)
        );
      }
      return null;
    };
    return renderContent(content);
  }, [content]);

  return (
    <InfoCardWrapper
      className={
        imagePosition === "right" ? "info-card-right" : "info-card-left"
      }
    >
      <InfoCardContent className="info-card-content">
        {title && <h4>{title}</h4>}
        {contentNodes}
      </InfoCardContent>
      <InfoCardImg
        className="info-card-img"
        src={imageSrc}
        alt={imageAlt || title}
        loading="lazy"
      />
    </InfoCardWrapper>
  );
}

// PropTypes 驗證
InfoCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.oneOf(["left", "right"]),
};

export default memo(InfoCard);

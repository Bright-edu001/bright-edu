import React, { memo, useMemo, isValidElement } from "react";
import PropTypes from "prop-types";
import "./InfoCard.scss";

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
          renderContent(item, keyPrefix + idx),
        );
      }
      return null;
    };
    return renderContent(content);
  }, [content]);

  // 根據 imagePosition 決定 flex-direction 的類名
  const positionClass =
    imagePosition === "right" ? "info-card--right" : "info-card--left";

  return (
    <div className={`info-card ${positionClass}`}>
      <div className="info-card__content">
        {title && <h4>{title}</h4>}
        {contentNodes}
      </div>
      <img
        className="info-card__img"
        src={imageSrc}
        alt={imageAlt || title}
        loading="lazy"
      />
    </div>
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

import { memo, useMemo } from "react";
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
const InfoCard = ({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "left",
}) => {
  // 記憶化 content 節點，避免重複渲染
  const contentNodes = useMemo(() => {
    if (Array.isArray(content)) {
      return content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>);
    }
    if (content && typeof content === "object") {
      return Object.values(content).map(
        (paragraph, idx) => paragraph && <p key={idx}>{paragraph}</p>
      );
    }
    if (typeof content === "string") {
      return <p>{content}</p>;
    }
    return null;
  }, [content]);

  const isRight = imagePosition === "right";
  return (
    <div
      className={`info-card ${isRight ? "info-card-right" : "info-card-left"}`}
    >
      <div className="info-card-content">
        {title && <h4>{title}</h4>}
        {contentNodes}
      </div>
      <img src={imageSrc} alt={imageAlt || title} />
    </div>
  );
};

// PropTypes 驗證與預設值
InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.oneOf(["left", "right"]),
};
InfoCard.defaultProps = {
  imageAlt: "",
  imagePosition: "left",
};

export default memo(InfoCard);

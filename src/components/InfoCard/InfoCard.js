import "./InfoCard.scss";

// 可重用的資訊卡片組件
const InfoCard = ({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "left",
}) => {
  // 處理 content 可能為陣列、物件或字串
  const renderContent = () => {
    if (Array.isArray(content)) {
      return content.map((paragraph, idx) => <p key={idx}>{paragraph}</p>);
    } else if (typeof content === "object" && content !== null) {
      return Object.values(content).map(
        (paragraph, idx) => paragraph && <p key={idx}>{paragraph}</p>
      );
    } else if (typeof content === "string") {
      return <p>{content}</p>;
    }
    return null;
  };

  const isRight = imagePosition === "right";
  return (
    <div
      className={`info-card ${isRight ? "info-card-right" : "info-card-left"}`}
    >
      <div className="info-card-content">
        {title && <h4>{title}</h4>}
        {renderContent()}
      </div>
      <img src={imageSrc} alt={imageAlt || title} />
    </div>
  );
};

export default InfoCard;

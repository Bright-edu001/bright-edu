import React from "react";
import PropTypes from "prop-types";
import "./AreaCards.scss";

/**
 * 可重用 MBA 專業領域卡片列表
 * 若未傳入 areas prop，使用預設五大領域資料
 */
const defaultAreas = [
  {
    href: "/uic-business-school/mba/areas/management",
    title: "管理 Management",
    desc: "專業著重於掌握領導個人和組織的知識，了解人力資源管理、策略管理、領導力、管理技能和物流",
  },
  {
    href: "/uic-business-school/mba/areas/finance",
    title: "金融 Finance",
    desc: "加強同學對金融市場、資產及風險管理以及金融機構在充滿活力的全球經濟中的運作的理解，並促進金融專業人士的職業發展。利用芝加哥金融界的資源，提供金融市場及資產管理的最新知識。",
  },
  {
    href: "/uic-business-school/mba/areas/analytics",
    title: "商業分析 Business Analytics",
    desc: "學生掌握如何使用數據和模型進行商業決策，以及如何利用大數據和分析來獲得競爭優勢。商業分析專業的 MBA 學生準備滿足商業領域中發展最快的領域之一的需求。",
  },
  {
    href: "/uic-business-school/mba/areas/marketing",
    title: "行銷 Marketing",
    desc: "選擇此領域的學生對商業的整個行銷過程（從研究和產品開發到溝通規劃和衡量）有深入的了解",
  },
  {
    href: "/uic-business-school/mba/areas/human-resource",
    title: "人資管理 Human Resource Management",
    desc: "此專業領域與人力資源管理協會（SHRM）接軌，適合對組織中「人員管理」有興趣的學生。",
  },
];

const AreaCards = ({ areas = defaultAreas }) => {
  return (
    <div className="mba-areas-concentration-list">
      {areas.map((area) => (
        <a
          key={area.href}
          href={area.href}
          className="mba-areas-concentration-card"
        >
          <div className="concentration-title">{area.title}</div>
          <div className="concentration-desc">{area.desc}</div>
        </a>
      ))}
    </div>
  );
};

AreaCards.propTypes = {
  areas: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ),
};

export default AreaCards;

import React from "react";
import styles from "./RankingPage.module.scss"; // 修正：引入 SCSS 模組
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection"; // 引入圖片與文字區塊組件

function RankingPage() {
  const rankings = [
    {
      rankPrefix: "TOP",
      rankNumber: "1",
      description: "全美地區最大醫藥研究型大學",
      source: "Largest research university in Chicago",
    },
    {
      rankPrefix: "TOP",
      rankNumber: "39",
      description: "全美公立大學 U.S.NEWS.",
      source: "Top Public Schools",
    },
    {
      rankPrefix: "TOP",
      rankNumber: "80",
      description: "全美大學排行 U.S.NEWS",
      source: "National Universities 2025",
    },
    {
      rankPrefix: "TOP",
      rankNumber: "81",
      description: "全美大學排行 2020 泰晤士高等教育世界大學排名",
      source:
        "Times Higher Education World University Rankings 2020 U.S Ranking",
    },
    {
      rankPrefix: "TOP",
      rankNumber: "25%",
      description: "全美商學院",
      source:
        "U.S. NEWS & World Report Top 25% of all Business Schools National",
    },
    {
      rankPrefix: "TOP",
      rankNumber: "8",
      description: "華爾街日報/泰晤士高等教育 最具價值學校前10排行榜",
      source:
        'Wall Street Journal/THE - Which college give you the "Best Value"',
    },
    {
      rankPrefix: "TOP",
      rankNumber: "36",
      description: "QS World 全美大學",
      source: "QS USA Rankings",
    },
    {
      rankPrefix: "TOP",
      rankNumber: "13",
      description: "華爾街日報 / 大學脈動 全美公立大學排名 2024",
      source: "Wall Street Journal/College Pulse U.S. Public universities 2024",
    },
  ];

  return (
    <div className={styles.rankingContainer}>
      <ImageTextSection
        title="UIC RANKINGS"
        subtitle=""
        imageUrl="https://imgur.com/uhMmwNF.png" // 請確認圖片路徑
        imageAlt="Ranking Logo"
      />

      <div className={styles.introSection}>
        <p>
          UIC
          屬於美國公立大學，擁有商學院及醫學院等科系，優異的師資及教學品質，使不管在公立大學排名中或者是美國大學排名中榮獲許多優異的成績。
        </p>
      </div>

      <div className={styles.rankingsGrid}>
        {rankings.map((item, index) => (
          <div key={index} className={styles.rankingItem}>
            <div className={styles.rank}>
              {item.rankPrefix && <span className={styles.rankPrefix}>{item.rankPrefix}</span>}
              {item.rankNumber && <span className={styles.rankNumber}>{item.rankNumber}</span>}
            </div>
            <div className={styles.description}>{item.description}</div>
            <div className={styles.source}>{item.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankingPage;

import React from "react";
import styles from "./AacsbPage.module.css"; // 引入 SCSS 模組
import MbaAreasHero from "../../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../../components/SectionContainer/SectionContainer";
function AacsbPage() {
  return (
    <div className={styles.aacsbContainer}>
      <MbaAreasHero />
      <SectionContainer>
        <div className={styles.contentSection}>
          <div
            className="aacsb-header"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <div className="aacsb-logo">
              <img
                className="responsive-img"
                src={`/images/Uic/ranking/Aacsb.webp`}
                alt="AACSB Logo"
                loading="lazy"
              />
            </div>
            <div className="aacsb-title">
              <h2>AACSB商業及會計雙項認證</h2>
              <p>不超過200間學校獲得此商業&會計的雙項認證</p>
            </div>
          </div>
          <p>
            AACSB (Association to Advance Collegiate Schools of
            Business)，中文譯作國際商學院促進協會，是全球最具權威的商學教育認證機構。獲得
            AACSB 認證代表著學校致力於追求卓越和持續改進。
          </p>

          <div className={styles.sectionBlock}>
            <h2>背景與使命</h2>
            <ul>
              <li>成立時間：1916 年，美國創立</li>
              <li>
                目標：透過高標準的評審流程，確保全球商學院提供卓越的商業教育，促進學術與實務的結合，並培養具備全球競爭力的商業領袖。
              </li>
            </ul>
            <p>
              AACSB不僅關注教學質量，還強調研究創新、社會影響力、多元性與包容性等核心價值，致力於推動全球商業教育的持續進步。
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h2>認證的重要性</h2>
            <p>
              AACSB認證被視為商學院教育質量的標準，全球僅有不到6%的商學院能夠獲得這項殊榮。截至目前，全球約有100多個國家、900多所商學院獲得AACSB認證。{" "}
            </p>
            <p>獲得AACSB認證的優勢包括：</p>
            <ul>
              <li>提升學校的國際聲譽和競爭力</li>
              <li>吸引優秀學生與師資</li>
              <li>確保畢業生具備全球視野與專業能力</li>
              <li>為學生提供更好的就業與發展機會</li>
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h2>認證評選過程</h2>
            <p>
              AAACSB 認證是一個嚴格的、多階段的審核過程，通常需要 3-7
              年才能完成。認證標準涵蓋以下三大領域：
            </p>
            <ul>
              <li>戰略管理與創新 – 學校需具備清晰的使命、策略與創新願景。</li>
              <li>學術與學習成果 – 注重課程設計、學生學習效果及教學創新。</li>
              <li>
                師資與資源管理 –
                確保教職員具備專業知識並投入高品質的教學與研究。
              </li>
            </ul>
            <p>
              學校在通過最初的認證後，每 5
              年需重新接受認證，確保能夠持續維持卓越的教育品質。
            </p>
          </div>

          <div className={styles.sectionBlock}>
            <h2>相關著名的 AACSB 認證院校</h2>
            <p>獲得 AACSB 認證的學校包括：：</p>
            <ul>
              <li>哈佛大學商學院（Harvard Business School）</li>
              <li>
                麻省理工學院史隆管理學院（MIT Sloan School of Management）
              </li>
              <li>芝加哥大學布斯商學院（Chicago Booth School of Business）</li>
              <li>
                伊利諾大學芝加哥分校（UIC）商學院{" "}
                <span>*商業及會計雙向認證</span>
              </li>
            </ul>
          </div>

          <div className={styles.sectionBlock}>
            <h2>AACSB 對學生與企業的意義</h2>
            <p>
              對學生而言，畢業於 AACSB
              認證的商學院可提升在全球職場中的競爭力，並獲得更多的國際交流與發展機會。
            </p>
            <p>
              對企業而言，AACSB
              認證代表該校培養出的畢業生具備高水平的專業知識與實務能力，有助於企業招聘到更具備全球視野與商業敏銳度的人才。
            </p>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

export default AacsbPage;

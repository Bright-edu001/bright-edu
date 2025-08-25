import React from "react";
import styles from "./HeedPage.module.scss"; // 引入 SCSS 模組
import MbaAreasHero from "../../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../../components/SectionContainer/SectionContainer";
import getImageUrl from "../../../../utils/getImageUrl";
function HeedPage() {
  return (
    <div className={styles.heedContainer}>
      <MbaAreasHero />
      <SectionContainer>
        {/* --- 區塊 1: 簡介 --- */}
        <div className={styles.introSection}>
          <div className={styles.diversityHeader}>
            <div className={styles.diversityLogo}>
              <img
                className="responsive-img"
                src={getImageUrl(
                  `/images/Uic/ranking/2023-INSIGHT-Into-Diversity-HEED-Award-Logo-1024x1024.webp`
                )}
                alt="HEED Excellence Award"
                loading="lazy"
                width="180"
                height="180"
              />
            </div>
            <div className={styles.diversityTitle}>
              <h2>HEED -Higher Education Excellent in Diversity</h2>
              <p>高等教育多元性卓越獎</p>
            </div>
          </div>
          <p className={styles.sectionParagraph}>
            HEED（Higher Education Excellence in Diversity）獎項，中文譯作
            高等教育卓越多樣性獎，是由 《INSIGHT Into Diversity》
            雜誌頒發的一個重要獎項，旨在表彰那些在 促進多元化、包容性和公平性
            方面取得卓越成就的美國高等教育機構。
          </p>
        </div>

        {/* --- 區塊 2: 背景與使命 --- */}
        <div className={styles.rankingSection}>
          <h2 className={styles.sectionTitle}>背景與使命</h2>
          <ul className={styles.sectionList}>
            <li className={styles.sectionListItem}>
              創立機構： 《INSIGHT Into
              Diversity》是美國最具權威的多元化與包容性雜誌。
            </li>
            <li className={styles.sectionListItem}>
              目標： 促進美國高等教育機構對 多元化、公平性和包容性（Diversity,
              Equity, and Inclusion，簡稱 DEI）
              的持續承諾，並表彰在此領域發揮領導作用的學校。
            </li>
          </ul>
          <p className={styles.sectionParagraph}>
            HEED 獎項的評選標準涵蓋
            學生入學、教職員組成、課程設計、校園文化、社區參與、領導力培養
            等多個面向，全面衡量學校在提升多元性和包-容性方面的成就。
          </p>
        </div>

        {/* --- 區塊 3: 重要性與評選標準 --- */}
        <div className={styles.admissionSection}>
          <h2 className={styles.sectionTitle}>獎項的重要性</h2>
          <p className={styles.sectionParagraph}>
            HEED
            獎項被視為衡量美國高等教育機構在多元化方面的權威標誌，對於學校來說，獲得該獎項不僅代表其對多元文化的積極推動，也彰顯該校在促進包容性和公平性方面的持續努力。
          </p>
          <p className={styles.sectionParagraph}>
            獲得 HEED 獎項的學校具備以下特點：
          </p>
          <ul className={styles.sectionList}>
            <li className={styles.sectionListItem}>
              致力於提升不同族裔、性別、宗教、社會經濟背景等學生的教育機會
            </li>
            <li className={styles.sectionListItem}>
              注重教職員隊伍的多元化建設
            </li>
            <li className={styles.sectionListItem}>
              提供支持弱勢群體的校園文化與學術環境
            </li>
            <li className={styles.sectionListItem}>
              持續推動多元性和包容性政策的發展
            </li>
          </ul>
        </div>
        {/* --- 區塊 4: 評選標準與認可過程 --- */}
        <div className={styles.programSection}>
          <h2 className={styles.sectionTitle}>評選標準與認可過程</h2>
          <p className={styles.sectionParagraph}>
            HEED 獎項的評選過程非常嚴格，需要參選學校提供關於
            學生、教職員、管理層以及校園文化 等多方面的詳細數據。
          </p>
          <p className={styles.sectionParagraph}>評選重點包括：</p>
          <ul className={styles.sectionList}>
            <li className={styles.sectionListItem}>
              學生多元性：
              招收並支持不同背景的學生群體，包括少數族裔、國際學生、低收入學生等。
            </li>
            <li className={styles.sectionListItem}>
              教職員多元性： 確保教職員的多元化背景，促進文化交流與理解。
            </li>
            <li className={styles.sectionListItem}>
              包容性政策：
              制定並實施具體的多元化和包容性策略，營造公平的校園環境。
            </li>
            <li className={styles.sectionListItem}>
              社區參與： 促進與社區的合作，強化文化認同與社會責任。
            </li>
          </ul>
        </div>

        {/* --- 區塊 5: UIC 與 HEED --- */}
        <div className={styles.programSection}>
          <h2 className={styles.sectionTitle}>
            伊利諾大學芝加哥分校 (UIC) 與 HEED
          </h2>
          <p className={styles.sectionParagraph}>
            伊利諾大學芝加哥分校（University of Illinois Chicago, UIC） 是 HEED
            獎項的常勝軍，近年來多次榮獲此殊榮。
          </p>
          <p className={styles.sectionParagraph}>
            UIC 在提升校園多元性、包容性和公平性方面的努力，包括：
          </p>
          <ul className={styles.sectionList}>
            <li className={styles.sectionListItem}>
              擁有全美最具多元性的學生群體之一
            </li>
            <li className={styles.sectionListItem}>
              實施多元化課程，提升學生對全球文化的理解
            </li>
            <li className={styles.sectionListItem}>
              提供針對弱勢群體的學術與心理支持服務
            </li>
            <li className={styles.sectionListItem}>
              建立多元文化中心與包容性資源中心
            </li>
          </ul>
        </div>

        {/* --- 區塊 6: 獎項意義 --- */}
        <div className={styles.conclusionSection}>
          <h2 className={styles.sectionTitle}>獎項的意義</h2>
          <p className={styles.sectionParagraph}>
            對於獲獎學校來說，HEED
            獎項代表著對其多元化努力的高度認可，這不僅提高了學校在國際上的聲譽，也有助於吸引來自不同文化背景的學生與教職員，形成更具包容性的校園環境。
          </p>
          <p className={styles.sectionParagraph}>
            通過 HEED
            的表彰，獲獎學校能夠持續改善並推動多元化與包容性的發展，為學生提供更具公平性的教育機會，並在全球高等教育領域樹立榜樣。
          </p>
        </div>
      </SectionContainer>
    </div>
  );
}

export default HeedPage;

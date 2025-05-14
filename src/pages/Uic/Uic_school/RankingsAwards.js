import React from "react";
import "./RankingsAwards.scss";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";

const RankingsAwards = () => {
  return (
    <div className="rankings-awards-container">
      <ImageTextSection
        title="UIC 美國商學院"
        subtitle="排名與獎項"
        imageUrl="https://imgur.com/JdvnypZ.png" // 圖片路徑
        imageAlt="排名與獎項"
      />

      <div className="content-section">
        <p className="intro-text">
          伊利諾大學芝加哥分校
          (以下簡稱UIC)，在近年來的美國大學排名中，UIC的工商管理碩士頻頻獲得亮眼的成績。因依託芝加哥的金融中心優勢，與各個行業的結合交流十分緊密，就讀一年MBA的學生有很多與世界尖端行業企業交流及未來工作的機會。坐擁充足的學術和就業資源，占據著巨大的地理優勢。
        </p>

        <p className="intro-text">
          而UIC在各專業領域皆獨樹一幟，擁有多種專業研究中心及機構。
          在專業師資及學校秉持「卓越的教育、研究和公眾服務」之下，造就良好的校譽及教育程度，使UIC獲得多項獎項及優異的排名。
        </p>
        <p className="intro-text">
          下方統整排名資訊提供給同學們做選擇上面的參考。
        </p>

        <div className="aacsb-section">
          <div className="aacsb-header">
            <div className="aacsb-logo">
              <img
                className="responsive-img"
                src="https://imgur.com/q8AsDEx.png"
                alt="AACSB Logo"
                loading="lazy"
              />
            </div>
            <div className="aacsb-title">
              <h2>AACSB商業及會計雙項認證</h2>
              <p>不超過200間學校獲得此商業&會計的雙項認證</p>
            </div>
          </div>

          <p className="aacsb-description">
            AACSB – Association to Advance Collegiate Schools of
            Business(國際商學院促進協會)由美國商學院、社團和其他機構組成的非營利組織，致力於提高工商管理碩士和會計學等高等教育水準。是工商管理、會計學、金融專業等碩博士學位專案的機構。創立於1916年，迄今已100年歷史  
            AACSB為全球3大商管認證之首(AACSB、歐洲Equis、英國AMBA)
          </p>

          <div className="standard-categories">
            <div className="standard-item title-item">
              <p className="item-text">AACSB主要包括三大類21個方面的標準</p>
            </div>
            <ul className="standard-list">
              <li>學習流程的標準評鑑</li>
              <li>師資和學生的標準評鑑</li>
              <li>學院略管理方面的標準</li>
            </ul>
          </div>

          <div className="advantage-items">
            <div className="advantage-item title-item">
              <p className="item-text">認證學校優勢</p>
              <div className="title-circle"></div>
            </div>
            <ul className="advantage-list">
              <li>增進學術國際交流與合作</li>
              <li>建立持續改善機制、提升教育水準</li>
              <li>增加學校授予學位的國際公信力</li>
              <li>促進學校及學生之國際競爭力</li>
              <li>定期參與AACSB研討會，汲取最佳商管教育知經驗與知識</li>
            </ul>
          </div>
        </div>

        <div className="diversity-excellence-section">
          <div className="diversity-header">
            <div className="diversity-logo">
              <img
                className="responsive-img"
                src="https://imgur.com/JD9zLlj.png"
                alt="HEED Excellence Award"
                loading="lazy"
              />
            </div>
            <div className="diversity-title">
              <h2>HEED -Higher Education Excellent in Diversity</h2>
              <p>高等教育多元性卓越獎</p>
            </div>
          </div>

          <p className="diversity-description">
            同學們前往美國留學前，考慮到的問題之一莫過於當地種族問題。UIC因在面對不同人種族群和文化背景，有著高度的包容性，而獲的了HEED
            AWARD來讚許校內的文化多元及友善校園。
          </p>

          <div className="diversity-items">
            <ul className="diversity-list">
              <li>表彰美國各大學面對多元化及包容性的傑出表現。</li>
              <li>
                該獎項表彰獲獎學校表現出對於多元化與包容性的傑出表現一承諾，並且以評估獲獎學校的多元化計劃的進展能力
              </li>
              <li>直至2021年，UIC已經六次獲得該獎項</li>
              <li>
                提倡多元化、公平、包容、學生的成功和卓越的教學，推廣且促進校園，課堂上的多樣性，公平和包容性方面的奉獻和領導力提升
              </li>
              <li>
                加入多樣性的校園，可提升學生多樣性能力，對於面對未來國際不同文化及各式挑戰，學生可在學校內學習並提升此項能力，更能提升整理領導力
              </li>
            </ul>
          </div>
        </div>

        <div className="uic-rankings-section">
          <div className="rankings-header">
            <div className="rankings-logo">
              <img
                className="responsive-img"
                src="https://imgur.com/uhMmwNF.png"
                alt="UIC Rankings"
                loading="lazy"
              />
            </div>
            <div className="rankings-title">
              <h2>UIC RANKINGS</h2>
            </div>
          </div>

          <p className="rankings-intro">
            UIC關於領域公立大學，旗下商學院及醫學院等科系，優異的師資及教學品質，使不管在公立大學綜合排名還是醫學大學綜合中都獲得行多獎項。
          </p>

          <div className="rankings-grid">
            <div className="ranking-item">
              <div className="rank-header">
                <h3 className="top-label">Top</h3>
                <span className="rank-number">1</span>
              </div>
              <p className="rank-description">芝加哥最大規模研究型大學</p>
              <p className="rank-sub-description">
                The largest research university in Chicago
              </p>
            </div>

            <div className="ranking-item">
              <div className="rank-header">
                <h3 className="top-label">Top</h3>
                <span className="rank-number">39</span>
              </div>
              <p className="rank-description">全美公立大學 U.S.NEWS.</p>
              <p className="rank-sub-description">Top Public Schools</p>
            </div>

            <div className="ranking-item">
              <div className="rank-header">
                <h3 className="top-label">Top</h3>
                <span className="rank-number">80</span>
              </div>
              <p className="rank-description">全美大學排行 U.S.NEWS</p>
              <p className="rank-sub-description">National Universities 2023</p>
            </div>

            <div className="ranking-item">
              <div className="rank-header">
                <h3 className="top-label">Top</h3>
                <span className="rank-number">81</span>
              </div>
              <p className="rank-description">
                全美大學排行 2020泰晤士高等教育世界大學排名
              </p>
              <p className="rank-sub-description">
                Times Higher Education World University Rankings 2020 U.S
                Ranking
              </p>
            </div>

            <div className="ranking-item">
              <div className="rank-header">
                <h3 className="top-label">Top</h3>
                <span className="rank-number">25%</span>
              </div>
              <p className="rank-description">全美商業學校</p>
              <p className="rank-sub-description">
                U.S. NEWS & World Report Top 25% of all Business Schools
                National
              </p>
            </div>

            <div className="ranking-item">
              <div className="rank-header">
                <h3 className="top-label">Top</h3>
                <span className="rank-number">8</span>
              </div>
              <p className="rank-description">
                華爾街日報/泰晤士高等教育 最具價值學校前10排行榜
              </p>
              <p className="rank-sub-description">
                WSJ/THE - Which college give you the "Best Value"
              </p>
            </div>

            <div className="ranking-item">
              <div className="rank-header">
                <h3 className="top-label">Top</h3>
                <span className="rank-number">36</span>
              </div>
              <p className="rank-description">QS World 全美大學</p>
              <p className="rank-sub-description">QS USA Rankings</p>
            </div>

            <div className="ranking-item">
              <div className="rank-header">
                <h3 className="top-label">Top</h3>
                <span className="rank-number">13</span>
              </div>
              <p className="rank-description">
                華爾街日報/大學脈搏 全美公立大學排名 2024
              </p>
              <p className="rank-sub-description">
                Wall Street Journal/College Pulse U.S. public universities 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingsAwards;

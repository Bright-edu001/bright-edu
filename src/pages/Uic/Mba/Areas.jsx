import React from "react";
import "./mba-common.scss";
import "./Areas.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero"; // 引入新的組件
import AreaCards from "../../../components/AreaCards/AreaCards";

function Areas() {
  return (
    <div className="mba-areas-page">
      <MbaAreasHero /> {/* 使用新的組件 */}
      <SectionContainer>
        <div className="mba-areas-content">
          <div className="mba-areas-title">五大領域</div>
          <div className="mba-areas-desc-wrapper">
            {" "}
            {/* Added wrapper div */}
            <div className="mba-areas-desc">
              UIC
              一年制MBA課程以金融、管理等碩士聞名，同學們可以針對自己的興趣或者是自己所想增進的專業目標做選擇。
            </div>
            <div className="mba-areas-desc">
              我們目前開設五個領域給予同學選擇，主要優勢在於同學可以根據特定興趣領域靈活調整MBA學習傾向，為培養全方位的當代管理技能和文化意識，使學生能夠在當今的全球商業環境中有效競爭。
            </div>
          </div>{" "}
          {/* Closing wrapper div */}
          <div className="mba-areas-why">
            <div className="mba-areas-why-title">UIC 商學院</div>
            <ul className="mba-areas-why-list">
              <li>
                <span className="highlight">最佳價值（Best Value）</span>
                <br />
                UIC 商學院榮獲Wall Street Journal 2025
                評選為伊利諾州最佳價值商學院第1名，以合理的投資換取高品質教育與出色的職涯成果。
              </li>
              <li>
                <span className="highlight">
                  強大人脈資源（Powerful Network）
                </span>
                <br />
                地處芝加哥核心地段，擁有超過52,000名校友的龐大網絡，協助你連結企業、開拓職涯機會。
              </li>
              <li>
                <span className="highlight">
                  頂尖研究型大學（Top-tier Research University）
                </span>
                <br />
                UIC是芝加哥唯一的公立研究型大學，每年擁有近5億美元的研究資助，學術與產業連結緊密，學習資源豐富。
              </li>
            </ul>
          </div>
          <div className="mba-areas-advantage">
            <div className="mba-areas-advantage-title">UIC MBA優勢</div>
            <ul className="mba-areas-advantage-list">
              <li>
                <span className="highlight">時間效益高</span>
                <br />
                課程僅需一年的全職學習，但內容完整，涵蓋MBA所需的所有核心能力與管理知識。
              </li>
              <li>
                <span className="highlight">
                  團隊式學習（Cohort-based Program）
                </span>
                <br />
                採用小班制學習，同儕間透過案例分析、商業模擬與專案合作，建立緊密的學習社群與實務經驗。
              </li>
              <li>
                <span className="highlight">
                  芝加哥地利優勢（Chicago Location）
                </span>
                <br />
                校園鄰近世界十大經濟影響力城市之一的核心商業區，讓你可直接接觸金融市場（如CBOE芝加哥期權交易所）、跨國企業與創新機會，學習與實戰同步。
              </li>
            </ul>
          </div>
          <div className="mba-areas-concentrations">
            <div className="mba-areas-concentrations-title">
              領域選擇 Master of Business Administration Focus Areas
            </div>
            <AreaCards />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

export default Areas;

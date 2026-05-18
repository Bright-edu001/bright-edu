import React, { useEffect } from "react";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import "./MS.scss";
import { MS_MARKETING_CONFIG } from "./msProgramsConfig";

function MsMarketing() {
  useEffect(() => {}, []);

  return (
    <div className="ms-marketing-page">
      <MbaAreasHero />
      <SectionContainer>
        {" "}
        <h2 className="ms-page-h2">
          UIC行銷碩士學位（Master of Science in Marketing, MSM）——
          加強你的行銷專業，開啟更多職涯機會
        </h2>
        <p className="ms-page-p">
          伊利諾大學芝加哥分校（University of Illinois Chicago,
          UIC）提供的行銷碩士學位（Master of Science in Marketing,
          MSM），幫助你深入掌握行銷策略、市場研究、行銷計畫與數據分析等核心領域的知識與技能。這個課程非常適合：
        </p>
        <ul className="msm-ul">
          <li>非商業背景的專業人士 – 希望轉向行銷領域並取得專業資格的人士。</li>
          <li>
            希望提升行銷技能的專家 –
            想要獲得更高階的行銷知識與實務經驗，以便在現有職涯中更進一步的人。
          </li>
        </ul>
        <MSFinanceSection {...MS_MARKETING_CONFIG} />
      </SectionContainer>
    </div>
  );
}

export default MsMarketing;

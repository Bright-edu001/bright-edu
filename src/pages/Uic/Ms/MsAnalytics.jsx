import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import "./MS.scss";
import { MS_ANALYTICS_CONFIG } from "./msProgramsConfig";

function MsAnalytics() {
  return (
    <div className="ms-analytics">
      <MbaAreasHero />
      <SectionContainer>
        <h2 className="ms-page-h2">
          UIC 商業分析碩士學位（Master of Science in Business Analytics,
          MSBA）——利用數據驅動未來
        </h2>
        <p className="ms-page-p">
          伊利諾大學芝加哥分校（University of Illinois Chicago, UIC） 提供的
          商業分析碩士學位（Master of Science in Business Analytics,
          MSBA），幫助你掌握分析大型數據集的技能，並透過 數據視覺化、統計建模 和
          數據挖掘 技術，深入洞察業務問題。課程還涵蓋 數據管理、機器學習 和
          預測分析
          等領域，並以扎實的商業基礎為核心，讓你具備全面的數據分析能力。該學位也獲得
          STEM 認證，讓你在數據驅動的世界中保持競爭優勢。
        </p>
        <MSFinanceSection {...MS_ANALYTICS_CONFIG} />
      </SectionContainer>
    </div>
  );
}

export default MsAnalytics;

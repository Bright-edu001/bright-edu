import React, { useEffect } from "react";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import "./MS.scss";
import { MS_INFORMATION_CONFIG } from "./msProgramsConfig";

function MsInformation() {
  useEffect(() => {}, []);

  return (
    <div className="ms-information">
      <MbaAreasHero />
      <SectionContainer>
        <h2 className="ms-page-h2">
          UIC管理資訊系統碩士學位（Master of Science in Management Information
          Systems, MSMIS）—— 將技術與商業決策完美結合
        </h2>
        <p className="ms-page-p">
          伊利諾大學芝加哥分校（University of Illinois Chicago,
          UIC）提供的管理資訊系統碩士學位（Master of Science in Management
          Information Systems,
          MSMIS），幫助你掌握設計、實施與管理資訊系統的核心知識，利用技術來提升企業業務流程。課程強調商業智慧、人工智慧（AI）、數據挖掘以及
          供應鏈管理等關鍵領域，為你準備進入
          專案經理、技術領袖或首席資訊官（CIO）等領導角色，並由知名的研究與臨床師資團隊提供專業指導。這個學位還獲得STEM認證，確保你在技術與管理領域具備競爭優勢。
        </p>
        <MSFinanceSection {...MS_INFORMATION_CONFIG} />
      </SectionContainer>
    </div>
  );
}

export default MsInformation;

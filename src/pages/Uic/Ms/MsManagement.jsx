import React, { useEffect } from "react";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import "./MS.scss";
import { MS_MANAGEMENT_CONFIG } from "./msProgramsConfig";

function MsManagement() {
  useEffect(() => {
    // 同 MSFinance.js 中的註解
  }, []);

  return (
    <div className="ms-management">
      <MbaAreasHero />
      <SectionContainer>
        <h2 className="ms-page-h2">
          UIC供應鏈與營運管理碩士學位（Master of Science in Supply Chain and
          Operations Management, MSSCOM）—— 通往高效能營運與供應鏈優化之路
        </h2>
        <p className="ms-page-p">
          伊利諾大學芝加哥分校（University of Illinois Chicago,
          UIC）提供的供應鏈與營運管理碩士學位（Master of Science in Supply Chain
          and Operations Management,
          MSSCOM），幫助你掌握分析建模、企業系統、AI技術與數據分析等基礎知識，讓你在這個快速變革的領域中脫穎而出。這個學位獲得
          STEM認證，讓你在全球化、大數據、電子商務、社群媒體與 AI
          驅動的供應鏈環境中保持競爭力。
        </p>

        <MSFinanceSection {...MS_MANAGEMENT_CONFIG} />
      </SectionContainer>
    </div>
  );
}

export default MsManagement;

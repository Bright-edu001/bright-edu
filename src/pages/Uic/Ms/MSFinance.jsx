import React, { useEffect } from "react";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import "./MS.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import { MS_FINANCE_CONFIG } from "./msProgramsConfig";

function MSFinance() {
  useEffect(() => {}, []);

  return (
    <div className="ms-finance-page">
      <MbaAreasHero />
      <SectionContainer>
        <h2 className="ms-page-h2">
          UIC 金融碩士學位（Master of Science in Finance,
          MSF）——讓你邁向金融領域的高階職位
        </h2>
        <p className="ms-page-p">
          伊利諾大學芝加哥分校（University of Illinois Chicago, UIC）
          提供的金融碩士學位（Master of Science in Finance,
          MSF），幫助你實現成為財務分析師、投資銀行家、投資組合經理或首席財務官（CFO）的職涯目標。這個學位獲得
          STEM 認證 和 AACSB
          認證，並位於芝加哥金融區附近，讓你具備勝任各種高階金融職位的專業知識與技能。
        </p>
        <MSFinanceSection {...MS_FINANCE_CONFIG} />
      </SectionContainer>
    </div>
  );
}

export default MSFinance;

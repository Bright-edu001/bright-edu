import React, { useEffect } from "react";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import { PageH2, PageP } from "./MS.styles";

function MsManagement() {
  useEffect(() => {
    // 同 MSFinance.js 中的註解
  }, []);

  const whyTitle = "為什麼選擇在UIC商學院攻讀供應鏈與營運管理碩士學位？";
  const whyList = [
    {
      title: "快速且靈活的學位選擇",
      desc: "MSSCOM課程總共32個學分，可以在1年內完成全日制學習，或選擇多年間兼職修讀，讓你根據自己的時間安排，靈活規劃課程並兼顧全職工作。",
      extraList: [
        "透過多樣的選修課程，你可以根據個人職涯發展或企業需求，量身打造自己的學習計劃。",
      ],
    },
    {
      title: " 獨特的課程模式",
      desc: "將商業專業知識與技術技能、系統思維及領導力發展相結合，幫助你建立全球視野，為未來在製造業、物流業、零售業、製藥業及醫療產業 等領域的管理職位做好準備。",
      extraList: [
        "畢業後，你將具備從供應鏈分析、採購管理、品質控制到營運管理的全方位技能，成為業界爭相尋求的人才。",
      ],
    },
    {
      title: "實務導向的學習體驗",
      desc: "頂點實習專案（Practicum Capstone）– 你將與企業客戶合作，解決供應鏈中的真實挑戰，透過應用課堂知識開發可行的解決方案或評估提升供應鏈績效的策略。",
    },
  ];

  const outcomesTitle = "MSSCOM 職涯發展與成果";
  const outcomesDesc = {
    desc: "Master of Science in Supply Chain and Operations Management (MSSCOM) 設計為幫助你進入各大行業的多元職位，包括：",
    list: [
      "供應鏈分析師（Supply Chain Analyst）– 負責監控供應鏈流程、識別瓶頸並提出改進策略。",
      "持續改善分析師（Continuous Improvement Analyst）– 透過數據分析評估流程並提出提升運營效率的建議。",
      "需求規劃師（Demand Planner）– 預測市場需求並協助企業制定生產與物流計劃。",
    ],
  };
  const extraCoursesTitle = "其他適合 MSSCOM畢業生的領域";
  const extraCoursesList = [
    [{ zh: "製造業（Manufacturing）" }],
    [{ zh: "零售業（Retail）" }],
    [{ zh: "製藥業（Pharmaceuticals）" }],
    [{ zh: "醫療保健（Healthcare）" }],
    [{ zh: "運輸與物流（Transportation and Logistics）" }],
  ];

  const courseArrangementTitle = "學位要求與課程安排";
  const courseArrangementList = [
    "MSSCOM課程總共32個學分，包括16個必修學分和16個選修學分。",
    "課程設計靈活，讓你可以根據個人興趣或職業目標規劃課程內容。",
  ];

  const coreCoursesTitle = "核心課程範例";
  const coreCoursesList = [
    [
      {
        zh: "供應鏈與營運管理的分析與AI基礎",
        en: "Foundations of Analytics and AI for Supply Chain and Operations Management",
        desc: "探索如何將 AI 和數據分析應用於供應鏈與營運管理中，以提升企業績效。",
      },
      {
        zh: "營運管理導論",
        en: "Introduction to Operations Management",
        desc: "學習管理生產、物流、品質控制與資源分配的基礎知識。",
      },
    ],
    [
      {
        zh: "供應鏈管理",
        en: "Supply Chain Management",
        desc: "深入了解供應鏈流程的各個環節，包括採購、運輸、庫存管理及供應商協調。",
      },
    ],
    [
      {
        zh: "應用供應鏈策略與實踐",
        en: "Applied Supply Chain Strategy and Practice",
        desc: "將課堂理論應用於真實供應鏈案例，並提出具體的優化方案。",
      },
    ],
  ];

  const reasonsTitle = "為什麼選擇 UIC 的 MSSCOM？";
  const reasonsDesc =
    "透過UIC商學院的Master of Science in Supply Chain and Operations Management（MSSCOM），你不僅能掌握供應鏈與營運管理的核心知識，還能在實務操作中培養解決問題的能力，為未來成為業界領袖做好萬全準備！";

  return (
    <div className="ms-management">
      <MbaAreasHero />
      <SectionContainer>
        <PageH2>
          UIC供應鏈與營運管理碩士學位（Master of Science in Supply Chain and
          Operations Management, MSSCOM）—— 掌握供應鏈與營運領域的專業知識
        </PageH2>
        <PageP>
          伊利諾大學芝加哥分校（University of Illinois Chicago,
          UIC）提供的供應鏈與營運管理碩士學位（Master of Science in Supply Chain
          and Operations Management,
          MSSCOM），幫助你掌握分析建模、企業系統、AI技術與數據分析等基礎知識，讓你在這個快速變革的領域中脫穎而出。這個學位獲得
          STEM認證，讓你在全球化、大數據、電子商務、社群媒體與 AI
          驅動的供應鏈環境中保持競爭力。
        </PageP>

        <MSFinanceSection
          whyTitle={whyTitle}
          whyList={whyList}
          outcomesTitle={outcomesTitle}
          outcomesDesc={outcomesDesc}
          extraCoursesTitle={extraCoursesTitle}
          extraCoursesList={extraCoursesList}
          courseArrangementTitle={courseArrangementTitle}
          courseArrangementList={courseArrangementList}
          coreCoursesTitle={coreCoursesTitle}
          coreCoursesList={coreCoursesList}
          reasonsTitle={reasonsTitle}
          reasonsDesc={reasonsDesc}
        />
      </SectionContainer>
    </div>
  );
}

export default MsManagement;

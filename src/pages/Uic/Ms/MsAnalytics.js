import React from "react";
import "./MS.scss";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";

function MsAnalttics() {
  const whyTitle = "為什麼選擇在 UIC 商學院攻讀商業分析碩士？";
  const whyList = [
    {
      title: "節奏快且靈活的學位設計",
      desc: "MSBA課程共有32個學分，可在1年內全職完成，或多年間兼職修讀，讓你根據自身的職涯或企業需求靈活規劃課程。",
      extraList: [
        "透過多元的選修課程，你可以量身打造個人學習路徑，實現專業發展與個人目標之間的平衡。",
      ],
    },
    {
      title: "實踐導向的學習模式",
      desc: "Master of Science in Business Analytics (MSBA) 課程包含頂點專案（Capstone Experience），讓你有機會與企業客戶合作，分析實際的業務問題並開發分析解決方案。這種經驗能讓你在畢業後更具市場競爭力。",
    },
  ];

  const outcomesTitle = "MSBA 職涯發展與成果";
  const outcomesDesc = {
    desc: "隨著 商業分析與人工智慧（AI） 領域的快速增長，未來十年內該行業的發展預計將呈現指數級增長。我們的 MSBA 課程將幫助你進入以下職業領域：",
    list: [
      "分析師與數據科學家（Analysts and Data Scientists） – 涵蓋 會計、財務、數位行銷、供應鏈管理、AI 應用、收益優化 及 風險管理 等領域。",
      "管理層職位（Managerial Roles） – 幫助在職專業人士為進一步晉升管理層做好準備，開啟更多職涯發展機會。",
    ],
  };

  const companyTitle = "主要聘用 UIC 商學院 MSBA 畢業生的頂尖企業";
  const companyLogos = [
    { src: "/media/Ms/Publicis Media.png", alt: "Publicis Media" },
    { src: "/media/Ms/Circana.png", alt: "Circana" },
  ];

  const courseArrangementTitle = "學分與課程安排";
  const courseArrangementList = [
    "MSBA 課程總共32個學分，其中包含16個必修學分 和16個選修學分。",
    "課程設計靈活，讓你可以根據個人興趣或職業目標進行學習規劃。",
  ];

  const coreCoursesTitle = "核心課程範例";
  const coreCoursePragaph = "獲得管理方向 MBA 學位後，你將有機會進入以下職位：";
  const coreCoursesList = [
    [
      {
        zh: "高級資料庫管理",
        en: "Advanced Database Management",
        desc: "學習高效管理和分析大量資料庫的知識與技術。",
      },
      {
        zh: "機器學習與統計方法",
        en: "Machine Learning and Statistical Methods for Business Analytics",
        desc: "了解如何運用機器學習和統計模型來進行業務分析和預測",
      },
    ],
    [
      {
        zh: "分析策略與實踐",
        en: "Analytics Strategy and Practice",
        desc: "探索如何設計並執行數據分析策略，推動業務決策。",
      },
    ],
    [
      {
        zh: "商業數據挖掘",
        en: "Data Mining for Business",
        desc: "掌握從大型數據集中提取有價值信息的技術。",
      },
    ],
  ];

  const reasonsTitle = "為什麼選擇 UIC 的 MSBA？";
  const reasonsDesc =
    "透過UIC商學院的Master of Science in Business Analytics（MSBA），你不僅能獲得前沿的數據分析技能，還能拓展在各行業的就業機會，成為具備技術專長與商業洞察力的專業人才！";

  return (
    <div className="ms-analytics">
      <ImageTextSection
        title="Master of Science"
        subtitle="Business Analytics"
        imageUrl="https://imgur.com/rycQiyw.png"
        imageAlt="Business Analytics"
      />
      <h2>
        UIC 商業分析碩士學位（Master of Science in Business Analytics, MSBA）——
        掌握數據分析的核心競爭力
      </h2>
      <p>
        伊利諾大學芝加哥分校（University of Illinois Chicago, UIC） 提供的
        商業分析碩士學位（Master of Science in Business Analytics,
        MSBA），幫助你掌握分析大型數據集的技能，並透過 數據視覺化、統計建模 和
        數據挖掘 技術，深入洞察業務問題。課程還涵蓋 數據管理、機器學習 和
        預測分析
        等領域，並以扎實的商業基礎為核心，讓你具備全面的數據分析能力。該學位也獲得
        STEM 認證，讓你在數據驅動的世界中保持競爭優勢。
      </p>
      <MSFinanceSection
        whyTitle={whyTitle}
        whyList={whyList}
        outcomesTitle={outcomesTitle}
        outcomesDesc={outcomesDesc}
        companyTitle={companyTitle}
        companyLogos={companyLogos}
        courseArrangementTitle={courseArrangementTitle}
        courseArrangementList={courseArrangementList}
        coreCoursesTitle={coreCoursesTitle}
        coreCoursePragaph={coreCoursePragaph}
        coreCoursesList={coreCoursesList}
        reasonsTitle={reasonsTitle}
        reasonsDesc={reasonsDesc}
      />
    </div>
  );
}

export default MsAnalttics;

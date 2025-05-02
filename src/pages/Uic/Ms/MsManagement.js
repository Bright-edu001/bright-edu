import React from "react";
import "./MS.scss";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";

function MsManagement() {
  const whyTitle = "為什麼選擇在 UIC 商學院攻讀行銷碩士學位？";
  const whyList = [
    {
      title: "結合理論與實務的先進課程",
      desc: "UIC商學院的Master of Science in Finance (MSF)提供全面的課程設計、師資指導、專業學習軌道及實務經驗，幫助你在金融領域的各個領域取得成功。",
    },
    {
      title: "快速且靈活的學位選擇",
      desc: "MSM 課程總共32個學分，可以在1年內完成全日制學習，或選擇多年間兼職修讀，根據你的個人需求和工作時間安排進行彈性調整。",
      extraList: [
        "透過多元的選修課程，你可以根據職涯目標或企業需求量身打造自己的學習計劃。",
      ],
    },
    {
      title: "實務導向的學習體驗",
      desc: "頂點專案（Capstone Course）– 你將參與由企業經歷的真實案例研究，針對實際問題進行分析與解決，讓你在畢業前獲得寶貴的實戰經驗。",
      extraList: [
        "行銷科技中心（Marketing Technology Hub）– 透過最新的AI技術 進行內容創建與數據驅動行銷分析，幫助你掌握當前行銷科技的應用。",
        "企業合作項目經驗 – 你將從業界經驗豐富的教授學習，並參與與客戶合作的真實企業專案，獲取學術與實務並重的見解。",
      ],
    },
  ];

  const outcomesTitle = "MSM 職涯發展與成果";
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
      <ImageTextSection
        title="Master of Science"
        subtitle="Supply Chain and Operations Management"
        imageUrl="/media/Ms/Audit-amico.png"
        imageAlt="Supply Chain and Operations Management"
      />
      <h2>
        UIC供應鏈與營運管理碩士學位（Master of Science in Supply Chain and
        Operations Management, MSSCOM）—— 掌握供應鏈與營運領域的專業知識
      </h2>
      <p>
        伊利諾大學芝加哥分校（University of Illinois Chicago,
        UIC）提供的供應鏈與營運管理碩士學位（Master of Science in Supply Chain
        and Operations Management,
        MSSCOM），幫助你掌握分析建模、企業系統、AI技術與數據分析等基礎知識，讓你在這個快速變革的領域中脫穎而出。這個學位獲得
        STEM認證，讓你在全球化、大數據、電子商務、社群媒體與 AI
        驅動的供應鏈環境中保持競爭力。
      </p>

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
    </div>
  );
}

export default MsManagement;

import React from "react";
import "./MS.scss";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";

function MSFinance() {
  const whyTitle = "為什麼選擇在UIC商學院攻讀金融碩士學位？";
  const whyList = [
    {
      title: "取得UIC金融碩士學位，開啟更多職涯機會",
      desc: "UIC商學院的Master of Science in Finance (MSF)提供全面的課程設計、師資指導、專業學習軌道及實務經驗，幫助你在金融領域的各個領域取得成功。",
    },
    {
      title: "業界經驗豐富的師資",
      desc: "學習來自業界專家的實務知識，這些教授將 真實的業界經驗 帶入課堂，確保你同時獲得 理論與實務的雙重視角。",
    },
    {
      title: "最先進的虛擬交易中心",
      desc: "透過市場交易實驗室（Market Training Lab），你將有機會使用Bloomberg 終端機、高階業界軟體，並參與學術研究，讓你的金融技能更臻完善。",
    },
    {
      title: "快速且靈活的MSF學位",
      desc: "你可以在1年內完成全日制學習，或選擇兼職修讀，根據你的個人時間安排進行課程規劃。",
    },
    {
      title: "參與研究生金融社群活動",
      desc: "參加投資挑戰賽（Investment Challenge Competitions），與其他大學競爭，並透過UIC研究生金融與投資協會（Graduate Finance and Investment Group）參與芝加哥金融專業人士的演講與交流活動。",
    },
  ];

  const outcomesTitle = "MSF畢業生發展成果";
  const outcomesDesc =
    "金融碩士畢業生的工作機會遍布各行各業，UIC商學院的Master of Science in Finance (MSF)為你開啟更多高薪與高潛力的職業選擇。";

  const companyTitle = "主要聘用 UIC 商學院 MSF 畢業生的頂尖企業";
  const companyLogos = [
    { src: "/media/Ms/JP Morgan Chase & Co.png", alt: "JP Morgan Chase & Co" },
    { src: "/media/Ms/bofa-og-logo.png", alt: "bofa-og-logo" },
    { src: "/media/Ms/US Bank.png", alt: "US Bank" },
    { src: "/media/Ms/BMO Financial Group.png", alt: "BMO Financial Group" },
  ];

  const courseArrangementTitle = "學分與課程安排";
  const courseArrangementList = [
    "MSF課程總共32個學分，其中包括12個必修學分和20個選修學分。",
    "學生可以根據自己的職涯發展方向，自由選擇適合的選修課程來提升專業技能。",
  ];

  const coreCoursesTitle = "核心課程範例";
  const coreCoursePragaph = ""; // 修正：由 [] 改為 ""
  const coreCoursesList = [
    [
      {
        zh: "投資學",
        en: "Investments",
        desc: "學習資產配置、投資組合管理及風險控制的策略。",
      },
      {
        zh: "金融建模",
        en: "Financial Modeling",
        desc: "掌握使用 Excel 和其他工具構建財務模型的技術。",
      },
    ],
    [
      {
        zh: "企業財務",
        en: "Corporate Finance",
        desc: "探討資本結構、公司財務策略及價值創造。",
      },
      {
        zh: "貨幣與銀行學",
        en: "Money and Banking",
        desc: "研究貨幣體系、銀行運作及其對經濟的影響。",
      },
    ],
    [
      {
        zh: "國際金融",
        en: "International Finance",
        desc: "研究全球市場的資本流動與貨幣政策對金融的影響。",
      },
    ],
  ];

  const reasonsTitle = "為什麼選擇 UIC 的 MSF？";
  const reasonsDesc =
    "透過UIC商學院的Master of Science in Finance（MSF），你不僅能掌握現代金融理論與實務技能，還能在競爭激烈的金融市場中保持領先，開啟各種高階金融職涯機會！";

  return (
    <div className="ms-finance-page">
      <ImageTextSection
        title="Master of Science"
        subtitle="Finance"
        imageUrl="/media/Ms/Audit-amico.png"
        imageAlt="Finance"
      />
      <h2>
        UIC 會計碩士學位（Master of Science in Accounting,
        MSA）——邁向專業會計職涯的關鍵一步
      </h2>
      <p>
        伊利諾大學芝加哥分校（University of Illinois Chicago, UIC）
        提供的金融碩士學位（Master of Science in Finance,
        MSF），幫助你實現成為財務分析師、投資銀行家、投資組合經理或首席財務官（CFO）的職涯目標。這個學位獲得
        STEM 認證 和 AACSB
        認證，並位於芝加哥金融區附近，讓你具備勝任各種高階金融職位的專業知識與技能。
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

export default MSFinance;

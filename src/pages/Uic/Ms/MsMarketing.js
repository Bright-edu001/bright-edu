import React, { useEffect } from "react";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import { PageH2, PageP, MsmUl } from "./MS.styles";
import getImageUrl from "../../../utils/getImageUrl";

function MsMarketing() {
  useEffect(() => {}, []);

  const whyTitle = "為什麼選擇在 UIC 商學院攻讀行銷碩士學位？";
  const whyList = [
    {
      title: "結合理論與實務的先進課程",
      desc: "UIC的Master of Science in Marketing (MSM)課程結合了行銷理論與實務應用，讓你在迅速發展的行銷領域中掌握前沿知識與技能。",
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
  const outcomesDesc =
    "行銷碩士畢業生的就業機會遍布各大行業與企業，UIC商學院的Master of Science in Marketing (MSM)將幫助你進入以下高薪且具發展潛力的職位。";

  const companyTitle = "主要聘用 UIC 商學院 MSM 畢業生的頂尖企業";
  const companyLogos = [
    {
      src: getImageUrl("/images/Uic/Ms/Publicis Media.webp"),
      alt: "Publicis Media",
    },
    { src: getImageUrl("/images/Uic/Ms/Circana.webp"), alt: "Circana" },
  ];

  const courseArrangementTitle = "學位要求與課程安排";
  const courseArrangementList = [
    "MSM課程總共32個學分，包括16個必修學分和16個選修學分。",
    "每位學生還需要參與頂點專案課程（Capstone Course），透過分析與解決真實案例（Live Case Study）來實踐所學知識。",
  ];

  const coreCoursesTitle = "核心課程範例";
  const coreCoursesList = [
    [
      {
        zh: "行銷導論",
        en: "Introduction to Marketing",
        desc: "掌握行銷基本概念與策略框架，了解如何制定市場策略。",
      },
      {
        zh: "市場研究 I",
        en: "Marketing Research I",
        desc: "了解市場研究方法與數據分析技術，為企業提供決策依據。",
      },
    ],
    [
      {
        zh: "行銷管理",
        en: "Marketing Management",
        desc: "學習如何有效地管理行銷計劃，將企業目標轉化為實際成果。",
      },
    ],
    [
      {
        zh: "行銷分析",
        en: "Marketing Analytics",
        desc: "利用數據分析工具與方法來評估市場趨勢與消費者行為。",
      },
    ],
  ];

  const reasonsTitle = "為什麼選擇 UIC 的 MSM？";
  const reasonsDesc =
    "透過UIC商學院的Master of Science in Marketing（MSM），你不僅能學習最新的行銷理論，還能透過實務經驗提升專業能力，幫助你在各大企業與行業中開創更廣闊的職涯發展機會！";

  return (
    <div className="ms-marketing-page">
      <MbaAreasHero />
      <SectionContainer>
        {" "}
        <PageH2>
          UIC行銷碩士學位（Master of Science in Marketing, MSM）——
          加強你的行銷專業，開啟更多職涯機會
        </PageH2>
        <PageP>
          伊利諾大學芝加哥分校（University of Illinois Chicago,
          UIC）提供的行銷碩士學位（Master of Science in Marketing,
          MSM），幫助你深入掌握行銷策略、市場研究、行銷計畫與數據分析等核心領域的知識與技能。這個課程非常適合：
        </PageP>
        <MsmUl>
          <li>非商業背景的專業人士 – 希望轉向行銷領域並取得專業資格的人士。</li>
          <li>
            希望提升行銷技能的專家 –
            想要獲得更高階的行銷知識與實務經驗，以便在現有職涯中更進一步的人。
          </li>
        </MsmUl>
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
          coreCoursesList={coreCoursesList}
          reasonsTitle={reasonsTitle}
          reasonsDesc={reasonsDesc}
        />
      </SectionContainer>
    </div>
  );
}

export default MsMarketing;

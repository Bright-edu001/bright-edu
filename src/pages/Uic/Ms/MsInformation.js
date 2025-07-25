import React, { useEffect } from "react";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import MSFinanceSection from "../../../components/Ms/MSFinanceSection";
import { PageH2, PageP } from "./MS.styles";

function MsInformation() {
  useEffect(() => {}, []);

  const whyTitle = "為什麼選擇在UIC商學院攻讀管理資訊系統碩士學位？";
  const whyList = [
    {
      title: "快速且靈活的學位設計",
      desc: (
        <ul
          style={{
            listStyle: "disc",
            listStylePosition: "inside",
            paddingLeft: "0",
          }}
        >
          <li>
            MSMIS課程總共32個學分，可以在1年內完成全日制學習，或選擇
            多年間兼職修讀，根據你的個人時間安排進行課程規劃。
          </li>
          <li>
            透過多元的選修課程，你可以根據職涯目標或企業需求量身打造自己的學習計劃。
          </li>
        </ul>
      ),
    },
    {
      title: "核心課程與專業方向選擇",
      desc: (
        <ul
          style={{
            listStyle: "disc",
            listStylePosition: "inside",
            paddingLeft: "0",
          }}
        >
          <li>
            核心課程包括企業應用與基礎設施、數據庫管理與資訊系統管理，為你建立堅實的基礎。
          </li>
          <li>
            接著，你可以根據個人興趣選擇技術方向、管理方向，或結合兩者的混合專業，課程涵蓋以下三大領域：
          </li>
          <li
            style={{
              listStyle: "none",
              paddingLeft: 0,
              marginTop: "0.5em",
              display: "flex",
              flexDirection: "column",
              gap: "0.5em",
            }}
          >
            <div>
              <strong style={{ fontWeight: "400" }}>
                服務運營與供應鏈管理（Service Operations and Supply Chain
                Management）
              </strong>
            </div>
            <div>
              <strong style={{ fontWeight: "400" }}>
                企業資訊科技／技術專案管理（Enterprise Information
                Technology/Technology Project Management）
              </strong>
            </div>
            <div>
              <strong style={{ fontWeight: "400" }}>
                金融與行銷領域的數據挖掘（Data Mining for Finance and Marketing
                Sectors）
              </strong>
            </div>
          </li>
        </ul>
      ),
    },
    {
      title: "實務導向的學習體驗",
      desc: "頂點專案（Capstone Experience）– 你將參與一個設計專案，與外部企業合作解決實際問題，或選擇一個獨立的研究專案，讓你在畢業前獲得寶貴的實務經驗。",
    },
  ];

  const outcomesTitle = "MSMIS 職涯發展與成果";
  const outcomesDesc = {
    desc: "Master of Science in Management Information Systems (MSMIS)將幫助你在企業IT和技術專案管理領域專精，具備解決電子商務、供應鏈管理、數據管理與商業智慧等領域問題的能力。課程還培養分析、框架與溝通的技能，讓你在進入職場時具備競爭優勢。",
  };

  const companyTitle = "主要聘用 UIC 商學院 MSMIS 畢業生的頂尖企業";
  const companyLogos = [
    { src: "https://imgur.com/yAYnv8c.png", alt: "Blur Cross BlueShield" },
    {
      src: "https://imgur.com/8UuFArA.png",
      alt: "Discover Financial Services",
    },
    { src: "https://imgur.com/uB2jd6a.png", alt: "Accenture" },
    { src: "https://imgur.com/CTHOqZy.png", alt: "Zurich" },
    { src: "https://imgur.com/pTbhLJz.png", alt: "SAP" },
    { src: "https://imgur.com/2kTLBWN.png", alt: "United" },
    { src: "https://imgur.com/6pG7vED.png", alt: "CDW" },
    { src: "https://imgur.com/bkTWA3F.png", alt: "PWC" },
    { src: "https://imgur.com/71PlcUk.png", alt: "RSM" },
    { src: "https://imgur.com/PwZyl8u.png", alt: "Deloitte" },
  ];

  const courseArrangementTitle = "學位要求與課程安排";
  const courseArrangementList = [
    "MSMIS課程總共32個學分，包括16個必修學分和16個選修學分（視之前的課程背景而定）。",
    "課程靈活，讓你根據自己的興趣與職涯發展方向自由選擇課程內容。",
  ];

  const coreCoursesTitle = "核心課程範例";
  const coreCoursesList = [
    [
      {
        zh: "企業應用開發",
        en: "Enterprise Application Development",
        desc: "學習設計、開發和維護企業級應用系統。",
      },
    ],
    [
      {
        zh: "企業資訊基礎設施規劃與安全",
        en: "Enterprise Information Infrastructure Planning & Security",
        desc: "瞭解如何規劃、部署和保護企業資訊基礎設施。",
      },
    ],
    [
      {
        zh: "高級數據庫管理",
        en: "Advanced Database Management",
        desc: "深入探討數據庫設計、查詢優化與資料安全性管理。",
      },
    ],
  ];

  const reasonsTitle = "為什麼選擇 UIC 的 MSMIS？";
  const reasonsDesc =
    "透過UIC商學院的Master of Science in Management Information Systems（MSMIS），你不僅能掌握管理資訊系統的技術知識，還能培養商業敏銳度，成為企業 IT 領域中的領導者，為未來的職涯發展做好充分準備！";

  return (
    <div className="ms-information">
      <MbaAreasHero />
      <SectionContainer>
        <PageH2>
          UIC管理資訊系統碩士學位（Master of Science in Management Information
          Systems, MSMIS）—— 將技術與商業決策完美結合
        </PageH2>
        <PageP>
          伊利諾大學芝加哥分校（University of Illinois Chicago,
          UIC）提供的管理資訊系統碩士學位（Master of Science in Management
          Information Systems,
          MSMIS），幫助你掌握設計、實施與管理資訊系統的核心知識，利用技術來提升企業業務流程。課程強調商業智慧、人工智慧（AI）、數據挖掘以及
          供應鏈管理等關鍵領域，為你準備進入
          專案經理、技術領袖或首席資訊官（CIO）等領導角色，並由知名的研究與臨床師資團隊提供專業指導。這個學位還獲得STEM認證，確保你在技術與管理領域具備競爭優勢。
        </PageP>
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

export default MsInformation;

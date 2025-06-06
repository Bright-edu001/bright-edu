import React, { useEffect } from "react";
// import debounce from "../../../../utils/debounce";
import MbaAreasHero from "../../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../../components/SectionContainer/SectionContainer";
import CourseList from "../../../../components/CourseList/CourseList";
// import "./MBA-Programs.scss";

const HR_Management = () => {
  useEffect(() => {
    import("./MBA-Programs.scss");
  }, []);

  // 各區塊課程資料
  const overviewCourses = [
    "對人力資源管理有興趣的學生 – 希望成為組織中「人員管理」的重要推動者，致力於提升企業的人才管理和發展。",
    "想取得 SHRM 認證的專業人士 – 為準備成為 SHRM 認證專業人士（SHRM-CP®）提供知識與實務基礎。",
  ];
  const featuredCourses = [
    "人力資源管理（Human Resource Management） – 探討人才管理、招聘、績效管理及員工發展的關鍵策略。",
    "薪酬管理（Compensation Administration） – 學習制定薪酬架構、獎勵機制及福利制度，提升員工滿意度。",
    "談判技巧（Negotiation） – 培養協商與溝通技巧，有效管理勞資關係與衝突。",
    "人才管理（Talent Management） – 了解人才培養、保留與發展策略，為企業持續輸送高潛力人才。",
  ];
  const outcomesCourses = [
    "促進企業成功，管理並發展員工 – 深入理解 人力資源管理 的核心策略，協助提升員工績效與企業競爭力。",
    "具備財務與會計的基本知識，助力企業決策 – 瞭解 財務與會計 的基本概念，幫助你在管理人力資源時更好地衡量和交付成果。",
  ];
  const careerCourses = [
    "人力資源經理（Human Resource Manager） – 負責員工招聘、培訓、績效評估及勞動法規的遵循。",
    "員工關係經理（Employee Relations Manager） – 專注於處理員工與公司之間的關係，維持良好的勞資互動。",
    "薪酬與福利分析師 / 經理（Compensation or Benefit Analyst/Manager） – 制定並管理薪資與福利計劃，確保具競爭力的薪酬策略。",
    "培訓與發展經理（Training and Development Manager） – 規劃並實施培訓計劃，幫助員工持續提升技能。",
    "勞資關係經理（Labor Relations Manager） – 管理勞資協議，協調談判並解決勞資糾紛。",
  ];

  return (
    <div className="management-container">
      <MbaAreasHero />
      <SectionContainer>
        {/* UIC MBA 管理專業簡介 */}
        <div className="section">
          <h2 className="section-title">
            UIC MBA人力資源管理專業領域 – 銜接員工與企業之間的溝通橋樑
          </h2>
          <div className="section-content">
            <p>
              伊利諾大學芝加哥分校（UIC）的MBA人力資源管理（HR
              Management）領域，讓你掌握
              薪酬與福利、員工參與、人才招聘、勞動法規
              等專業知識，幫助你有效支持員工的發展與管理，並在企業中發揮關鍵作用。
            </p>
          </div>
        </div>

        {/* 學位概述部分 */}
        <div className="section">
          <h3 className="section-subtitle">學位概述</h3>
          <div className="section-content">
            <p>
              此 AACSB 認證
              的MBA課程，結合了人力資源管理協會（SHRM）建議的核心主題，為學生提供最前沿的人力資源管理知識，並為取得
              SHRM 認證專業資格（SHRM-CP®） 做好充分準備。
              在學習這套課程時，你不僅能夠深入了解 組織行為、行銷、會計
              等基礎商業實務，還能掌握領導與管理員工的必要技能。
            </p>
            <p>此專業課程特別適合：</p>
            <CourseList items={overviewCourses} />
          </div>
        </div>

        {/* 特色課程項目 */}
        <div className="section">
          <h3 className="section-subtitle">特色課程範例</h3>
          <CourseList items={featuredCourses} />
        </div>

        {/* 學習成果 */}
        <div className="section">
          <h3 className="section-subtitle">學習成果</h3>
          <div className="section-content">
            <p>完成課程後，你將具備以下核心能力：</p>
            <CourseList items={outcomesCourses} />
          </div>
        </div>
        {/* 職業發展方向 */}
        <div className="section">
          <h3 className="section-subtitle">職涯發展方向</h3>
          <div className="section-content">
            <p>完成人力資源管理領域的 MBA 課程後，你將有機會從事以下職位：</p>
            <CourseList items={careerCourses} />
          </div>
        </div>
        {/* 結束語 */}
        <div className="conclusion">
          透過這個課程，你將獲得處理複雜人力資源問題的專業技能，為企業創造價值，並在不斷變化的職場中保持競爭優勢！
        </div>
      </SectionContainer>
    </div>
  );
};

export default HR_Management;

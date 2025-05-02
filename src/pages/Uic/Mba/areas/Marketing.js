import React from "react";
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection";
import CourseList from "../../../../components/CourseList/CourseList";
import "./MBA-Programs.scss";

const Marketing = () => {
  // 各區塊課程資料

  const featuredCourses = [
    "品牌管理（Brand Management）：學習如何建立、維護並提升品牌價值，打造有競爭力的品牌策略。",
    "數位與社群媒體行銷（Digital and Social Media Marketing）：了解數位平台與社交媒體的營銷模式，掌握線上行銷趨勢。",
    "產品規劃（Product Planning）：學習產品的開發與管理流程，滿足市場需求。",
    "內容行銷（Content Marketing）：設計引人入勝的行銷內容，提升品牌影響力與用戶互動。",
  ];
  const outcomesCourses = [
    "整合行銷策略：識別並把握市場機會，設計有效的行銷解決方案。",
    "市場調查與分析：設計並進行市場調查，將數據轉化為管理決策的依據。",
    "廣告與宣傳規劃：制定跨媒體的廣告與促銷計劃，包括線上、電視、廣播和印刷媒體。",
    "消費者行為分析：理解顧客如何評估產品並做出購買決策，制定相應的行銷策略。",
    "國際市場拓展：將行銷策略擴展至國際市場，拓展業務版圖。",
  ];
  const careerCourses = [
    "行銷經理（Marketing Manager） – 負責制定和執行企業整體行銷戰略。",
    "品牌策略師（Brand Strategist） – 規劃品牌定位並提升品牌價值。",
    "數位行銷專家（Digital Marketing Specialist） – 透過數位平台推動品牌曝光與客戶參與。",
    "市場研究分析師（Market Research Analyst） – 研究市場趨勢並提供數據支持的決策建議。",
    "產品經理（Product Manager） – 負責產品開發、上市策略及市場表現評估。",
  ];

  return (
    <div className="management-container">
      {/* 頂部標題和圖示部分 */}
      <ImageTextSection
        title="一年制MBA"
        subtitle="Marketing 行銷"
        imageUrl="/media/MBA_Programs/Audit-amico.png" // 圖片路徑
        imageAlt="Marketing 行銷"
      />

      {/* UIC MBA 管理專業簡介 */}
      <div className="section">
        <h2 className="section-title">
          加速你的職涯發展，選擇UIC的行銷專業MBA學位
        </h2>
        <div className="section-content">
          <p>
            在伊利諾大學芝加哥分校（UIC）攻讀行銷專業的MBA學位，讓你的職涯更上一層樓！這個全面的課程涵蓋關鍵的市場營銷原則與策略，讓你掌握在各個行業中脫穎而出的專業技能，包括數位行銷、消費者行為以及品牌管理等領域。你將獲得實用的知識，可應用於廣告公司、企業行銷部門，以及創業機會中，為自己的未來鋪路。
          </p>
        </div>
        <h2 className="section-title">專業技能與知識培養</h2>
        <div className="section-content">
          <p>
            選擇行銷方向的學生，將深入了解企業中整個行銷流程，從市場調查、產品開發到傳播規劃與成效評估，培養全面的行銷管理能力。
          </p>
        </div>
      </div>

      {/* 學位概述部分 */}
      <div className="section">
        <h3 className="section-subtitle">學位概述</h3>
        <div className="section-content">
          <p>
            MBA課程的行銷領域，旨在培養你具備在快速變化的市場環境中脫穎而出的
            分析、創意思維與策略規劃
            能力。透過此課程，你將具備分析市場趨勢、理解消費者行為，並設計有效行銷策略的專業知識，為廣告、數位行銷、品牌管理和市場研究等領域做好充分準備。
          </p>
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
          <p>完成課程後，你將具備以下能力：</p>
          <CourseList items={outcomesCourses} />
        </div>
      </div>
      {/* 職業發展方向 */}
      <div className="section">
        <h3 className="section-subtitle">職涯發展方向</h3>
        <div className="section-content">
          <p>獲得市場營銷方向的MBA學位後，你將有機會從事以下職位：</p>
          <CourseList items={careerCourses} />
        </div>
      </div>
      {/* 結束語 */}
      <div className="conclusion">
        透過這個課程，你將具備業界競爭力，開啟多元的職涯機會！
      </div>
    </div>
  );
};

export default Marketing;

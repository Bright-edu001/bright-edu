import React, { useEffect } from "react";
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection";
import CourseList from "../../../../components/CourseList/CourseList";

const Management = () => {
  useEffect(() => {
    import("./MBA-Programs.scss");
  }, []);

  // 各區塊課程資料
  const overviewCourses = [
    "人力資源管理（Human Resource Management） – 深入了解如何激勵團隊、管理人才並提升員工績效。",
    "策略管理（Strategic Management） – 擬定有效的企業策略，為組織長期發展奠定基礎。",
    "領導力與管理技能（Leadership & Managerial Skills） – 培養帶領團隊的能力，應對動態市場挑戰。",
    "物流與供應鏈管理（Logistics） – 優化營運流程，確保企業運作順暢。",
  ];
  const featuredCourses = [
    "競爭策略（Competitive Strategy） – 探討如何在競爭激烈的市場中制定有效的策略，提升企業競爭力。",
    "人力資源管理（Human Resource Management） – 學習招聘、培訓、績效管理等核心 HR 技能。",
    "有影響力的領導力（Leading for Impact） – 發展影響力領導能力，引導團隊達成組織目標。",
    "談判技巧（Negotiations） – 掌握談判策略與技巧，幫助你在商業談判中取得優勢。",
  ];
  const outcomesCourses = [
    "帶領團隊與管理組織 – 深入理解 策略管理、領導技能與物流管理，有效應對各種管理挑戰。",
    "運用數據分析輔助決策 – 掌握關鍵的 商業分析工具，在當今數據驅動的環境中提升決策準確性。",
  ];
  const careerCourses = [
    "首席執行官 / 營運長 / 行銷長（Chief Executive/Operations/Marketing Officer） – 負責企業整體運營、業務拓展及市場策略。",
    "營運總監（Director of Operations） – 管理企業運營流程，確保業務順暢執行。",
    "專案經理（Project Manager） – 主導企業專案管理，協調團隊資源，達成專案目標。",
    "商業顧問（Business Consultant） – 為企業提供專業的經營策略建議，推動業務成長。",
    "企業家 / 小型企業主（Entrepreneur/Small Business Owner） – 創辦並經營自己的企業，發展個人事業版圖。",
  ];

  return (
    <div className="management-container">
      {/* 頂部標題和圖示部分 */}
      <ImageTextSection
        title="一年制MBA"
        subtitle="Management 管理"
        imageUrl="https://imgur.com/rycQiyw.png" // 圖片路徑
        imageAlt="Management 管理"
        bgImageUrl={`${process.env.PUBLIC_URL}/images/UIC/banner/photo_6177208882540169917_y.webp`}
      />

      {/* UIC MBA 管理專業簡介 */}
      <div className="section">
        <h2 className="section-title">
          UIC MBA 管理專業領域– 培養全方位的管理與領導能力
        </h2>
        <div className="section-content">
          <p>
            伊利諾大學芝加哥分校（UIC） 的管理方向 MBA
            課程，讓你深入了解企業關鍵領域的最佳實踐，包括
            會計、營運、策略管理、組織行為 和 行銷
            等核心知識。課程不僅幫助你掌握專業技能，還能培養卓越的領導能力，為未來在管理職位上發揮影響力做好準備。
            課程，讓你深入了解企業營運與經濟運作方面，包括資訊、營銷、運營管理、組織行為和戰略管理等相關知識和實踐。該課程旨在培養學員的專業管理能力，通過優質的師資和實用的課程內容，為未來在全球範圍內發揮管理才能作準備。
          </p>
        </div>
      </div>

      {/* 學位概述部分 */}
      <div className="section">
        <h3 className="section-subtitle">學位概述</h3>
        <div className="section-content">
          <p>
            完成這個 AACSB 認證 的 MBA
            管理課程後，你將具備領導團隊和管理企業的專業知識，適合擔任
            管理高層、企業主、營運主管 及 商業顧問 等重要角色。
          </p>
          <p>
            除了核心的管理專業課程外，你還可以透過
            數據挖掘、人力資源管理、企業財務
            等選修課程，進一步拓展專業知識，提升多元化的業務能力。
          </p>
          <p>這個課程專注於幫助你掌握：</p>
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
          <p>完成課程後，你將具備以下能力：</p>
          <CourseList items={outcomesCourses} />
        </div>
      </div>
      {/* 職業發展方向 */}
      <div className="section">
        <h3 className="section-subtitle">職涯發展方向</h3>
        <div className="section-content">
          <p>獲得管理方向 MBA 學位後，你將有機會進入以下職位：</p>
          <CourseList items={careerCourses} />
        </div>
      </div>
      {/* 結束語 */}
      <div className="conclusion">
        通過這個課程，你將具備全面的管理與領導能力，成為企業不可或缺的關鍵人才！
      </div>
    </div>
  );
};

export default Management;

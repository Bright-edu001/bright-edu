import React from "react";
import ImageTextSection from "../../../../components/ImageTextSection/ImageTextSection";
import CourseList from "../../../../components/CourseList/CourseList";
import "./MBA-Programs.scss";

const Finance = () => {
  // 各區塊課程資料
  const overviewCourses = [
    "投資分析 – 評估投資機會並制定策略。",
    "企業財務的資本結構 – 理解企業融資決策對資本結構的影響。",
    "固定收益證券的評估與量化 – 研究債券和其他固定收益工具的價值。",
  ];
  const featuredCourses = [
    "投資學（Investments）：學習資產配置、投資組合管理及風險評估。",
    "資本市場（Capital Markets）：了解金融市場的運作機制及資金流動的影響。",
    "企業財務（Corporate Finance）：研究企業資本結構、財務決策及融資策略。",
    "風險管理（Risk Management）：掌握各類風險識別、評估與控制的方法。",
    "服務行銷（Services Marketing）：了解金融服務業的行銷策略與客戶管理方法。",
  ];
  const outcomesCourses = [
    "深入理解金融資產及風險管理 – 掌握不同類型的金融工具與投資策略，評估並控制風險。",
    "具備戰略思維與市場敏銳度 – 能夠洞察市場趨勢，預測變化並制定應對策略。",
    "分析動態環境下的市場變化 – 理解不同經濟環境的挑戰，並靈活應對市場波動。",
  ];
  const careerCourses = [
    "首席財務官（Chief Financial Officer, CFO） – 負責企業的財務管理、資金運作及策略規劃。",
    "投資銷售專員 / 交易員（Investment Sales Associate or Trader） – 負責銷售金融產品並進行市場交易。",
    "投資組合合規專員（Portfolio Compliance Specialist） – 確保投資組合遵循法規與政策。",
    "高級財務分析師（Senior Financial Analyst） – 進行財務預測、風險分析及業務評估。",
    "併購經理（Mergers & Acquisitions Manager） – 負責企業的併購策略、協商與執行過程。",
  ];

  return (
    <div className="management-container">
      {/* 頂部標題和圖示部分 */}
      <ImageTextSection
        title="一年制MBA"
        subtitle="Finance 金融"
        imageUrl="https://imgur.com/rycQiyw.png" // 圖片路徑
        imageAlt="Finance 金融"
      />

      {/* UIC MBA 管理專業簡介 */}
      <div className="section">
        <h2 className="section-title">
          金融方向課程讓你掌握 財務分析、投資策略、風險管理 和 經濟原理
          等關鍵技能，並為你在 金融服務、企業財務 及 投資管理
          等領域的職涯發展做好充分準備。
        </h2>
      </div>

      {/* 學位概述部分 */}
      <div className="section">
        <h3 className="section-subtitle">學位概述</h3>
        <div className="section-content">
          <p>
            這個獲得 AACSB 認證 的碩士學位課程，將深入探討金融相關主題，例如：
          </p>
          <CourseList items={overviewCourses} />
          <p>
            除了學習當今最前沿的財務管理實踐外，基礎課程還涵蓋
            會計、營運管理、行銷 和 組織行為
            等領域的知識。你還可以透過選修課程，探索
            數據挖掘、人力資源管理、決策科學
            等相關領域的進階研究，進一步拓展你的專業能力。
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
          <p>獲得金融方向的碩士學位後，你將有機會進入以下高潛力職位：</p>
          <CourseList items={careerCourses} />
        </div>
      </div>
      {/* 結束語 */}
      <div className="conclusion">
        透過這個課程，你將為自己的職涯鋪平道路，成為財務領域的專業人才！
      </div>
    </div>
  );
};

export default Finance;

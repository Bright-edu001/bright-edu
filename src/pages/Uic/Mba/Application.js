import React from "react";
import "./Application.scss";
import ImageTextSection from "../../../components/ImageTextSection/ImageTextSection";
import ApplicationForm from "../../../components/Application/ApplicationForm";

function Application() {
  return (
    <div className="mba-application-page">
      {/* Header 使用 ImageTextSection */}
      <ImageTextSection
        title="一年制MBA"
        subtitle="申請資訊"
        imageUrl="/media/MBA_Programs/college-dmission-bro.png"
        imageAlt="申請資訊"
      />

      {/* 說明文字 */}
      <div className="mba-application-desc">
        <p>
          大學（不限科系）、具2年以上全職工作經驗，並且有意願挑戰國際商業碩士學位（要求GPA成績），無需考取GMAT，無需準備推薦信，入學文件僅需準備CV及申請表。
        </p>
        <p>
          大四在校生可備妥大一至大三成績單提前申請並參加校方入學考試，若確定錄取待畢業後補繳大四成績單和畢業證書即可。
        </p>
        <p>
          英文需具備聽、說、讀、寫之能力，經校方安排，進行校方面試及筆試，測驗及格始可入學。（因有學校官方考試把關，無特定要求
          TOEFL 及 GMAT 成績，但若申請者具備並檢附相關語文檢定成績如 IELTS
          達6.5或 TOEFL 達80等，則可免去入學筆試直接參加入學面試）。
        </p>
      </div>

      {/* 申請流程 */}
      <div className="mba-info-section">
        <div className="mba-info-section-title">
          以下是完成報名需繳交的所有資料: 
        </div>
        <ol className="mba-info-list">
          <li>透過學校流程完成申請</li>
          <li>英文版背景履歷表+英文版讀書計畫</li>
          <li>彌封大學成績單英文版</li>
          <li>彌封英文畢業證書英文版</li>
          <li>護照影印本</li>
          <li>財力來源聲明表格</li>
          <li>銀行財力證明 (最少 US$65,000) 台幣約2,150,000左右</li>
          <li>申請費用 US$170 (台幣約 5,600)</li>
          <li>若有要攜帶家人小孩前往就學，需另行告知並填寫特定表格</li>
        </ol>
      </div>

      {/* 將申請條件與預約諮詢整合進 ApplicationForm */}
      <div className="mba-application-section">
        <ApplicationForm />
      </div>
    </div>
  );
}

export default Application;

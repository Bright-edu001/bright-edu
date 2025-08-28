import React from "react";
import "./Application.scss";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero"; // 引入新的組件
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

import ApplicationForm from "../../../components/Application/ApplicationForm";

function Application() {
  return (
    <div className="mba-application-page">
      <MbaAreasHero />
      <SectionContainer>
        <h3 className="mba-application-title">申請資訊</h3>
        {/* 說明文字 */}
        <div className="mba-application-desc">
          <p>
            大學（不含專科）以上學歷，提供彌封版畢業證書及在學成績 （英文 GPA
            版本），無須特定相關工作經驗，有工作經驗可在CV中描述。
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
        <div className="reminder">
          確保提交完整且符合要求的文件，以提升錄取機會！
        </div>

        {/* 將申請條件與預約諮詢整合進 ApplicationForm */}
        <div className="mba-application-section">
          <ApplicationForm />
        </div>
      </SectionContainer>
    </div>
  );
}

export default Application;

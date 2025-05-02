import React from "react";
import "./ApplicationForm.scss";

function ApplicationForm({ showCondition = true }) {
  return (
    <form className="mba-application-form">
      {/* 申請條件區塊 */}
      {showCondition && (
        <>
          <div className="mba-application-section-title">申請條件</div>
          <div className="mba-application-condition-desc">
            每年都有許多的學生從世界各個角落來到UIC就讀，融入芝加哥這座號稱〝美國的脈動〞且具有世界影響力的城市。多元化的學生背景和多元國家文化的交流，創造了UIC世界級的視野。UIC大學教職員工與學生也都積極參與社區服務，為企業機關、政府部門、非營利組織等出謀劃策，致力於提升芝加哥以及世界其他大都市的生活品質，為UIC培育有實力且具有溫度的校園文化。商學院的學生在校期間可以學習到扎實的商業理論及實際的工作技能，許多校友畢業後也都在國際上取得極大的成就。
          </div>
        </>
      )}
      {/* 預約諮詢標題 */}
      <div className="mba-application-section-title">預約諮詢</div>
      <input type="text" placeholder="姓名" />
      <input type="text" placeholder="LINE ID" />
      <input type="email" placeholder="E-MAIL" />
      <textarea placeholder="欲詢問的學校、課程，歡迎在此備註，我們會盡快向您聯絡"></textarea>
      <button type="submit">確定送出</button>
    </form>
  );
}

export default ApplicationForm;

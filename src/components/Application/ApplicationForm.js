import React from "react";
import * as defaultStyles from "./ApplicationFormStyles";
import useFormSubmit from "../../hooks/useFormSubmit";

function ApplicationForm({ showCondition = true, customStyles }) {
  const { StyledApplicationForm, StyledSectionTitle, StyledConditionDesc } =
    customStyles || defaultStyles;

  const { form, handleChange, handleSubmit, submitting } = useFormSubmit();

  return (
    <StyledApplicationForm onSubmit={handleSubmit}>
      {/* 申請條件區塊 */}
      {showCondition && (
        <>
          <StyledSectionTitle>申請條件</StyledSectionTitle>
          <StyledConditionDesc>
            每年都有許多的學生從世界各個角落來到UIC就讀，融入芝加哥這座號稱〝美國的脈動〞且具有世界影響力的城市。多元化的學生背景和多元國家文化的交流，創造了UIC世界級的視野。UIC大學教職員工與學生也都積極參與社區服務，為企業機關、政府部門、非營利組織等出謀劃策，致力於提升芝加哥以及世界其他大都市的生活品質，為UIC培育有實力且具有溫度的校園文化。商學院的學生在校期間可以學習到扎實的商業理論及實際的工作技能，許多校友畢業後也都在國際上取得極大的成就。
          </StyledConditionDesc>
        </>
      )}
      {/* 預約諮詢標題 */}
      <StyledSectionTitle>CONTACT US</StyledSectionTitle>
      <input
        type="text"
        name="name"
        placeholder="*姓名"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lineId"
        placeholder="LINE ID"
        value={form.lineId}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="*E-MAIL"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="欲詢問的學校、課程，歡迎在此備註，我們會盡快向您聯絡"
        value={form.message}
        onChange={handleChange}
        required
      ></textarea>
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        aria-disabled={submitting}
      >
        {submitting && <span className="spinner" aria-hidden="true" />}
        {submitting ? "送出中..." : "確定送出"}
      </button>
    </StyledApplicationForm>
  );
}

export default ApplicationForm;

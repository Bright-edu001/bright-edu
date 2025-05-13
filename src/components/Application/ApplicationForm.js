import React, { useState } from "react";
import {
  StyledApplicationForm,
  StyledSectionTitle,
  StyledConditionDesc,
} from "./ApplicationFormStyles";

function ApplicationForm({ showCondition = true }) {
  const [form, setForm] = useState({
    name: "",
    lineId: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 檢查必填
    if (!form.name || !form.lineId || !form.email || !form.message) {
      alert("請完整填寫所有欄位！");
      return;
    }
    // 新增基本驗證
    if (form.name.trim().length < 2) {
      alert("姓名需大於2個字！");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("請輸入正確的 E-MAIL 格式！");
      return;
    }
    if (form.message.trim().length < 10) {
      alert("備註內容需大於10個字！");
      return;
    }
    setSubmitting(true);
    try {
      // 將此處 URL 換成你的 Google Apps Script Web App URL
      await fetch(
        "https://script.google.com/macros/s/AKfycbwlPwvgxx7g-t1uy76JB09OFrGlVrlBDdEXVahMzvICKbxW2HvLcVpM-C35NoLSNUDS/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
          mode: "no-cors",
        }
      );
      // 因為 no-cors，res.ok/res.status 都無法用，只能假設送出
      alert("送出成功，我們會盡快與您聯絡！");
      setForm({ name: "", lineId: "", email: "", message: "" });
      // 如果要嚴謹判斷成功與否，必須後端支援 CORS
    } catch (err) {
      alert("送出失敗，請檢查網路連線。");
    }
    setSubmitting(false);
  };

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
      <StyledSectionTitle>預約諮詢</StyledSectionTitle>
      <input
        type="text"
        name="name"
        placeholder="姓名"
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
        required
      />
      <input
        type="email"
        name="email"
        placeholder="E-MAIL"
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
      <button type="submit" disabled={submitting}>
        {submitting ? "送出中..." : "確定送出"}
      </button>
    </StyledApplicationForm>
  );
}

export default ApplicationForm;

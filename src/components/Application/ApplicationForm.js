import React from "react";
import * as defaultStyles from "./ApplicationFormStyles";
import useFormSubmit from "../../hooks/useFormSubmit";

function ApplicationForm({ showCondition = true, customStyles }) {
  const { StyledApplicationForm, StyledSectionTitle } =
    customStyles || defaultStyles;

  const { form, handleChange, handleSubmit, submitting } = useFormSubmit();

  return (
    <StyledApplicationForm onSubmit={handleSubmit}>
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

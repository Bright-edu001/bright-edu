import React from "react";
import "./ApplicationForm.scss";
import useFormSubmit from "../../hooks/useFormSubmit";

function ApplicationForm({ showCondition = true, variant = "uic" }) {
  // variant: 'uic' (default/red) or 'msf' (green)
  const { form, handleChange, handleSubmit, submitting } = useFormSubmit();

  const formClass = `application-form ${variant === "msf" ? "application-form--msf" : ""}`;

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      {/* 預約諮詢標題 */}
      <h2 className="application-form__title">CONTACT US</h2>
      <input
        className="application-form__input"
        type="text"
        name="name"
        placeholder="*姓名"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        className="application-form__input"
        type="text"
        name="lineId"
        placeholder="LINE ID"
        value={form.lineId}
        onChange={handleChange}
      />
      <input
        className="application-form__input"
        type="email"
        name="email"
        placeholder="*E-MAIL"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        className="application-form__textarea"
        name="message"
        placeholder="欲詢問的學校、課程，歡迎在此備註，我們會盡快向您聯絡"
        value={form.message}
        onChange={handleChange}
        required
      ></textarea>
      <button
        className="application-form__button"
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        aria-disabled={submitting}
      >
        {submitting && (
          <span className="application-form__spinner" aria-hidden="true" />
        )}
        {submitting ? "送出中..." : "確定送出"}
      </button>
    </form>
  );
}

export default ApplicationForm;

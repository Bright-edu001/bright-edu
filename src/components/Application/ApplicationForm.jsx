import React from "react";
import "./ApplicationForm.scss";
import useFormSubmit from "../../hooks/useFormSubmit";

function ApplicationForm({ showCondition = true, variant = "uic" }) {
  // variant: 'uic' (default/red) or 'msf' (green)
  const { form, handleChange, handleSubmit, submitting } = useFormSubmit();

  const formClass = `application-form ${variant === "msf" ? "application-form--msf" : ""}`;

  // 欄位描述陣列，順序與屬性完全對應原本欄位
  const fields = [
    {
      type: "text",
      name: "name",
      placeholder: "姓名（必填）",
      className: "application-form__input",
      required: true,
      ariaLabel: "姓名（必填）",
    },
    {
      type: "text",
      name: "lineId",
      placeholder: "LINE ID（選填）",
      className: "application-form__input",
      required: false,
      ariaLabel: "LINE ID（選填）",
    },
    {
      type: "email",
      name: "email",
      placeholder: "Email（必填）",
      className: "application-form__input",
      required: true,
      ariaLabel: "Email（必填）",
    },
    {
      type: "textarea",
      name: "message",
      placeholder: "請輸入您的問題或需求，我們將盡快與您聯絡。",
      className: "application-form__textarea",
      required: true,
      ariaLabel: "聯絡內容（必填）",
    },
  ];

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <h2 className="application-form__title">CONTACT US</h2>

      {fields.map((field) =>
        field.type === "textarea" ? (
          <textarea
            key={field.name}
            className={field.className}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            required={field.required}
            aria-label={field.ariaLabel}
          />
        ) : (
          <input
            key={field.name}
            className={field.className}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            required={field.required}
            aria-label={field.ariaLabel}
          />
        ),
      )}

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

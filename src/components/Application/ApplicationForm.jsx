import React from "react";
import "./ApplicationForm.scss";
import useFormSubmit from "../../hooks/useFormSubmit";
import { CONTACT_FORM_FIELDS } from "./applicationFormConstants";

function ApplicationForm({ showCondition = true, variant = "uic" }) {
  // variant: 'uic' (default/red) or 'msf' (green)
  const { form, handleChange, handleSubmit, submitting, notification, clearNotification } = useFormSubmit();

  const formClass = `application-form ${variant === "msf" ? "application-form--msf" : ""}`;

  const fields = CONTACT_FORM_FIELDS;

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <h2 className="application-form__title">CONTACT US</h2>

      {notification && (
        <div
          className={`application-form__notification application-form__notification--${notification.type}`}
          role={notification.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          <span>{notification.content}</span>
          <button
            type="button"
            className="application-form__notification-close"
            onClick={clearNotification}
            aria-label="關閉訊息"
          >
            ×
          </button>
        </div>
      )}

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

/**
 * Contact / Application form constants.
 * Single source of truth for field names, default state, validation rules,
 * validation messages, and field configuration used by both
 * ApplicationForm and useFormSubmit.
 */

// ── Field names ──────────────────────────────────────────────────────────────
export const FORM_FIELD_NAMES = {
  NAME: "name",
  LINE_ID: "lineId",
  EMAIL: "email",
  MESSAGE: "message",
};

// ── Default form state ───────────────────────────────────────────────────────
export const DEFAULT_CONTACT_FORM = {
  [FORM_FIELD_NAMES.NAME]: "",
  [FORM_FIELD_NAMES.LINE_ID]: "",
  [FORM_FIELD_NAMES.EMAIL]: "",
  [FORM_FIELD_NAMES.MESSAGE]: "",
};

// ── Validation rules (numeric limits) ────────────────────────────────────────
export const VALIDATION_RULES = {
  NAME: { MIN: 2, MAX: 50 },
  EMAIL: {},
  LINE_ID: { MAX: 50 },
  MESSAGE: { MIN: 10, MAX: 1000 },
};

// ── Validation messages ───────────────────────────────────────────────────────
export const VALIDATION_MESSAGES = {
  NAME: {
    REQUIRED: "請輸入姓名",
    TOO_SHORT: `姓名至少需要${VALIDATION_RULES.NAME.MIN}個字元`,
    TOO_LONG: `姓名不能超過${VALIDATION_RULES.NAME.MAX}個字元`,
  },
  EMAIL: {
    REQUIRED: "請輸入電子郵件",
    INVALID: "請輸入有效的電子郵件格式",
  },
  LINE_ID: {
    TOO_LONG: `LINE ID 不能超過${VALIDATION_RULES.LINE_ID.MAX}個字元`,
  },
  MESSAGE: {
    REQUIRED: "請輸入訊息內容",
    TOO_SHORT: `訊息內容至少需要${VALIDATION_RULES.MESSAGE.MIN}個字元`,
    TOO_LONG: `訊息內容不能超過${VALIDATION_RULES.MESSAGE.MAX}個字元`,
  },
};

// ── Form field UI configuration (used by ApplicationForm) ────────────────────
export const CONTACT_FORM_FIELDS = [
  {
    type: "text",
    name: FORM_FIELD_NAMES.NAME,
    placeholder: "姓名（必填）",
    className: "application-form__input",
    required: true,
    ariaLabel: "姓名（必填）",
  },
  {
    type: "text",
    name: FORM_FIELD_NAMES.LINE_ID,
    placeholder: "LINE ID（選填）",
    className: "application-form__input",
    required: false,
    ariaLabel: "LINE ID（選填）",
  },
  {
    type: "email",
    name: FORM_FIELD_NAMES.EMAIL,
    placeholder: "Email（必填）",
    className: "application-form__input",
    required: true,
    ariaLabel: "Email（必填）",
  },
  {
    type: "textarea",
    name: FORM_FIELD_NAMES.MESSAGE,
    placeholder: "請輸入您的問題或需求，我們將盡快與您聯絡。",
    className: "application-form__textarea",
    required: true,
    ariaLabel: "聯絡內容（必填）",
  },
];

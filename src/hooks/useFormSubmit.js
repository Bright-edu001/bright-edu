import { useState } from "react";

const DEFAULT_FORM = { name: "", lineId: "", email: "", message: "" };
const API_URL = process.env.REACT_APP_FORM_ENDPOINT;

function useFormSubmit(initialState = DEFAULT_FORM) {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      alert("請完整填寫所有必填欄位！");
      return false;
    }
    if (form.name.trim().length < 2) {
      alert("姓名需大於2個字！");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("請輸入正確的 E-MAIL 格式！");
      return false;
    }
    if (form.message.trim().length < 10) {
      alert("備註內容需大於10個字！");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        mode: "no-cors",
      });
      alert("送出成功，我們會盡快與您聯絡！");
      setForm(initialState);
    } catch (err) {
      alert("送出失敗，請檢查網路連線。");
    }
    setSubmitting(false);
  };

  return { form, handleChange, handleSubmit, submitting };
}

export default useFormSubmit;

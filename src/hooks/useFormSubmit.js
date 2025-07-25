import { useState } from "react";

/**
 * useFormSubmit
 * 這是一個自訂 React Hook，提供表單資料管理、驗證與送出功能。
 * 用法：回傳 form 狀態、handleChange、handleSubmit 及 submitting 狀態。
 */

const DEFAULT_FORM = { name: "", lineId: "", email: "", message: "" };
const API_URL = process.env.REACT_APP_FORM_ENDPOINT;

function useFormSubmit(initialState = DEFAULT_FORM) {
  // 表單資料狀態
  const [form, setForm] = useState(initialState);
  // 送出狀態（避免重複送出）
  const [submitting, setSubmitting] = useState(false);

  /**
   * 處理表單欄位變更
   * @param {Event} e - input 的 onChange 事件
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * 驗證表單資料
   * @returns {boolean} 是否通過驗證
   */
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

  /**
   * 處理表單送出
   * @param {Event} e - form 的 onSubmit 事件
   */
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

  // 回傳表單狀態與操作方法
  return { form, handleChange, handleSubmit, submitting };
}

export default useFormSubmit;

import { useState } from "react";
import { App } from "antd";
import { request } from "../utils/request";

const DEFAULT_FORM = { name: "", lineId: "", email: "", message: "" };
const API_URL = process.env.REACT_APP_FORM_ENDPOINT;

function useFormSubmit(initialState = DEFAULT_FORM) {
  const { message } = App.useApp();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.message) {
      message.error("請完整填寫所有必填欄位！");
      return false;
    }
    if (form.name.trim().length < 2) {
      message.error("姓名需大於2個字！");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      message.error("請輸入正確的 E-MAIL 格式！");
      return false;
    }
    if (form.message.trim().length < 10) {
      message.error("詢問內容需大於10個字！");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    const result = await request("GET", {
      name: "test",
      lineId: "123",
      email: "test@example.com",
      message: "Hello world ++",
    });
    console.log(result);
    //   e.preventDefault();
    //   if (!validate()) return;

    //   setSubmitting(true);
    //   setResult(null);

    //   console.log("=== 開始送出表單 ===");
    //   console.log("表單資料:", form);
    //   console.log("API URL:", API_URL);

    //   try {
    //     // 方法 1: 先嘗試 JSON 格式 (使用 cors 模式)
    //     const jsonResponse = await fetch(API_URL, {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     console.log("JSON 請求回應:", jsonResponse);
    //     if (jsonResponse.ok) {
    //       const responseData = await jsonResponse.json();
    //       console.log("JSON 回應資料:", responseData);
    //       if (responseData.result === "success") {
    //         message.success("送出成功，我們會盡快與您聯絡！");
    //         setForm(initialState);
    //         setResult({ success: true, data: responseData });
    //         return;
    //       }
    //     }

    //     // 方法 2: 如果 JSON 失敗，嘗試 FormData (使用 no-cors 模式)
    //     console.log("嘗試 FormData 方式...");
    //     const formData = new FormData();
    //     Object.keys(form).forEach((key) => formData.append(key, form[key]));
    //     const formResponse = await fetch(API_URL, {
    //       method: "POST",
    //       body: formData,
    //       mode: "no-cors",
    //     });
    //     console.log("FormData 請求回應:", formResponse);
    //     if (formResponse.type === "opaque") {
    //       console.log("FormData 請求完成 (no-cors mode)");
    //       message.success("送出成功，我們會盡快與您聯絡！");
    //       setForm(initialState);
    //       setResult({ success: true, method: "formdata" });
    //       return;
    //     }

    //     // 方法 3: 最後嘗試 URL 編碼格式
    //     console.log("嘗試 URL 編碼方式...");
    //     const urlParams = new URLSearchParams();
    //     Object.keys(form).forEach((key) => urlParams.append(key, form[key]));
    //     console.log("URL 編碼資料:", urlParams.toString());
    //     const urlResponse = await fetch(API_URL, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //       body: urlParams,
    //       mode: "no-cors",
    //     });
    //     console.log("URL 編碼請求回應:", urlResponse);
    //     if (urlResponse.type === "opaque") {
    //       console.log("URL 編碼請求完成 (no-cors mode)");
    //       message.success("送出成功，我們會盡快與您聯絡！");
    //       setForm(initialState);
    //       setResult({ success: true, method: "urlencoded" });
    //       return;
    //     }

    //     // 如果所有方法都沒有返回成功
    //     message.error("送出失敗，請稍後再試或聯絡管理員");
    //     setResult({ success: false, error: "所有提交方法都失敗" });
    //   } catch (error) {
    //     console.error("提交過程中發生錯誤:", error);
    //     message.error("送出失敗，請稍後再試或聯絡管理員");
    //     setResult({ success: false, error: error.message });
    //   } finally {
    //     setSubmitting(false);
    //     console.log("=== 表單送出完成 ===");
    //   }
  };

  return { form, handleChange, handleSubmit, submitting, result };
}

export default useFormSubmit;

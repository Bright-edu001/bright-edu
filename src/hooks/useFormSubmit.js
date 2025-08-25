import { useState } from "react";
import { App } from "antd";
import { request } from "../utils/request";
import { contactService } from "../services/contactService";
import logger from "../utils/logger";

const DEFAULT_FORM = { name: "", lineId: "", email: "", message: "" };

function useFormSubmit(initialState = DEFAULT_FORM) {
  const { message } = App.useApp();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // 使用 utils/request 的封裝，這裡不直接讀取環境變數端點

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
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setResult(null);

    const payload = { ...form };
    logger.log("開始送出表單:", payload);

    // 立即顯示處理中提示（使用同一個 key，後續更新為成功/失敗）
    const messageKey = "contact-form-submit";
    message.loading({
      content: "已收到，正在處理…",
      key: messageKey,
      duration: 0,
    });

    try {
      // 使用新的聯絡服務，同時儲存到 Google Sheets 和 Firestore
      const results = await contactService.saveToBoth(payload, request);

      logger.log("表單儲存結果:", results);

      // 重置表單
      setForm(initialState);

      // 根據儲存結果顯示不同訊息
      if (results.googleSheets.success && results.firestore.success) {
        setResult({
          success: true,
          results,
          message: "表單已成功儲存到所有系統",
        });
        message.success({
          content: "表單已送出並備份完成，我們會盡快與您聯絡！",
          key: messageKey,
          duration: 2,
        });
      } else if (results.googleSheets.success || results.firestore.success) {
        setResult({
          success: true,
          results,
          message: "表單已部分儲存成功",
        });
        message.success({
          content: "表單已送出，我們會盡快與您聯絡！",
          key: messageKey,
          duration: 2,
        });
      } else {
        throw new Error("所有儲存方式都失敗了");
      }
    } catch (error) {
      logger.error("表單送出失敗:", error);
      setResult({ success: false, error: error?.message });
      message.error({
        content: "送出失敗，請稍後再試或改用其他聯絡方式。",
        key: messageKey,
        duration: 3,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // 測試連接的函數（使用 GET 方式，比較容易測試）
  const testConnection = async () => {
    try {
      const testData = {
        name: "連接測試",
        lineId: "test123",
        email: "test@example.com",
        message: "這是一個測試連接的訊息，請忽略",
      };

      logger.log("開始連接測試...");
      const response = await request("GET", testData);
      logger.log("連接測試回應:", response);

      message.success("連接測試完成！請檢查 Google Sheets 是否有測試資料");
      return response;
    } catch (error) {
      logger.error("連接測試失敗:", error);
      message.warning("連接測試無法確定結果，請檢查 Google Sheets");
      return { result: "unknown", message: "測試完成但無法確定結果" };
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    submitting,
    result,
    testConnection,
  };
}

export default useFormSubmit;

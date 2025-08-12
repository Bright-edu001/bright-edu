import { useState } from "react";
import { App } from "antd";
import { request } from "../utils/request";
import logger from "../utils/logger";

const DEFAULT_FORM = { name: "", lineId: "", email: "", message: "" };

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
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setResult(null);

    logger.log("=== 開始送出表單 ===");
    logger.log("表單資料:", form);

    try {
      let response;
      let success = false;

      // 先嘗試 POST 請求
      try {
        logger.log("嘗試 POST 請求...");
        response = await request("POST", form);
        logger.log("POST 請求回應:", response);

        if (response && response.result === "success") {
          success = true;
        }
      } catch (postError) {
        logger.log("POST 請求失敗:", postError);
      }

      // 如果 POST 失敗，嘗試 GET 請求
      if (!success) {
        try {
          logger.log("POST 失敗，嘗試 GET 請求...");
          response = await request("GET", form);
          logger.log("GET 請求回應:", response);

          if (response && response.result === "success") {
            success = true;
          }
        } catch (getError) {
          logger.log("GET 請求也失敗:", getError);
        }
      }

      // 由於使用 no-cors 模式，我們無法確定伺服器是否真的成功處理了請求
      // 但如果沒有拋出錯誤，通常表示請求已發送
      if (success || response) {
        message.success("表單已送出，我們會盡快與您聯絡！");
        setForm(initialState);
        setResult({
          success: true,
          data: response,
          note: "由於技術限制，無法確認伺服器處理狀態，但請求已發送",
        });
      } else {
        throw new Error("請求發送失敗");
      }
    } catch (error) {
      logger.error("提交表單時發生錯誤:", error);
      message.error(`送出失敗：${error.message}`);
      setResult({
        success: false,
        error: error.message,
      });
    } finally {
      setSubmitting(false);
      logger.log("=== 表單送出完成 ===");
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

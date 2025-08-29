import { useState, useCallback } from "react";
import { App } from "antd";
import { contactService } from "../services/contactService";
import logger from "../utils/logger";

const DEFAULT_FORM = { name: "", lineId: "", email: "", message: "" };

function useFormSubmit(initialState = DEFAULT_FORM) {
  const { message } = App.useApp();
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  // 請求去重機制
  const [submitPromise, setSubmitPromise] = useState(null);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(DEFAULT_FORM);
    setResult(null);
  }, []);

  const validateForm = useCallback((formData) => {
    const errors = {};

    // 姓名驗證
    if (!formData.name?.trim()) {
      errors.name = "請輸入姓名";
    } else if (formData.name.trim().length < 2) {
      errors.name = "姓名至少需要2個字元";
    } else if (formData.name.trim().length > 50) {
      errors.name = "姓名不能超過50個字元";
    }

    // Email 驗證
    if (!formData.email?.trim()) {
      errors.email = "請輸入電子郵件";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "請輸入有效的電子郵件格式";
      }
    }

    // 訊息驗證
    if (!formData.message?.trim()) {
      errors.message = "請輸入訊息內容";
    } else if (formData.message.trim().length < 10) {
      errors.message = "訊息內容至少需要10個字元";
    } else if (formData.message.trim().length > 1000) {
      errors.message = "訊息內容不能超過1000個字元";
    }

    // LINE ID 驗證（可選）
    if (formData.lineId && formData.lineId.trim().length > 0) {
      if (formData.lineId.trim().length > 50) {
        errors.lineId = "LINE ID 不能超過50個字元";
      }
    }

    return errors;
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      // 防止重複提交
      if (submitPromise) {
        logger.warn("表單正在送出中，忽略重複請求");
        return;
      }

      const startTime = performance.now();
      logger.info("[FORM_SUBMIT] 表單送出開始", {
        timestamp: new Date().toISOString(),
        startTime,
      });

      setSubmitting(true);
      setResult(null);

      const promise = (async () => {
        try {
          // 表單驗證
          const validationErrors = validateForm(form);
          if (Object.keys(validationErrors).length > 0) {
            const errorMessages = Object.values(validationErrors);
            message.error(errorMessages[0]);
            logger.warn("[FORM_SUBMIT] 表單驗證失敗", validationErrors);
            return { success: false, errors: validationErrors };
          }

          // 準備表單資料
          const payload = {
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            lineId: form.lineId?.trim() || "",
            message: form.message.trim(),
            source: "website_contact_form",
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date(),
          };

          logger.info("[FORM_SUBMIT] 開始提交到 Firestore", payload);

          // 使用新的聯絡服務，只儲存到 Firestore
          const results = await contactService.saveToBoth(payload);

          const totalTime = performance.now() - startTime;
          logger.info("[FORM_SUBMIT] 表單送出完成", {
            totalTime: `${totalTime.toFixed(2)}ms`,
            success: true,
            firestoreSuccess: results.firestore.success,
            documentId: results.firestore.docId,
          });

          // 設置結果
          setResult({
            success: true,
            message: "表單已成功提交！",
            totalTime: `${totalTime.toFixed(2)}ms`,
            documentId: results.firestore.docId,
          });

          // 顯示成功訊息
          if (results.firestore.success) {
            message.success({
              content: "表單已成功提交！我們會盡快與您聯繫。",
              duration: 6,
            });

            // 重置表單
            resetForm();

            logger.log("✅ 表單已成功提交並重置");
          } else {
            throw new Error(results.firestore.error?.message || "表單提交失敗");
          }

          return { success: true, results };
        } catch (error) {
          const totalTime = performance.now() - startTime;
          logger.error("[FORM_SUBMIT] 表單送出失敗", {
            error: error.message,
            totalTime: `${totalTime.toFixed(2)}ms`,
          });

          setResult({
            success: false,
            message: error.message || "送出失敗，請稍後再試",
            totalTime: `${totalTime.toFixed(2)}ms`,
          });

          message.error({
            content: error.message || "送出失敗，請稍後再試",
            duration: 4,
          });

          throw error;
        }
      })();

      setSubmitPromise(promise);

      try {
        return await promise;
      } finally {
        setSubmitPromise(null);
        setSubmitting(false);
      }
    },
    [form, submitPromise, message, validateForm, resetForm]
  );

  const testConnection = useCallback(async () => {
    try {
      logger.log("開始 Firestore 連接測試");
      message.loading({
        content: "測試 Firestore 連接中...",
        key: "test",
        duration: 0,
      });

      const testData = {
        name: "連接測試",
        email: "test@example.com",
        lineId: "",
        message: "這是一個連接測試訊息",
        source: "connection_test",
        timestamp: new Date(),
      };

      const result = await contactService.submitContactForm(testData);

      if (result.success) {
        message.success({
          content: "Firestore 連接測試成功！",
          key: "test",
          duration: 4,
        });
      } else {
        message.error({
          content: `Firestore 連接測試失敗: ${result.error}`,
          key: "test",
          duration: 4,
        });
      }
    } catch (error) {
      logger.error("Firestore 連接測試失敗:", error);
      message.error({
        content: `連接測試失敗: ${error.message}`,
        key: "test",
        duration: 4,
      });
    }
  }, [message]);

  return {
    form,
    setForm,
    updateField,
    resetForm,
    submitting,
    result,
    handleSubmit,
    testConnection,
    validateForm,
  };
}

export default useFormSubmit;

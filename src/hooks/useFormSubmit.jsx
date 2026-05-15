import { useState, useCallback } from "react";
import { contactService } from "../services/contactService";
import logger from "../utils/logger";
import {
  DEFAULT_CONTACT_FORM,
  VALIDATION_RULES,
  VALIDATION_MESSAGES,
} from "../components/Application/applicationFormConstants";

const DEFAULT_FORM = DEFAULT_CONTACT_FORM;

function useFormSubmit(initialState = DEFAULT_FORM) {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [notification, setNotification] = useState(null);
  // 請求去重機制
  const [submitPromise, setSubmitPromise] = useState(null);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      updateField(name, value);
    },
    [updateField]
  );

  const resetForm = useCallback(() => {
    setForm(DEFAULT_FORM);
    setResult(null);
  }, []);

  const clearNotification = useCallback(() => setNotification(null), []);

  const validateForm = useCallback((formData) => {
    const errors = {};

    // 姓名驗證
    if (!formData.name?.trim()) {
      errors.name = VALIDATION_MESSAGES.NAME.REQUIRED;
    } else if (formData.name.trim().length < VALIDATION_RULES.NAME.MIN) {
      errors.name = VALIDATION_MESSAGES.NAME.TOO_SHORT;
    } else if (formData.name.trim().length > VALIDATION_RULES.NAME.MAX) {
      errors.name = VALIDATION_MESSAGES.NAME.TOO_LONG;
    }

    // Email 驗證
    if (!formData.email?.trim()) {
      errors.email = VALIDATION_MESSAGES.EMAIL.REQUIRED;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = VALIDATION_MESSAGES.EMAIL.INVALID;
      }
    }

    // 訊息驗證
    if (!formData.message?.trim()) {
      errors.message = VALIDATION_MESSAGES.MESSAGE.REQUIRED;
    } else if (formData.message.trim().length < VALIDATION_RULES.MESSAGE.MIN) {
      errors.message = VALIDATION_MESSAGES.MESSAGE.TOO_SHORT;
    } else if (formData.message.trim().length > VALIDATION_RULES.MESSAGE.MAX) {
      errors.message = VALIDATION_MESSAGES.MESSAGE.TOO_LONG;
    }

    // LINE ID 驗證（可選）
    if (formData.lineId && formData.lineId.trim().length > 0) {
      if (formData.lineId.trim().length > VALIDATION_RULES.LINE_ID.MAX) {
        errors.lineId = VALIDATION_MESSAGES.LINE_ID.TOO_LONG;
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
            setNotification({ type: "error", content: errorMessages[0] });
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
            setNotification({
              type: "success",
              content: "表單已成功提交！我們會盡快與您聯繫。",
            });

            // 重置表單但保留結果
            setForm(DEFAULT_FORM);

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

          setNotification({
            type: "error",
            content: error.message || "送出失敗，請稍後再試",
          });

          return { success: false, error: error.message };
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
    [form, submitPromise, validateForm]
  );

  const testConnection = useCallback(async () => {
    try {
      logger.log("開始 Firestore 連接測試");
      setNotification({ type: "loading", content: "測試 Firestore 連接中..." });

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
        setNotification({ type: "success", content: "Firestore 連接測試成功！" });
      } else {
        setNotification({
          type: "error",
          content: `Firestore 連接測試失敗: ${result.error}`,
        });
      }
    } catch (error) {
      logger.error("Firestore 連接測試失敗:", error);
      setNotification({
        type: "error",
        content: `連接測試失敗: ${error.message}`,
      });
    }
  }, []);

  return {
    form,
    setForm,
    updateField,
    handleChange,
    resetForm,
    submitting,
    result,
    notification,
    clearNotification,
    handleSubmit,
    testConnection,
    validateForm,
  };
}

export default useFormSubmit;

import { useState, useEffect, useRef, useCallback } from "react";
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
  // 🔥 添加請求去重機制
  const [submitPromise, setSubmitPromise] = useState(null);
  // 🔥 優化 3: 背景預載狀態追蹤
  const [preloadCompleted, setPreloadCompleted] = useState(false);
  const preloadTriggeredRef = useRef(false);

  // 🔥 優化 3: 背景預載機制
  const triggerPreload = useCallback(async () => {
    if (preloadTriggeredRef.current || preloadCompleted) return;

    preloadTriggeredRef.current = true;
    logger.performance("🚀 開始背景預載連接...");

    try {
      // 預先建立網路連接
      const preloadPromises = [
        // 預載 Google Sheets 連接
        new Promise((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => resolve();
          img.src = process.env.REACT_APP_FORM_ENDPOINT + "?preload=1";
        }),

        // 預載 Firebase 連接 (通過快速的讀取操作)
        import("../config/firebaseConfig").then(({ db }) => {
          // 這是一個輕量級的 Firebase 連接測試
          return new Promise((resolve) => {
            // 設置短時間超時，不影響主要功能
            const timeout = setTimeout(resolve, 500);
            import("firebase/firestore")
              .then(({ enableNetwork }) => {
                enableNetwork(db)
                  .then(() => {
                    clearTimeout(timeout);
                    resolve();
                  })
                  .catch(() => {
                    clearTimeout(timeout);
                    resolve();
                  });
              })
              .catch(() => {
                clearTimeout(timeout);
                resolve();
              });
          });
        }),
      ];

      await Promise.allSettled(preloadPromises);
      setPreloadCompleted(true);
      logger.performance("✅ 背景預載完成");
    } catch (error) {
      logger.warn("⚠️ 背景預載部分失敗:", error);
      setPreloadCompleted(true); // 即使失敗也標記完成，避免重複嘗試
    }
  }, [preloadCompleted]);

  // 🔥 優化 3: 當用戶開始填寫時觸發預載
  useEffect(() => {
    if (
      form.name.length > 0 ||
      form.email.length > 0 ||
      form.message.length > 0
    ) {
      triggerPreload();
    }
  }, [form.name, form.email, form.message, triggerPreload]);

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

    // 🔥 請求去重：如果正在送出，忽略重複請求
    if (submitPromise) {
      logger.warn("⚠️ 表單正在送出中，忽略重複請求");
      message.warning("表單正在送出中，請稍候...");
      return;
    }

    // 創建新的送出 Promise
    const currentSubmitPromise = performSubmit(e);
    setSubmitPromise(currentSubmitPromise);

    try {
      return await currentSubmitPromise;
    } finally {
      setSubmitPromise(null);
    }
  };

  // 🔥 實際的表單送出邏輯
  const performSubmit = async (e) => {
    setSubmitting(true);
    setResult(null);

    const payload = { ...form };

    // 🔥 表單送出時間記錄開始
    const submitStartTime = performance.now();
    const submitTimestamp = new Date().toISOString();

    // 使用新的表單送出日誌功能，在所有環境都會記錄
    logger.formSubmit("📝 表單送出開始:", {
      timestamp: submitTimestamp,
      payload: payload,
      startTime: submitStartTime,
    });

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

      // 🔥 計算並記錄總送出時間
      const submitEndTime = performance.now();
      const totalSubmitTime = submitEndTime - submitStartTime;
      const endTimestamp = new Date().toISOString();

      // 使用新的效能日誌功能，在所有環境都會記錄
      logger.formSubmit("✅ 表單送出完成:", {
        timestamp: endTimestamp,
        totalTime: `${totalSubmitTime.toFixed(2)}ms`,
        totalTimeSeconds: `${(totalSubmitTime / 1000).toFixed(2)}s`,
        results: results,
        googleSheetsSuccess: results.googleSheets.success,
        firestoreSuccess: results.firestore.success,
      });

      // 效能分析提示（在所有環境記錄）
      if (totalSubmitTime > 5000) {
        logger.performance(
          "⚠️ 表單送出時間過長:",
          `${(totalSubmitTime / 1000).toFixed(2)}s`
        );
      } else if (totalSubmitTime > 3000) {
        logger.performance(
          "⚡ 表單送出時間較慢:",
          `${(totalSubmitTime / 1000).toFixed(2)}s`
        );
      } else {
        logger.performance(
          "🚀 表單送出時間正常:",
          `${(totalSubmitTime / 1000).toFixed(2)}s`
        );
      }

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
          content: "表單已送出完成，我們會盡快與您聯絡！",
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
      // 🔥 記錄失敗情況的時間
      const submitEndTime = performance.now();
      const totalSubmitTime = submitEndTime - submitStartTime;
      const errorTimestamp = new Date().toISOString();

      // 使用新的表單送出日誌功能，在所有環境都會記錄
      logger.formSubmit("❌ 表單送出失敗:", {
        timestamp: errorTimestamp,
        totalTime: `${totalSubmitTime.toFixed(2)}ms`,
        totalTimeSeconds: `${(totalSubmitTime / 1000).toFixed(2)}s`,
        error: error?.message,
        errorDetails: error,
      });

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

import logger from "./logger";

const Url = process.env.REACT_APP_FORM_ENDPOINT;

// REQUEST (GET, POST) value --擇一
export const request = async (method, data) => {
  // 🔥 記錄請求開始時間
  const requestStartTime = performance.now();
  const requestTimestamp = new Date().toISOString();

  logger.log(`🌐 發送 ${method} 請求開始:`, {
    timestamp: requestTimestamp,
    method: method,
    data: data,
    url: Url,
    startTime: requestStartTime,
  });

  try {
    let response;

    if (method === "GET") {
      // GET 請求：將資料附加到 URL 參數
      const queryString = ObjectToQueryString(data);
      const fullUrl = `${Url}?${queryString}`;

      logger.log("🔗 完整 GET URL:", fullUrl);

      // 先嘗試 cors 模式
      try {
        const corsStartTime = performance.now();
        response = await fetch(fullUrl, {
          method: "GET",
          mode: "cors",
        });

        if (response.ok) {
          const corsEndTime = performance.now();
          const corsTime = corsEndTime - corsStartTime;
          const result = await response.json();

          const requestEndTime = performance.now();
          const totalRequestTime = requestEndTime - requestStartTime;

          logger.log("✅ GET CORS 模式成功:", {
            result: result,
            corsTime: `${corsTime.toFixed(2)}ms`,
            totalTime: `${totalRequestTime.toFixed(2)}ms`,
            totalTimeSeconds: `${(totalRequestTime / 1000).toFixed(2)}s`,
          });
          return result;
        }
      } catch (corsError) {
        const corsFailTime = performance.now();
        const corsAttemptTime = corsFailTime - requestStartTime;
        logger.log("⚠️ GET CORS 模式失敗，嘗試 no-cors:", {
          error: corsError.message,
          attemptTime: `${corsAttemptTime.toFixed(2)}ms`,
        });
      }

      // 如果 cors 失敗，使用 no-cors
      const noCorsStartTime = performance.now();
      response = await fetch(fullUrl, {
        method: "GET",
        mode: "no-cors",
      });

      // no-cors 模式無法讀取回應，假設成功
      const requestEndTime = performance.now();
      const totalRequestTime = requestEndTime - requestStartTime;
      const noCorsTime = requestEndTime - noCorsStartTime;

      logger.log("✅ GET no-cors 請求已發送:", {
        noCorsTime: `${noCorsTime.toFixed(2)}ms`,
        totalTime: `${totalRequestTime.toFixed(2)}ms`,
        totalTimeSeconds: `${(totalRequestTime / 1000).toFixed(2)}s`,
      });
      return { result: "success", message: "GET 請求已發送 (no-cors 模式)" };
    } else if (method === "POST") {
      // POST 請求：🔥 並行嘗試多種方式以提升效能
      logger.log("📝 並行嘗試多種 POST 方式...");

      // 準備不同格式的請求資料
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
          formData.append(key, data[key]);
        }
      });

      const urlParams = new URLSearchParams();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
          urlParams.append(key, data[key]);
        }
      });

      // 🔥 並行發送三種不同格式的請求
      const promises = [
        // 方式 1: FormData + no-cors
        fetch(Url, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }).then(() => ({
          method: "FormData",
          result: "success",
          message: "FormData 請求已發送 (no-cors 模式)",
        })),

        // 方式 2: URLSearchParams + no-cors
        fetch(Url, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlParams,
        }).then(() => ({
          method: "URLSearchParams",
          result: "success",
          message: "URLSearchParams 請求已發送 (no-cors 模式)",
        })),

        // 方式 3: JSON + no-cors
        fetch(Url, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        }).then(() => ({
          method: "JSON",
          result: "success",
          message: "JSON 請求已發送 (no-cors 模式)",
        })),
      ];

      try {
        // 🔥 使用 Promise.race 取得最快回應的請求
        const fastestResult = await Promise.race(promises);

        const requestEndTime = performance.now();
        const totalRequestTime = requestEndTime - requestStartTime;

        logger.log("✅ POST 請求成功 (最快方式):", {
          method: fastestResult.method,
          result: fastestResult,
          totalTime: `${totalRequestTime.toFixed(2)}ms`,
          totalTimeSeconds: `${(totalRequestTime / 1000).toFixed(2)}s`,
        });

        return fastestResult;
      } catch (error) {
        // 如果所有並行請求都失敗，等待所有請求完成並記錄錯誤
        const results = await Promise.allSettled(promises);
        const failedRequests = results.filter((r) => r.status === "rejected");

        logger.log("⚠️ 所有並行 POST 請求都失敗:", {
          failedCount: failedRequests.length,
          errors: failedRequests.map((r) => r.reason?.message),
        });

        throw new Error("所有 POST 方式都失敗了");
      }
    } else {
      throw new Error(`不支援的請求方法: ${method}`);
    }
  } catch (error) {
    // 🔥 記錄請求失敗的總時間
    const requestEndTime = performance.now();
    const totalRequestTime = requestEndTime - requestStartTime;

    logger.error(`❌ ${method} 請求失敗:`, {
      error: error.message,
      totalTime: `${totalRequestTime.toFixed(2)}ms`,
      totalTimeSeconds: `${(totalRequestTime / 1000).toFixed(2)}s`,
      errorDetails: error,
    });
    throw error;
  }
};

// 將物件轉換為 URL 查詢字串
const ObjectToQueryString = (data) => {
  return Object.keys(data)
    .filter(
      (key) => data[key] !== null && data[key] !== undefined && data[key] !== ""
    )
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
};

// 便利函數：GET 請求
export const get = async (data) => {
  return await request("GET", data);
};

// 便利函數：POST 請求
export const post = async (data) => {
  return await request("POST", data);
};

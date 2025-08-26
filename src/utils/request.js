import logger from "./logger";

const Url = process.env.REACT_APP_FORM_ENDPOINT;

// REQUEST (GET, POST) value --擇一
export const request = async (method, data) => {
  logger.log(`發送 ${method} 請求:`, data);
  logger.log("目標 URL:", Url);

  try {
    let response;

    if (method === "GET") {
      // GET 請求：將資料附加到 URL 參數
      const queryString = ObjectToQueryString(data);
      const fullUrl = `${Url}?${queryString}`;

      logger.log("完整 GET URL:", fullUrl);

      // 先嘗試 cors 模式
      try {
        response = await fetch(fullUrl, {
          method: "GET",
          mode: "cors",
        });

        if (response.ok) {
          const result = await response.json();
          logger.log("GET CORS 模式成功:", result);
          return result;
        }
      } catch (corsError) {
        logger.log("GET CORS 模式失敗，嘗試 no-cors:", corsError);
      }

      // 如果 cors 失敗，使用 no-cors
      response = await fetch(fullUrl, {
        method: "GET",
        mode: "no-cors",
      });

      // no-cors 模式無法讀取回應，假設成功
      logger.log("GET no-cors 請求已發送");
      return { result: "success", message: "GET 請求已發送 (no-cors 模式)" };
    } else if (method === "POST") {
      // POST 請求：嘗試多種方式

      // 方式 1: 嘗試 FormData + no-cors
      try {
        logger.log("嘗試 FormData + no-cors...");
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          if (
            data[key] !== null &&
            data[key] !== undefined &&
            data[key] !== ""
          ) {
            formData.append(key, data[key]);
          }
        });

        response = await fetch(Url, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });

        logger.log("FormData no-cors 請求已發送");
        return {
          result: "success",
          message: "FormData 請求已發送 (no-cors 模式)",
        };
      } catch (formDataError) {
        logger.log("FormData 方式失敗:", formDataError);
      }

      // 方式 2: 嘗試 URL 編碼 + no-cors
      try {
        logger.log("嘗試 URLSearchParams + no-cors...");
        const urlParams = new URLSearchParams();
        Object.keys(data).forEach((key) => {
          if (
            data[key] !== null &&
            data[key] !== undefined &&
            data[key] !== ""
          ) {
            urlParams.append(key, data[key]);
          }
        });

        response = await fetch(Url, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlParams,
        });

        logger.log("URLSearchParams no-cors 請求已發送");
        return {
          result: "success",
          message: "URLSearchParams 請求已發送 (no-cors 模式)",
        };
      } catch (urlParamsError) {
        logger.log("URLSearchParams 方式失敗:", urlParamsError);
      }

      // 方式 3: 最後嘗試 JSON + no-cors
      try {
        logger.log("嘗試 JSON + no-cors...");
        response = await fetch(Url, {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data),
        });

        logger.log("JSON no-cors 請求已發送");
        return { result: "success", message: "JSON 請求已發送 (no-cors 模式)" };
      } catch (jsonError) {
        logger.log("JSON 方式也失敗:", jsonError);
        throw new Error("所有 POST 方式都失敗了");
      }
    } else {
      throw new Error(`不支援的請求方法: ${method}`);
    }
  } catch (error) {
    logger.error(`${method} 請求失敗:`, error);
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

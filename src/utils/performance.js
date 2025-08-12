import logger from "./logger";

// CSS 動態載入優化工具
const loadedStyles = new Set();

export const loadStylesheet = (stylePath) => {
  return new Promise((resolve, reject) => {
    // 避免重複載入
    if (loadedStyles.has(stylePath)) {
      resolve();
      return;
    }

    import(stylePath)
      .then(() => {
        loadedStyles.add(stylePath);
        resolve();
      })
      .catch((err) => {
        logger.error("Failed to load style", err);
        reject(err || new Error("Failed to load style"));
      });
  });
};

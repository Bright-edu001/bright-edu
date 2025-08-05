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
      .catch(reject);
  });
};

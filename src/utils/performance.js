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

// Debounce 工具優化
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

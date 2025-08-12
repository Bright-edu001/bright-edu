// src/utils/getImageUrl.js

const BUCKET_NAME = "bright-edu-data.firebasestorage.app";

/**
 * 根據本地路徑生成 Firebase Storage 的公開 URL。
 * @param {string} localPath - 專案中使用的本地圖片路徑，例如 "/images/Uic/Mba/image.webp"。
 * @returns {string} - 對應的 Firebase Storage 完整 URL。
 */
const getImageUrl = (localPath) => {
  // 檢查路徑是否有效
  if (!localPath || !localPath.startsWith("/images/")) {
    console.warn(`傳遞給 getImageUrl 的路徑無效: ${localPath}`);
    return localPath; // 如果路徑無效，返回原路徑以避免錯誤
  }

  // 移除開頭的 '/images/'，得到在 Storage 中的實際路徑
  const storagePath = localPath.substring("/images/".length);

  // 對路徑進行 URL 編碼，以處理特殊字元或資料夾結構
  const encodedPath = encodeURIComponent(storagePath);

  // 組合最終的 URL
  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET_NAME}/o/${encodedPath}?alt=media`;
};

export default getImageUrl;

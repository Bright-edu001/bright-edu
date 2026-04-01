// src/utils/getImageUrl.js
import logger from "./logger.js";

const BUCKET_NAME =
  ((import.meta.env || {}).VITE_STORAGE_BUCKET) || "bright-edu-data.firebasestorage.app";

/**
 * 根據本地路徑生成 Firebase Storage 的公開 URL。
 * @param {string} localPath - 專案中使用的本地圖片路徑，例如 "/images/Uic/Mba/image.webp"。
 * @returns {string} - 對應的 Firebase Storage 完整 URL。
 */
const getImageUrl = (localPath) => {
  // 檢查路徑是否有效
  if (!localPath) return localPath;

  let storagePath = "";
  if (localPath.startsWith("/images/")) {
    storagePath = localPath.substring("/images/".length);
  } else if (localPath.startsWith("images/")) {
    storagePath = localPath.substring("images/".length);
  } else {
    logger.warn(
      `傳遞給 getImageUrl 的路徑無效 (需以 /images/ 或 images/ 開頭): ${localPath}`,
    );
    return localPath;
  }

  // 對路徑進行 URL 編碼
  const encodedPath = encodeURIComponent(storagePath);

  // 組合最終的 URL
  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET_NAME}/o/${encodedPath}?alt=media`;
};

export default getImageUrl;

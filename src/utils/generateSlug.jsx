// @ts-check
/**
 * 從文章標題產生 URL 安全的 slug 字串
 * - 去除 HTML 標籤（title 可能含 <img> 等）
 * - 轉小寫、替換特殊字元為連字號
 * - 長度限制 80 字元
 * - 純中文 title 無法產生有意義的 slug 時回傳 null，由 caller 改用 doc.id
 *
 * @param {string} title - 文章標題（可含 HTML）
 * @returns {string|null} slug 字串，或 null（無法產生時）
 */
export function generateSlug(title) {
  if (!title || typeof title !== "string") return null;

  const text = title
    .replace(/<[^>]+>/g, " ") // 去除 HTML 標籤，保留空白間距
    .replace(/&[a-z]+;/gi, " ") // 去除 HTML entities（&amp; &lt; 等）
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // 去除特殊字元，保留英數、空白、連字號
    .replace(/[\s_]+/g, "-") // 空白與底線轉連字號
    .replace(/-{2,}/g, "-") // 合併多個連字號
    .replace(/^-+|-+$/g, "") // 去除首尾連字號
    .slice(0, 80)
    .replace(/-+$/g, ""); // 截斷後再次去除尾部連字號

  return text.length > 0 ? text : null;
}

/**
 * 確保 slug 在指定集合內唯一，若有衝突則加數字後綴
 * 需在有 Firestore query 權限的環境中使用（前台 client side）
 *
 * @param {string} baseSlug - 基礎 slug
 * @param {Function} checkExists - async (slug) => boolean，檢查 slug 是否已存在
 * @returns {Promise<string>} 唯一的 slug
 */
export async function ensureUniqueSlug(baseSlug, checkExists) {
  let slug = baseSlug;
  let counter = 2;

  while (await checkExists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    if (counter > 100) {
      // 防止無限迴圈，加時間戳後綴
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }

  return slug;
}

// 取得資產的公開 URL 路徑
export default function getAssetUrl(path = "") {
  let base = import.meta.env.BASE_URL || "/"; // 取得 base 路徑

  // 如果有提供路徑，我們需避免 base 結尾斜線與 path 開頭斜線重複，導致雙斜線
  if (base.endsWith("/")) base = base.slice(0, -1);
  if (!path) return base || "/";

  // 確保目標路徑以斜線開頭
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

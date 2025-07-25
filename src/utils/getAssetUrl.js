// 取得資產的公開 URL 路徑
export default function getAssetUrl(path = "") {
  const base = process.env.PUBLIC_URL || ""; // 取得 base 路徑
  if (!path) return base; // 若未提供路徑則回傳 base
  if (path.startsWith("/")) {
    // 若路徑以斜線開頭，直接拼接 base
    return `${base}${path}`;
  }
  // 其他情況則 base 與路徑之間加斜線
  return `${base}/${path}`;
}

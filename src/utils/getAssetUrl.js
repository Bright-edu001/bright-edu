export default function getAssetUrl(path = "") {
  const base = process.env.PUBLIC_URL || "";
  if (!path) return base;
  if (path.startsWith("/")) {
    return `${base}${path}`;
  }
  return `${base}/${path}`;
}

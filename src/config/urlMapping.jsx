// @ts-check
// URL 映射配置：英文路由 -> 中文路由
/**
 * @type {Record<string, string>}
 */
export const urlMapping = {
  // UIC 相關路由
  "uic-business-school": "伊利諾大學芝加哥分校",
  uic: "UIC商學院碩士",
  "about-uic": "學校介紹",
  "rankings-awards": "排名與獎項",
  "career-resources": "職涯資源",
  chicago: "芝加哥城市",
  "food-attractions": "景點與美食",
  economy: "芝加哥經濟",
  faq: "常見問題",

  // MBA 相關路由
  mba: "MBA-Programs",
  areas: "五大領域",
  management: "Management",
  finance: "Finance",
  analytics: "Business-Analytics",
  marketing: "Marketing",
  "human-resource": "Human-Resource-Management",
  advantages: "課程優勢",
  "core-courses": "核心課程",
  "dual-degree": "雙碩士銜接課程",
  application: "申請資訊",

  // MS 相關路由
  ms: "MS-Programs",
  msprograms: "課程介紹",
  programs: "課程介紹",
  "supply-chain-operation-management": "供應鏈營運管理碩士",
  "business-analytics": "商業分析碩士",
  "management-information-systems": "管理資訊系統碩士",
  accounting: "會計碩士",

  // MS特定的finance和marketing映射
  "ms-finance": "金融碩士",
  "ms-marketing": "行銷碩士",

  // MSU 相關路由
  "msu-business-school": "密西根州立大學",
  msu: "MSU商學院",
  "about-msu": "MSU學校介紹",
  "east-lansing": "東蘭辛市",
  "east-lansing-food-attractions": "東蘭辛景點與美食",
  transportation: "交通",
  msf: "金融碩士課程",
  master: "金融碩士",

  // 排名相關
  ranking: "排名",
  aacsb: "AACSB認證",
  heed: "HEED獎項",

  // 其他
  uic_school: "學校資訊",
  blog: "活動與文章",
  contact: "聯絡我們",
};

// 反向映射：中文路由 -> 英文路由
/**
 * @type {Record<string, string>}
 */
export const reverseUrlMapping = Object.fromEntries(
  Object.entries(urlMapping).map(([english, chinese]) => [chinese, english]),
);

// 建構中文URL的函數
/**
 * 將英文路由路徑轉換為中文路由路徑
 * @param {string} englishPath - 英文路由路徑（如 "/uic/about-uic"）
 * @returns {string} 對應的中文路由路徑
 */
export const buildChineseUrl = (englishPath) => {
  const segments = englishPath.split("/").filter((segment) => segment);
  const chineseSegments = segments.map((segment) => {
    return urlMapping[segment] || segment;
  });
  return "/" + chineseSegments.join("/");
};

// 解析中文URL為英文路由的函数
/**
 * 將中文路由路徑轉換回英文路由路徑
 * @param {string} chinesePath - 中文路由路徑
 * @returns {string} 對應的英文路由路徑
 */
export const parseChineseUrl = (chinesePath) => {
  const segments = chinesePath.split("/").filter((segment) => segment);
  const englishSegments = segments.map((segment) => {
    return reverseUrlMapping[segment] || segment;
  });
  return "/" + englishSegments.join("/");
};

// 獲取中文路由配置
/**
 * @typedef {{
 *   path: string,
 *   originalPath?: string,
 *   [key: string]: unknown
 * }} RouteConfig
 */

/**
 * 將路由配置的路徑轉換為中文路由
 * @param {Array<RouteConfig>} englishRoutes - 英文路由配置陣列
 * @returns {Array<RouteConfig>} 中文路由配置陣列
 */
export const getChineseRoutes = (englishRoutes) => {
  return englishRoutes.map((route) => ({
    ...route,
    path: buildChineseUrl(route.path),
    // 保留原始英文路由作為備用
    originalPath: route.path,
  }));
};

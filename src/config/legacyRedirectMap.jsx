// @ts-check
/**
 * Exact mapping of legacy English URL paths → current Chinese absolute paths.
 *
 * Keys   : absolute English pathname as seen in location.pathname  (leading /)
 * Values : absolute Chinese pathname to redirect to               (leading /)
 *
 * This mapping is the source of truth for UrlRedirect.
 * Prefer adding new entries here over relying on the segment-based buildChineseUrl fallback.
 */

/** @type {Record<string, string>} */
export const LEGACY_REDIRECT_MAP = {
  // ------------------------------------------------------------------
  // UIC — school (UIC商學院碩士)
  // ------------------------------------------------------------------
  "/uic-business-school/uic/about-uic":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹",
  "/uic-business-school/uic/career-resources":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/職涯資源",
  "/uic-business-school/uic/faq":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/常見問題",
  "/uic-business-school/uic/rankings-awards":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/排名與獎項",
  "/uic-business-school/uic/uic_school/ranking/aacsb":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/AACSB認證",
  "/uic-business-school/uic/uic_school/ranking/heed":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/HEED獎項",
  "/uic-business-school/uic/uic_school/ranking/ranking":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/排名",
  "/uic-business-school/uic/chicago":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市",
  // Note: route file uses capital-C "Chicago-city"; this ensures correct casing.
  "/uic-business-school/uic/chicago/chicago-city":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/Chicago-city",
  "/uic-business-school/uic/chicago/food-attractions":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/景點與美食",
  "/uic-business-school/uic/chicago/economy":
    "/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/芝加哥經濟",

  // ------------------------------------------------------------------
  // UIC — MBA Programs
  // ------------------------------------------------------------------
  "/uic-business-school/mba":
    "/伊利諾大學芝加哥分校/MBA-Programs",
  "/uic-business-school/mba/areas":
    "/伊利諾大學芝加哥分校/MBA-Programs/五大領域",
  "/uic-business-school/mba/areas/management":
    "/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Management",
  "/uic-business-school/mba/areas/finance":
    "/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Finance",
  "/uic-business-school/mba/areas/analytics":
    "/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Business-Analytics",
  "/uic-business-school/mba/areas/marketing":
    "/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Marketing",
  "/uic-business-school/mba/areas/human-resource":
    "/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Human-Resource-Management",
  "/uic-business-school/mba/advantages":
    "/伊利諾大學芝加哥分校/MBA-Programs/課程優勢",
  "/uic-business-school/mba/core-courses":
    "/伊利諾大學芝加哥分校/MBA-Programs/核心課程",
  "/uic-business-school/mba/dual-degree":
    "/伊利諾大學芝加哥分校/MBA-Programs/雙碩士銜接課程",
  "/uic-business-school/mba/application":
    "/伊利諾大學芝加哥分校/MBA-Programs/申請資訊",

  // ------------------------------------------------------------------
  // UIC — MS Programs
  // ------------------------------------------------------------------
  "/uic-business-school/ms/MS-in-Finance-MSF":
    "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Finance-MSF",
  "/uic-business-school/ms/MS-in-Marketing-MSM":
    "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Marketing-MSM",
  "/uic-business-school/ms/MS-in-Supply-Chain-and-Operation-Management-MSSCOM":
    "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Supply-Chain-and-Operation-Management-MSSCOM",
  "/uic-business-school/ms/MS-in-Business-Analytics-MSBA":
    "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Business-Analytics-MSBA",
  "/uic-business-school/ms/MS-in-Management-Information-Systems-MSMIS":
    "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Management-Information-Systems-MSMIS",
  "/uic-business-school/ms/MS-in-Accounting-MSA":
    "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Accounting-MSA",
  "/uic-business-school/ms/application":
    "/伊利諾大學芝加哥分校/MS-Programs/申請資訊",
  "/uic-business-school/ms/msprograms":
    "/伊利諾大學芝加哥分校/MS-Programs/課程介紹",

  // ------------------------------------------------------------------
  // MSU — MSF Programs
  // ------------------------------------------------------------------
  "/msu-business-school/msf/application":
    "/密西根州立大學/金融碩士課程/申請資訊",
  // FIX: segment "master" was mapping to "金融碩士"; correct target is "MSF金融碩士".
  "/msu-business-school/msf/master":
    "/密西根州立大學/金融碩士課程/MSF金融碩士",

  // ------------------------------------------------------------------
  // MSU — school (MSU商學院)
  // ------------------------------------------------------------------
  // FIX: segment "about-msu" was mapping to "MSU學校介紹" (a redirect source);
  //      correct target is "學校介紹".
  "/msu-business-school/msu/about-msu":
    "/密西根州立大學/MSU商學院/學校介紹",
  "/msu-business-school/msu/rankings-awards":
    "/密西根州立大學/MSU商學院/排名與獎項",
  "/msu-business-school/msu/career-resources":
    "/密西根州立大學/MSU商學院/職涯資源",
  "/msu-business-school/msu/east-lansing":
    "/密西根州立大學/MSU商學院/東蘭辛市",
  "/msu-business-school/msu/east-lansing/transportation":
    "/密西根州立大學/MSU商學院/東蘭辛市/交通",
  // FIX: segment "east-lansing-food-attractions" was mapping to "東蘭辛景點與美食";
  //      correct target is "景點與美食".
  "/msu-business-school/msu/east-lansing/east-lansing-food-attractions":
    "/密西根州立大學/MSU商學院/東蘭辛市/景點與美食",
};

/**
 * Look up the exact Chinese redirect target for a legacy English pathname.
 *
 * @param {string} englishPathname - absolute pathname, e.g. "/uic-business-school/uic/about-uic"
 * @returns {string | null} Chinese absolute path, or null if not in the map
 */
export const getExactRedirectTarget = (englishPathname) =>
  LEGACY_REDIRECT_MAP[englishPathname] ?? null;

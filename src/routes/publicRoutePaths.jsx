export const COMMON_ROUTE_PATHS = {
  home: "/",
  contactRedirect: "contact",
  contact: "聯絡我們",
  contactLink: "/聯絡我們",
  blog: "blog",
  blogLink: "/blog",
  blogDetail: "blog/:slug",
  blogSearch: "blog/search/:keyword",
};

const toAbsolutePath = (path) => `/${path}`;

// ---------------------------------------------------------------------------
// UIC — root segments
// ---------------------------------------------------------------------------
const UIC_ROOT = "伊利諾大學芝加哥分校";

// ---------------------------------------------------------------------------
// UIC school (非 MBA/MS specific)
// ---------------------------------------------------------------------------
const UIC_SCHOOL_ROOT = `${UIC_ROOT}/UIC商學院碩士`;

export const UIC_SCHOOL_ROUTE_PATHS = {
  root: UIC_ROOT,
  aboutUic: `${UIC_SCHOOL_ROOT}/學校介紹`,
  careerResources: `${UIC_SCHOOL_ROOT}/職涯資源`,
  rankingsAwards: `${UIC_SCHOOL_ROOT}/排名與獎項`,
  rankingAacsb: `${UIC_SCHOOL_ROOT}/學校資訊/排名/AACSB認證`,
  rankingHeed: `${UIC_SCHOOL_ROOT}/學校資訊/排名/HEED獎項`,
  rankingPage: `${UIC_SCHOOL_ROOT}/學校資訊/排名/排名`,
  chicago: `${UIC_SCHOOL_ROOT}/芝加哥城市`,
  chicagoCity: `${UIC_SCHOOL_ROOT}/芝加哥城市/Chicago-city`,
  chicagoFoodAttractions: `${UIC_SCHOOL_ROOT}/芝加哥城市/景點與美食`,
  chicagoEconomy: `${UIC_SCHOOL_ROOT}/芝加哥城市/芝加哥經濟`,
  faq: `${UIC_SCHOOL_ROOT}/常見問題`,
};

export const UIC_SCHOOL_LINKS = {
  root: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.root),
  aboutUic: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.aboutUic),
  careerResources: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.careerResources),
  rankingsAwards: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.rankingsAwards),
  rankingAacsb: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.rankingAacsb),
  rankingHeed: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.rankingHeed),
  rankingPage: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.rankingPage),
  chicago: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.chicago),
  chicagoCity: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.chicagoCity),
  chicagoFoodAttractions: toAbsolutePath(
    UIC_SCHOOL_ROUTE_PATHS.chicagoFoodAttractions,
  ),
  chicagoEconomy: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.chicagoEconomy),
  faq: toAbsolutePath(UIC_SCHOOL_ROUTE_PATHS.faq),
};

// ---------------------------------------------------------------------------
// UIC MBA Programs
// ---------------------------------------------------------------------------
const UIC_MBA_ROOT = `${UIC_ROOT}/MBA-Programs`;
const UIC_MBA_AREAS_ROOT = `${UIC_MBA_ROOT}/五大領域`;

export const UIC_MBA_ROUTE_PATHS = {
  programs: UIC_MBA_ROOT,
  areas: UIC_MBA_AREAS_ROOT,
  management: `${UIC_MBA_AREAS_ROOT}/Management`,
  finance: `${UIC_MBA_AREAS_ROOT}/Finance`,
  analytics: `${UIC_MBA_AREAS_ROOT}/Business-Analytics`,
  analyticsLegacy: `${UIC_MBA_AREAS_ROOT}/Business Analytics`,
  marketing: `${UIC_MBA_AREAS_ROOT}/Marketing`,
  humanResource: `${UIC_MBA_AREAS_ROOT}/Human-Resource-Management`,
  humanResourceLegacy: `${UIC_MBA_AREAS_ROOT}/Human Resource Management`,
  advantages: `${UIC_MBA_ROOT}/課程優勢`,
  coreCourses: `${UIC_MBA_ROOT}/核心課程`,
  dualDegree: `${UIC_MBA_ROOT}/雙碩士銜接課程`,
  application: `${UIC_MBA_ROOT}/申請資訊`,
};

export const UIC_MBA_LINKS = {
  programs: toAbsolutePath(UIC_MBA_ROUTE_PATHS.programs),
  areas: toAbsolutePath(UIC_MBA_ROUTE_PATHS.areas),
  management: toAbsolutePath(UIC_MBA_ROUTE_PATHS.management),
  finance: toAbsolutePath(UIC_MBA_ROUTE_PATHS.finance),
  analytics: toAbsolutePath(UIC_MBA_ROUTE_PATHS.analytics),
  marketing: toAbsolutePath(UIC_MBA_ROUTE_PATHS.marketing),
  humanResource: toAbsolutePath(UIC_MBA_ROUTE_PATHS.humanResource),
  advantages: toAbsolutePath(UIC_MBA_ROUTE_PATHS.advantages),
  coreCourses: toAbsolutePath(UIC_MBA_ROUTE_PATHS.coreCourses),
  dualDegree: toAbsolutePath(UIC_MBA_ROUTE_PATHS.dualDegree),
  application: toAbsolutePath(UIC_MBA_ROUTE_PATHS.application),
};

// ---------------------------------------------------------------------------
// UIC MS Programs
// ---------------------------------------------------------------------------
const UIC_MS_ROOT = `${UIC_ROOT}/MS-Programs`;

export const UIC_MS_ROUTE_PATHS = {
  root: UIC_MS_ROOT,
  programs: `${UIC_MS_ROOT}/課程介紹`,
  msFinance: `${UIC_MS_ROOT}/MS-in-Finance-MSF`,
  msMarketing: `${UIC_MS_ROOT}/MS-in-Marketing-MSM`,
  msSupplyChain: `${UIC_MS_ROOT}/MS-in-Supply-Chain-and-Operation-Management-MSSCOM`,
  msAnalytics: `${UIC_MS_ROOT}/MS-in-Business-Analytics-MSBA`,
  msMIS: `${UIC_MS_ROOT}/MS-in-Management-Information-Systems-MSMIS`,
  msAccounting: `${UIC_MS_ROOT}/MS-in-Accounting-MSA`,
  msApplication: `${UIC_MS_ROOT}/申請資訊`,
};

export const UIC_MS_LINKS = {
  root: toAbsolutePath(UIC_MS_ROUTE_PATHS.root),
  programs: toAbsolutePath(UIC_MS_ROUTE_PATHS.programs),
  msFinance: toAbsolutePath(UIC_MS_ROUTE_PATHS.msFinance),
  msMarketing: toAbsolutePath(UIC_MS_ROUTE_PATHS.msMarketing),
  msSupplyChain: toAbsolutePath(UIC_MS_ROUTE_PATHS.msSupplyChain),
  msAnalytics: toAbsolutePath(UIC_MS_ROUTE_PATHS.msAnalytics),
  msMIS: toAbsolutePath(UIC_MS_ROUTE_PATHS.msMIS),
  msAccounting: toAbsolutePath(UIC_MS_ROUTE_PATHS.msAccounting),
  msApplication: toAbsolutePath(UIC_MS_ROUTE_PATHS.msApplication),
};

// ---------------------------------------------------------------------------
// MSU — root segments
// ---------------------------------------------------------------------------
const MSU_ROOT = "密西根州立大學";

// ---------------------------------------------------------------------------
// MSU school
// ---------------------------------------------------------------------------
const MSU_SCHOOL_ROOT = `${MSU_ROOT}/MSU商學院`;

export const MSU_SCHOOL_ROUTE_PATHS = {
  root: MSU_ROOT,
  aboutMsu: `${MSU_SCHOOL_ROOT}/學校介紹`,
  rankingsAwards: `${MSU_SCHOOL_ROOT}/排名與獎項`,
  careerResources: `${MSU_SCHOOL_ROOT}/職涯資源`,
  michigan: `${MSU_SCHOOL_ROOT}/東蘭辛市`,
  michiganFoodAttractions: `${MSU_SCHOOL_ROOT}/東蘭辛市/景點與美食`,
  michiganTransportation: `${MSU_SCHOOL_ROOT}/東蘭辛市/交通`,
};

export const MSU_SCHOOL_LINKS = {
  root: toAbsolutePath(MSU_SCHOOL_ROUTE_PATHS.root),
  aboutMsu: toAbsolutePath(MSU_SCHOOL_ROUTE_PATHS.aboutMsu),
  rankingsAwards: toAbsolutePath(MSU_SCHOOL_ROUTE_PATHS.rankingsAwards),
  careerResources: toAbsolutePath(MSU_SCHOOL_ROUTE_PATHS.careerResources),
  michigan: toAbsolutePath(MSU_SCHOOL_ROUTE_PATHS.michigan),
  michiganFoodAttractions: toAbsolutePath(
    MSU_SCHOOL_ROUTE_PATHS.michiganFoodAttractions,
  ),
  michiganTransportation: toAbsolutePath(
    MSU_SCHOOL_ROUTE_PATHS.michiganTransportation,
  ),
};

// ---------------------------------------------------------------------------
// MSU MSF Programs
// ---------------------------------------------------------------------------
const MSU_MSF_ROOT = `${MSU_ROOT}/金融碩士課程`;

export const MSU_MSF_ROUTE_PATHS = {
  root: MSU_MSF_ROOT,
  msfMaster: `${MSU_MSF_ROOT}/MSF金融碩士`,
  msfApplication: `${MSU_MSF_ROOT}/申請資訊`,
};

export const MSU_MSF_LINKS = {
  root: toAbsolutePath(MSU_MSF_ROUTE_PATHS.root),
  msfMaster: toAbsolutePath(MSU_MSF_ROUTE_PATHS.msfMaster),
  msfApplication: toAbsolutePath(MSU_MSF_ROUTE_PATHS.msfApplication),
};

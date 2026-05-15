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

const UIC_ROOT = "伊利諾大學芝加哥分校";
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

const toAbsolutePath = (path) => `/${path}`;

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

import {
  COMMON_ROUTE_PATHS,
  UIC_MBA_LINKS,
  UIC_SCHOOL_LINKS,
  UIC_MS_LINKS,
  MSU_SCHOOL_LINKS,
  MSU_MSF_LINKS,
} from "../routes/publicRoutePaths";

export const menuItems = [
  {
    key: "home",
    label: "首頁",
    to: COMMON_ROUTE_PATHS.home,
  },
  {
    key: "uic",
    label: "UIC商學院碩士",
    children: [
      {
        key: "uic-sub",
        label: "UIC 伊利諾大學芝加哥分校",
        to: UIC_SCHOOL_LINKS.aboutUic,
        children: [
          {
            key: "about-uic",
            label: "學校介紹",
            to: UIC_SCHOOL_LINKS.aboutUic,
          },
          {
            key: "rankings",
            label: "排名與獎項",
            to: UIC_SCHOOL_LINKS.rankingsAwards,
            children: [
              {
                key: "aacsb",
                label: "AACSB",
                to: UIC_SCHOOL_LINKS.rankingAacsb,
              },
              {
                key: "heed",
                label: "Heed",
                to: UIC_SCHOOL_LINKS.rankingHeed,
              },
              {
                key: "ranking",
                label: "Ranking",
                to: UIC_SCHOOL_LINKS.rankingPage,
              },
            ],
          },
          {
            key: "career-resources",
            label: "職涯資源",
            to: UIC_SCHOOL_LINKS.careerResources,
          },
          {
            key: "chicago",
            label: "芝加哥城市",
            to: UIC_SCHOOL_LINKS.chicago,
            children: [
              {
                key: "chicago-city",
                label: "Chicago-city",
                to: UIC_SCHOOL_LINKS.chicagoCity,
              },
              {
                key: "food-attractions",
                label: "景點與美食",
                to: UIC_SCHOOL_LINKS.chicagoFoodAttractions,
              },
              {
                key: "economy",
                label: "芝加哥經濟",
                to: UIC_SCHOOL_LINKS.chicagoEconomy,
              },
            ],
          },
          {
            key: "faq",
            label: "常見問題",
            to: UIC_SCHOOL_LINKS.faq,
          },
        ],
      },
      {
        key: "mba",
        label: "MBA Programs",
        to: UIC_MBA_LINKS.programs,
        children: [
          {
            key: "areas",
            label: "五大領域",
            to: UIC_MBA_LINKS.areas,
            children: [
              {
                key: "management",
                label: "Management",
                to: UIC_MBA_LINKS.management,
              },
              {
                key: "finance",
                label: "Finance",
                to: UIC_MBA_LINKS.finance,
              },
              {
                key: "analytics",
                label: "Business Analytics",
                to: UIC_MBA_LINKS.analytics,
              },
              {
                key: "marketing",
                label: "Marketing",
                to: UIC_MBA_LINKS.marketing,
              },
              {
                key: "hr",
                label: "Human Resource Management",
                to: UIC_MBA_LINKS.humanResource,
              },
            ],
          },
          {
            key: "advantages",
            label: "課程優勢",
            to: UIC_MBA_LINKS.advantages,
          },
          {
            key: "core-courses",
            label: "核心課程",
            to: UIC_MBA_LINKS.coreCourses,
          },
          {
            key: "dual-degree",
            label: "雙碩士銜接課程",
            to: UIC_MBA_LINKS.dualDegree,
          },
          {
            key: "application",
            label: "申請資訊",
            to: UIC_MBA_LINKS.application,
          },
        ],
      },
      {
        key: "ms",
        label: "MS Programs",
        to: UIC_MS_LINKS.programs,
        children: [
          {
            key: "ms-finance",
            label: "MS in Finance",
            to: UIC_MS_LINKS.msFinance,
          },
          {
            key: "ms-marketing",
            label: "MS in Marketing",
            to: UIC_MS_LINKS.msMarketing,
          },
          {
            key: "ms-supply-chain",
            label: "MS in Supply Chain and Operation Management",
            to: UIC_MS_LINKS.msSupplyChain,
          },
          {
            key: "ms-analytics",
            label: "MS in Business Analytics",
            to: UIC_MS_LINKS.msAnalytics,
          },
          {
            key: "ms-mis",
            label: "MS in Management Information Systems",
            to: UIC_MS_LINKS.msMIS,
          },
          {
            key: "ms-accounting",
            label: "MS in Accounting",
            to: UIC_MS_LINKS.msAccounting,
          },
          {
            key: "ms-application",
            label: "申請資訊",
            to: UIC_MS_LINKS.msApplication,
          },
        ],
      },
    ],
  },
  {
    key: "msu",
    label: "MSU金融碩士",
    children: [
      {
        key: "msu-main",
        label: "MSU密西根州立大學",
        to: MSU_SCHOOL_LINKS.aboutMsu,
        children: [
          {
            key: "about-msu",
            label: "學校介紹",
            to: MSU_SCHOOL_LINKS.aboutMsu,
          },
          {
            key: "msu-rankings",
            label: "排名與獎項",
            to: MSU_SCHOOL_LINKS.rankingsAwards,
          },
          {
            key: "msu-career-resources",
            label: "職涯資源",
            to: MSU_SCHOOL_LINKS.careerResources,
          },
          {
            key: "east-lansing",
            label: "密西根州-東蘭辛市(大學城)",
            to: MSU_SCHOOL_LINKS.michigan,
            children: [
              {
                key: "east-lansing-food",
                label: "景點與美食",
                to: MSU_SCHOOL_LINKS.michiganFoodAttractions,
              },
              {
                key: "transportation",
                label: "交通",
                to: MSU_SCHOOL_LINKS.michiganTransportation,
              },
            ],
          },
        ],
      },
      {
        key: "msf",
        label: "MSF Programs",
        to: MSU_MSF_LINKS.msfMaster,
        children: [
          {
            key: "msf-master",
            label: "MSF 金融碩士",
            to: MSU_MSF_LINKS.msfMaster,
          },
          {
            key: "msf-application",
            label: "申請資訊",
            to: MSU_MSF_LINKS.msfApplication,
          },
        ],
      },
    ],
  },
  {
    key: "blog",
    label: "活動與文章",
    to: COMMON_ROUTE_PATHS.blogLink,
  },
  {
    key: "contact",
    label: "聯絡我們",
    to: COMMON_ROUTE_PATHS.contactLink,
  },
];

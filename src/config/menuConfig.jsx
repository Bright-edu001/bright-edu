import { COMMON_ROUTE_PATHS, UIC_MBA_LINKS } from "../routes/publicRoutePaths";

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
        to: "/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹",
        children: [
          {
            key: "about-uic",
            label: "學校介紹",
            to: "/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹",
          },
          {
            key: "rankings",
            label: "排名與獎項",
            to: "/伊利諾大學芝加哥分校/UIC商學院碩士/排名與獎項",
            children: [
              {
                key: "aacsb",
                label: "AACSB",
                to: "/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/AACSB認證",
              },
              {
                key: "heed",
                label: "Heed",
                to: "/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/HEED獎項",
              },
              {
                key: "ranking",
                label: "Ranking",
                to: "/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/排名",
              },
            ],
          },
          {
            key: "career-resources",
            label: "職涯資源",
            to: "/伊利諾大學芝加哥分校/UIC商學院碩士/職涯資源",
          },
          {
            key: "chicago",
            label: "芝加哥城市",
            to: "/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市",
            children: [
              {
                key: "chicago-city",
                label: "Chicago-city",
                to: "/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/chicago-city",
              },
              {
                key: "food-attractions",
                label: "景點與美食",
                to: "/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/景點與美食",
              },
              {
                key: "economy",
                label: "芝加哥經濟",
                to: "/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/芝加哥經濟",
              },
            ],
          },
          {
            key: "faq",
            label: "常見問題",
            to: "/伊利諾大學芝加哥分校/UIC商學院碩士/常見問題",
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
        to: "/伊利諾大學芝加哥分校/MS-Programs/課程介紹",
        children: [
          {
            key: "ms-finance",
            label: "MS in Finance",
            to: "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Finance-MSF",
          },
          {
            key: "ms-marketing",
            label: "MS in Marketing",
            to: "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Marketing-MSM",
          },
          {
            key: "ms-supply-chain",
            label: "MS in Supply Chain and Operation Management",
            to: "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Supply-Chain-and-Operation-Management-MSSCOM",
          },
          {
            key: "ms-analytics",
            label: "MS in Business Analytics",
            to: "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Business-Analytics-MSBA",
          },
          {
            key: "ms-mis",
            label: "MS in Management Information Systems",
            to: "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Management-Information-Systems-MSMIS",
          },
          {
            key: "ms-accounting",
            label: "MS in Accounting",
            to: "/伊利諾大學芝加哥分校/MS-Programs/MS-in-Accounting-MSA",
          },
          {
            key: "ms-application",
            label: "申請資訊",
            to: "/伊利諾大學芝加哥分校/MS-Programs/申請資訊",
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
        children: [
          {
            key: "about-msu",
            label: "學校介紹",
            to: "/密西根州立大學/MSU商學院/學校介紹",
          },
          {
            key: "msu-rankings",
            label: "排名與獎項",
            to: "/密西根州立大學/MSU商學院/排名與獎項",
          },
          {
            key: "msu-career-resources",
            label: "職涯資源",
            to: "/密西根州立大學/MSU商學院/職涯資源",
          },
          {
            key: "east-lansing",
            label: "密西根州-東蘭辛市(大學城)",
            to: "/密西根州立大學/MSU商學院/東蘭辛市",
            children: [
              {
                key: "east-lansing-food",
                label: "景點與美食",
                to: "/密西根州立大學/MSU商學院/東蘭辛市/景點與美食",
              },
              {
                key: "transportation",
                label: "交通",
                to: "/密西根州立大學/MSU商學院/東蘭辛市/交通",
              },
            ],
          },
        ],
      },
      {
        key: "msf",
        label: "MSF Programs",
        children: [
          {
            key: "msf-master",
            label: "MSF 金融碩士",
            to: "/密西根州立大學/金融碩士課程/MSF金融碩士",
          },
          {
            key: "msf-application",
            label: "申請資訊",
            to: "/密西根州立大學/金融碩士課程/申請資訊",
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

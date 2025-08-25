import React from "react";
import { Link } from "react-router-dom";

export const menuItems = [
  {
    key: "home",
    label: (
      <Link to="/" className="nav-link-hover">
        首頁
      </Link>
    ),
  },
  {
    key: "uic",
    label: "UIC商學院碩士",
    children: [
      {
        key: "uic-sub",
        label: "UIC 伊利諾大學芝加哥分校",
        children: [
          {
            key: "about-uic",
            label: (
              <Link to="/uic-business-school/uic/about-uic">學校介紹</Link>
            ),
          },
          {
            key: "rankings",
            label: (
              <Link
                to="/uic-business-school/uic/rankings-awards"
                className="nav-link-color"
              >
                排名與獎項
              </Link>
            ),
            children: [
              {
                key: "aacsb",
                label: (
                  <Link to="/uic-business-school/uic/uic_school/ranking/aacsb">
                    AACSB
                  </Link>
                ),
              },
              {
                key: "heed",
                label: (
                  <Link to="/uic-business-school/uic/uic_school/ranking/heed">
                    Heed
                  </Link>
                ),
              },
              {
                key: "ranking",
                label: (
                  <Link to="/uic-business-school/uic/uic_school/ranking/ranking">
                    Ranking
                  </Link>
                ),
              },
            ],
          },
          {
            key: "career-resources",
            label: (
              <Link to="/uic-business-school/uic/career-resources">
                職涯資源
              </Link>
            ),
          },
          {
            key: "chicago",
            label: (
              <Link
                to="/uic-business-school/uic/chicago"
                className="nav-link-color"
              >
                芝加哥城市
              </Link>
            ),
            children: [
              {
                key: "food-attractions",
                label: (
                  <Link to="/uic-business-school/uic/chicago/food-attractions">
                    景點與美食
                  </Link>
                ),
              },
              {
                key: "economy",
                label: (
                  <Link to="/uic-business-school/uic/chicago/economy">
                    芝加哥經濟
                  </Link>
                ),
              },
            ],
          },
          {
            key: "faq",
            label: <Link to="/uic-business-school/uic/faq">常見問題</Link>,
          },
        ],
      },
      {
        key: "mba",
        label: "MBA Programs",
        path: "/uic-business-school/mba",
        children: [
          {
            key: "mba-main",
            label: (
              <Link to="/uic-business-school/mba" className="nav-link-color">
                MBA Programs 主頁
              </Link>
            ),
          },
          {
            key: "areas",
            label: (
              <Link
                to="/uic-business-school/mba/areas"
                className="nav-link-color"
              >
                五大領域
              </Link>
            ),
            children: [
              {
                key: "management",
                label: (
                  <Link to="/uic-business-school/mba/areas/management">
                    MBA-
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>
                      Management
                    </span>
                  </Link>
                ),
              },
              {
                key: "finance",
                label: (
                  <Link to="/uic-business-school/mba/areas/finance">
                    MBA-
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>
                      Finance
                    </span>
                  </Link>
                ),
              },
              {
                key: "analytics",
                label: (
                  <Link to="/uic-business-school/mba/areas/analytics">
                    MBA-
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>
                      Business Analytics
                    </span>
                  </Link>
                ),
              },
              {
                key: "marketing",
                label: (
                  <Link to="/uic-business-school/mba/areas/marketing">
                    MBA-
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>
                      Marketing
                    </span>
                  </Link>
                ),
              },
              {
                key: "hr",
                label: (
                  <Link to="/uic-business-school/mba/areas/human-resource">
                    MBA-
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>
                      Human Resource Management
                    </span>
                  </Link>
                ),
              },
            ],
          },
          {
            key: "advantages",
            label: (
              <Link to="/uic-business-school/mba/advantages">課程優勢</Link>
            ),
          },
          {
            key: "core-courses",
            label: (
              <Link to="/uic-business-school/mba/core-courses">核心課程</Link>
            ),
          },
          {
            key: "dual-degree",
            label: (
              <Link to="/uic-business-school/mba/dual-degree">
                雙碩士銜接課程
              </Link>
            ),
          },
          {
            key: "application",
            label: (
              <Link to="/uic-business-school/mba/application">申請資訊</Link>
            ),
          },
        ],
      },
      {
        key: "ms",
        label: "MS Programs",
        path: "/uic-business-school/ms/msprograms",
        children: [
          {
            key: "ms-main",
            label: (
              <Link
                to="/uic-business-school/ms/msprograms"
                className="nav-link-color"
              >
                MS Programs 主頁
              </Link>
            ),
          },
          {
            key: "ms-finance",
            label: (
              <Link to="/uic-business-school/ms/finance">MS in Finance</Link>
            ),
          },
          {
            key: "ms-marketing",
            label: (
              <Link to="/uic-business-school/ms/marketing">
                MS in Marketing
              </Link>
            ),
          },
          {
            key: "ms-supply-chain",
            label: (
              <Link to="/uic-business-school/ms/supply-chain-operation-management">
                MS in Supply Chain and Operation Management
              </Link>
            ),
          },
          {
            key: "ms-analytics",
            label: (
              <Link to="/uic-business-school/ms/business-analytics">
                MS in Business Analytics
              </Link>
            ),
          },
          {
            key: "ms-mis",
            label: (
              <Link to="/uic-business-school/ms/management-information-systems">
                MS in Management Information Systems
              </Link>
            ),
          },
          {
            key: "ms-accounting",
            label: (
              <Link to="/uic-business-school/ms/accounting">
                MS in Accounting
              </Link>
            ),
          },
          {
            key: "ms-application",
            label: (
              <Link to="/uic-business-school/ms/application">申請資訊</Link>
            ),
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
            label: (
              <Link to="/msu-business-school/msu/about-msu">學校介紹</Link>
            ),
          },
          {
            key: "msu-rankings",
            label: (
              <Link to="/msu-business-school/msu/rankings-awards">
                排名與獎項
              </Link>
            ),
          },
          {
            key: "msu-career-resources",
            label: (
              <Link to="/msu-business-school/msu/career-resources">
                職涯資源
              </Link>
            ),
          },
          {
            key: "east-lansing",
            label: (
              <Link
                to="/msu-business-school/msu/east-lansing"
                className="nav-link-color"
              >
                密西根州-東蘭辛市(大學城)
              </Link>
            ),
            children: [
              {
                key: "east-lansing-food",
                label: (
                  <Link to="/msu-business-school/msu/east-lansing/east-lansing-food-attractions">
                    景點與美食
                  </Link>
                ),
              },
              {
                key: "transportation",
                label: (
                  <Link to="/msu-business-school/msu/east-lansing/transportation">
                    交通
                  </Link>
                ),
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
            label: (
              <Link to="/msu-business-school/msf/master">MSF 金融碩士</Link>
            ),
          },
          {
            key: "msf-application",
            label: (
              <Link to="/msu-business-school/msf/application">申請資訊</Link>
            ),
          },
        ],
      },
    ],
  },
  {
    key: "blog",
    label: (
      <Link to="/blog" className="nav-link-hover">
        活動與文章
      </Link>
    ),
  },
  {
    key: "contact",
    label: (
      <Link to="/contact" className="nav-link-hover">
        聯絡我們
      </Link>
    ),
  },
];

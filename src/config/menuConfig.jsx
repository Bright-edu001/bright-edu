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
        label: (
          <Link
            to="/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹"
            className="nav-link-color"
          >
            UIC 伊利諾大學芝加哥分校
          </Link>
        ),
        children: [
          {
            key: "about-uic",
            label: (
              <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹">
                學校介紹
              </Link>
            ),
          },
          {
            key: "rankings",
            label: (
              <Link
                to="/伊利諾大學芝加哥分校/UIC商學院碩士/排名與獎項"
                className="nav-link-color"
              >
                排名與獎項
              </Link>
            ),
            children: [
              {
                key: "aacsb",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/AACSB認證">
                    AACSB
                  </Link>
                ),
              },
              {
                key: "heed",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/HEED獎項">
                    Heed
                  </Link>
                ),
              },
              {
                key: "ranking",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/學校資訊/排名/排名">
                    Ranking
                  </Link>
                ),
              },
            ],
          },
          {
            key: "career-resources",
            label: (
              <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/職涯資源">
                職涯資源
              </Link>
            ),
          },
          {
            key: "chicago",
            label: (
              <Link
                to="/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市"
                className="nav-link-color"
              >
                芝加哥城市
              </Link>
            ),
            children: [
              {
                key: "chicago-city",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/chicago-city">
                    Chicago-city
                  </Link>
                ),
              },
              {
                key: "food-attractions",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/景點與美食">
                    景點與美食
                  </Link>
                ),
              },
              {
                key: "economy",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/芝加哥城市/芝加哥經濟">
                    芝加哥經濟
                  </Link>
                ),
              },
            ],
          },
          {
            key: "faq",
            label: (
              <Link to="/伊利諾大學芝加哥分校/UIC商學院碩士/常見問題">
                常見問題
              </Link>
            ),
          },
        ],
      },
      {
        key: "mba",
        label: (
          <Link
            to="/伊利諾大學芝加哥分校/MBA-Programs"
            className="nav-link-color"
          >
            MBA Programs
          </Link>
        ),
        children: [
          {
            key: "areas",
            label: (
              <Link
                to="/伊利諾大學芝加哥分校/MBA-Programs/五大領域"
                className="nav-link-color"
              >
                五大領域
              </Link>
            ),
            children: [
              {
                key: "management",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Management">
                    Management
                  </Link>
                ),
              },
              {
                key: "finance",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Finance">
                    Finance
                  </Link>
                ),
              },
              {
                key: "analytics",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Business-Analytics">
                    Business Analytics
                  </Link>
                ),
              },
              {
                key: "marketing",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Marketing">
                    Marketing
                  </Link>
                ),
              },
              {
                key: "hr",
                label: (
                  <Link to="/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Human-Resource-Management">
                    Human Resource Management
                  </Link>
                ),
              },
            ],
          },
          {
            key: "advantages",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MBA-Programs/課程優勢">
                課程優勢
              </Link>
            ),
          },
          {
            key: "core-courses",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MBA-Programs/核心課程">
                核心課程
              </Link>
            ),
          },
          {
            key: "dual-degree",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MBA-Programs/雙碩士銜接課程">
                雙碩士銜接課程
              </Link>
            ),
          },
          {
            key: "application",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MBA-Programs/申請資訊">
                申請資訊
              </Link>
            ),
          },
        ],
      },
      {
        key: "ms",
        label: (
          <Link
            to="/伊利諾大學芝加哥分校/MS-Programs/課程介紹"
            className="nav-link-color"
          >
            MS Programs
          </Link>
        ),
        children: [
          {
            key: "ms-finance",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MS-Programs/MS-in-Finance-MSF">
                MS in Finance
              </Link>
            ),
          },
          {
            key: "ms-marketing",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MS-Programs/MS-in-Marketing-MSM">
                MS in Marketing
              </Link>
            ),
          },
          {
            key: "ms-supply-chain",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MS-Programs/MS-in-Supply-Chain-and-Operation-Management-MSSCOM">
                MS in Supply Chain and Operation Management
              </Link>
            ),
          },
          {
            key: "ms-analytics",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MS-Programs/MS-in-Business-Analytics-MSBA">
                MS in Business Analytics
              </Link>
            ),
          },
          {
            key: "ms-mis",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MS-Programs/MS-in-Management-Information-Systems-MSMIS">
                MS in Management Information Systems
              </Link>
            ),
          },
          {
            key: "ms-accounting",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MS-Programs/MS-in-Accounting-MSA">
                MS in Accounting
              </Link>
            ),
          },
          {
            key: "ms-application",
            label: (
              <Link to="/伊利諾大學芝加哥分校/MS-Programs/申請資訊">
                申請資訊
              </Link>
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
              <Link to="/密西根州立大學/MSU商學院/學校介紹">學校介紹</Link>
            ),
          },
          {
            key: "msu-rankings",
            label: (
              <Link to="/密西根州立大學/MSU商學院/排名與獎項">排名與獎項</Link>
            ),
          },
          {
            key: "msu-career-resources",
            label: (
              <Link to="/密西根州立大學/MSU商學院/職涯資源">職涯資源</Link>
            ),
          },
          {
            key: "east-lansing",
            label: (
              <Link
                to="/密西根州立大學/MSU商學院/東蘭辛市"
                className="nav-link-color"
              >
                密西根州-東蘭辛市(大學城)
              </Link>
            ),
            children: [
              {
                key: "east-lansing-food",
                label: (
                  <Link to="/密西根州立大學/MSU商學院/東蘭辛市/景點與美食">
                    景點與美食
                  </Link>
                ),
              },
              {
                key: "transportation",
                label: (
                  <Link to="/密西根州立大學/MSU商學院/東蘭辛市/交通">交通</Link>
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
              <Link to="/密西根州立大學/金融碩士課程/MSF金融碩士">
                MSF 金融碩士
              </Link>
            ),
          },
          {
            key: "msf-application",
            label: (
              <Link to="/密西根州立大學/金融碩士課程/申請資訊">申請資訊</Link>
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
      <Link to="/聯絡我們" className="nav-link-hover">
        聯絡我們
      </Link>
    ),
  },
];

import React, { useState, useEffect } from "react";
import { Menu, Drawer } from "antd";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import "./Header.scss"; // Import the new SCSS file

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(
    window.innerWidth <= 500 ? "100%" : 500
  );

  useEffect(() => {
    const handleResize = () => {
      setDrawerWidth(window.innerWidth <= 500 ? "100%" : 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const menuItems = [
    { key: "home", label: <Link to="/">首頁</Link> },
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
          children: [
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
          children: [
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
    { key: "blog", label: <Link to="/blog">活動與文章</Link> },
    { key: "contact", label: <Link to="/contact">聯絡我們</Link> },
  ];

  return (
    <header className="header" role="banner">
      <div className="header-center-wrapper">
        <div className="container">
          <div className="logo">
            <Link to="/" title="Bright Education 首頁">
              <img
                src={`${process.env.PUBLIC_URL}/images/header/logo.webp`}
                className="logo-img responsive-img"
                alt="Bright Education Logo"
                width="150"
                height="60"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="header-nav">
            <Menu mode="horizontal" theme="light" items={menuItems} />
          </div>

          <div className="hamburger-menu">
            <div
              className={`mobile-nav-toggle ${mobileMenu ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
              role="button"
              aria-expanded={mobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <Drawer
            placement="right"
            onClose={toggleMobileMenu}
            open={mobileMenu}
            className="mobile-drawer"
            width={drawerWidth}
          >
            <Menu
              mode="inline"
              theme="light"
              items={menuItems}
              onClick={toggleMobileMenu} // Add this line
            />
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;

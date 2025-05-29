import React, { useEffect, useContext, useRef, useCallback } from "react";
import "./Header.css";
import { NavContext } from "../../context/NavContext";
import debounce from "../../utils/debounce";

function Header() {
  // 透過 NavContext 取得下拉選單狀態與行為
  const {
    dropdownStates,
    toggleUICDropdown,
    toggleMSUDropdown,
    toggleUICSubDropdown,
    toggleMBASubDropdown,
    toggleMSSubDropdown,
    toggleMSUMainSubDropdown,
    toggleMSFProgramsSubDropdown,
    toggleMobileMenu,
    handleDropdownLinkClick,
    handleMouseEnter,
    handleMouseLeave,
    headerRef,
  } = useContext(NavContext);

  const eastLansingMenuRef = useRef(null);

  const checkEastLansingMenuPosition = useCallback(() => {
    const menuElement = eastLansingMenuRef.current;
    console.log("[Debug] checkEastLansingMenuPosition called. menuElement:", menuElement);
    if (menuElement) {
      if (dropdownStates.eastLansingSub) {
        console.log("[Debug] eastLansingSub is true. Checking position...");

        // 暫時移除 'submenu-below' 以測量其「自然」側邊定位時的範圍
        const originallyHadSubmenuBelow = menuElement.classList.contains('submenu-below');
        if (originallyHadSubmenuBelow) {
          menuElement.classList.remove('submenu-below');
          // 讀取一個佈局屬性以嘗試在移除 class 後、呼叫 getBoundingClientRect 之前強制重排 (reflow)
          // 這可能不是嚴格必要的，因為 getBoundingClientRect 本身通常會強制重排。
          // menuElement.offsetHeight;
        }

        const menuRect = menuElement.getBoundingClientRect();
        const naturalRight = menuRect.right;
        const viewportWidth = window.innerWidth;

        console.log(`[Debug] Natural right (as if positioned to side): ${naturalRight}, Viewport width: ${viewportWidth}, Originally had .submenu-below: ${originallyHadSubmenuBelow}`);

        if (naturalRight > viewportWidth) {
          console.log("[Debug] Natural position would overflow. Ensuring .submenu-below is present.");
          if (!originallyHadSubmenuBelow) {
            menuElement.classList.add('submenu-below');
          }
        } else {
          console.log("[Debug] Natural position would not overflow. Ensuring .submenu-below is absent.");
          // 如果它在此區塊開始時被移除（因為 originallyHadSubmenuBelow 為 true），
          // 且現在不應該存在，則它保持被移除狀態。這是正確的。
          // 如果它原本不存在，且不應該存在，則它保持不存在狀態。正確。
          // 所以，如果 originallyHadSubmenuBelow 為 true，它已經被移除了。如果為 false，則保持 false。
          // 唯一需要的操作是：如果它被移除了「且」naturalRight > viewportWidth（已在上方處理），則重新添加它；
          // 或者，如果它原本不存在但不知何故被添加了（此邏輯不可能發生），則移除它；
          // 或者，如果它「曾」存在且 naturalRight <= viewportWidth（已由第一次移除完成），則移除它。
        }
        
        // 簡化的最終狀態設定：
        // 計算完 naturalRight 後，決定最終狀態。
        if (naturalRight > viewportWidth) {
            if (!menuElement.classList.contains('submenu-below')) {
                menuElement.classList.add('submenu-below');
                console.log("[Debug] Added .submenu-below as it was missing and needed.");
            }
        } else {
            if (menuElement.classList.contains('submenu-below')) {
                menuElement.classList.remove('submenu-below');
                console.log("[Debug] Removed .submenu-below as it was present but not needed.");
            }
        }

      } else {
        console.log("[Debug] eastLansingSub is false. Removing .submenu-below if present.");
        if (menuElement.classList.contains('submenu-below')) {
            menuElement.classList.remove('submenu-below');
        }
      }
    } else {
      console.log("[Debug] menuElement is null.");
    }
  }, [dropdownStates.eastLansingSub]);

  useEffect(() => {
    checkEastLansingMenuPosition();
  }, [checkEastLansingMenuPosition]);

  // 加入 useEffect 監聽 resize 事件
  useEffect(() => {
    const handleResize = () => {
      // 可以在這裡 log 寬度，或者根據需要更新狀態
      // console.log(`[Header Resize] window.innerWidth: ${window.innerWidth}`);
      checkEastLansingMenuPosition(); // 呼叫檢查函式
    };
    const debouncedResize = debounce(handleResize, 200);
    window.addEventListener("resize", debouncedResize);
    // 初始執行一次以獲取當前寬度並檢查選單位置
    handleResize();

    // 組件卸載時移除監聽器，避免 memory leak
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [checkEastLansingMenuPosition]); // // 如果 checkEastLansingMenuPosition 改變，則重新附加監聽器

  // 點擊選單外關閉邏輯由 NavContext 處理，不需於此重複實作

  // 點擊選單外關閉邏輯及切換函式均由 NavContext 管理

  return (
    <header className="header" role="banner" ref={headerRef}>
      <div className="container">
        <div className="logo">
          <a href="/" title="Bright Education 首頁">
            <img
              src={`${process.env.PUBLIC_URL}/images/header/logo.webp`}
              className="logo-img responsive-img"
              alt="Bright Education Logo"
              width="150"
              height="60"
              loading="lazy"
            />
          </a>
        </div>

        {/* 漢堡選單按鈕 */}
        <div
          className={`hamburger-menu ${
            dropdownStates.mobileMenu ? "active" : ""
          }`}
          onClick={toggleMobileMenu}
          aria-expanded={dropdownStates.mobileMenu}
          role="button"
          aria-label="導航選單"
          tabIndex="0"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav
          className={`header-nav ${
            dropdownStates.mobileMenu ? "mobile-active" : ""
          }`}
          role="navigation"
          aria-label="主導航"
        >
          <ul className="nav-links">
            <li>
              <a href="/" className="active" title="回到首頁">
                首頁
              </a>
            </li>

            <li className="dropdown-container">
              <div
                className={`dropdown-toggle ${
                  dropdownStates.UIC ? "open" : ""
                }`}
                onClick={toggleUICDropdown}
                aria-expanded={dropdownStates.UIC}
                role="button"
                tabIndex="0"
              >
                UIC商學院碩士
                <span className="dropdown-arrow">▼</span>
              </div>
              <ul
                className={`dropdown-menu ${dropdownStates.UIC ? "show" : ""}`}
              >
                <li className="dropdown-container">
                  <div
                    className={`dropdown-toggle ${
                      dropdownStates.UICSub ? "open" : ""
                    }`}
                    onClick={toggleUICSubDropdown}
                    role="button"
                    tabIndex="0"
                    aria-expanded={dropdownStates.UICSub}
                  >
                    UIC 伊利諾大學芝加哥分校
                    <span className="dropdown-arrow">▶</span>
                  </div>
                  <ul
                    className={`dropdown-menu ${
                      dropdownStates.UICSub ? "show" : ""
                    }`}
                  >
                    <li>
                      <a
                        href="/uic-business-school/uic/about-uic"
                        title="學校介紹"
                      >
                        學校介紹
                      </a>
                    </li>
                    {/* 排名與獎項：hover(桌機)/點擊(手機) */}
                    <li
                      className="dropdown-container"
                      onMouseEnter={handleMouseEnter(
                        "rankingsSub",
                        "chicagoSub" // 桌機 hover 時關閉 chicagoSub
                      )}
                      onMouseLeave={handleMouseLeave("rankingsSub")}
                    >
                      <a
                        href="/uic-business-school/uic/rankings-awards"
                        className={`dropdown-toggle-link ${
                          dropdownStates.rankingsSub ? "open" : ""
                        }`}
                        aria-expanded={dropdownStates.rankingsSub}
                        title="排名與獎項"
                        onClick={handleDropdownLinkClick(
                          "rankingsSub",
                          "/uic-business-school/uic/rankings-awards",
                          "chicagoSub" // 手機點擊時關閉 chicagoSub
                        )}
                      >
                        排名與獎項
                        <span className="dropdown-arrow">▶</span>
                      </a>
                      <ul
                        className={`dropdown-menu rankings-menu ${
                          dropdownStates.rankingsSub ? "show" : ""
                        }`}
                      >
                        <li>
                          <a
                            href="/uic-business-school/uic/uic_school/ranking/aacsb"
                            title="AACSB"
                          >
                            AACSB
                          </a>
                        </li>
                        <li>
                          <a
                            href="/uic-business-school/uic/uic_school/ranking/heed"
                            title="Heed"
                          >
                            Heed
                          </a>
                        </li>
                        <li>
                          <a
                            href="/uic-business-school/uic/uic_school/ranking/ranking"
                            title="Ranking"
                          >
                            Ranking
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/uic/career-resources"
                        title="職涯資源"
                      >
                        職涯資源
                      </a>
                    </li>
                    {/* 芝加哥城市：hover(桌機)/點擊(手機) */}
                    <li
                      className="dropdown-container"
                      onMouseEnter={handleMouseEnter(
                        "chicagoSub",
                        "rankingsSub" // 桌機 hover 時關閉 rankingsSub
                      )}
                      onMouseLeave={handleMouseLeave("chicagoSub")}
                    >
                      <a
                        href="/uic-business-school/uic/chicago"
                        className={`dropdown-toggle-link ${
                          dropdownStates.chicagoSub ? "open" : ""
                        }`}
                        aria-expanded={dropdownStates.chicagoSub}
                        onClick={handleDropdownLinkClick(
                          "chicagoSub",
                          "/uic-business-school/uic/chicago",
                          "rankingsSub" // 手機點擊時關閉 rankingsSub
                        )}
                      >
                        芝加哥城市
                        <span className="dropdown-arrow">▶</span>
                      </a>
                      <ul
                        className={`dropdown-menu chicago-menu ${
                          dropdownStates.chicagoSub ? "show" : ""
                        }`}
                      >
                        <li>
                          <a
                            href="/uic-business-school/uic/chicago/food-attractions"
                            title="景點與美食"
                          >
                            景點與美食
                          </a>
                        </li>
                        <li>
                          <a
                            href="/uic-business-school/uic/chicago/economy"
                            title="芝加哥經濟"
                          >
                            芝加哥經濟
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/uic-business-school/uic/faq" title="常見問題">
                        常見問題
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-container">
                  <div
                    className={`dropdown-toggle ${
                      dropdownStates.MBASub ? "open" : ""
                    }`}
                    onClick={toggleMBASubDropdown}
                    role="button"
                    tabIndex="0"
                    aria-expanded={dropdownStates.MBASub}
                  >
                    MBA Programs
                    <span className="dropdown-arrow">▶</span>
                  </div>
                  <ul
                    className={`dropdown-menu ${
                      dropdownStates.MBASub ? "show" : ""
                    }`}
                  >
                    {/* 五大領域：hover(桌機)/點擊(手機) */}
                    <li
                      className="dropdown-container"
                      onMouseEnter={handleMouseEnter("areasSub")} // 桌機 hover 不需關閉同層
                      onMouseLeave={handleMouseLeave("areasSub")}
                    >
                      <div className="areas-header">
                        <a
                          href="/uic-business-school/mba/areas"
                          title="五大領域"
                          className="areas-link"
                          onClick={handleDropdownLinkClick(
                            "areasSub",
                            "/uic-business-school/mba/areas"
                            // 手機點擊不需關閉同層
                          )}
                          aria-expanded={dropdownStates.areasSub}
                        >
                          五大領域
                        </a>
                        <span
                          className={`dropdown-arrow ${
                            dropdownStates.areasSub ? "open" : ""
                          }`}
                          role="button"
                          tabIndex="0"
                          aria-expanded={dropdownStates.areasSub}
                        >
                          ▶
                        </span>
                      </div>
                      <ul
                        className={`dropdown-menu ${
                          dropdownStates.areasSub ? "show" : ""
                        }`}
                      >
                        <li>
                          <a
                            href="/uic-business-school/mba/areas/management" // 修改導向
                            title="MBA-Management "
                          >
                            MBA-Management
                          </a>
                        </li>
                        <li>
                          <a
                            href="/uic-business-school/mba/areas/finance"
                            title="MBA-Finance"
                          >
                            MBA-Finance
                          </a>
                        </li>
                        <li>
                          <a
                            href="/uic-business-school/mba/areas/analytics"
                            title="MBA-Business Analytics"
                          >
                            MBA-Business Analytics
                          </a>
                        </li>
                        <li>
                          <a
                            href="/uic-business-school/mba/areas/marketing"
                            title="MBA-Marketing"
                          >
                            MBA-Marketing
                          </a>
                        </li>
                        <li>
                          <a
                            href="/uic-business-school/mba/areas/human-resource"
                            title="MBA-Human Resource Management"
                          >
                            MBA-Human Resource Management
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/mba/advantages"
                        title="課程優勢"
                      >
                        課程優勢
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/mba/core-courses"
                        title="核心課程"
                      >
                        核心課程
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/mba/dual-degree"
                        title="雙碩士銜接課程"
                      >
                        雙碩士銜接課程
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/mba/application"
                        title="申請資訊"
                      >
                        申請資訊
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-container">
                  <div
                    className={`dropdown-toggle ${
                      dropdownStates.MSSub ? "open" : ""
                    }`}
                    onClick={toggleMSSubDropdown}
                    role="button"
                    tabIndex="0"
                    aria-expanded={dropdownStates.MSSub}
                  >
                    MS Programs
                    <span className="dropdown-arrow">▶</span>
                  </div>
                  <ul
                    className={`dropdown-menu ${
                      dropdownStates.MSSub ? "show" : ""
                    }`}
                  >
                    <li>
                      <a
                        href="/uic-business-school/ms/finance"
                        title="MS in Finance"
                      >
                        MS in Finance
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/ms/marketing"
                        title="MS in Marketing"
                      >
                        MS in Marketing
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/ms/supply-chain-operation-management"
                        title="MS in Supply Chain and Operation Management"
                      >
                        MS in Supply Chain and Operation Management
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/ms/business-analytics"
                        title="MS in Business Analytics"
                      >
                        MS in Business Analytics
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/ms/management-information-systems"
                        title="MS in Management Information Systems"
                      >
                        MS in Management Information Systems
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/ms/accounting"
                        title="MS in Accounting"
                      >
                        MS in Accounting
                      </a>
                    </li>
                    <li>
                      <a
                        href="/uic-business-school/ms/application"
                        title="申請資訊"
                      >
                        申請資訊
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li className="dropdown-container">
              <div
                className={`dropdown-toggle ${
                  dropdownStates.MSU ? "open" : ""
                }`}
                onClick={toggleMSUDropdown}
                aria-expanded={dropdownStates.MSU}
                role="button"
                tabIndex="0"
              >
                MSU金融碩士
                <span className="dropdown-arrow">▼</span>
              </div>
              <ul
                className={`dropdown-menu ${dropdownStates.MSU ? "show" : ""}`}
              >
                {/* MSU密西根州立大學下拉選單 */}
                <li className="dropdown-container">
                  <div
                    className={`dropdown-toggle ${
                      dropdownStates.msuMainSub ? "open" : ""
                    }`}
                    onClick={toggleMSUMainSubDropdown}
                    role="button"
                    tabIndex="0"
                    aria-expanded={dropdownStates.msuMainSub}
                  >
                    MSU密西根州立大學
                    <span className="dropdown-arrow">▶</span>
                  </div>
                  <ul
                    className={`dropdown-menu ${
                      dropdownStates.msuMainSub ? "show" : ""
                    }`}
                  >
                    <li>
                      <a
                        href="/msu-business-school/msu/about-msu"
                        title="學校介紹"
                      >
                        學校介紹
                      </a>
                    </li>
                    <li>
                      <a
                        href="/msu-business-school/msu/rankings-awards"
                        title="排名與獎項"
                      >
                        排名與獎項
                      </a>
                    </li>
                    <li>
                      <a
                        href="/msu-business-school/msu/career-resources"
                        title="職涯資源"
                      >
                        職涯資源
                      </a>
                    </li>
                    {/* 密西根州-東蘭辛市(大學城)滑鼠懸停下拉選單 */}
                    <li
                      className="dropdown-container"
                      onMouseEnter={handleMouseEnter("eastLansingSub")} // 桌機 hover 不需關閉同層
                      onMouseLeave={handleMouseLeave("eastLansingSub")}
                    >
                      <a
                        href="/msu-business-school/msu/east-lansing"
                        className={`dropdown-toggle-link ${
                          dropdownStates.eastLansingSub ? "open" : ""
                        }`}
                        aria-expanded={dropdownStates.eastLansingSub}
                        title="密西根州-東蘭辛市(大學城)"
                        onClick={handleDropdownLinkClick(
                          "eastLansingSub",
                          "/msu-business-school/msu/east-lansing"
                          // 手機點擊不需關閉同層
                        )}
                      >
                        密西根州-東蘭辛市(大學城)
                        <span className="dropdown-arrow">▶</span>
                      </a>
                      <ul
                        ref={eastLansingMenuRef}
                        className={`dropdown-menu east-lansing-menu ${
                          dropdownStates.eastLansingSub ? "show" : ""
                        }`}
                      >
                        <li>
                          <a
                            href="/msu-business-school/msu/east-lansing/east-lansing-food-attractions"
                            title="景點與美食"
                          >
                            景點與美食
                          </a>
                        </li>
                        <li>
                          <a
                            href="/msu-business-school/msu/east-lansing/transportation"
                            title="交通"
                          >
                            交通
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* <li>
                      <a href="/msu-business-school/msu/faq" title="常見問題">
                        常見問題
                      </a>
                    </li> */}
                  </ul>
                </li>
                {/* MSF Programs下拉選單 */}
                <li className="dropdown-container">
                  <div
                    className={`dropdown-toggle ${
                      dropdownStates.msfProgramsSub ? "open" : ""
                    }`}
                    onClick={toggleMSFProgramsSubDropdown}
                    role="button"
                    tabIndex="0"
                    aria-expanded={dropdownStates.msfProgramsSub}
                  >
                    MSF Programs
                    <span className="dropdown-arrow">▶</span>
                  </div>
                  <ul
                    className={`dropdown-menu ${
                      dropdownStates.msfProgramsSub ? "show" : ""
                    }`}
                  >
                    <li>
                      <a
                        href="/msu-business-school/msf/master"
                        title="MSF 金融碩士"
                      >
                        MSF 金融碩士
                      </a>
                    </li>
                    <li>
                      <a
                        href="/msu-business-school/msf/application"
                        title="申請資訊"
                      >
                        申請資訊
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="/blog" title="瀏覽活動與文章">
                活動與文章
              </a>
            </li>
            <li>
              <a href="/contact" title="聯絡我們獲取更多資訊">
                聯絡我們
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

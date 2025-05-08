import React, { useState, useEffect, useRef } from "react"; // 引入 useRef
import "./Header.css";

function Header() {
  // 使用單一物件管理所有下拉選單狀態
  const [dropdownStates, setDropdownStates] = useState({
    UIC: false,
    MSU: false,
    UICSub: false,
    MBASub: false,
    MSSub: false,
    chicagoSub: false,
    rankingsSub: false, // 新增排名與獎項下拉選單狀態
    mobileMenu: false,
    areasSub: false, // 新增五大領域下拉選單狀態
    msuMainSub: false, // MSU密西根州立大學下拉
    msfProgramsSub: false, // MSF Programs下拉
    eastLansingSub: false, // 新增東蘭辛市下拉
  });
  const [pendingLink, setPendingLink] = useState(null); // 新增
  const headerRef = useRef(null); // 新增 ref

  // 加入 useEffect 監聽 resize 事件
  useEffect(() => {
    const handleResize = () => {
      // 可以在這裡 log 寬度，或者根據需要更新狀態
      console.log(`[Header Resize] window.innerWidth: ${window.innerWidth}`);
    };

    // 組件掛載時增加監聽器
    window.addEventListener("resize", handleResize);
    // 初始執行一次以獲取當前寬度
    handleResize();

    // 組件卸載時移除監聽器，避免 memory leak
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 空依賴數組表示只在掛載和卸載時執行

  // 點擊選單外關閉所有下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setDropdownStates((prev) => ({
          ...prev,
          UIC: false,
          MSU: false,
          UICSub: false,
          MBASub: false,
          MSSub: false,
          chicagoSub: false,
          rankingsSub: false,
          areasSub: false,
          msuMainSub: false,
          msfProgramsSub: false,
          eastLansingSub: false,
          // mobileMenu 不自動關閉
        }));
        setPendingLink(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 通用選單切換函數
  const toggleDropdown =
    (menuKey, closeOthers = [], childMenus = []) =>
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      setDropdownStates((prevState) => {
        const newState = { ...prevState };

        // 關閉指定的其他選單
        closeOthers.forEach((key) => {
          newState[key] = false;
        });

        // 切換當前選單狀態
        newState[menuKey] = !prevState[menuKey];

        // 如果是從開啟變為關閉狀態，同時關閉所有子選單
        if (prevState[menuKey] && childMenus.length > 0) {
          childMenus.forEach((childKey) => {
            newState[childKey] = false;
          });
        }

        return newState;
      });
    };

  // 主選單切換
  const toggleUICDropdown = toggleDropdown(
    "UIC",
    ["MSU"],
    ["UICSub", "MBASub", "MSSub", "chicagoSub", "rankingsSub", "areasSub"] // 確保所有子孫選單都被包含
  );
  // 修改這裡，加入 msuMainSub 與 msfProgramsSub 作為 MSU 的子選單
  const toggleMSUDropdown = toggleDropdown(
    "MSU",
    ["UIC"],
    ["msuMainSub", "msfProgramsSub"] // 當 MSU 關閉時，同步關閉這兩個子選單
  );

  // 子選單切換
  const toggleUICSubDropdown = toggleDropdown(
    "UICSub",
    ["MBASub", "MSSub"], // 只關閉同層的 MBA 和 MS
    ["chicagoSub", "rankingsSub"] // 定義自己的子選單
  );
  const toggleMBASubDropdown = toggleDropdown(
    "MBASub",
    ["UICSub", "MSSub"], // 只關閉同層的 UIC 和 MS
    ["areasSub"] // 定義自己的子選單
  );
  const toggleMSSubDropdown = toggleDropdown(
    "MSSub",
    ["UICSub", "MBASub"] // 只關閉同層的 UIC 和 MBA
  );

  // MSU密西根州立大學下拉切換
  const toggleMSUMainSubDropdown = toggleDropdown(
    "msuMainSub",
    ["msfProgramsSub"] // 關閉同層
  );
  // MSF Programs下拉切換
  const toggleMSFProgramsSubDropdown = toggleDropdown(
    "msfProgramsSub",
    ["msuMainSub"] // 關閉同層
  );

  // 行動選單切換
  const toggleMobileMenu = toggleDropdown("mobileMenu");

  // 判斷是否為 mobile 模式
  const isMobile = () => window.innerWidth < 700;

  // 通用下拉選單點擊處理（用於有子選單的連結）
  const handleDropdownLinkClick =
    (menuKey, href, closeKey = null) =>
    (e) => {
      const currentWidth = window.innerWidth; // 取得當前寬度
      const mobileCheck = currentWidth < 700; // 執行寬度檢查
      console.log(
        `[Header Click] Clicked ${menuKey}. Width: ${currentWidth}, isMobile: ${mobileCheck}` // 修正 log 訊息
      ); // 偵錯訊息 1 (包含寬度)

      if (mobileCheck) {
        // 使用檢查結果
        e.preventDefault(); // 始終阻止預設跳轉行為
        e.stopPropagation(); // 阻止事件冒泡

        const isCurrentlyOpen = dropdownStates[menuKey];
        const isPending = pendingLink === menuKey;

        console.log(
          `[Header Click] - State: isCurrentlyOpen=${isCurrentlyOpen}, isPending=${isPending}`
        ); // 偵錯訊息 2

        if (!isCurrentlyOpen) {
          // --- 情況 1: 下拉選單是關閉的 ---
          console.log(
            `[Header Click]   -> Action: Opening ${menuKey}, setting pending.`
          ); // 偵錯訊息 3
          setDropdownStates((prev) => ({
            ...prev,
            [menuKey]: true, // 打開當前選單
            ...(closeKey ? { [closeKey]: false } : {}), // 關閉同層選單
          }));
          setPendingLink(menuKey); // 標記為等待跳轉
        } else {
          // --- 情況 2: 下拉選單已開啟 ---
          if (isPending) {
            // 它是開啟的，且是上次點擊的目標 -> 執行跳轉
            console.log(`[Header Click]   -> Action: Navigating to ${href}`); // 偵錯訊息 4
            setPendingLink(null); // 清除等待狀態
            window.location.href = href; // 手動跳轉
          } else {
            // 它是開啟的，但不是上次點擊的目標 (例如點了別的項目後又點回來)
            console.log(
              `[Header Click]   -> Action: Setting ${menuKey} as pending (already open).`
            ); // 偵錯訊息 5
            setDropdownStates((prev) => ({
              ...prev,
              [menuKey]: true, // 確保保持開啟
              ...(closeKey ? { [closeKey]: false } : {}), // 關閉同層選單
            }));
            setPendingLink(menuKey); // 標記為等待跳轉
          }
        }
      }
      // 桌機模式: 不執行任何操作，讓 <a> 標籤的預設行為處理跳轉
      // (因為 e.preventDefault() 只在 mobileCheck 為 true 時調用)
    };

  // 滑鼠懸停展開（桌機用）
  const handleMouseEnter = (menuKey, closeKey) => () => {
    if (!isMobile()) {
      setDropdownStates((prev) => ({
        ...prev,
        [menuKey]: true,
        ...(closeKey ? { [closeKey]: false } : {}),
      }));
      setPendingLink(null);
    }
  };
  const handleMouseLeave = (menuKey) => () => {
    if (!isMobile()) {
      setDropdownStates((prev) => ({
        ...prev,
        [menuKey]: false,
      }));
      setPendingLink(null);
    }
  };

  return (
    <header className="header" role="banner" ref={headerRef}>
      <div className="container">
        <div className="logo">
          <a href="/" title="Bright Education 首頁">
            <img
              src="https://imgur.com/0bP0auA.png"
              className="logo-img"
              alt="Bright Education Logo"
              // fetchpriority="high"
              width="150"
              height="60"
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

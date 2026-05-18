/**
 * UIC MS program content configuration.
 * Single source of truth for per-program data consumed by each MS page
 * and passed as props to MSFinanceSection.
 * Pages retain their unique JSX shell (wrapper class, h2, intro paragraph).
 */
import React from "react";
import getImageUrl from "../../../utils/getImageUrl";

// ── MSF (Finance) ─────────────────────────────────────────────────────────────
export const MS_FINANCE_CONFIG = {
  whyTitle: "為什麼選擇在UIC商學院攻讀金融碩士學位？",
  whyList: [
    {
      title: "取得UIC金融碩士學位，開啟更多職涯機會",
      desc: "UIC商學院的Master of Science in Finance (MSF)提供全面的課程設計、師資指導、專業學習軌道及實務經驗，幫助你在金融領域的各個領域取得成功。",
    },
    {
      title: "業界經驗豐富的師資",
      desc: "學習來自業界專家的實務知識，這些教授將 真實的業界經驗 帶入課堂，確保你同時獲得 理論與實務的雙重視角。",
    },
    {
      title: "最先進的虛擬交易中心",
      desc: "透過市場交易實驗室（Market Training Lab），你將有機會使用Bloomberg 終端機、高階業界軟體，並參與學術研究，讓你的金融技能更臻完善。",
    },
    {
      title: "快速且靈活的MSF學位",
      desc: "你可以在1年內完成全日制學習，或選擇兼職修讀，根據你的個人時間安排進行課程規劃。",
    },
    {
      title: "參與研究生金融社群活動",
      desc: "參加投資挑戰賽（Investment Challenge Competitions），與其他大學競爭，並透過UIC研究生金融與投資協會（Graduate Finance and Investment Group）參與芝加哥金融專業人士的演講與交流活動。",
    },
  ],
  outcomesTitle: "MSF畢業生發展成果",
  outcomesDesc:
    "金融碩士畢業生的工作機會遍布各行各業，UIC商學院的Master of Science in Finance (MSF)為你開啟更多高薪與高潛力的職業選擇。",
  companyTitle: "主要聘用 UIC 商學院 MSF 畢業生的頂尖企業",
  companyLogos: [
    {
      src: getImageUrl("/images/Uic/Ms/JP Morgan Chase & Co.webp"),
      alt: "JP Morgan Chase & Co",
    },
    {
      src: getImageUrl("/images/Uic/Ms/bofa-og-logo.webp"),
      alt: "bofa-og-logo",
    },
    { src: getImageUrl("/images/Uic/Ms/US Bank.webp"), alt: "US Bank" },
    {
      src: getImageUrl("/images/Uic/Ms/BMO Financial Group.webp"),
      alt: "BMO Financial Group",
    },
  ],
  courseArrangementTitle: "學分與課程安排",
  courseArrangementList: [
    "MSF課程總共32個學分，其中包括12個必修學分和20個選修學分。",
    "學生可以根據自己的職涯發展方向，自由選擇適合的選修課程來提升專業技能。",
  ],
  coreCoursesTitle: "核心課程範例",
  coreCoursePragaph: "",
  coreCoursesList: [
    [
      {
        zh: "投資學",
        en: "Investments",
        desc: "學習資產配置、投資組合管理及風險控制的策略。",
      },
      {
        zh: "金融建模",
        en: "Financial Modeling",
        desc: "掌握使用 Excel 和其他工具構建財務模型的技術。",
      },
    ],
    [
      {
        zh: "企業財務",
        en: "Corporate Finance",
        desc: "探討資本結構、公司財務策略及價值創造。",
      },
      {
        zh: "貨幣與銀行學",
        en: "Money and Banking",
        desc: "研究貨幣體系、銀行運作及其對經濟的影響。",
      },
    ],
    [
      {
        zh: "國際金融",
        en: "International Finance",
        desc: "研究全球市場的資本流動與貨幣政策對金融的影響。",
      },
    ],
  ],
  reasonsTitle: "為什麼選擇 UIC 的 MSF？",
  reasonsDesc:
    "透過UIC商學院的Master of Science in Finance（MSF），你不僅能掌握現代金融理論與實務技能，還能在競爭激烈的金融市場中保持領先，開啟各種高階金融職涯機會！",
};

// ── MSA (Accounting) ──────────────────────────────────────────────────────────
export const MS_ACCOUNTING_CONFIG = {
  whyTitle: "為什麼選擇在 UIC 商學院攻讀會計碩士？",
  whyList: [
    {
      title: "助你備戰 CPA，通過率領先",
      desc: "面對不斷變化的規範、法律和法規，僅憑學士學位很難全面準備 CPA 考試。而 UIC 商學院的 MSA 將為你充分準備 CPA 考試，並且我們的通過率一直保持在高水平。",
    },
    {
      title: "靈活的課程設計",
      desc: "我們會考慮你之前所修的課程，因此不需要重複學習你已經掌握的知識，讓你的學習過程更加高效。",
    },
    {
      title: "緊跟新科技需求，提升競爭力",
      desc: "根據 美國註冊會計師協會（American Institute of CPAs, AICPA） 的研究，隨著企業對高技術會計服務的需求日益增長，會計行業的角色正在發生重大變化。UIC 商學院透過將最新的技術與方法融入課程中，確保你在職場中始終保持競爭優勢。",
    },
  ],
  outcomesTitle: "MSA 職涯發展與成果",
  outcomesDesc: {
    desc: "現代會計師不再只是記錄財務數據的角色，更是 企業顧問與財務顧問，透過數據分析為企業提供減少成本、提升營收的策略建議。我們的 MSA 課程將 研究與實務應用 結合，讓你具備在職場中脫穎而出的優勢，成為企業尋找的 未來領袖、合夥人及高層管理者。",
  },
  companyTitle: "主要聘用 UIC 商學院 MSA 畢業生的頂尖企業",
  companyLogos: [
    { src: getImageUrl("/images/Uic/Ms/RSM.webp"), alt: "RSM" },
    { src: getImageUrl("/images/Uic/Ms/Deloitte.webp"), alt: "Deloitte" },
    { src: getImageUrl("/images/Uic/Ms/PWC.webp"), alt: "PWC" },
    {
      src: getImageUrl("/images/Uic/Ms/Grant Thornton.webp"),
      alt: "Grant Thornton",
    },
    { src: getImageUrl("/images/Uic/Ms/EY.webp"), alt: "EY" },
    {
      src: getImageUrl("/images/Uic/Ms/Michael Sliver.webp"),
      alt: "Michael Sliver",
    },
    { src: getImageUrl("/images/Uic/Ms/Andersen.webp"), alt: "Andersen" },
    { src: getImageUrl("/images/Uic/Ms/Bakertilly.webp"), alt: "Bakertilly" },
    { src: getImageUrl("/images/Uic/Ms/KMPG.webp"), alt: "KMPG" },
    {
      src: getImageUrl("/images/Uic/Ms/Plante Moran.webp"),
      alt: "Plante Moran",
    },
  ],
  courseArrangementTitle: "學分與課程安排",
  courseArrangementList: [
    "MSA 課程：32 個學分（適用於會計本科背景的學生）。",
    "額外課程：如果你沒有會計本科學位，需要再修習 11 門補充課程，讓你具備 CPA 或其他專業考試所需的基礎知識。",
  ],
  coreCoursesTitle: "MSA 課程特色",
  coreCoursePragaph:
    "UIC 商學院的 MSA 課程為期 1 到 2 年，不僅為你提供專業會計領域的知識與技能，還能幫助你準備多項專業考試，包括：",
  coreCoursesIntroList: [
    "✅ CPA（Certified Public Accountant, 註冊會計師）考試",
    "✅ CMA（Certificate in Management Accounting, 管理會計師證書）考試",
  ],
  coreCoursesList: [],
  coreCourseFoot:
    "此外，UIC 商學院的 MSA 課程符合所有 CPA 考試的教育要求，確保你在畢業後具備充分的資格申請考試。",
  reasonsTitle: "為什麼選擇 UIC 的 MSA？",
  reasonsDesc:
    "透過 UIC 的 MSA 課程，你不僅能取得專業會計知識，更能在瞬息萬變的會計領域中保持領先，成為企業中備受信賴的財務專家！",
  coreCoursesIntroMarginBottom: 0,
  coreCoursesListMarginBottom: 0,
  coreCoursePragaphMarginBottom: 0,
};

// ── MSBA (Analytics) ──────────────────────────────────────────────────────────
export const MS_ANALYTICS_CONFIG = {
  whyTitle: "為什麼選擇在 UIC 商學院攻讀商業分析碩士？",
  whyList: [
    {
      title: "節奏快且靈活的學位設計",
      desc: "MSBA課程共有32個學分，可在1年內全職完成，或多年間兼職修讀，讓你根據自身的職涯或企業需求靈活規劃課程。",
      extraList: [
        "透過多元的選修課程，你可以量身打造個人學習路徑，實現專業發展與個人目標之間的平衡。",
      ],
    },
    {
      title: "實踐導向的學習模式",
      desc: "Master of Science in Business Analytics (MSBA) 課程包含頂點專案（Capstone Experience），讓你有機會與企業客戶合作，分析實際的業務問題並開發分析解決方案。這種經驗能讓你在畢業後更具市場競爭力。",
    },
  ],
  outcomesTitle: "MSBA 職涯發展與成果",
  outcomesDesc: {
    desc: "隨著 商業分析與人工智慧（AI） 領域的快速增長，未來十年內該行業的發展預計將呈現指數級增長。我們的 MSBA 課程將幫助你進入以下職業領域：",
    list: [
      "分析師與數據科學家（Analysts and Data Scientists） – 涵蓋 會計、財務、數位行銷、供應鏈管理、AI 應用、收益優化 及 風險管理 等領域。",
      "管理層職位（Managerial Roles） – 幫助在職專業人士為進一步晉升管理層做好準備，開啟更多職涯發展機會。",
    ],
  },
  companyTitle: "主要聘用 UIC 商學院 MSBA 畢業生的頂尖企業",
  companyLogos: [
    { src: getImageUrl("/images/Uic/Ms/Accenture.webp"), alt: "Accenture" },
    {
      src: getImageUrl("/images/Uic/Ms/BlueCrossBlueShield.webp"),
      alt: "BlueCrossBlueShield",
    },
    { src: getImageUrl("/images/Uic/Ms/CWD.webp"), alt: "CWD" },
    { src: getImageUrl("/images/Uic/Ms/Zurich.webp"), alt: "Zurich" },
    { src: getImageUrl("/images/Uic/Ms/Deloitte.webp"), alt: "Deloitte" },
    {
      src: getImageUrl("/images/Uic/Ms/Discover Financial Services.webp"),
      alt: "Discover Financial Services",
    },
    { src: getImageUrl("/images/Uic/Ms/PWC.webp"), alt: "PWC" },
    { src: getImageUrl("/images/Uic/Ms/RSM.webp"), alt: "RSM" },
    { src: getImageUrl("/images/Uic/Ms/SAP.webp"), alt: "SAP" },
    { src: getImageUrl("/images/Uic/Ms/United.webp"), alt: "United" },
  ],
  courseArrangementTitle: "學分與課程安排",
  courseArrangementList: [
    "MSBA 課程總共32個學分，其中包含16個必修學分 和16個選修學分。",
    "課程設計靈活，讓你可以根據個人興趣或職業目標進行學習規劃。",
  ],
  coreCoursesTitle: "核心課程範例",
  coreCoursePragaph: "獲得管理方向 MBA 學位後，你將有機會進入以下職位：",
  coreCoursesList: [
    [
      {
        zh: "高級資料庫管理",
        en: "Advanced Database Management",
        desc: "學習高效管理和分析大量資料庫的知識與技術。",
      },
      {
        zh: "機器學習與統計方法",
        en: "Machine Learning and Statistical Methods for Business Analytics",
        desc: "了解如何運用機器學習和統計模型來進行業務分析和預測",
      },
    ],
    [
      {
        zh: "分析策略與實踐",
        en: "Analytics Strategy and Practice",
        desc: "探索如何設計並執行數據分析策略，推動業務決策。",
      },
    ],
    [
      {
        zh: "商業數據挖掘",
        en: "Data Mining for Business",
        desc: "掌握從大型數據集中提取有價值信息的技術。",
      },
    ],
  ],
  reasonsTitle: "為什麼選擇 UIC 的 MSBA？",
  reasonsDesc:
    "透過UIC商學院的Master of Science in Business Analytics（MSBA），你不僅能獲得前沿的數據分析技能，還能拓展在各行業的就業機會，成為具備技術專長與商業洞察力的專業人才！",
};

// ── MSMIS (Information) ───────────────────────────────────────────────────────
export const MS_INFORMATION_CONFIG = {
  whyTitle: "為什麼選擇在UIC商學院攻讀管理資訊系統碩士學位？",
  whyList: [
    {
      title: "快速且靈活的學位設計",
      desc: (
        <ul
          style={{
            listStyle: "disc",
            listStylePosition: "inside",
            paddingLeft: "0",
          }}
        >
          <li>
            MSMIS課程總共32個學分，可以在1年內完成全日制學習，或選擇
            多年間兼職修讀，根據你的個人時間安排進行課程規劃。
          </li>
          <li>
            透過多元的選修課程，你可以根據職涯目標或企業需求量身打造自己的學習計劃。
          </li>
        </ul>
      ),
    },
    {
      title: "核心課程與專業方向選擇",
      desc: (
        <ul
          style={{
            listStyle: "disc",
            listStylePosition: "inside",
            paddingLeft: "0",
          }}
        >
          <li>
            核心課程包括企業應用與基礎設施、數據庫管理與資訊系統管理，為你建立堅實的基礎。
          </li>
          <li>
            接著，你可以根據個人興趣選擇技術方向、管理方向，或結合兩者的混合專業，課程涵蓋以下三大領域：
          </li>
          <li
            style={{
              listStyle: "none",
              paddingLeft: 0,
              marginTop: "0.5em",
              display: "flex",
              flexDirection: "column",
              gap: "0.5em",
            }}
          >
            <div>
              <strong style={{ fontWeight: "400" }}>
                服務運營與供應鏈管理（Service Operations and Supply Chain
                Management）
              </strong>
            </div>
            <div>
              <strong style={{ fontWeight: "400" }}>
                企業資訊科技／技術專案管理（Enterprise Information
                Technology/Technology Project Management）
              </strong>
            </div>
            <div>
              <strong style={{ fontWeight: "400" }}>
                金融與行銷領域的數據挖掘（Data Mining for Finance and Marketing
                Sectors）
              </strong>
            </div>
          </li>
        </ul>
      ),
    },
    {
      title: "實務導向的學習體驗",
      desc: "頂點專案（Capstone Experience）– 你將參與一個設計專案，與外部企業合作解決實際問題，或選擇一個獨立的研究專案，讓你在畢業前獲得寶貴的實務經驗。",
    },
  ],
  outcomesTitle: "MSMIS 職涯發展與成果",
  outcomesDesc: {
    desc: "Master of Science in Management Information Systems (MSMIS)將幫助你在企業IT和技術專案管理領域專精，具備解決電子商務、供應鏈管理、數據管理與商業智慧等領域問題的能力。課程還培養分析、框架與溝通的技能，讓你在進入職場時具備競爭優勢。",
  },
  companyTitle: "主要聘用 UIC 商學院 MSMIS 畢業生的頂尖企業",
  companyLogos: [
    {
      src: getImageUrl("/images/Uic/Ms/BlueCrossBlueShield.webp"),
      alt: "Blur Cross BlueShield",
    },
    {
      src: getImageUrl("/images/Uic/Ms/Discover Financial Services.webp"),
      alt: "Discover Financial Services",
    },
    { src: getImageUrl("/images/Uic/Ms/Accenture.webp"), alt: "Accenture" },
    { src: getImageUrl("/images/Uic/Ms/Zurich.webp"), alt: "Zurich" },
    { src: getImageUrl("/images/Uic/Ms/SAP.webp"), alt: "SAP" },
    { src: getImageUrl("/images/Uic/Ms/United.webp"), alt: "United" },
    { src: getImageUrl("/images/Uic/Ms/CWD.webp"), alt: "CWD" },
    { src: getImageUrl("/images/Uic/Ms/PWC.webp"), alt: "PWC" },
    { src: getImageUrl("/images/Uic/Ms/RSM.webp"), alt: "RSM" },
    { src: getImageUrl("/images/Uic/Ms/Deloitte.webp"), alt: "Deloitte" },
  ],
  courseArrangementTitle: "學位要求與課程安排",
  courseArrangementList: [
    "MSMIS課程總共32個學分，包括16個必修學分和16個選修學分（視之前的課程背景而定）。",
    "課程靈活，讓你根據自己的興趣與職涯發展方向自由選擇課程內容。",
  ],
  coreCoursesTitle: "核心課程範例",
  coreCoursesList: [
    [
      {
        zh: "企業應用開發",
        en: "Enterprise Application Development",
        desc: "學習設計、開發和維護企業級應用系統。",
      },
    ],
    [
      {
        zh: "企業資訊基礎設施規劃與安全",
        en: "Enterprise Information Infrastructure Planning & Security",
        desc: "瞭解如何規劃、部署和保護企業資訊基礎設施。",
      },
    ],
    [
      {
        zh: "高級數據庫管理",
        en: "Advanced Database Management",
        desc: "深入探討數據庫設計、查詢優化與資料安全性管理。",
      },
    ],
  ],
  reasonsTitle: "為什麼選擇 UIC 的 MSMIS？",
  reasonsDesc:
    "透過UIC商學院的Master of Science in Management Information Systems（MSMIS），你不僅能掌握管理資訊系統的技術知識，還能培養商業敏銳度，成為企業 IT 領域中的領導者，為未來的職涯發展做好充分準備！",
};

// ── MSSCOM (Management / Supply Chain) ────────────────────────────────────────
export const MS_MANAGEMENT_CONFIG = {
  whyTitle: "為什麼選擇在UIC商學院攻讀供應鏈與營運管理碩士學位？",
  whyList: [
    {
      title: "快速且靈活的學位選擇",
      desc: "MSSCOM課程總共32個學分，可以在1年內完成全日制學習，或選擇多年間兼職修讀，讓你根據自己的時間安排，靈活規劃課程並兼顧全職工作。",
      extraList: [
        "透過多樣的選修課程，你可以根據個人職涯發展或企業需求，量身打造自己的學習計劃。",
      ],
    },
    {
      title: " 獨特的課程模式",
      desc: "將商業專業知識與技術技能、系統思維及領導力發展相結合，幫助你建立全球視野，為未來在製造業、物流業、零售業、製藥業及醫療產業 等領域的管理職位做好準備。",
      extraList: [
        "畢業後，你將具備從供應鏈分析、採購管理、品質控制到營運管理的全方位技能，成為業界爭相尋求的人才。",
      ],
    },
    {
      title: "實務導向的學習體驗",
      desc: "頂點實習專案（Practicum Capstone）– 你將與企業客戶合作，解決供應鏈中的真實挑戰，透過應用課堂知識開發可行的解決方案或評估提升供應鏈績效的策略。",
    },
  ],
  outcomesTitle: "MSSCOM 職涯發展與成果",
  outcomesDesc: {
    desc: "Master of Science in Supply Chain and Operations Management (MSSCOM) 設計為幫助你進入各大行業的多元職位，包括：",
    list: [
      "供應鏈分析師（Supply Chain Analyst）– 負責監控供應鏈流程、識別瓶頸並提出改進策略。",
      "持續改善分析師（Continuous Improvement Analyst）– 透過數據分析評估流程並提出提升運營效率的建議。",
      "需求規劃師（Demand Planner）– 預測市場需求並協助企業制定生產與物流計劃。",
    ],
  },
  extraCoursesTitle: "其他適合 MSSCOM畢業生的領域",
  extraCoursesList: [
    [{ zh: "製造業（Manufacturing）" }],
    [{ zh: "零售業（Retail）" }],
    [{ zh: "製藥業（Pharmaceuticals）" }],
    [{ zh: "醫療保健（Healthcare）" }],
    [{ zh: "運輸與物流（Transportation and Logistics）" }],
  ],
  courseArrangementTitle: "學位要求與課程安排",
  courseArrangementList: [
    "MSSCOM課程總共32個學分，包括16個必修學分和16個選修學分。",
    "課程設計靈活，讓你可以根據個人興趣或職業目標規劃課程內容。",
  ],
  coreCoursesTitle: "核心課程範例",
  coreCoursesList: [
    [
      {
        zh: "供應鏈與營運管理的分析與AI基礎",
        en: "Foundations of Analytics and AI for Supply Chain and Operations Management",
        desc: "探索如何將 AI 和數據分析應用於供應鏈與營運管理中，以提升企業績效。",
      },
      {
        zh: "營運管理導論",
        en: "Introduction to Operations Management",
        desc: "學習管理生產、物流、品質控制與資源分配的基礎知識。",
      },
    ],
    [
      {
        zh: "供應鏈管理",
        en: "Supply Chain Management",
        desc: "深入了解供應鏈流程的各個環節，包括採購、運輸、庫存管理及供應商協調。",
      },
    ],
    [
      {
        zh: "應用供應鏈策略與實踐",
        en: "Applied Supply Chain Strategy and Practice",
        desc: "將課堂理論應用於真實供應鏈案例，並提出具體的優化方案。",
      },
    ],
  ],
  reasonsTitle: "為什麼選擇 UIC 的 MSSCOM？",
  reasonsDesc:
    "透過UIC商學院的Master of Science in Supply Chain and Operations Management（MSSCOM），你不僅能掌握供應鏈與營運管理的核心知識，還能在實務操作中培養解決問題的能力，為未來成為業界領袖做好萬全準備！",
};

// ── MSM (Marketing) ───────────────────────────────────────────────────────────
export const MS_MARKETING_CONFIG = {
  whyTitle: "為什麼選擇在 UIC 商學院攻讀行銷碩士學位？",
  whyList: [
    {
      title: "結合理論與實務的先進課程",
      desc: "UIC的Master of Science in Marketing (MSM)課程結合了行銷理論與實務應用，讓你在迅速發展的行銷領域中掌握前沿知識與技能。",
    },
    {
      title: "快速且靈活的學位選擇",
      desc: "MSM 課程總共32個學分，可以在1年內完成全日制學習，或選擇多年間兼職修讀，根據你的個人需求和工作時間安排進行彈性調整。",
      extraList: [
        "透過多元的選修課程，你可以根據職涯目標或企業需求量身打造自己的學習計劃。",
      ],
    },
    {
      title: "實務導向的學習體驗",
      desc: "頂點專案（Capstone Course）– 你將參與由企業經歷的真實案例研究，針對實際問題進行分析與解決，讓你在畢業前獲得寶貴的實戰經驗。",
      extraList: [
        "行銷科技中心（Marketing Technology Hub）– 透過最新的AI技術 進行內容創建與數據驅動行銷分析，幫助你掌握當前行銷科技的應用。",
        "企業合作項目經驗 – 你將從業界經驗豐富的教授學習，並參與與客戶合作的真實企業專案，獲取學術與實務並重的見解。",
      ],
    },
  ],
  outcomesTitle: "MSM 職涯發展與成果",
  outcomesDesc:
    "行銷碩士畢業生的就業機會遍布各大行業與企業，UIC商學院的Master of Science in Marketing (MSM)將幫助你進入以下高薪且具發展潛力的職位。",
  companyTitle: "主要聘用 UIC 商學院 MSM 畢業生的頂尖企業",
  companyLogos: [
    {
      src: getImageUrl("/images/Uic/Ms/Publicis Media.webp"),
      alt: "Publicis Media",
    },
    { src: getImageUrl("/images/Uic/Ms/Circana.webp"), alt: "Circana" },
  ],
  courseArrangementTitle: "學位要求與課程安排",
  courseArrangementList: [
    "MSM課程總共32個學分，包括16個必修學分和16個選修學分。",
    "每位學生還需要參與頂點專案課程（Capstone Course），透過分析與解決真實案例（Live Case Study）來實踐所學知識。",
  ],
  coreCoursesTitle: "核心課程範例",
  coreCoursesList: [
    [
      {
        zh: "行銷導論",
        en: "Introduction to Marketing",
        desc: "掌握行銷基本概念與策略框架，了解如何制定市場策略。",
      },
      {
        zh: "市場研究 I",
        en: "Marketing Research I",
        desc: "了解市場研究方法與數據分析技術，為企業決策提供依據。",
      },
    ],
    [
      {
        zh: "行銷管理",
        en: "Marketing Management",
        desc: "學習如何有效地管理行銷計劃，將企業目標轉化為實際成果。",
      },
    ],
    [
      {
        zh: "行銷分析",
        en: "Marketing Analytics",
        desc: "利用數據分析工具與方法來評估市場趨勢與消費者行為。",
      },
    ],
  ],
  reasonsTitle: "為什麼選擇 UIC 的 MSM？",
  reasonsDesc:
    "透過UIC商學院的Master of Science in Marketing（MSM），你不僅能學習最新的行銷理論，還能透過實務經驗提升專業能力，幫助你在各大企業與行業中開創更廣闊的職涯發展機會！",
};

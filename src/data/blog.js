const eventimgrul = `${process.env.PUBLIC_URL}/images/blog/eventimg.webp`;
const newsimgurl = `${process.env.PUBLIC_URL}/images/blog/newsimg.webp`;

export const enrollmentEvents = [
  {
    id: 1,
    image: eventimgrul,
    title: "UIC MBA+MS Programs Application Deadline update",
    excerpt: "UIC MBA+MS Programs Application Deadline update Fall 20 […]",
    get link() {
      return `/blog/${this.id}`;
    },
    content: `🇱🇷Fall 2025 秋季班資訊

✅開放申請時間: 目前已經開放申請

✅開課日期
▶️MBA：Aug/9/2025
📕MBA開課領域:
1️⃣ Strategic and International Business Management (SIM) 國際策略管理
2️⃣ Business Analytics (BA) 商業分析
3️⃣ Financial Markets and Asset Management (FMAM) 金融與資產管理

▶️MS：Aug/25/2025
1️⃣ MS in Supply Chain and Operations Management
2️⃣ MS in Business Analytics
3️⃣ MS in Finance
4️⃣ MS in Mgmt Information Systems
5️⃣ MS in Marketing
6️⃣ MS in Accounting

✅Deadline
▶️International students requiring a visa:
Jun/1/2025（目前最新公布截止日、若有更新則以更新為準）
▶️Student with either an F1 student visa or legal status in the U.S.:
Jul/1/2025（目前最新公布截止日、若有更新則以更新為準）

────────────────────────────

🇱🇷Spring 2026 春季班資訊

✅開放申請時間: 目前已經開放申請

✅開課日期
▶️MBA：Jan/2025
📕MBA開課領域:
1️⃣ Strategic and International Business Management (SIM) 國際策略管理
2️⃣ Business Analytics (BA) 商業分析
3️⃣ Financial Markets and Asset Management (FMAM) 金融與資產管理

▶️MS：Jan/2025
1️⃣ MS in Supply Chain and Operations Management
2️⃣ MS in Business Analytics
3️⃣ MS in Finance
4️⃣ MS in Mgmt Information Systems
5️⃣ MS in Marketing
6️⃣ MS in Accounting

✅Deadline
▶️International students requiring a visa:
Nov/2025（目前最新公布截止日、若有更新則以更新為準）
▶️Student with either an F1 student visa or legal status in the U.S.:
Nov/2025（目前最新公布截止日、若有更新則以更新為準）
`,
  },
  {
    id: 2,
    image: eventimgrul,
    title: "UIC MBA Application Deadline update",
    excerpt: "UIC MBA Application Deadline update Spring 2025 春季班資訊開放",
    get link() {
      return `/blog/${this.id}`;
    },
    content: `🇱🇷Spring 2025 春季班資訊
✅開放申請時間:目前已經開放申請!!
✅開課日期: Jan/13/2025
✅Deadline: Nov/15/2024 (目前最新公布截止日、若有更新則以更新為準)
📕開課領域:
1️⃣Strategic and International Business Management (SIM) 國際策略管理
2️⃣Business Analytics (BA) 商業分析
3️⃣Financial Markets and Asset Management (FMAM) 金融與資產管理
—————————————————————————————————
🇱🇷Fall 2025 秋季班資訊
✅開放申請時間:Aug/1/2024
✅開課日期: Aug/25/2025
✅Deadline: N/A (目前最新公布截止日、若有更新則以更新為準)
📕開課領域:
1️⃣Strategic and International Business Management (SIM) 國際策略管理
2️⃣Business Analytics (BA) 商業分析
3️⃣Financial Markets and Asset Management (FMAM) 金融與資產管理

還有想要出國留學的同學們，心動不如馬上行動✈️
想了解更多申請上的資訊，歡迎來電來訊聯繫我們喔🤓`,
  },
  {
    id: 3,
    image: eventimgrul,
    title: "UIC MBA Application Deadline update​​",
    excerpt: "UIC MBA Application Deadline update​",
    get link() {
      return `/blog/${this.id}`;
    },
    content: `🇱🇷Fall 2024秋季班資訊
✅開課日期: Aug/26/2024
✅Deadline: Jun/30/2023 (目前最新公布截止日、若有更新則以更新為準)
📕開課領域:
1. Strategic and International Business Management (SIM) 國際策略管理
2. Financial Markets and Asset Management (FMAM) 金融與資產管理
3. Management of Healthcare (MOH) 醫務管理
4. Business Analytics (BA) 商業分析
🇱🇷Spring 2025 春季班資訊
✅開課日期: Jan/13/2025
✅Deadline: Sep/30/2024 (目前最新公布截止日、若有更新則以更新為準)
📕開課領域:
1. Strategic and International Business Management (SIM) 國際策略管理
2. Financial Markets and Asset Management (FMAM) 金融與資產管理
3.Business Analytics (BA) 商業分析

 
還有想要出國留學的同學們，心動不如馬上行動✈️
想了解更多申請上的資訊，歡迎來電來訊聯繫我們🤓
——————————————-
UIC MBA台灣招生中心:https://bright-edu.com/
#UIC #MBA #台灣 #截止日更新​`,
  },
  {
    id: 4,
    image: `${process.env.PUBLIC_URL}/images/blog/eventimg2.webp`,
    title: "Education USA美國小型教育展-高雄場​",
    excerpt: "Education USA美國小型教育展-高雄場​",
    get link() {
      return `/blog/${this.id}`;
    },
    content: `Education USA美國教育展高雄場來囉!🏃
👉UIC MBA將參與此次展覽，將會由駐台招生代表現場與您諮詢申請細節及聊聊分享當地的生活喔!🧐
屆時也會有許多美國知名大學蒞臨現場喔~歡迎大家來走走逛逛!
🎉歡迎對前往美國留學有興趣的朋友一起來共襄盛舉!
時間：1月14日（六）2 pm- 5 pm
地點：高雄市立圖書館河堤分館 (高雄市三民區裕誠路1號)`,
  },
];

export const news = [
  {
    id: 5,
    image: newsimgurl,
    title: "UIC 最新排名賀報🎉",
    excerpt: "U.S. News 2025 最新排名",
    get link() {
      return `/blog/${this.id}`;
    },
    content: `University of Illinois Chicago (UIC)
⭐️TOP 80⭐️ 
2025 Best National University Rankings
🎊全美百大大學，再次往前挺進2名

⭐️TOP 39⭐️ 2025 Top Public Schools
🎊頂尖公立大學名次再次上升1名
 
👉想了解UIC一年制MBA課程的同學，歡迎聯繫我們或合作顧問機構喔
 
UIC Today News:https://today.uic.edu/uic-rises-in-2025-u-s-news-best-colleges-rankings/`,
  },
  {
    id: 6,
    image: newsimgurl,
    title: "UIC U.S. NEWS Ranks 2022-2023 Best Colleges",
    excerpt: "UIC賀報🎉",
    get link() {
      return `/blog/${this.id}`;
    },
    content: `U.S. News & World Report 公布排名
University of Illinois Chicago (UIC)
 
⭐️TOP 97⭐️ 2023 Top Public Schools
2023 Best National University Rankings
🎊全美百大大學
 
⭐️TOP 42⭐️ 2023 Top Public Schools
2023 Top Public Schools
🎊頂尖公立大學名次再次挺進4名
 
👉想了解UIC一年制MBA課程的同學，歡迎來電或來信聯繫我們!`,
  },
];

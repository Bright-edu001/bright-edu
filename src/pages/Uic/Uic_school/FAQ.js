import React, { useState } from "react";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import ActionButton from "../../../components/ActionButton/ActionButton";
import Accordion from "../../../components/Accordion/Accordion";
import AccordionItem from "../../../components/Accordion/AccordionItem";
import "./FAQ.scss";

const FAQ = () => {
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return (
    <div className="faq-page">
      <MbaAreasHero />

      <div className="faq-container">
        {/* 學校申請問題 */}
        <section className="faq-section">
          <h2 className="section-title">學校申請問題</h2>
          <div className="question-list">
            <Accordion>
              <AccordionItem
                id="q1"
                title="申請到UIC商學院碩士申請需要準備哪些資料?"
                isExpanded={expandedQuestions["q1"]}
                onToggle={toggleQuestion}
              >
                <p>詳細報名辦法請點擊連結到申請資格頁面瞭解更多資訊。</p>
                <ActionButton
                  text="申請資格"
                  link="/uic-business-school/mba/application"
                  className="ranking-btn"
                  title="申請資格"
                />
              </AccordionItem>

              <AccordionItem
                id="q2"
                title="申請多久後可以等到結果?如何確定入學?"
                isExpanded={expandedQuestions["q2"]}
                onToggle={toggleQuestion}
              >
                <p>MBA:大致上只要完成面試跟筆試後，大約2周會通知結果</p>
                <p>
                  MS
                  programs:當系統顯示資料完成上傳後，約莫一個月內會知道錄取結果以及email錄取信件至學生的信箱
                </p>
              </AccordionItem>

              <AccordionItem
                id="q3"
                title="關於美國簽證問題?"
                isExpanded={expandedQuestions["q3"]}
                onToggle={toggleQuestion}
              >
                <p>
                  基本上確定錄取後，就會通知繳交財力證明等文件，來進行I-20的審核OIS國際辦公室審核基本上要10個工作天左右(已屆時審核時間為主)。I-20文件審核沒有問題的話，將會email至學生信箱，後續就可以辦理美國F-1學生簽證
                </p>
              </AccordionItem>

              <AccordionItem
                id="q4"
                title="一年制MBA或專業課程會很緊張嗎?"
                isExpanded={expandedQuestions["q4"]}
                onToggle={toggleQuestion}
              >
                <p>
                  因為密集型課程，相對的假期較少，但也是充滿時間去看看美國其他城市，每學季(春夏秋冬)課程與課程之間有3-5天的休息，另外就是感恩節與聖誕節這兩大節日也是會放長假，但就沒有寒假與暑假的長假期了。
                </p>
                <p>
                  舉例:但像之前有同學畢業前，就用這些零散時間去了法國，波士頓，印第安那州，巴拿馬郵輪(去了四個小島)，佛羅里達環球影城，西雅圖，墨西哥坎昆，還回了台灣一趟(約8個大地點)，所以學生還是可以很充實的享受。
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* 生活問題 */}
        <section className="faq-section">
          <h2 className="section-title">生活問題</h2>
          <div className="question-list">
            <Accordion>
              <AccordionItem
                id="l1"
                title="就讀UIC商學碩士每年需費用大約多少？"
                isExpanded={expandedQuestions["l1"]}
                onToggle={toggleQuestion}
              >
                <p>
                  MBA學費今年是USD 39000，不包含學雜費跟生活費用。MS
                  Programs學費是USD 38000+，不包含學雜費跟生活費用。
                </p>
                <p>
                  學雜費部分，一年費用是大約USD
                  7500-8500，學生入學之後，每學期進行繳交，確切學雜費由學校公布的為準。
                </p>
              </AccordionItem>

              <AccordionItem
                id="l2"
                title="關於住宿問題?"
                isExpanded={expandedQuestions["l2"]}
                onToggle={toggleQuestion}
              >
                <p>
                  費用大概share house一人大約USD
                  1000上下，Studio(房間跟廚房沒有隔開的，在同一個空間下)一個人大概USD
                  1600/月左右，但1B1B的Apartment(一個房間一個獨立衛浴加一個廚房的房型)就要1800+了。當然如果是兩人房，價格約為2000+(金額再與室友平分)，住宿以個人需求為主。
                </p>
                <p>
                  建議同學可以自己在校外尋找飯店式公寓(芝加哥選擇很多)居住上比較舒服。
                  若要居住學校的宿舍，也可以在錄取後自行申請學校宿舍，但需要做疫苗的施打才可以做申請的動作。
                </p>
              </AccordionItem>

              <AccordionItem
                id="l3"
                title="芝加哥是否是安全的城市呢?"
                isExpanded={expandedQuestions["l3"]}
                onToggle={toggleQuestion}
              >
                <p>
                  在海外就學不管哪個國家都要注意安全。但相較其他的美國城市，其實芝加哥並沒有特別的危險。即使網路搜尋有些人會說芝加哥的犯罪率較高，但其實危險地區只有在芝加哥幾個特定的街道及區域。一般來說，正常大部分的人都不會前往到這些區域，只要在市中心活動基本上都是很安全的。更不用提校園了，我們都備有警衛保護校園的。
                </p>
                <p>
                  而且美國警察都會在熱鬧地區或傍晚時刻做定期的巡邏，基本上安全性是沒有問題的。
                </p>
                <p>
                  但相較台灣的部分，畢竟出國人生地不熟，而且美國也是合法擁有槍枝，種族多元的環境下，大家還是要結伴同行，另外建議不管在美國任何城市，晚上十點過後，早上七點前，盡量不要單獨走在街道上喔。
                </p>
                <p>
                  另外就是錢不露白，盡量不要攜帶太多現金在身上。
                  以上回答由我們畢業生提供，但因個人體驗經歷不同，僅供參考。
                </p>
              </AccordionItem>

              <AccordionItem
                id="l4"
                title="在UIC就讀商學碩士課程時的交通方式?"
                isExpanded={expandedQuestions["l4"]}
                onToggle={toggleQuestion}
              >
                <p>
                  伊利諾大學芝加哥分校(UIC)的位置就位於芝加哥的市中心，所以交通上相當便利，有許多的公車及地鐵可以搭乘(學生有巴士卡可以無限次數搭乘，費用已經包含在每學季繳交的學雜費中)，當然若是要買車開車也很方便，國際駕照就可以在芝加哥開車了。
                </p>
              </AccordionItem>

              <AccordionItem
                id="l5"
                title="行前準備，生活用品該攜帶的東西?"
                isExpanded={expandedQuestions["l5"]}
                onToggle={toggleQuestion}
              >
                <p>
                  冬天與夏天衣物都需要具備喔！因爲芝加哥是一個冬天相當冷的城市，零下20度都是會在冬天發生的情形，建議出門前可以先帶好冬天的基本衣物，褲襪，發熱衣褲等等，另外也建議攜帶毛帽跟手套喔，才不會冬天來的時候措手不及喔。
                </p>
                <p>
                  不過也不要太擔心，美國當地都可以方便買到冬天衣物喔，另外冬天時候，室內都是有充足的暖氣。有機會可以看到滿天白雪的景色，會是留學期間相當美好的回憶喔。
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* 其他問題 */}
        <section className="faq-section">
          <h2 className="section-title">其他問題</h2>
          <div className="question-list">
            <Accordion>
              <AccordionItem
                id="o1"
                title="預期UIC一年制MBA的校友資源，口碑獲得會不會高?"
                isExpanded={expandedQuestions["o1"]}
                onToggle={toggleQuestion}
              >
                <p>
                  筆試-
                  需要先閱讀一篇商業文章或經濟數據圖或者文章，然後回答一題相關的商業開放性問答題，學生需要用英文論述方式（英文作文）作答，字數大約一張A4。主要用意是看學生用英文書寫的表達能力。面試-
                  教授會從美國來台灣做一對一面試，或從美國用Skype語音或視訊。面試問題是因教授而異，但基本上都會以學生個人背景提問，所以只要多練習說話的流暢度，誠實作答即可。備註:
                  托福或雅思等語言測驗達一定成績者，有機會可免筆試，直接進行面試。
                </p>
              </AccordionItem>

              <AccordionItem
                id="o2"
                title="UIC一年制MBA課程是正規的碩士學位，與學校校兩年制MBA學位相等，畢業校友同屬一個等嗎?"
                isExpanded={expandedQuestions["o2"]}
                onToggle={toggleQuestion}
              >
                <p>畢業後可獲得碩士學位，屬於Degree的文憑。</p>
              </AccordionItem>

              <AccordionItem
                id="o3"
                title="預期UIC商學院碩士課程是否為STEM學位呢?"
                isExpanded={expandedQuestions["o3"]}
                onToggle={toggleQuestion}
              >
                <p>
                  MBA目前不屬於STEM課程，所以MBA畢業後的OPT時間為一年。但我們有STEM的銜接課程，銜接第二碩士，畢業後有三年OPT的機會。
                </p>
                <p>
                  MS
                  Programs，基本上是屬於STEM學位，所以畢業後都有3年OPT機會。目前只有MS
                  in Marketing不屬於STEM學位(預計2026春會轉為STEM)
                </p>
              </AccordionItem>

              <AccordionItem
                id="o4"
                title="UIC商學碩士是否需要寫論文?"
                isExpanded={expandedQuestions["o4"]}
                onToggle={toggleQuestion}
              >
                <p>不需要論文。</p>
              </AccordionItem>

              <AccordionItem
                id="o5"
                title="畢業後能否留在美國工作?"
                isExpanded={expandedQuestions["o5"]}
                onToggle={toggleQuestion}
              >
                <p>
                  畢業生都可以申請OPT，是可以在美國當地找工作(1-3年，主要看就讀的課程是否屬於STEM學位)，OPT結束後，則看雇主使否要繼續申請工作簽證。建議可以跟校內的Business
                  Career Center尋求協助喔！校方有健全的體系可協助學生。
                </p>
                <p>詳細職涯資源請點擊連結瞭解更多</p>
                <ActionButton
                  text="職涯資源"
                  link="/uic-business-school/uic/career-resources"
                  className="ranking-btn"
                  title="職涯資源"
                />
              </AccordionItem>

              <AccordionItem
                id="o6"
                title="被錄取的人之中，是否有多渠道是華人工作經驗豐富?"
                isExpanded={expandedQuestions["o6"]}
                onToggle={toggleQuestion}
              >
                <p>
                  目前比例約為3:7，有工作經驗的同學稍微多一些，大約都是工作1-5年左右，但也會有工作經驗很充足的同學10幾年左右。
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;

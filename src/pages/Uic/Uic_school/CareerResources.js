import React from "react";
import "./CareerResources.scss";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

function CareerResources() {
  return (
    <div className="career-resources">
      <MbaAreasHero />
      <SectionContainer>
        <section
          className="intro"
          aria-label="商學院職涯規劃所(Business Career Center)"
        >
          <div className="container">
            <h2 className="intro-title">職涯資源</h2>
            <h3>商學院職涯規劃所(Business Career Center)</h3>
            <p>
              芝加哥是美國第二大商業中心區，許多大企業的總部皆設立於此，因此各式的工作機會也相當豐富，是一個非常適合發展職涯的城市，為協助碩士同學畢業後的職涯發展銜接，伊利諾大學芝加哥分校特別設立職涯規劃所的資源提供給商學院的同學做諮詢，藉此幫助想要在美國開啟璀璨職涯的同學順利找到工作。
            </p>
            <ul className="career-resources-intro-list">
              <li>
                職涯規劃所於周一至周五上午9：00至下午5：00不論透過電話或電子郵件都可以為UIC商學院的同學提供全方位的服務項目。
              </li>
              <li>
                商學院同學可以在學校職涯規劃所做諮詢，同學也可以隨時利用這裡的資源，預約面談協助等等。以過往的經驗，成功在美國取得OPT或持續在美發展之同學，大部分都是透過此學校單位的協助。
              </li>
              <li>
                主要服務內容如下(依每個同學諮詢狀況為準，這裡提供畢業生說明的範例)：
              </li>
            </ul>
            <ul className="career-resources-list">
              <li>
                修改履歷表(職涯規劃所的advisor會不斷協助同學寫出符合美國標準之履歷)
              </li>
              <li>模擬面試(一對一的指導)</li>
              <li>
                提供就業資訊
                <div>例如：就業博覽會</div>
              </li>
              <li>
                建議就業投遞履歷方向
                <div>
                  舉例：A同學想要從事金融工作，可以透過諮詢管道得知哪裡是比較適合自己投遞履歷的目標城市或區域
                </div>
              </li>
              <li>
                如何透過網路或social media去建造工作機會
                <div>
                  舉例：美國也會有類似104的求職網站或學習如何架設Linkedin
                </div>
              </li>
              <li>
                Handshake
                <div>
                  大學的就業平台，裡面有各種實習、初階職位和有經驗人士的工作機會。學生可以建立自己的學生個人檔案，上傳最新的履歷，讓雇主更容易找到你。平台上也會定期舉辦與求職相關的講座或工作坊，記得報名參加，提升自己的就業準備
                </div>
              </li>
              <li>其他相關職涯方面的問題也歡迎詢問</li>
            </ul>
          </div>
        </section>
        <section className="career-process" aria-label="職涯規劃所標準流程">
          <div className="container">
            <img
              src="https://imgur.com/mKlo3T6.png"
              alt="職業發展相關圖片"
            ></img>
            <h3>職涯規劃所標準流程</h3>
            <ul className="career-process-list">
              <li>畢業前幾個月至半年就可以先思考是否要在美國就業。</li>
              <li>確立目標後便可備齊資料向職涯規劃所預約諮詢的時間。</li>
              <li>
                職涯規劃所的advisor會先依據你所就讀的科系與你的志願來規畫適合的方向
              </li>
              <li>
                最重要的便是履歷的內容與形式，職涯規劃所的advisor會不斷協助同學修改履歷以符合美國標準的履歷型式。
              </li>
              <li>advisor會給予你一些面試的技巧與建議或進行模擬面試。</li>
              <li>畢業後60天以內找到工作便可取得OPT開啟在美國的工作旅程</li>
            </ul>
          </div>
        </section>
      </SectionContainer>
    </div>
  );
}

export default CareerResources;

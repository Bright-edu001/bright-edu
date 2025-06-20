import React from "react";
import "./MsfApplication.scss";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import ApplicationForm from "../../../components/Application/ApplicationForm";

function MsfApplication() {
  return (
    <div className="msf-application">
      <MbaAreasHero />
      <SectionContainer>
        <div className="msf-application-list">
          <h3 className="msf-application-title">申請資訊</h3>
          <ul>
            <li>
              申請資格：申請者須持有認可教育機構頒發的四年制學士學位，累積 GPA
              3.0 或以上。
            </li>
            <li>工作經驗：Optional，應屆畢業生可申請。</li>
            <li>英文版履歷表 (CV)</li>
            <li>英文版學術陳述（Academic Statement）</li>
            <li>
              推薦信 (LOR)：共 2 封（其中至少 1 封 必須由曾修課的教授撰寫）
            </li>
            <li>GMAT/GRE：Optional</li>
            <li>
              英語能力要求
              <ul className="english-requirements">
                <li>IELTS：6.5</li>
                <li>
                  TOEFL iBT（Internet-based
                  test）：閱讀、聽力、口語各項不低於19；寫作不低於22；且總分數不低於80。
                </li>
              </ul>
            </li>
            <li>先修課程要求（Prerequisites）</li>
          </ul>
          <p>
            申請者應修過以下或同等課程：MTH 124（微積分 I 概論，Survey of
            Calculus I）、STT 315（商業機率與統計導論，Introductory Probability
            and Statistics for Business）學生應完成相當於 MTH 124（微積分 I）和
            STT 315（商業入門機率與統計）的課程。
          </p>
          <span>
            ＊ 若申請者具備
            商學（Business）、經濟學（Economics）、統計學（Statistics）、數學（Math）、工程（Engineering）背景，可申請免修。
          </span>
        </div>

        <ApplicationForm showCondition={false} />
      </SectionContainer>
    </div>
  );
}

export default MsfApplication;

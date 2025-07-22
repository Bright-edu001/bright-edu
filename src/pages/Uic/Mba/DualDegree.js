import React from "react";
import "./DualDegree.css";
import MbaAreasHero from "../../../components/MbaAreasHero/MbaAreasHero"; // 引入新的組件
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

function DualDegree() {
  return (
    <div className="mba-advantages">
      <MbaAreasHero />

      <SectionContainer className="intro" ariaLabel="雙學位課程">
        <h3 className="intro-title" style={{ marginBottom: "1rem" }}>
          雙碩士學位銜接課程
        </h3>
        <p>
          這是針對選擇不同領域然後想持續進修的學生，特別設計的雙碩士學位銜接計畫。
        </p>
        <p>
          通過校內申請，學生可以在就讀完一年制MBA後，可以直接銜接校內MS
          Programs學位課程，進行就讀第二碩士。
        </p>
        <p>
          因學生選擇銜接的的第二碩士課程為相關課程，所以在第二碩士只需要修習的學分數會落在15-20學分左右後，畢業後即可取得兩個碩士學位證書。
        </p>
        <p>
          此外，因為MS課程隸屬於STEM學位，學生畢業後可取得3年OPT的工作資格。
        </p>
        <div className="photo-gallery">
          <img
            src="/images/Uic/Mba/photo_6334573812795951537_y.webp"
            alt="UIC MBA 學生合照 1"
          />
          <img
            src="/images/Uic/Mba/photo_6334573812795951536_y.webp"
            alt="UIC MBA 學生合照 2"
          />
        </div>
      </SectionContainer>
      <SectionContainer className="avantages" ariaLabel="課程優勢">
        <h3>優勢Advantages</h3>
        <ul className="avantages-list">
          <li>兩年內(最快一年半)取得雙碩士學位，增加職場競爭力</li>
          <li>校內商學院相關學分可認抵，減少第二碩士的就讀負擔</li>
          <li>可於就讀一年制MBA時，再選擇是否銜接進修第二碩士</li>
          <li>無須額外提交GMAT/GRE等成績，即可申請第二碩士STEM學位</li>
          <li>無特定商科背景要求 No prerequisites required</li>
        </ul>
      </SectionContainer>
      <SectionContainer className="application" ariaLabel="申請流程">
        <h3>申請方式Application</h3>
        <ul className="application-list">
          <li>學生需要在就讀MBA時，保持良好GPA成績</li>
          <li>在畢業前3個月，系上會有survey確認學生銜接意願，參加workshop</li>
          <li>
            第二碩士系所審核後通知是否錄取 *申請細節及錄取結果以系所屆時公布為準
          </li>
        </ul>
      </SectionContainer>
    </div>
  );
}

export default DualDegree;

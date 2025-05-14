import React from "react";
import "./MSFinanceSection.scss";

function MSFinanceSection({
  whyTitle,
  whyList,
  outcomesTitle,
  outcomesDesc,
  companyTitle,
  companyLogos = [],
  courseArrangementTitle,
  courseArrangementList,
  coreCoursesTitle,
  coreCoursePragaph,
  coreCoursesList,
  coreCoursesIntroList,
  coreCourseFoot,
  // 新增：可選的 extraCoursesTitle, extraCoursesList
  extraCoursesTitle,
  extraCoursesList,
  reasonsTitle,
  reasonsDesc,
}) {
  return (
    <section className="program-details">
      {/* 為什麼選擇UIC MSF */}
      <div className="why-uic-msf">
        <h3>{whyTitle}</h3>
        {/* 支援條列式或多段落 */}
        {Array.isArray(whyList) ? (
          <ul>
            {whyList.map((item, idx) => (
              <li key={idx}>
                {/* 若有title則加粗，否則只顯示desc */}
                {item.title && <strong>{item.title}</strong>}
                {item.desc && <div>{item.desc}</div>}
                {/* 新增：若有 extraList，則渲染黑色小圓點 */}
                {item.extraList && Array.isArray(item.extraList) && (
                  <ul>
                    {item.extraList.map((txt, i) => (
                      <li key={i}>{txt}</li>
                    ))}
                  </ul>
                )}
                {item.info && <div>{item.info}</div>}
              </li>
            ))}
          </ul>
        ) : (
          <div>{whyList}</div>
        )}
      </div>

      {/* 職涯發展與成果區塊，支援段落或條列 */}
      <div className="msf-outcomes">
        <h3>{outcomesTitle}</h3>
        {typeof outcomesDesc === "object" && outcomesDesc !== null ? (
          <>
            <p>{outcomesDesc.desc}</p>
            <ul>
              {outcomesDesc.list &&
                outcomesDesc.list.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </>
        ) : Array.isArray(outcomesDesc) ? (
          <ul>
            {outcomesDesc.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>{outcomesDesc}</p>
        )}
      </div>

      {(companyTitle || (companyLogos && companyLogos.length > 0)) && (
        <div className="company-courses">
          <h3>{companyTitle}</h3>
          {companyLogos && companyLogos.length > 0 && (
            <div className="company-logos">
              {companyLogos.map((logo, idx) => (
                <img
                  key={idx}
                  className="responsive-img"
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 新增區域：額外課程範例區塊 */}
      {extraCoursesTitle &&
        extraCoursesList &&
        Array.isArray(extraCoursesList) && (
          <div className="core-courses-section">
            <h3 className="core-courses-title">{extraCoursesTitle}</h3>
            <div className="core-courses-list">
              {extraCoursesList.map((col, colIdx) => (
                <div className="core-courses-col" key={colIdx}>
                  {col.map((course, idx) => (
                    <div className="core-course-item" key={idx}>
                      <div className="core-course-zh">{course.zh}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      {/* end 額外課程範例區塊 */}

      <div className="course-arrangement">
        <h3>{courseArrangementTitle}</h3>
        <ul>
          {courseArrangementList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      {/* 核心課程範例區塊 */}
      <div className="core-courses-section">
        <h3 className="core-courses-title">{coreCoursesTitle}</h3>
        <div className="core-courses-pragaph">
          {Array.isArray(coreCoursePragaph) && coreCoursePragaph.length > 0
            ? coreCoursePragaph.map((p, idx) => <p key={idx}>{p}</p>)
            : coreCoursePragaph && <p>{coreCoursePragaph}</p>}
        </div>
        <div className="core-courses-intro">
          <ul>
            {(coreCoursesIntroList || []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="core-courses-list">
          {(coreCoursesList || []).map((col, colIdx) => (
            <div className="core-courses-col" key={colIdx}>
              {Array.isArray(col) &&
                col.map((course, idx) => (
                  <div className="core-course-item" key={idx}>
                    <div className="core-course-zh">{course.zh}</div>
                    <div className="core-course-en">{course.en}</div>
                    <div className="core-course-desc">{course.desc}</div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <p className="core-courses-foot">{coreCourseFoot}</p>
      </div>
      {/* end 核心課程範例區塊 */}
      <div className="reasons-to-choose">
        <h3>{reasonsTitle}</h3>
        <p>{reasonsDesc}</p>
      </div>
    </section>
  );
}

export default MSFinanceSection;

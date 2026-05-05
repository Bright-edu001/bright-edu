import React from "react";
import "./MSFinanceSection.scss";

// 內部組件與樣式映射 (因為 styled-components 移除了，這裡需要一些簡單的適配器如果需要)
// 因為 <ResponsiveImg> 在原本的 styled-components 中可能包含樣式，但這裡只有一個 class
// 我們直接用 <img className="responsive-img" alt="" ... />
const ResponsiveImg = (props) => (
  <img
    alt={props.alt || ""}
    {...props}
    style={{
      maxWidth: "100%",
      height: "auto",
      display: "block",
      ...props.style,
    }}
    className={`responsive-img ${props.className || ""}`}
  />
);

const hasItems = (items) => items && items.length > 0;

const hasCoreCourseContent = (content) =>
  Array.isArray(content) ? hasItems(content) : !!content;

const isNonNullObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

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
  extraCoursesTitle,
  extraCoursesList,
  reasonsTitle,
  reasonsDesc,
  coreCoursesIntroMarginBottom,
  coreCoursesListMarginBottom,
  coreCoursePragaphMarginBottom,
}) {
  const isWhyListArray = Array.isArray(whyList);
  const hasCoreCoursePragaph = hasCoreCourseContent(coreCoursePragaph);
  const hasCoreCoursesIntroList = hasItems(coreCoursesIntroList);
  const hasCompanyLogos = hasItems(companyLogos);
  const coreCoursesIntroItems = coreCoursesIntroList || [];
  const coreCoursesColumns = coreCoursesList || [];

  return (
    <section className="msf-program-details">
      {/* 為什麼選擇UIC MSF */}
      <div className="msf-why">
        <h3 className="msf-section-title">{whyTitle}</h3>
        {isWhyListArray ? (
          <ul>
            {whyList.map((item, idx) => (
              <li key={idx}>
                {item.title && <strong>{item.title}</strong>}
                {item.desc && (
                  <div style={{ color: "#222", marginTop: "0.5rem" }}>
                    {item.desc}
                  </div>
                )}
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

      {/* 職涯發展與成果區塊 */}
      <div className="msf-outcomes">
        <h3 className="msf-section-title">{outcomesTitle}</h3>
        {isNonNullObject(outcomesDesc) ? (
          <>
            <p className="msf-paragraph">{outcomesDesc.desc}</p>
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
          <p className="msf-paragraph">{outcomesDesc}</p>
        )}
      </div>

      {/* 企業合作 */}
      {(companyTitle || hasCompanyLogos) && (
        <div className="msf-company">
          <h3 className="msf-section-title">{companyTitle}</h3>
          {hasCompanyLogos && (
            <div className="company-logos">
              {companyLogos.map((logo, idx) => (
                <ResponsiveImg
                  key={idx}
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 額外課程範例區塊 */}
      {extraCoursesTitle &&
        extraCoursesList &&
        Array.isArray(extraCoursesList) && (
          <div className="msf-core-courses">
            <h3 className="msf-section-title">{extraCoursesTitle}</h3>
            <div className="msf-core-courses__list">
              {extraCoursesList.map((col, colIdx) => (
                <div className="msf-core-courses__col" key={colIdx}>
                  {col.map((course, idx) => (
                    <div className="msf-core-courses__item" key={idx}>
                      <div className="core-course-zh">{course.zh}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* 課程安排 */}
      <div className="msf-arrangement">
        <h3 className="msf-section-title">{courseArrangementTitle}</h3>
        <ul>
          {courseArrangementList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 核心課程範例區塊 */}
      <div className="msf-core-courses">
        <h3 className="msf-section-title">{coreCoursesTitle}</h3>
        <div
          className="msf-core-courses__paragraph"
          style={
            coreCoursePragaphMarginBottom !== undefined
              ? { marginBottom: coreCoursePragaphMarginBottom }
              : { marginBottom: hasCoreCoursePragaph ? "1.5rem" : "0" }
          }
        >
          {Array.isArray(coreCoursePragaph) && hasItems(coreCoursePragaph)
            ? coreCoursePragaph.map((p, idx) => <p key={idx}>{p}</p>)
            : coreCoursePragaph && <p>{coreCoursePragaph}</p>}
        </div>
        <div
          className="msf-core-courses__intro"
          style={
            coreCoursesIntroMarginBottom !== undefined
              ? { marginBottom: coreCoursesIntroMarginBottom }
              : { marginBottom: hasCoreCoursesIntroList ? "1.5rem" : "0" }
          }
        >
          <ul>
            {coreCoursesIntroItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div
          className="msf-core-courses__list"
          style={
            coreCoursesListMarginBottom !== undefined
              ? { marginBottom: coreCoursesListMarginBottom }
              : {}
          }
        >
          {coreCoursesColumns.map((col, colIdx) => (
            <div className="msf-core-courses__col" key={colIdx}>
              {Array.isArray(col) &&
                col.map((course, idx) => (
                  <div className="msf-core-courses__item" key={idx}>
                    <div className="core-course-zh">{course.zh}</div>
                    {course.en && (
                      <div className="core-course-en">{course.en}</div>
                    )}
                    {course.desc && (
                      <div className="core-course-desc">{course.desc}</div>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
        {coreCourseFoot && <p className="msf-paragraph">{coreCourseFoot}</p>}
      </div>

      {/* Why Reasons Block */}
      {reasonsTitle && (
        <div className="reasons-to-choose">
          <h3 className="msf-section-title">{reasonsTitle}</h3>
          {reasonsDesc && <p className="msf-paragraph">{reasonsDesc}</p>}
        </div>
      )}
    </section>
  );
}

export default MSFinanceSection;

import React from "react";
import {
  ProgramDetailsSection,
  OutcomesParagraph,
  ReasonsToChooseParagraph,
  SectionTitle,
  ReasonsToChooseTitle,
  WhyUicMsfDiv,
  MsfOutcomesDiv,
  CompanyCoursesDiv,
  CourseArrangementDiv,
  CoreCoursesSectionDiv,
  CoreCoursesTitle,
  CoreCourseParagraphDiv,
  CoreCoursesIntroDiv,
  CoreCoursesListDiv,
  CoreCoursesColDiv,
  CoreCourseItemDiv,
  CoreCourseFootParagraph,
  ResponsiveImg,
  ReasonsToChooseBlock, // 新增匯入
} from "./MSFinanceSection.styled";

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
  coreCoursesIntroMarginBottom, // 新增 prop
  coreCoursesListMarginBottom, // 新增 prop，用於設置 CoreCoursesListDiv 的 margin-bottom
  coreCoursePragaphMarginBottom, // 新增 prop，用於設置 CoreCourseParagraphDiv 的 margin-bottom
}) {
  const hasCoreCoursePragaph = Array.isArray(coreCoursePragaph)
    ? coreCoursePragaph.length > 0
    : !!coreCoursePragaph;
  const hasCoreCoursesIntroList =
    coreCoursesIntroList && coreCoursesIntroList.length > 0;

  return (
    <ProgramDetailsSection>
      {/* 為什麼選擇UIC MSF */}
      <WhyUicMsfDiv>
        <SectionTitle>{whyTitle}</SectionTitle>
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
      </WhyUicMsfDiv>

      {/* 職涯發展與成果區塊，支援段落或條列 */}
      <MsfOutcomesDiv>
        <SectionTitle>{outcomesTitle}</SectionTitle>
        {typeof outcomesDesc === "object" && outcomesDesc !== null ? (
          <>
            <OutcomesParagraph>{outcomesDesc.desc}</OutcomesParagraph>
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
          <OutcomesParagraph>{outcomesDesc}</OutcomesParagraph>
        )}
      </MsfOutcomesDiv>

      {(companyTitle || (companyLogos && companyLogos.length > 0)) && (
        <CompanyCoursesDiv>
          <SectionTitle>{companyTitle}</SectionTitle>
          {companyLogos && companyLogos.length > 0 && (
            <div className="company-logos">
              {" "}
              {/* Keep class or create sub-component */}
              {companyLogos.map((logo, idx) => (
                <ResponsiveImg
                  key={idx}
                  // className="responsive-img" // Handled by styled component
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </CompanyCoursesDiv>
      )}

      {/* 新增區域：額外課程範例區塊 */}
      {extraCoursesTitle &&
        extraCoursesList &&
        Array.isArray(extraCoursesList) && (
          // Assuming similar structure to CoreCoursesSectionDiv, or create a new one
          <CoreCoursesSectionDiv>
            <CoreCoursesTitle>{extraCoursesTitle}</CoreCoursesTitle>
            {/* Assuming similar structure to CoreCoursesListDiv, or create a new one */}
            <CoreCoursesListDiv>
              {extraCoursesList.map((col, colIdx) => (
                <CoreCoursesColDiv key={colIdx}>
                  {col.map((course, idx) => (
                    // Assuming similar structure to CoreCourseItemDiv, or create a new one
                    <CoreCourseItemDiv key={idx}>
                      <div className="core-course-zh">{course.zh}</div>
                    </CoreCourseItemDiv>
                  ))}
                </CoreCoursesColDiv>
              ))}
            </CoreCoursesListDiv>
          </CoreCoursesSectionDiv>
        )}
      {/* end 額外課程範例區塊 */}

      <CourseArrangementDiv>
        <SectionTitle>{courseArrangementTitle}</SectionTitle>
        <ul>
          {courseArrangementList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </CourseArrangementDiv>
      {/* 核心課程範例區塊 */}
      <CoreCoursesSectionDiv>
        <CoreCoursesTitle>{coreCoursesTitle}</CoreCoursesTitle>
        <CoreCourseParagraphDiv
          hasContent={hasCoreCoursePragaph}
          style={
            coreCoursePragaphMarginBottom !== undefined
              ? { marginBottom: coreCoursePragaphMarginBottom }
              : {}
          }
        >
          {Array.isArray(coreCoursePragaph) && coreCoursePragaph.length > 0
            ? coreCoursePragaph.map((p, idx) => <p key={idx}>{p}</p>)
            : coreCoursePragaph && <p>{coreCoursePragaph}</p>}
        </CoreCourseParagraphDiv>
        <CoreCoursesIntroDiv
          hasContent={hasCoreCoursesIntroList}
          style={
            coreCoursesIntroMarginBottom !== undefined
              ? { marginBottom: coreCoursesIntroMarginBottom }
              : {}
          }
        >
          <ul>
            {(coreCoursesIntroList || []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </CoreCoursesIntroDiv>
        <CoreCoursesListDiv
          /* hasCoreCourses={hasCoreCourses} 移除，避免傳遞到 DOM */
          style={
            coreCoursesListMarginBottom !== undefined
              ? { marginBottom: coreCoursesListMarginBottom }
              : {}
          }
        >
          {(coreCoursesList || []).map((col, colIdx) => (
            <CoreCoursesColDiv key={colIdx}>
              {Array.isArray(col) &&
                col.map((course, idx) => (
                  <CoreCourseItemDiv key={idx}>
                    <div className="core-course-zh">{course.zh}</div>
                    <div className="core-course-en">{course.en}</div>
                    <div className="core-course-desc">{course.desc}</div>
                  </CoreCourseItemDiv>
                ))}
            </CoreCoursesColDiv>
          ))}
        </CoreCoursesListDiv>
        <CoreCourseFootParagraph>{coreCourseFoot}</CoreCourseFootParagraph>
      </CoreCoursesSectionDiv>
      {/* end 核心課程範例區塊 */}
      <ReasonsToChooseBlock>
        {/* Changed from reasons-to-choose to a generic div with styled components below */}
        <ReasonsToChooseTitle>{reasonsTitle}</ReasonsToChooseTitle>
        <ReasonsToChooseParagraph>{reasonsDesc}</ReasonsToChooseParagraph>
      </ReasonsToChooseBlock>
    </ProgramDetailsSection>
  );
}

export default MSFinanceSection;

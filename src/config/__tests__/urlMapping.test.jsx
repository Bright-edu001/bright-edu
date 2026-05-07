import {
  buildChineseUrl,
  parseChineseUrl,
  urlMapping,
  reverseUrlMapping,
} from "../urlMapping";

describe("URL映射測試", () => {
  test("英文URL轉中文URL", () => {
    const englishUrl = "uic-business-school/uic/about-uic";
    const chineseUrl = buildChineseUrl(englishUrl);
    expect(chineseUrl).toBe("/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹");
  });

  test("中文URL轉英文URL", () => {
    const chineseUrl = "/伊利諾大學芝加哥分校/UIC商學院碩士/學校介紹";
    const englishUrl = parseChineseUrl(chineseUrl);
    expect(englishUrl).toBe("/uic-business-school/uic/about-uic");
  });

  test("URL映射表完整性", () => {
    expect(urlMapping["uic-business-school"]).toBe("伊利諾大學芝加哥分校");
    expect(urlMapping["about-uic"]).toBe("學校介紹");
    expect(urlMapping["about-msu"]).toBe("MSU學校介紹");
    expect(reverseUrlMapping["伊利諾大學芝加哥分校"]).toBe(
      "uic-business-school",
    );
    expect(reverseUrlMapping["學校介紹"]).toBe("about-uic");
    expect(reverseUrlMapping["MSU學校介紹"]).toBe("about-msu");
  });

  test("about-msu fallback path 對應相容 redirect（非 dead route）", () => {
    // buildChineseUrl 會產生 /密西根州立大學/MSU商學院/MSU學校介紹
    // msuChineseRoutes 中已新增相容 redirect 確保此 path 不會是 dead route
    const fallbackPath = buildChineseUrl("msu-business-school/msu/about-msu");
    expect(fallbackPath).toBe("/密西根州立大學/MSU商學院/MSU學校介紹");
    // 確認 urlMapping 中 about-msu 仍保留原值，不影響 reverseUrlMapping
    expect(urlMapping["about-msu"]).toBe("MSU學校介紹");
    expect(reverseUrlMapping["MSU學校介紹"]).toBe("about-msu");
  });

  test("contact 映射可正確轉換到中文聯絡頁", () => {
    expect(urlMapping.contact).toBe("聯絡我們");
    expect(reverseUrlMapping["聯絡我們"]).toBe("contact");
    expect(buildChineseUrl("contact")).toBe("/聯絡我們");
  });

  test("human-resource 映射對齊連字號 canonical slug", () => {
    expect(urlMapping["human-resource"]).toBe("Human-Resource-Management");
    expect(
      buildChineseUrl("uic-business-school/mba/areas/human-resource"),
    ).toBe(
      "/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Human-Resource-Management",
    );
    expect(reverseUrlMapping["Human-Resource-Management"]).toBe(
      "human-resource",
    );
  });

  test("analytics 映射對齊連字號 canonical slug", () => {
    expect(urlMapping.analytics).toBe("Business-Analytics");
    expect(buildChineseUrl("uic-business-school/mba/areas/analytics")).toBe(
      "/伊利諾大學芝加哥分校/MBA-Programs/五大領域/Business-Analytics",
    );
    expect(reverseUrlMapping["Business-Analytics"]).toBe("analytics");
  });
});

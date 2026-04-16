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
});

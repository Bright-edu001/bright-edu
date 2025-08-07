// Mock firebaseConfig，避免實際連線到 Firebase
jest.mock("../config/firebaseConfig", () => ({ db: {} }));

// 建立 firebase/firestore 及 getAssetUrl 的 mock function
const mockGetDocs = jest.fn();
const mockGetDoc = jest.fn();
const mockSetDoc = jest.fn();
const mockCollection = jest.fn();
const mockDoc = jest.fn();
const mockGetAssetUrl = jest.fn((p) => (process.env.PUBLIC_URL || "") + p);

// Mock firebase/firestore 所有用到的方法
jest.mock("firebase/firestore", () => ({
  collection: mockCollection,
  getDocs: mockGetDocs,
  doc: mockDoc,
  getDoc: mockGetDoc,
  setDoc: mockSetDoc,
}));

// Mock getAssetUrl，避免實際路徑處理
jest.mock("../utils/getAssetUrl", () => mockGetAssetUrl);

// 匯入要測試的所有 service function
const {
  processBlogData,
  getEnrollmentEvents,
  getNews,
  getBlogPost,
  updateEnrollmentEvent,
  updateNews,
} = require("./blogService");

// 每個測試前重置所有 mock 狀態
beforeEach(() => {
  jest.clearAllMocks();
  mockGetAssetUrl.mockImplementation((p) => (process.env.PUBLIC_URL || "") + p);
});

describe("processBlogData", () => {
  // 測試前設置 PUBLIC_URL，測試後移除
  beforeEach(() => {
    process.env.PUBLIC_URL = "https://example.com";
  });

  afterEach(() => {
    delete process.env.PUBLIC_URL;
  });

  // 測試：陣列每個物件的圖片路徑都會被更新
  it("updates image paths for each item in an array", () => {
    const data = [
      { thumbnail: "/a.jpg", image: "/b.jpg" },
      { image: "/c.jpg" },
      { thumbnail: "/d.jpg" },
    ];

    const result = processBlogData(data);

    expect(result).toBe(data);
    expect(result).toEqual([
      {
        thumbnail: "https://example.com/a.jpg",
        image: "https://example.com/b.jpg",
      },
      { image: "https://example.com/c.jpg" },
      { thumbnail: "https://example.com/d.jpg" },
    ]);
  });

  // 測試：單一物件的圖片路徑會被更新
  it("updates image paths for a single object", () => {
    const obj = { thumbnail: "/thumb.jpg", image: "/img.jpg" };

    const result = processBlogData(obj);

    expect(result).toBe(obj);
    expect(result).toEqual({
      thumbnail: "https://example.com/thumb.jpg",
      image: "https://example.com/img.jpg",
    });
  });
});

describe("getEnrollmentEvents", () => {
  // 測試：能正確取得並處理招生活動資料
  it("calls processBlogData with fetched events", async () => {
    const docs = [
      { id: "1", data: () => ({ image: "/a.jpg" }) },
      { id: "2", data: () => ({ thumbnail: "/b.jpg" }) },
    ];
    mockGetDocs.mockResolvedValue({ docs });
    const result = await getEnrollmentEvents();

    expect(mockGetDocs).toHaveBeenCalledTimes(1);
    expect(mockGetAssetUrl).toHaveBeenCalledTimes(2);
    expect(result).toEqual([
      { id: "1", image: "/a.jpg" },
      { id: "2", thumbnail: "/b.jpg" },
    ]);
  });

  // 測試：getDocs 發生錯誤時會拋出例外
  it("throws when getDocs fails", async () => {
    const error = new Error("boom");
    mockGetDocs.mockRejectedValue(error);

    await expect(getEnrollmentEvents()).rejects.toThrow("boom");
    expect(mockGetAssetUrl).not.toHaveBeenCalled();
  });
});

describe("getNews", () => {
  // 測試：能正確取得並處理新聞資料
  it("calls processBlogData with fetched news", async () => {
    const docs = [{ id: "1", data: () => ({ image: "/n.jpg" }) }];
    mockGetDocs.mockResolvedValue({ docs });
    const result = await getNews();

    expect(mockGetDocs).toHaveBeenCalledTimes(1);
    expect(mockGetAssetUrl).toHaveBeenCalledWith("/n.jpg");
    expect(result).toEqual([{ id: "1", image: "/n.jpg" }]);
  });

  // 測試：getDocs 發生錯誤時會拋出例外
  it("throws when getDocs fails", async () => {
    const error = new Error("fail");
    mockGetDocs.mockRejectedValue(error);

    await expect(getNews()).rejects.toThrow("fail");
    expect(mockGetAssetUrl).not.toHaveBeenCalled();
  });
});

describe("getBlogPost", () => {
  // 測試：會先查詢 enrollmentEvents，再查詢 news
  it("checks enrollmentEvents before news", async () => {
    mockDoc.mockImplementation((_, col, id) => `${col}/${id}`);
    mockGetDoc
      .mockResolvedValueOnce({ exists: () => false })
      .mockResolvedValueOnce({
        exists: () => true,
        id: "1",
        data: () => ({ title: "from news" }),
      });

    const result = await getBlogPost("1");

    expect(mockDoc.mock.calls[0][1]).toBe("enrollmentEvents");
    expect(mockDoc.mock.calls[1][1]).toBe("news");
    expect(mockGetDoc).toHaveBeenCalledTimes(2);
    expect(mockGetAssetUrl).not.toHaveBeenCalled();
    expect(result).toEqual({ id: "1", title: "from news" });
  });
});

describe("updateEnrollmentEvent", () => {
  // 測試：setDoc 能正確呼叫以更新 enrollment event
  it("calls setDoc to update enrollment event", async () => {
    mockDoc.mockReturnValue("enrollDoc");
    mockSetDoc.mockResolvedValue();

    await updateEnrollmentEvent("1", { title: "a" });

    expect(mockDoc).toHaveBeenCalledWith({}, "enrollmentEvents", "1");
    expect(mockSetDoc).toHaveBeenCalledWith(
      "enrollDoc",
      { title: "a" },
      { merge: true }
    );
  });

  // 測試：setDoc 發生錯誤時會拋出例外
  it("throws when setDoc fails", async () => {
    mockDoc.mockReturnValue("enrollDoc");
    mockSetDoc.mockRejectedValue(new Error("err"));

    await expect(updateEnrollmentEvent("1", { title: "a" })).rejects.toThrow(
      "err"
    );
  });
});

describe("updateNews", () => {
  // 測試：setDoc 能正確呼叫以更新 news
  it("calls setDoc to update news", async () => {
    mockDoc.mockReturnValue("newsDoc");
    mockSetDoc.mockResolvedValue();

    await updateNews("1", { title: "b" });

    expect(mockDoc).toHaveBeenCalledWith({}, "news", "1");
    expect(mockSetDoc).toHaveBeenCalledWith(
      "newsDoc",
      { title: "b" },
      { merge: true }
    );
  });

  // 測試：setDoc 發生錯誤時會拋出例外
  it("throws when setDoc fails", async () => {
    mockDoc.mockReturnValue("newsDoc");
    mockSetDoc.mockRejectedValue(new Error("bad"));

    await expect(updateNews("1", { title: "b" })).rejects.toThrow("bad");
  });
});

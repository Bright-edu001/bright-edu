// Mock firebaseCore，避免實際連線到 Firebase
vi.mock("../../../config/firebaseCore", () => ({ db: {} }));

// 建立 firebase/firestore 的 mock functions
const {
  mockGetDocs,
  mockAddDoc,
  mockUpdateDoc,
  mockDeleteDoc,
  mockGetDoc,
  mockWriteBatch,
  mockCollection,
  mockDoc,
  mockQuery,
  mockWhere,
  mockLimit,
} = vi.hoisted(() => ({
  mockGetDocs: vi.fn(),
  mockAddDoc: vi.fn(),
  mockUpdateDoc: vi.fn(),
  mockDeleteDoc: vi.fn(),
  mockGetDoc: vi.fn(),
  mockWriteBatch: vi.fn(() => ({
    update: vi.fn(),
    commit: vi.fn().mockResolvedValue(undefined),
  })),
  mockCollection: vi.fn((_, col) => ({ _col: col })),
  mockDoc: vi.fn((_, col, id) => ({ _col: col, _id: id })),
  mockQuery: vi.fn((...args) => ({ _query: args })),
  mockWhere: vi.fn(),
  mockLimit: vi.fn(),
}));

vi.mock("firebase/firestore", () => ({
  collection: mockCollection,
  getDocs: mockGetDocs,
  doc: mockDoc,
  getDoc: mockGetDoc,
  addDoc: mockAddDoc,
  updateDoc: mockUpdateDoc,
  deleteDoc: mockDeleteDoc,
  writeBatch: mockWriteBatch,
  query: mockQuery,
  where: mockWhere,
  limit: mockLimit,
}));

// Mock getImageUrl
vi.mock("../../../utils/getImageUrl.jsx", () => ({
  default: vi.fn((p) => p),
}));

// Mock generateSlug
const { mockGenerateSlug } = vi.hoisted(() => ({
  mockGenerateSlug: vi.fn(
    (title) => title?.toLowerCase().replace(/\s+/g, "-") || null,
  ),
}));
vi.mock("../../../utils/generateSlug", () => ({
  generateSlug: mockGenerateSlug,
}));

import {
  createArticle,
  deleteArticle,
  updateArticle,
  updateArticlesOrder,
} from "../blogApi.jsx";

beforeEach(() => {
  vi.clearAllMocks();
  // 預設 generateSlug 回傳 title 的 kebab-case
  mockGenerateSlug.mockImplementation(
    (title) => title?.toLowerCase().replace(/\s+/g, "-") || null,
  );
  // 預設 getDocs 回傳 empty（slug 未被佔用）
  mockGetDocs.mockResolvedValue({ empty: true, docs: [] });
  // 預設 addDoc 回傳 docRef
  mockAddDoc.mockResolvedValue({ id: "new-doc-id" });
  // 預設 updateDoc 成功
  mockUpdateDoc.mockResolvedValue(undefined);
});

// ─────────────────────────────────────────────
// isSlugTakenGlobally / ensureUniqueSlugGlobally
// ─────────────────────────────────────────────
describe("createArticle — 全域 slug 唯一性（Bug 1）", () => {
  it("同時查詢 enrollmentEvents 和 news 兩個 collection 是否有 slug 衝突", async () => {
    await createArticle("enrollment", { title: "MBA Event 2026" });

    // getDocs 應被呼叫（至少一次），且涉及兩個 collection
    expect(mockGetDocs).toHaveBeenCalled();
    const queryArgs = mockGetDocs.mock.calls.map((call) => call[0]);
    // mockQuery 的第一個引數為 collection ref，_col 為 collection 名稱
    const queriedCols = queryArgs
      .map((q) => q?._query?.[0]?._col)
      .filter(Boolean);
    expect(queriedCols).toContain("enrollmentEvents");
    expect(queriedCols).toContain("news");
  });

  it("enrollmentEvents 已有相同 slug 時，news 的新文章 slug 應加後綴", async () => {
    // 第一次查詢 enrollmentEvents：命中（slug 已被佔用）
    // 第二次查詢 news：未命中
    // 第三次查詢 enrollmentEvents（加後綴 -2）：未命中
    // 第四次查詢 news（加後綴 -2）：未命中
    mockGetDocs
      .mockResolvedValueOnce({ empty: false, docs: [{ id: "existing" }] }) // enrollmentEvents: "mba-event" 命中
      .mockResolvedValueOnce({ empty: true, docs: [] }) // news: "mba-event" 未命中
      .mockResolvedValueOnce({ empty: true, docs: [] }) // enrollmentEvents: "mba-event-2" 未命中
      .mockResolvedValueOnce({ empty: true, docs: [] }); // news: "mba-event-2" 未命中

    mockGenerateSlug.mockReturnValue("mba-event");

    const result = await createArticle("article", { title: "MBA Event" });

    expect(result.slug).toBe("mba-event-2");
    expect(result.link).toBe("/blog/mba-event-2");
  });

  it("news 已有相同 slug 時，enrollmentEvents 的新文章 slug 應加後綴", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] }) // enrollmentEvents: "news-title" 未命中
      .mockResolvedValueOnce({ empty: false, docs: [{}] }) // news: "news-title" 命中
      .mockResolvedValueOnce({ empty: true, docs: [] }) // enrollmentEvents: "news-title-2" 未命中
      .mockResolvedValueOnce({ empty: true, docs: [] }); // news: "news-title-2" 未命中

    mockGenerateSlug.mockReturnValue("news-title");

    const result = await createArticle("enrollment", { title: "News Title" });

    expect(result.slug).toBe("news-title-2");
  });

  it("兩個 collection 均無衝突時，應保留原始 slug", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] }) // enrollmentEvents
      .mockResolvedValueOnce({ empty: true, docs: [] }); // news

    const result = await createArticle("enrollment", { title: "Unique Event" });

    expect(result.slug).toBe("unique-event");
    expect(result.link).toBe("/blog/unique-event");
  });
});

// ─────────────────────────────────────────────
// createArticle — 先查重後寫入（Bug 2）
// ─────────────────────────────────────────────
describe("createArticle — 先查重後寫入（Bug 2）", () => {
  it("手動輸入的 slug 在兩個 collection 均無衝突時，應原樣保留，不加後綴", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] }) // enrollmentEvents
      .mockResolvedValueOnce({ empty: true, docs: [] }); // news

    const result = await createArticle("enrollment", {
      title: "Event Title",
      slug: "my-custom-slug",
    });

    expect(result.slug).toBe("my-custom-slug");
    expect(result.link).toBe("/blog/my-custom-slug");
  });

  it("addDoc 被呼叫時 payload 已含最終 slug（一次寫入，無 updateDoc）", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] })
      .mockResolvedValueOnce({ empty: true, docs: [] });
    mockGenerateSlug.mockReturnValue("auto-slug");

    await createArticle("article", { title: "Auto Slug Article" });

    // addDoc 的 payload 應已包含 slug
    const addDocPayload = mockAddDoc.mock.calls[0][1];
    expect(addDocPayload.slug).toBe("auto-slug");
    expect(addDocPayload.link).toBe("/blog/auto-slug");

    // 因為 slug 在 addDoc 前已確定，不需要 updateDoc
    expect(mockUpdateDoc).not.toHaveBeenCalled();
  });

  it("手動 slug 與 enrollmentEvents 已存在的 slug 衝突時，應加後綴 -2", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: false, docs: [{}] }) // enrollmentEvents: "duplicate" 命中
      .mockResolvedValueOnce({ empty: true, docs: [] }) // news: "duplicate" 未命中
      .mockResolvedValueOnce({ empty: true, docs: [] }) // enrollmentEvents: "duplicate-2" 未命中
      .mockResolvedValueOnce({ empty: true, docs: [] }); // news: "duplicate-2" 未命中

    const result = await createArticle("article", {
      title: "Duplicate Article",
      slug: "duplicate",
    });

    expect(result.slug).toBe("duplicate-2");
    // addDoc 的 payload 應已是最終 slug（不是原始 duplicate）
    const addDocPayload = mockAddDoc.mock.calls[0][1];
    expect(addDocPayload.slug).toBe("duplicate-2");
    expect(mockUpdateDoc).not.toHaveBeenCalled();
  });

  it("title 為純中文（generateSlug 回傳 null）且無手動 slug 時，fallback 使用 docId 並執行 updateDoc", async () => {
    mockGenerateSlug.mockReturnValue(null);
    mockAddDoc.mockResolvedValue({ id: "firestore-generated-id" });

    const result = await createArticle("enrollment", { title: "純中文標題" });

    expect(result.slug).toBe("firestore-generated-id");
    expect(result.link).toBe("/blog/firestore-generated-id");
    // 此 fallback 路徑需要 updateDoc
    expect(mockUpdateDoc).toHaveBeenCalledTimes(1);
    // getDocs 不應被呼叫（docId 不需查重）
    expect(mockGetDocs).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────
// createArticle — 一般行為
// ─────────────────────────────────────────────
describe("createArticle — 一般行為", () => {
  it("enrollment 類型應寫入 enrollmentEvents collection", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] })
      .mockResolvedValueOnce({ empty: true, docs: [] });

    await createArticle("enrollment", { title: "Event" });

    const [, colRef] = mockAddDoc.mock.calls[0];
    // mockCollection 第二個引數為 collection 名稱
    const addDocColArg =
      mockCollection.mock.results[0]?.value?._col ??
      mockAddDoc.mock.calls[0][0]?._col;
    // 驗證 collection 被正確呼叫
    const collectionCalls = mockCollection.mock.calls.map((c) => c[1]);
    expect(collectionCalls).toContain("enrollmentEvents");
  });

  it("article 類型應寫入 news collection", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] })
      .mockResolvedValueOnce({ empty: true, docs: [] });

    await createArticle("article", { title: "News Article" });

    const collectionCalls = mockCollection.mock.calls.map((c) => c[1]);
    expect(collectionCalls).toContain("news");
  });

  it("應回傳含 docId 與 collection 的物件", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] })
      .mockResolvedValueOnce({ empty: true, docs: [] });
    mockAddDoc.mockResolvedValue({ id: "test-id-123" });

    const result = await createArticle("enrollment", { title: "Return Shape" });

    expect(result.docId).toBe("test-id-123");
    expect(result.collection).toBe("enrollmentEvents");
    expect(result.slug).toBeDefined();
    expect(result.link).toMatch(/^\/blog\//);
  });

  it("未指定 order 時應自動填入數字", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] })
      .mockResolvedValueOnce({ empty: true, docs: [] });

    await createArticle("enrollment", { title: "No Order" });

    const addDocPayload = mockAddDoc.mock.calls[0][1];
    expect(typeof addDocPayload.order).toBe("number");
  });
});

// ─────────────────────────────────────────────
// updateArticle
// ─────────────────────────────────────────────
describe("updateArticle", () => {
  it("更新 slug 時應同步更新 link", async () => {
    await updateArticle("enrollment", "doc-123", { slug: "updated-slug" });

    const updatePayload = mockUpdateDoc.mock.calls[0][1];
    expect(updatePayload.link).toBe("/blog/updated-slug");
  });

  it("未更新 slug 時不應覆蓋 link", async () => {
    await updateArticle("article", "doc-456", { title: "New Title" });

    const updatePayload = mockUpdateDoc.mock.calls[0][1];
    expect(updatePayload.link).toBeUndefined();
  });
});

// ─────────────────────────────────────────────
// deleteArticle
// ─────────────────────────────────────────────
describe("deleteArticle", () => {
  it("應呼叫 deleteDoc", async () => {
    await deleteArticle("enrollment", "doc-789");
    expect(mockDeleteDoc).toHaveBeenCalledTimes(1);
  });

  it("enrollment 類型應刪除 enrollmentEvents 中的正確文件", async () => {
    await deleteArticle("enrollment", "doc-enrollment-1");
    // mockDoc(db, col, id) → { _col: col, _id: id }
    expect(mockDoc).toHaveBeenCalledWith(
      {},
      "enrollmentEvents",
      "doc-enrollment-1",
    );
    expect(mockDeleteDoc).toHaveBeenCalledWith({
      _col: "enrollmentEvents",
      _id: "doc-enrollment-1",
    });
  });

  it("article 類型應刪除 news 中的正確文件", async () => {
    await deleteArticle("article", "doc-news-2");
    expect(mockDoc).toHaveBeenCalledWith({}, "news", "doc-news-2");
    expect(mockDeleteDoc).toHaveBeenCalledWith({
      _col: "news",
      _id: "doc-news-2",
    });
  });
});

// ─────────────────────────────────────────────
// updateArticle — collection 路由與回傳形狀
// ─────────────────────────────────────────────
describe("updateArticle — collection 路由與回傳形狀", () => {
  it("enrollment 類型應更新 enrollmentEvents 中的文件", async () => {
    await updateArticle("enrollment", "doc-e-1", { title: "Updated" });
    expect(mockDoc).toHaveBeenCalledWith({}, "enrollmentEvents", "doc-e-1");
  });

  it("article 類型應更新 news 中的文件", async () => {
    await updateArticle("article", "doc-n-1", { title: "Updated" });
    expect(mockDoc).toHaveBeenCalledWith({}, "news", "doc-n-1");
  });

  it("應回傳含 docId 與 collection 的物件", async () => {
    const result = await updateArticle("enrollment", "doc-e-2", {
      title: "Ret",
    });
    expect(result.docId).toBe("doc-e-2");
    expect(result.collection).toBe("enrollmentEvents");
    expect(result.title).toBe("Ret");
  });
});

// ─────────────────────────────────────────────
// createArticle — order 保留
// ─────────────────────────────────────────────
describe("createArticle — order 欄位", () => {
  it("已指定 order 時應保留原值，不覆蓋", async () => {
    mockGetDocs
      .mockResolvedValueOnce({ empty: true, docs: [] })
      .mockResolvedValueOnce({ empty: true, docs: [] });

    await createArticle("enrollment", { title: "Ordered Event", order: 999 });

    const addDocPayload = mockAddDoc.mock.calls[0][1];
    expect(addDocPayload.order).toBe(999);
  });
});

// ─────────────────────────────────────────────
// updateArticlesOrder
// ─────────────────────────────────────────────
describe("updateArticlesOrder", () => {
  it("應對每個有效項目呼叫 batch.update", async () => {
    const batchMock = {
      update: vi.fn(),
      commit: vi.fn().mockResolvedValue(undefined),
    };
    mockWriteBatch.mockReturnValue(batchMock);

    const list = [
      { docId: "id-1", collection: "enrollmentEvents", order: 1 },
      { docId: "id-2", collection: "news", order: 2 },
    ];

    await updateArticlesOrder(list);

    expect(batchMock.update).toHaveBeenCalledTimes(2);
    expect(batchMock.commit).toHaveBeenCalledTimes(1);
  });

  it("缺少 docId 或 collection 的項目應跳過", async () => {
    const batchMock = {
      update: vi.fn(),
      commit: vi.fn().mockResolvedValue(undefined),
    };
    mockWriteBatch.mockReturnValue(batchMock);

    const list = [
      { docId: "id-1", collection: "news", order: 1 }, // 有效
      { collection: "news", order: 2 }, // 缺 docId
      { docId: "id-3", order: 3 }, // 缺 collection
      null, // null
    ];

    await updateArticlesOrder(list);

    // 只有第一個有效
    expect(batchMock.update).toHaveBeenCalledTimes(1);
    expect(batchMock.commit).toHaveBeenCalledTimes(1);
  });

  it("空陣列時應直接提交空 batch", async () => {
    const batchMock = {
      update: vi.fn(),
      commit: vi.fn().mockResolvedValue(undefined),
    };
    mockWriteBatch.mockReturnValue(batchMock);

    await updateArticlesOrder([]);

    expect(batchMock.update).not.toHaveBeenCalled();
    expect(batchMock.commit).toHaveBeenCalledTimes(1);
  });
});

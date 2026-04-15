---
name: create-service
description: "建立新的 Firebase 服務模組。Use when: 需要新增服務層模組、Firestore CRUD、Firebase 資料操作、建立 service 檔案。自動產生含 Firebase 就緒檢查、錯誤處理、日誌記錄的服務模組。"
argument-hint: "服務名稱，例如: enrollmentService"
---

# 建立新 Firebase 服務模組

## 使用時機

- 需要在 `src/services/` 下新增一個服務模組
- 需要封裝 Firestore CRUD 操作
- 需要建立新的 Firebase 資料操作層

## 流程

### 1. 確認服務資訊

向使用者確認以下資訊：

- 服務名稱（camelCase，例如 `enrollmentService`）
- 操作的 Firestore 集合名稱
- 需要哪些 CRUD 操作
- 是否需要去重快取機制
- 是否需要 Firebase 就緒狀態等待隊列

### 2. 建立服務檔案 (`src/services/xxxService.jsx`)

```jsx
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { getFirestoreDb } from "@/config/firebaseCore";
import { logger } from "@/utils/logger";

const COLLECTION_NAME = "your_collection";

/**
 * 取得所有資料
 */
export async function getAll() {
  try {
    const db = getFirestoreDb();
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error(`取得 ${COLLECTION_NAME} 失敗`, error);
    throw error;
  }
}

/**
 * 取得單筆資料
 */
export async function getById(id) {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`${COLLECTION_NAME}/${id} 不存在`);
    }
    return { id: docSnap.id, ...docSnap.data() };
  } catch (error) {
    logger.error(`取得 ${COLLECTION_NAME}/${id} 失敗`, error);
    throw error;
  }
}

/**
 * 新增資料
 */
export async function create(data) {
  try {
    const db = getFirestoreDb();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date(),
    });
    logger.log(`新增 ${COLLECTION_NAME}/${docRef.id} 成功`);
    return docRef.id;
  } catch (error) {
    logger.error(`新增 ${COLLECTION_NAME} 失敗`, error);
    throw error;
  }
}

/**
 * 更新資料
 */
export async function update(id, data) {
  try {
    const db = getFirestoreDb();
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
    logger.log(`更新 ${COLLECTION_NAME}/${id} 成功`);
  } catch (error) {
    logger.error(`更新 ${COLLECTION_NAME}/${id} 失敗`, error);
    throw error;
  }
}
```

### 3. 加入去重快取（如需要）

參考 `contactService.jsx` 的模式：

```jsx
const submissionCache = new Map();
const CACHE_TTL = 60 * 1000; // 1 分鐘

function isDuplicate(data) {
  const key = JSON.stringify(data);
  const cached = submissionCache.get(key);
  if (cached && Date.now() - cached < CACHE_TTL) {
    return true;
  }
  submissionCache.set(key, Date.now());
  // 維持快取上限 100 筆
  if (submissionCache.size > 100) {
    const oldestKey = submissionCache.keys().next().value;
    submissionCache.delete(oldestKey);
  }
  return false;
}
```

### 4. 建立測試檔

在 `src/services/__tests__/xxxService.test.jsx` 中建立：

```jsx
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGetDocs = vi.hoisted(() => vi.fn());
const mockGetFirestoreDb = vi.hoisted(() => vi.fn());

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: mockGetDocs,
  query: vi.fn(),
  orderBy: vi.fn(),
}));

vi.mock("@/config/firebaseCore", () => ({
  getFirestoreDb: mockGetFirestoreDb,
}));

import { getAll } from "../xxxService";

describe("xxxService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("應該取得所有資料", async () => {
    // 測試邏輯
  });
});
```

## 檢查清單

- [ ] 包含 Firebase 就緒狀態檢查
- [ ] 所有操作都有 try/catch 錯誤處理
- [ ] 使用 `logger` 記錄關鍵操作
- [ ] 不在服務中硬編碼集合名稱（使用常數）
- [ ] 有對應的測試檔案

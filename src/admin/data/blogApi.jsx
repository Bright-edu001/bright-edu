import { db } from "../../config/firebaseCore";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import getImageUrl from "../../utils/getImageUrl";

// 輔助函數：將本地 /images/... 路徑轉換為公開的 Firebase Storage URL
const convertItemPaths = (item) => {
  if (!item || typeof item !== "object") return item;
  const copy = { ...item };
  if (
    copy.thumbnail &&
    typeof copy.thumbnail === "string" &&
    copy.thumbnail.startsWith("/images/")
  ) {
    copy.thumbnail = getImageUrl(copy.thumbnail);
  }
  if (
    copy.image &&
    typeof copy.image === "string" &&
    copy.image.startsWith("/images/")
  ) {
    copy.image = getImageUrl(copy.image);
  }
  return copy;
};

// 取得所有文章（招生活動和新聞），並按順序排序
export async function getAllArticles() {
  // 同時取得招生活動和新聞集合的資料
  const [enrollmentSnap, newsSnap] = await Promise.all([
    getDocs(collection(db, "enrollmentEvents")),
    getDocs(collection(db, "news")),
  ]);
  // 處理招生活動資料，添加必要欄位和順序
  const enrollmentEvents = enrollmentSnap.docs.map((d, idx) =>
    convertItemPaths({
      ...d.data(),
      type: d.data()?.type || "enrollment",
      category: d.data()?.category || "enrollment",
      docId: d.id,
      collection: "enrollmentEvents",
      order: typeof d.data()?.order === "number" ? d.data().order : idx,
    }),
  );
  // 處理新聞資料，添加必要欄位和順序
  const news = newsSnap.docs.map((d, idx) =>
    convertItemPaths({
      ...d.data(),
      type: d.data()?.type || "article",
      category: d.data()?.category || "news",
      docId: d.id,
      collection: "news",
      order:
        typeof d.data()?.order === "number"
          ? d.data().order
          : idx + enrollmentSnap.size,
    }),
  );
  // 合併所有文章，確保順序欄位存在，並按順序排序
  const all = [...enrollmentEvents, ...news]
    .map((a, i) => ({ ...a, order: typeof a.order === "number" ? a.order : i }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return all;
}

// 根據類型和 ID 取得單篇文章
export async function getArticle(type, id) {
  // 根據類型決定集合名稱
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  // 取得文件參考
  const docRef = doc(db, col, id);
  // 取得文件快照
  const docSnap = await getDoc(docRef);
  // 如果文件存在，返回處理後的資料；否則返回 null
  return docSnap.exists()
    ? convertItemPaths({
        ...docSnap.data(),
        docId: docSnap.id,
        collection: col,
      })
    : null;
}

// 創建新文章
export async function createArticle(type, data) {
  // type 應為 'enrollment' 或 'article'
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  // 複製資料物件
  const payload = { ...data };
  // 如果未指定順序，使用當前時間戳以確保大於現有項目
  if (typeof payload.order !== "number") {
    payload.order = Date.now();
  }
  // 添加新文件到集合（先取得 docId，再補入 link）
  const docRef = await addDoc(collection(db, col), payload);
  // 補上 link 欄位（前台 ArticleCard 與 BlogDetail 路由皆依賴此欄位）
  const link = `/blog/${docRef.id}`;
  await updateDoc(doc(db, col, docRef.id), { link });
  // 返回包含文件 ID 和集合名稱的資料
  return { ...payload, link, docId: docRef.id, collection: col };
}

// 更新指定文章
export async function updateArticle(type, docId, data) {
  // type 應為 'enrollment' 或 'article'
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  // 取得文件參考
  const ref = doc(db, col, docId);
  // 更新文件資料
  await updateDoc(ref, data);
  // 返回更新後的資料
  return { ...data, docId, collection: col };
}

// 刪除指定文章
export async function deleteArticle(type, docId) {
  // type 應為 'enrollment' 或 'article'
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  // 取得文件參考
  const ref = doc(db, col, docId);
  // 刪除文件
  await deleteDoc(ref);
}

// 批次更新文章排序
export async function updateArticlesOrder(list) {
  // 建立批次寫入操作
  const batch = writeBatch(db);
  // 遍歷列表，為每個項目添加更新操作
  list.forEach((item) => {
    // 檢查項目是否有必要的欄位
    if (!item?.docId || !item?.collection) return;
    // 取得文件參考
    const ref = doc(db, item.collection, item.docId);
    // 添加更新順序的批次操作
    batch.update(ref, { order: item.order });
  });
  // 提交批次操作
  await batch.commit();
}

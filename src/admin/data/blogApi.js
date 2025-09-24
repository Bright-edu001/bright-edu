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

// Helper: convert local /images/... paths to public Firebase Storage URLs
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

export async function getAllArticles() {
  const [enrollmentSnap, newsSnap] = await Promise.all([
    getDocs(collection(db, "enrollmentEvents")),
    getDocs(collection(db, "news")),
  ]);
  const enrollmentEvents = enrollmentSnap.docs.map((d, idx) =>
    convertItemPaths({
      ...d.data(),
      type: d.data()?.type || "enrollment",
      category: d.data()?.category || "enrollment",
      docId: d.id,
      collection: "enrollmentEvents",
      order: typeof d.data()?.order === "number" ? d.data().order : idx,
    })
  );
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
    })
  );
  const all = [...enrollmentEvents, ...news]
    .map((a, i) => ({ ...a, order: typeof a.order === "number" ? a.order : i }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return all;
}

export async function getArticle(type, id) {
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists()
    ? convertItemPaths({
        ...docSnap.data(),
        docId: docSnap.id,
        collection: col,
      })
    : null;
}

export async function createArticle(type, data) {
  // type 應為 'enrollment' 或 'article'
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  const payload = { ...data };
  if (typeof payload.order !== "number") {
    // 若未指定 order，使用當下時間戳以確保大於現有項目
    payload.order = Date.now();
  }
  const docRef = await addDoc(collection(db, col), payload);
  return { ...payload, docId: docRef.id, collection: col };
}

export async function updateArticle(type, docId, data) {
  // type 應為 'enrollment' 或 'article'
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  const ref = doc(db, col, docId);
  await updateDoc(ref, data);
  return { ...data, docId, collection: col };
}

export async function deleteArticle(type, docId) {
  // type 應為 'enrollment' 或 'article'
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  const ref = doc(db, col, docId);
  await deleteDoc(ref);
}

// 批次更新文章排序
export async function updateArticlesOrder(list) {
  const batch = writeBatch(db);
  list.forEach((item) => {
    if (!item?.docId || !item?.collection) return;
    const ref = doc(db, item.collection, item.docId);
    batch.update(ref, { order: item.order });
  });
  await batch.commit();
}

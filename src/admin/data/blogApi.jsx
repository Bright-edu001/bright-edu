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
  query,
  where,
  limit,
} from "firebase/firestore";
import getImageUrl from "../../utils/getImageUrl";
import { generateSlug } from "../../utils/generateSlug";

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

// 檢查 slug 在兩個 collection 中是否已存在（全域查重）
async function isSlugTakenGlobally(slug) {
  const [snapE, snapN] = await Promise.all([
    getDocs(
      query(
        collection(db, "enrollmentEvents"),
        where("slug", "==", slug),
        limit(1),
      ),
    ),
    getDocs(query(collection(db, "news"), where("slug", "==", slug), limit(1))),
  ]);
  return !snapE.empty || !snapN.empty;
}

// 確保 slug 在兩個 collection 中均唯一，衝突時加數字後綴
async function ensureUniqueSlugGlobally(baseSlug) {
  let slug = baseSlug;
  let counter = 2;
  while (await isSlugTakenGlobally(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
    if (counter > 100) {
      slug = `${baseSlug}-${Date.now()}`;
      break;
    }
  }
  return slug;
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
  // 優先使用管理員手動輸入的 slug，否則從 title 自動產生
  const rawSlug = data.slug || generateSlug(data.title);
  if (rawSlug) {
    // slug 可在寫入前確定：全域查重後一次寫入，避免自我衝突
    const slug = await ensureUniqueSlugGlobally(rawSlug);
    const link = `/blog/${slug}`;
    payload.slug = slug;
    payload.link = link;
    const docRef = await addDoc(collection(db, col), payload);
    return { ...payload, docId: docRef.id, collection: col };
  } else {
    // 純中文標題無法產生有意義的 slug，先建立文件再以 docId 作為 fallback
    const docRef = await addDoc(collection(db, col), payload);
    const slug = docRef.id;
    const link = `/blog/${slug}`;
    await updateDoc(doc(db, col, docRef.id), { slug, link });
    return { ...payload, slug, link, docId: docRef.id, collection: col };
  }
}

// 更新指定文章
export async function updateArticle(type, docId, data) {
  // type 應為 'enrollment' 或 'article'
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  // 取得文件參考
  const ref = doc(db, col, docId);
  // 若 slug 有更新，同步寫入 link 欄位確保一致性
  const updateData = { ...data };
  if (updateData.slug) {
    updateData.link = `/blog/${updateData.slug}`;
  }
  // 更新文件資料
  await updateDoc(ref, updateData);
  // 返回更新後的資料
  return { ...updateData, docId, collection: col };
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

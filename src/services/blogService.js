import { db } from "../config/firebaseConfig";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import getImageUrl from "../utils/getImageUrl";

// 處理部落格資料，將圖片路徑轉為公開 URL
export const processBlogData = (data) => {
  // 更新圖片路徑
  const updateImagePaths = (item) => {
    if (item.thumbnail) {
      item.thumbnail = getImageUrl(item.thumbnail);
    }
    if (item.image) {
      item.image = getImageUrl(item.image);
    }
    return item;
  };

  if (Array.isArray(data)) {
    data.forEach(updateImagePaths);
    return data;
  } else if (typeof data === "object" && data !== null) {
    return updateImagePaths(data);
  }
  return data;
};

// 取得所有部落格文章（包含招生活動與新聞）
export const getAllBlogPosts = async () => {
  try {
    // 同時取得招生活動與新聞
    const [enrollmentEvents, news] = await Promise.all([
      getEnrollmentEvents(),
      getNews(),
    ]);
    const allPosts = [...enrollmentEvents, ...news];
    // 招生活動與新聞已經處理過圖片路徑
    return allPosts;
  } catch (error) {
    console.error("Failed to fetch all blog posts:", error);
    throw error; // 錯誤拋出給呼叫端處理
  }
};

// 取得所有招生活動
export const getEnrollmentEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "enrollmentEvents"));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return processBlogData(events);
  } catch (error) {
    console.error("Failed to fetch enrollment events:", error);
    throw error;
  }
};

// 取得所有新聞
export const getNews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "news"));
    const newsItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return processBlogData(newsItems);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
};

// 依據 id 取得單一部落格文章（先查招生活動，再查新聞）
export const getBlogPost = async (id) => {
  try {
    // 先查詢 enrollmentEvents
    let docRef = doc(db, "enrollmentEvents", id);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return processBlogData({ id: docSnap.id, ...docSnap.data() });
    }

    // 若未找到，再查詢 news
    docRef = doc(db, "news", id);
    docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return processBlogData({ id: docSnap.id, ...docSnap.data() });
    }

    console.log("No such document!");
    return null;
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

// all 函數等同於 getAllBlogPosts
export const all = getAllBlogPosts;

/**
 * 更新指定 id 的招生活動文章
 * @param {string|number} id - 文章 id
 * @param {object} data - 要更新的文章內容
 * @returns {Promise<void>}
 */
export const updateEnrollmentEvent = async (id, data) => {
  try {
    const docRef = doc(db, "enrollmentEvents", String(id));
    await setDoc(docRef, data, { merge: true }); // merge:true 可只更新部分欄位
    console.log(`文章 ${id} 已更新`);
  } catch (error) {
    console.error("更新文章失敗:", error);
    throw error;
  }
};

/**
 * 更新指定 id 的新聞文章
 * @param {string|number} id - 文章 id
 * @param {object} data - 要更新的文章內容
 * @returns {Promise<void>}
 */
export const updateNews = async (id, data) => {
  try {
    const docRef = doc(db, "news", String(id));
    await setDoc(docRef, data, { merge: true }); // merge:true 可只更新部分欄位
    console.log(`news 文章 ${id} 已更新`);
  } catch (error) {
    console.error("更新 news 文章失敗:", error);
    throw error;
  }
};

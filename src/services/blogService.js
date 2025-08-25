import { db } from "../config/firebaseConfig";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import getImageUrl from "../utils/getImageUrl";
import logger from "../utils/logger";

// 處理部落格資料，將圖片路徑轉為公開 URL
export const processBlogData = (data) => {
  // 將 title 內的 <img src='/images/...'> 轉成 Storage URL
  const replaceInlineImg = (html) => {
    if (typeof html !== "string" || html.indexOf("<img") === -1) return html;
    return html.replace(
      /(<img[^>]*src=['"])(\/images\/[^'" >]+)(['"][^>]*>)/gi,
      (m, p1, path, p3) => {
        try {
          return p1 + getImageUrl(path) + p3;
        } catch (e) {
          return m; // 失敗則保留原字串
        }
      }
    );
  };

  const updateImagePaths = (item) => {
    if (!item || typeof item !== "object") return item;
    if (item.thumbnail && item.thumbnail.startsWith("/images/")) {
      item.thumbnail = getImageUrl(item.thumbnail);
    }
    if (item.image && item.image.startsWith("/images/")) {
      item.image = getImageUrl(item.image);
    }
    if (item.flagImage && item.flagImage.startsWith("/images/")) {
      item.flagImage = getImageUrl(item.flagImage);
    }
    if (item.title) {
      item.title = replaceInlineImg(item.title);
    }
    // 處理巢狀 content 陣列 (如 enrollmentEvents 裡的 content)
    if (Array.isArray(item.content)) {
      item.content.forEach((c) => updateImagePaths(c));
    }
    // 其他可能的巢狀陣列欄位可在此擴充
    return item;
  };

  // 處理陣列或單一物件
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
    logger.error("Failed to fetch all blog posts:", error);
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
    logger.error("Failed to fetch enrollment events:", error);
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
    logger.error("Failed to fetch news:", error);
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

    logger.log("No such document!");
    return null;
  } catch (error) {
    logger.error("Error getting document:", error);
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
    logger.log(`文章 ${id} 已更新`);
  } catch (error) {
    logger.error("更新文章失敗:", error);
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
    logger.log(`news 文章 ${id} 已更新`);
  } catch (error) {
    logger.error("更新 news 文章失敗:", error);
    throw error;
  }
};

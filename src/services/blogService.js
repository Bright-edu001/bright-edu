import { db } from "../config/firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import getAssetUrl from "../utils/getAssetUrl";

// 處理部落格資料，將圖片路徑轉為公開 URL
const processBlogData = (data) => {
  const processedData = JSON.parse(JSON.stringify(data)); // 深拷貝

  // 更新圖片路徑
  const updateImagePaths = (item) => {
    if (item.thumbnail) {
      item.thumbnail = getAssetUrl(item.thumbnail);
    }
    if (item.image) {
      item.image = getAssetUrl(item.image);
    }
    return item;
  };

  if (Array.isArray(processedData)) {
    return processedData.map(updateImagePaths);
  } else if (typeof processedData === "object" && processedData !== null) {
    return updateImagePaths(processedData);
  }
  return processedData;
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

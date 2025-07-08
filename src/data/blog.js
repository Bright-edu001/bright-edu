import { db } from "../config/firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Function to process and add the public URL to image paths
const processBlogData = (data) => {
  const processedData = JSON.parse(JSON.stringify(data)); // Deep copy

  const updateImagePaths = (item) => {
    if (item.thumbnail) {
      item.thumbnail = `${process.env.PUBLIC_URL}${item.thumbnail}`;
    }
    if (item.image) {
      item.image = `${process.env.PUBLIC_URL}${item.image}`;
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

export const getAllBlogPosts = async () => {
  try {
    const [enrollmentEvents, news] = await Promise.all([
      getEnrollmentEvents(),
      getNews(),
    ]);
    const allPosts = [...enrollmentEvents, ...news];
    // The processing logic is already applied in getEnrollmentEvents and getNews
    return allPosts;
  } catch (error) {
    console.error("Failed to fetch all blog posts:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

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

export const getBlogPost = async (id) => {
  try {
    // Try fetching from enrollmentEvents first
    let docRef = doc(db, "enrollmentEvents", id);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return processBlogData({ id: docSnap.id, ...docSnap.data() });
    }

    // If not found, try fetching from news
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

// The 'all' export is now a function that fetches the data
// It's essentially the same as getAllBlogPosts now.
export const all = getAllBlogPosts;

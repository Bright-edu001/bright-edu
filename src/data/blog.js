const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001//api";

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
  const response = await fetch(`${API_URL}/blog`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const allPosts = [...data.enrollmentEvents, ...data.news];
  return processBlogData(allPosts);
};

export const getEnrollmentEvents = async () => {
  const response = await fetch(`${API_URL}/enrollmentEvents`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return processBlogData(data);
};

export const getNews = async () => {
  const response = await fetch(`${API_URL}/news`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return processBlogData(data);
};

export const getBlogPost = async (id) => {
  const allPosts = await getAllBlogPosts();
  // Note: This is inefficient. It's better to have a dedicated API endpoint
  // like /api/blog/:id, but for now, we'll work with what we have.
  return allPosts.find((post) => post.id === parseInt(id));
};

// The 'all' export is now a function that fetches the data
export const all = async () => {
  try {
    const [enrollmentEvents, news] = await Promise.all([
      getEnrollmentEvents(),
      getNews(),
    ]);
    return [...enrollmentEvents, ...news];
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return []; // Return empty array on error
  }
};

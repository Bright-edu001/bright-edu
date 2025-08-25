const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const logger = require("../src/utils/logger");

// ---- 請根據您的設定修改以下路徑 ----
// 您的 JSON 檔案路徑
const enrollmentEventsPath = path.join(
  __dirname,
  "../src/data/json/enrollmentEvents.json"
);
const newsPath = path.join(__dirname, "../src/data/json/news.json");
// --------------------------------------

// 初始化 Firebase Admin
// 在本地端執行 gcloud auth application-default login 後，
// Admin SDK 會自動找到憑證，不需傳入 serviceAccount
admin.initializeApp();

const db = admin.firestore();

// 讀取 JSON 檔案的輔助函式
const readJsonFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    logger.error(`Error reading or parsing file at ${filePath}:`, error);
    return null;
  }
};

// 將資料上傳到 Firestore 的函式
const uploadCollection = async (collectionName, data) => {
  if (!data || !Array.isArray(data)) {
    logger.log(`No valid data to upload for ${collectionName}.`);
    return;
  }

  const collectionRef = db.collection(collectionName);
  const batch = db.batch();

  data.forEach((item) => {
    // 如果您的項目有自己的 id，可以使用它，否則讓 firestore 自動產生
    const docRef = item.id
      ? collectionRef.doc(String(item.id))
      : collectionRef.doc();
    batch.set(docRef, item);
  });

  try {
    await batch.commit();
    logger.log(
      `Successfully uploaded ${data.length} documents to ${collectionName} collection!`
    );
  } catch (error) {
    logger.error(`Error uploading data to ${collectionName}:`, error);
  }
};

const main = async () => {
  const enrollmentEventsData = readJsonFile(enrollmentEventsPath);
  const newsData = readJsonFile(newsPath);

  await uploadCollection("enrollmentEvents", enrollmentEventsData);
  await uploadCollection("news", newsData);
};

main().catch((error) => logger.error("An unexpected error occurred:", error));

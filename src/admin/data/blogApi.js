import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAllArticles() {
  const [enrollmentSnap, newsSnap] = await Promise.all([
    getDocs(collection(db, "enrollmentEvents")),
    getDocs(collection(db, "news")),
  ]);
  const enrollmentEvents = enrollmentSnap.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
    collection: "enrollmentEvents",
  }));
  const news = newsSnap.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
    collection: "news",
  }));
  return [...enrollmentEvents, ...news].sort((a, b) => a.id - b.id);
}

export async function getArticle(type, id) {
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists()
    ? { ...docSnap.data(), docId: docSnap.id, collection: col }
    : null;
}

export async function createArticle(type, data) {
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  const docRef = await addDoc(collection(db, col), data);
  return { ...data, docId: docRef.id, collection: col };
}

export async function updateArticle(type, docId, data) {
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  const ref = doc(db, col, docId);
  await updateDoc(ref, data);
  return { ...data, docId, collection: col };
}

export async function deleteArticle(type, docId) {
  const col = type === "enrollment" ? "enrollmentEvents" : "news";
  const ref = doc(db, col, docId);
  await deleteDoc(ref);
}

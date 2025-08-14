import { db } from "../../config/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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

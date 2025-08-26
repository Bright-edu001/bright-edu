import { db } from "../../config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export async function saveEnrollmentNews(data) {
  const docRef = await addDoc(collection(db, "enrollmentNews"), data);
  return docRef.id;
}

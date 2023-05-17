import { db } from "@/app/firebase";
import { getDoc, doc } from "firebase/firestore";

export const getUserById = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("User not found");
  }
};

import { db } from "@/app/firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { useState } from "react";

export const useAddUser = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addUser = async (userName: string, color: string) => {
    setIsLoading(true);

    try {
      if (!userName || !color) throw new Error("All Fields must be filled");
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("userName", "==", userName))
      );

      if (!querySnapshot.empty) {
        throw new Error("Username already exists");
      }

      await addDoc(collection(db, "users"), {
        userName,
        color,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, addUser, setError };
};

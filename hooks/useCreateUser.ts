import { useState } from "react";
import { db } from "@/app/firebase";
import { UserType } from "@/types";
import { doc, setDoc } from "firebase/firestore";

export default function useCreateUser() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (newUser: {
    documentId: string;
    accounts: UserType[];
  }) => {
    setIsLoading(true);
    try {
      const { documentId, accounts } = newUser;
      const userRef = doc(db, "users", documentId);
      await setDoc(userRef, { accounts });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, error, isLoading };
}

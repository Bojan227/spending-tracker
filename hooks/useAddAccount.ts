import { db } from "@/app/firebase";
import {
  addDoc,
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
  DocumentSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../app/constants/queryClient";
import { UserType } from "@/types";

import { useUserStore } from "@/store/user-store";

const addAccount = async (newUser: UserType, documentId: string) => {
  if (!newUser.userName || !newUser.color || !documentId)
    throw new Error("All Fields must be filled");

  const querySnapshot = await getDocs(
    query(collection(db, "accounts"), where("userName", "==", newUser.userName))
  );

  if (!querySnapshot.empty) {
    throw new Error("Username already exists");
  }

  const userRef = doc(db, "users", documentId);

  const newAccountId = (
    await addDoc(collection(db, "accounts"), {
      userName: newUser.userName,
      color: newUser.color,
      userId: documentId,
    })
  ).id;

  await updateDoc(userRef, {
    accounts: arrayUnion(newAccountId),
  });
};

export default function useAddAccount() {
  const toast = useToast();
  const { currentUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: async (newUser: UserType) => {
      return addAccount(newUser, currentUser!);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast({
        title: "User added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return { addMutation: mutation };
}

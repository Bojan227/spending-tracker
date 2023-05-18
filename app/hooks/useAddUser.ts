import { db } from "@/app/firebase";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/queryClient";

const addUser = async (newUser: { userName: string; color: string }) => {
  if (!newUser.userName || !newUser.color)
    throw new Error("All Fields must be filled");

  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("userName", "==", newUser.userName))
  );

  if (!querySnapshot.empty) {
    throw new Error("Username already exists");
  }

  await addDoc(collection(db, "users"), newUser);
};

export default function useAddUser() {
  const mutation = useMutation({
    mutationFn: async (newUser: { userName: string; color: string }) => {
      return addUser(newUser);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { addMutation: mutation };
}

import { db } from "@/app/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { queryClient } from "../app/constants/queryClient";
import { useMutation } from "@tanstack/react-query";

export const deleteUser = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  try {
    await deleteDoc(userRef);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default function useDeleteUser() {
  const mutation = useMutation({
    mutationFn: async (userId: string) => {
      return deleteUser(userId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return { deleteUserMutation: mutation };
}

import { db } from "@/app/firebase";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { queryClient } from "../app/constants/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useUserStore } from "@/store/user-store";

export const deleteUser = async (userId: string, accountId: string) => {
  const userRef = doc(db, "users", userId);
  const accountRef = doc(db, "accounts", accountId);
  console.log(userId, accountId);
  try {
    await updateDoc(userRef, {
      accounts: arrayRemove(accountId),
    });

    await deleteDoc(accountRef);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default function useDeleteUser() {
  const toast = useToast();
  const { currentUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: async (accountId: string) => {
      return deleteUser(currentUser!, accountId);
    },
    onError: (error, variables, context) => {
      // An error happened!
      toast({
        title: error instanceof Error && error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast({
        title: "User deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return { deleteUserMutation: mutation };
}

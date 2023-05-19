import { db } from "@/app/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { queryClient } from "../app/constants/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

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
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (userId: string) => {
      return deleteUser(userId);
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
      queryClient.invalidateQueries({ queryKey: ["users"] });
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

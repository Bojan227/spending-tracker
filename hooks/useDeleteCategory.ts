import { db } from "@/app/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { queryClient } from "../app/constants/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

export const deleteCategory = async (categoryId: string) => {
  const userRef = doc(db, "categories", categoryId);
  try {
    await deleteDoc(userRef);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default function useDeleteCategory() {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (categoryId: string) => {
      return deleteCategory(categoryId);
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
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Category deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return { deleteMutation: mutation };
}

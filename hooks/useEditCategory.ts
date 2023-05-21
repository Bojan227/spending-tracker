import { db } from "@/app/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { queryClient } from "../app/constants/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Category } from "@/types";

export const editCategory = async (
  categoryId: string,
  updatedData: Omit<Category, "userId" | "type">
) => {
  const userRef = doc(db, "categories", categoryId);

  try {
    await updateDoc(userRef, updatedData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default function useEditCategory() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (category: Omit<Category, "userId" | "type">) => {
      return editCategory(category.id!, category);
    },
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["categories", variables.id] });
      router.back();
    },
  });

  return { editMutation: mutation };
}

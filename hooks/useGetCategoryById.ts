import { db } from "@/app/firebase";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";

export const getCategoryById = async (categoryId: string) => {
  const userRef = doc(db, "categories", categoryId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data() as Category;
  } else {
    throw new Error("Category not found");
  }
};

export default function useGetCategoryById(categoryId: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: async () => getCategoryById(categoryId),
    enabled: Boolean(categoryId),
  });

  return { isLoading, isError, error, data };
}

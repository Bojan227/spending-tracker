import { db } from "@/app/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";

const getCategoryById = async (categoryId: string) => {
  const userRef = doc(db, "categories", categoryId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("Category not found");
  }
};

export default function useGetCategoryById(categoryId: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users", categoryId],
    queryFn: async () => getCategoryById(categoryId),
    enabled: Boolean(categoryId),
  });

  return { isLoading, isError, error, data };
}

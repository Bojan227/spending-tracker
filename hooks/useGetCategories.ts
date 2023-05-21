import { db } from "@/app/firebase";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

async function getCategories(transactionType: string) {
  const collectionRef = collection(db, "categories");
  const querySnapshot = await getDocs(collectionRef);

  const categories: Category[] = [];
  querySnapshot.forEach((doc) => {
    const category = {
      id: doc.id,
      ...(doc.data() as Omit<Category, "id">),
    };
    if (category.type === transactionType) {
      categories.push(category);
    }
  });

  return categories;
}

export default function useGetCategories(transactionType: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories", transactionType],
    queryFn: async () => getCategories(transactionType),
    enabled: Boolean(transactionType),
  });

  return { isLoading, isError, error, data };
}

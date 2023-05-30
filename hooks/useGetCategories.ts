import { db } from "@/app/firebase";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

async function getCategories(userId: string, transactionType: string) {
  if (!userId || !transactionType) {
    return [];
  }

  const collectionRef = collection(db, "categories");
  let queryRef = query(collectionRef, where("userId", "==", userId));

  if (transactionType !== "all") {
    queryRef = query(queryRef, where("type", "==", transactionType));
  }

  const querySnapshot = await getDocs(queryRef);

  const categories: Category[] = [];
  querySnapshot.forEach((doc) => {
    const category = {
      id: doc.id,
      ...(doc.data() as Omit<Category, "id">),
    };
    categories.push(category);
  });

  return categories;
}

export default function useGetCategories(
  userId: string,
  transactionType: string
) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories", transactionType, userId],
    queryFn: async () => getCategories(userId, transactionType),
    enabled: Boolean(transactionType) || Boolean(userId),
  });

  return { isLoading, isError, error, data };
}

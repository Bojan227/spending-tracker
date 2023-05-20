import { db } from "@/app/firebase";
import { Category } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

async function getCategories() {
  const collectionRef = collection(db, "categories");
  const querySnapshot = await getDocs(collectionRef);

  const categories = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return categories as Category[];
}

export default function useGetCategories() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => getCategories(),
  });

  return { isLoading, isError, error, data };
}

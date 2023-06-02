import { db } from "@/app/firebase";
import { useFilterStore } from "@/store/filter-store";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { filterTransactions } from "@/utils/filterTransactions";
import { useUserStore } from "@/store";

async function getTransactions(
  accountId: string,
  filterType: "monthly" | "weekly" | "daily" | "yearly",
  date: number,
  categoryId?: string
) {
  if (!accountId) {
    return [];
  }

  const collectionRef = collection(db, "transactions");
  const querySnapshot = await getDocs(
    query(collectionRef, where("accountId", "==", accountId))
  );

  return filterTransactions(querySnapshot, filterType, date, categoryId);
}

export default function useGetTransactions() {
  const { filterType, dateInSeconds, categoryFilter } = useFilterStore();
  const { currentUser } = useUserStore();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [
      "transactions",
      currentUser?.id,
      filterType,
      dateInSeconds,
      categoryFilter,
    ],
    queryFn: async () =>
      getTransactions(
        currentUser?.id!,
        filterType,
        dateInSeconds,
        categoryFilter
      ),
    enabled: Boolean(currentUser?.id),
  });

  return { isLoading, isError, error, data };
}

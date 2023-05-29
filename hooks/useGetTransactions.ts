import { db } from "@/app/firebase";
import { useFilterStore } from "@/store/filter-store";
import { TransactionResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { isTransactionIncluded } from "@/utils/isTransactionIncluded";
import { filterTransactions } from "@/utils/filterTransactions";

async function getTransactions(
  accountId: string,
  filterType: "monthly" | "weekly" | "daily" | "yearly",
  date: number,
  categoryId?: string
) {
  const collectionRef = collection(db, "transactions");
  const querySnapshot = await getDocs(
    query(collectionRef, where("accountId", "==", accountId))
  );

  return filterTransactions(querySnapshot, filterType, date, categoryId);
}

export default function useGetTransactions(
  accountId: string,
  categoryId?: string
) {
  const { filterType, dateInSeconds } = useFilterStore();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [
      "transactions",
      accountId,
      filterType,
      dateInSeconds,
      categoryId,
    ],
    queryFn: async () =>
      getTransactions(accountId, filterType, dateInSeconds, categoryId),
    enabled: Boolean(accountId) || Boolean(categoryId),
  });

  return { isLoading, isError, error, data };
}

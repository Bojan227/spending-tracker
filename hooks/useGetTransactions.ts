import { db } from "@/app/firebase";
import { useFilterStore } from "@/store/filter-store";
import { TransactionResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { isThisWeek, isToday, isThisYear, isThisMonth } from "date-fns";

async function getTransactions(
  accountId: string,
  filterType: "monthly" | "weekly" | "daily" | "yearly"
) {
  const collectionRef = collection(db, "transactions");
  const querySnapshot = await getDocs(
    query(collectionRef, where("accountId", "==", accountId))
  );

  const transactions: TransactionResponse[] = [];
  querySnapshot.forEach((doc) => {
    const transaction = {
      id: doc.id,
      ...(doc.data() as Omit<TransactionResponse, "id">),
    };

    const filterTypeLower = filterType.toLowerCase();

    if (
      filterTypeLower === "monthly" &&
      isThisMonth(new Date(transaction.date.seconds * 1000))
    ) {
      transactions.push(transaction);
    } else if (
      filterTypeLower === "daily" &&
      isToday(new Date(transaction.date.seconds * 1000))
    ) {
      transactions.push(transaction);
    } else if (
      filterTypeLower === "weekly" &&
      isThisWeek(new Date(transaction.date.seconds * 1000))
    ) {
      transactions.push(transaction);
    } else if (
      filterTypeLower === "yearly" &&
      isThisYear(new Date(transaction.date.seconds * 1000))
    ) {
      transactions.push(transaction);
    }
  });

  return transactions;
}

export default function useGetTransactions(accountId: string) {
  const { filterType } = useFilterStore();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["transactions", accountId, filterType],
    queryFn: async () => getTransactions(accountId, filterType),
    enabled: Boolean(accountId),
  });

  return { isLoading, isError, error, data };
}

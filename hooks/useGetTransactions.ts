import { db } from "@/app/firebase";
import { useFilterStore } from "@/store/filter-store";
import { TransactionResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  isSameDay,
  isSameMonth,
  isThisYear,
  isSameYear,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
} from "date-fns";

async function getTransactions(
  accountId: string,
  filterType: "monthly" | "weekly" | "daily" | "yearly",
  date: number
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
    const currentDate = new Date(date * 1000);

    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }); // Assuming Monday is the start of the week
    const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });

    const isWithinWeek = isWithinInterval(
      new Date(transaction.date.seconds * 1000),
      { start: startOfCurrentWeek, end: endOfCurrentWeek }
    );

    const sameDay = isSameDay(
      currentDate,
      new Date(transaction.date.seconds * 1000)
    );

    const sameMonth = isSameMonth(
      currentDate,
      new Date(transaction.date.seconds * 1000)
    );

    const sameYear = isSameYear(
      currentDate,
      new Date(transaction.date.seconds * 1000)
    );

    if (filterTypeLower === "monthly" && sameMonth) {
      transactions.push(transaction);
    } else if (filterTypeLower === "daily" && sameDay) {
      transactions.push(transaction);
    } else if (filterTypeLower === "weekly" && isWithinWeek) {
      transactions.push(transaction);
    } else if (filterTypeLower === "yearly" && sameYear) {
      transactions.push(transaction);
    }
  });

  return transactions;
}

export default function useGetTransactions(accountId: string) {
  const { filterType, dateInSeconds } = useFilterStore();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["transactions", accountId, filterType, dateInSeconds],
    queryFn: async () => getTransactions(accountId, filterType, dateInSeconds),
    enabled: Boolean(accountId),
  });

  return { isLoading, isError, error, data };
}

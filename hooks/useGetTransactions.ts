import { db } from "@/app/firebase";
import { TransactionResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

async function getTransactions(accountId: string) {
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
    transactions.push(transaction);
  });

  return transactions;
}

export default function useGetTransactions(accountId: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["transactions", accountId],
    queryFn: async () => getTransactions(accountId),
    enabled: Boolean(accountId),
  });

  return { isLoading, isError, error, data };
}

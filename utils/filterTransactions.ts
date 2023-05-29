import { TransactionResponse } from "@/types";
import { isTransactionIncluded } from "./isTransactionIncluded";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export function filterTransactions(
  querySnapshot: QuerySnapshot<DocumentData>,
  filterType: string,
  date: number,
  categoryId?: string
) {
  const transactions: TransactionResponse[] = [];
  const currentDate = new Date(date * 1000);

  querySnapshot.forEach((doc) => {
    const transaction = {
      id: doc.id,
      ...(doc.data() as Omit<TransactionResponse, "id">),
    };

    if (isTransactionIncluded(transaction, filterType, currentDate)) {
      if (categoryId === "all" || categoryId == undefined) {
        transactions.push(transaction);
      } else if (categoryId === transaction.categoryId) {
        transactions.push(transaction);
      }
    }
  });

  return transactions;
}

import { useTransactionsStore } from "@/store/transactions-store";
import { Category, TransactionResponse } from "@/types";
import { useMemo } from "react";

interface GroupedTransactions {
  month?: number;
  categoryId: string;
  chartColor: string;
  transactions: { amount: number; transactionType: string };
}

export default function useGetGroupedData(
  transactions: TransactionResponse[],
  categories: Category[]
) {
  const groupedData = useMemo(() => {
    return transactions.reduce(
      (result: GroupedTransactions[], transaction: TransactionResponse) => {
        const currentCategory = categories?.find(
          (category) => category.id === transaction.categoryId
        );

        const existingGroup = result.find(
          (group) => group.categoryId === currentCategory?.name
        );

        if (existingGroup) {
          existingGroup.transactions.amount =
            existingGroup.transactions.amount + parseInt(transaction.amount);
        } else {
          result.push({
            categoryId: currentCategory?.name!,
            chartColor: currentCategory?.chartColor!,
            transactions: {
              amount: parseInt(transaction.amount),
              transactionType: transaction.transactionType,
            },
            month: transaction.date.seconds,
          });
        }

        return result;
      },
      []
    );
  }, [transactions, categories]);

  return groupedData;
}

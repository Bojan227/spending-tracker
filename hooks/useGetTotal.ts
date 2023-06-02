import { useTransactionsStore } from "@/store/transactions-store";
import { useMemo } from "react";

export default function useGetTotal() {
  const { transactions } = useTransactionsStore();

  const total = transactions?.reduce(
    (acc: { expense: number; income: number }, curr) => {
      if (curr.transactionType === "expense") {
        acc.expense += parseInt(curr.amount);
      } else {
        acc.income += parseInt(curr.amount);
      }

      return acc;
    },
    { expense: 0, income: 0 }
  );

  const balance = Math.abs(total.income - total.expense);

  const totalSum = total.income + total.expense;

  const incomeTransactionsTotal = useMemo(() => {
    return transactions.reduce(
      (acc, curr) =>
        (acc += curr.transactionType === "income" ? parseInt(curr.amount) : 0),
      0
    );
  }, [transactions]);

  const percentage = (incomeTransactionsTotal / totalSum) * 100;

  const expenses = useMemo(() => {
    return transactions?.filter(
      (transaction) => transaction.transactionType === "expense"
    );
  }, [transactions]);

  return { total, percentage, balance, totalSum, expenses };
}

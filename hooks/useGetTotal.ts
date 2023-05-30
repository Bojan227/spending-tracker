import { useTransactionsStore } from "@/store/TransactionsStore";

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

  return total;
}

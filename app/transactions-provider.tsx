"use client";

import useGetTransactions from "@/hooks/useGetTransactions";
import { useUserStore } from "@/store/user-store";
import { useTransactionsStore } from "@/store/transactions-store";
import { useEffect } from "react";

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadTransactions } = useTransactionsStore();
  const { data: transactions } = useGetTransactions();

  useEffect(() => {
    if (transactions) {
      loadTransactions(transactions);
    }
  }, [transactions]);

  return <>{children}</>;
}

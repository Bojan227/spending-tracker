"use client";

import useGetTransactions from "@/hooks/useGetTransactions";
import { useUserStore } from "@/store";
import { useTransactionsStore } from "@/store/TransactionsStore";
import { useFilterStore } from "@/store/filter-store";
import { useEffect } from "react";

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useUserStore();
  const { categoryFilter } = useFilterStore();
  const { loadTransactions } = useTransactionsStore();

  const { data: transactions } = useGetTransactions(
    currentUser?.id!,
    categoryFilter
  );

  useEffect(() => {
    if (transactions) {
      loadTransactions(transactions);
    }
  }, [transactions]);

  return <>{children}</>;
}

import { create } from "zustand";
import { TransactionResponse, UserType } from "@/types";

type TransactionStore = {
  transactions: TransactionResponse[];
  loadTransactions: (transactions: TransactionResponse[]) => void;
};

export const useTransactionsStore = create<TransactionStore>((set) => ({
  transactions: [],
  loadTransactions: (transactions) =>
    set((state) => ({ ...state, transactions })),
}));

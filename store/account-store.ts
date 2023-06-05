import { create } from "zustand";
import { UserType } from "@/types";

type AccountStore = {
  currentAccount: UserType | undefined;
  switchAccount: (account: UserType) => void;
  accounts: UserType[];
  loadAccounts: (accounts: UserType[]) => void;
};

export const useAccountStore = create<AccountStore>((set) => ({
  currentAccount: undefined,
  switchAccount: (account) =>
    set((state) => ({ ...state, currentAccount: account })),
  accounts: [],
  loadAccounts: (accounts) => set((state) => ({ ...state, accounts })),
}));

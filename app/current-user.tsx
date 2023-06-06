"use client";

import { useAccountStore } from "@/store/account-store";
import { useEffect } from "react";
import useGetAccounts from "@/hooks/useGetAccounts";

export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { switchAccount, loadAccounts } = useAccountStore();
  const { isLoading, isError, error, data: accounts } = useGetAccounts();

  useEffect(() => {
    if (accounts) {
      switchAccount(accounts[0] || undefined);
      loadAccounts(accounts);
    }
  }, [accounts]);

  return <>{children}</>;
}

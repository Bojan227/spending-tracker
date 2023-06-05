"use client";

import useGetUserById from "@/hooks/getUserById";
import { useAccountStore } from "@/store/account-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";

export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useUserStore();
  const { switchAccount, loadAccounts } = useAccountStore();
  const { data: user } = useGetUserById(currentUser!);

  useEffect(() => {
    if (user) {
      switchAccount(user.accounts[0] || undefined);
      loadAccounts(user.accounts);
    }
  }, [user, currentUser]);

  return <>{children}</>;
}

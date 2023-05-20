"use client";

import useGetUsers from "@/hooks/useGetUsers";
import { useUserStore } from "@/store";
import { useEffect } from "react";

export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: users } = useGetUsers();
  const { currentUser, switchUser } = useUserStore();

  useEffect(() => {
    if (!currentUser && users) {
      switchUser(users[0]);
    }
  }, [users]);

  return <>{children}</>;
}

"use client";

import AccountCard from "./Card";
import { Flex } from "@chakra-ui/react";
import { useAccountStore } from "@/store/account-store";

export function Users() {
  const { accounts } = useAccountStore();

  return (
    <Flex w="100%" align="center" direction="column" flex="1" gap="8px">
      {accounts.map(({ id, userName, color }) => (
        <AccountCard key={id} {...{ id, userName, color }} />
      ))}
    </Flex>
  );
}

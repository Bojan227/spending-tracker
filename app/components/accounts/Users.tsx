"use client";

import AccountCard from "./Card";
import { Flex } from "@chakra-ui/react";
import useGetAccounts from "@/hooks/useGetAccounts";

export function Users() {
  const { isLoading, isError, error, data: accounts } = useGetAccounts();

  console.log(accounts);
  return (
    <Flex w="100%" align="center" direction="column" flex="1" gap="8px">
      {accounts?.map(({ id, userName, color }) => (
        <AccountCard key={id} {...{ id, userName, color }} />
      ))}
    </Flex>
  );
}

"use client";

import useGetUsers from "@/hooks/useGetUsers";
import AccountCard from "./Card";
import { Flex } from "@chakra-ui/react";

export function Users() {
  const { data: users } = useGetUsers();

  return (
    <Flex w="100%" align="center" direction="column" flex="1" gap="8px">
      {users?.map(({ id, userName, color }) => (
        <AccountCard key={id} {...{ id, userName, color }} />
      ))}
    </Flex>
  );
}

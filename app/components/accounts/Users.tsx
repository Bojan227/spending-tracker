"use client";

import AccountCard from "./Card";
import { Box } from "@chakra-ui/react";
import useGetAccounts from "@/hooks/useGetAccounts";

export function Users() {
  const { isLoading, isError, error, data: accounts } = useGetAccounts();

  return (
    <Box
      width="100%"
      justifyItems="center"
      alignItems="center"
      flexDirection="column"
      maxHeight="500px"
      overflowY="auto"
      scrollBehavior="smooth"
      mt={6}
      p={4}
      flex={1}
    >
      {accounts?.map(({ id, userName, color }) => (
        <AccountCard key={id} {...{ id, userName, color }} />
      ))}
    </Box>
  );
}

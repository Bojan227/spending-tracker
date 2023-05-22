"use client";

import useGetUsers from "@/hooks/useGetUsers";
import { Flex, Select, Text } from "@chakra-ui/react";

export default function UsersSelect({
  accountId,
  setAccountId,
}: {
  accountId: string;
  setAccountId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { isLoading, isError, error, data: users } = useGetUsers();

  return (
    <Flex width="100%" mt={2} align="center" justify="space-around" gap={4}>
      <Text>Account</Text>
      <Select
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        color="black"
        width="50%"
        variant="flushed"
        placeholder="Not Selected"
        size="md"
      >
        {users?.map(({ id, userName }) => (
          <option key={id} value={id}>
            {userName}
          </option>
        ))}
      </Select>
    </Flex>
  );
}

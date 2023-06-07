"use client";

import { Flex } from "@chakra-ui/react";
import AddTranstaction from "./transactions/AddTransaction";

export default function AddTransactionBox() {
  return (
    <Flex color="white" justify="center" mb={6} gap={10} w="50%">
      <AddTranstaction transaction={true} isSpendingsScreen={true} />
      <AddTranstaction transaction={false} isSpendingsScreen={true} />
    </Flex>
  );
}

"use client";

import {
  Flex,
  Text,
  Input,
  Button,
  Box,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import AddTranstaction from "../components/transactions/AddTransaction";
import { FaPlus } from "react-icons/fa";
import TransactionCard from "../components/transactions/TransactionCard";
import SpendingFilter from "../components/SpendingFilter";
import TransactionsFooter from "../components/transactions/TransactionsFooter";
import useGetTransactions from "@/hooks/useGetTransactions";
import { useUserStore } from "@/store";

export default function Transactions() {
  const pathname = usePathname();
  const { currentUser } = useUserStore();
  const {
    isLoading,
    isError,
    error,
    data: transactions,
  } = useGetTransactions(currentUser?.id!, "expense");

  return (
    <>
      <Flex
        direction="column"
        align="center"
        width="100%"
        minH="100vh"
        padding="6rem"
        gap={4}
      >
        <Flex width="65%" textAlign="center">
          <Text py={1} width="50%" backgroundColor="#22c55e">
            $20
          </Text>
          <Text py={1} width="50%" backgroundColor="#dc2626">
            $20
          </Text>
        </Flex>

        <Flex width="65%" justify="space-between">
          <SpendingFilter />
          <AddTranstaction transaction={true} />
        </Flex>
        <Flex width="100%" justify="center">
          {isLoading ? (
            <Spinner />
          ) : transactions ? (
            transactions?.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transactionId={transaction.id}
                amount={parseInt(transaction.amount)}
                categoryId={transaction.categoryId}
                date={transaction.date.seconds}
                Icon={FaPlus}
              />
            ))
          ) : (
            <Text
              p={12}
              border="1px solid  #fca5a5"
              borderRadius={8}
              color="#fca5a5"
            >
              Press the '+' icon to add your first transaction
            </Text>
          )}
        </Flex>
        {isError && error instanceof Error && <Text>{error.message}</Text>}
      </Flex>
      <TransactionsFooter />
    </>
  );
}

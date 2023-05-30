"use client";

import { Flex, Text, Spinner } from "@chakra-ui/react";
import AddTranstaction from "../components/transactions/AddTransaction";
import { FaPlus } from "react-icons/fa";
import TransactionCard from "../components/transactions/TransactionCard";
import SpendingFilter from "../components/SpendingFilter";
import TransactionsFooter from "../components/transactions/TransactionsFooter";
import useGetTransactions from "@/hooks/useGetTransactions";
import { useUserStore } from "@/store";
import { useFilterStore } from "@/store/filter-store";

export default function Transactions() {
  const { currentUser } = useUserStore();
  const { categoryFilter } = useFilterStore();

  const {
    isLoading,
    isError,
    error,
    data: transactions,
  } = useGetTransactions(currentUser?.id!, categoryFilter);

  const total = transactions?.reduce(
    (acc: { expense: number; income: number }, curr) => {
      if (curr.transactionType === "expense") {
        acc.expense += parseInt(curr.amount);
      } else {
        acc.income += parseInt(curr.amount);
      }

      return acc;
    },
    { expense: 0, income: 0 }
  );

  return (
    <Flex direction="column" align="center" width="100%" minH="100vh" gap={4}>
      <Flex
        direction="column"
        flex="1"
        width="100%"
        align="center"
        gap={4}
        padding="6rem"
      >
        <Flex width="65%" textAlign="center">
          <Text py={1} width="50%" backgroundColor="#22c55e">
            ${total?.income}
          </Text>
          <Text py={1} width="50%" backgroundColor="#dc2626">
            ${total?.expense}
          </Text>
        </Flex>

        <Flex width="65%" justify="space-between">
          <SpendingFilter />
          <AddTranstaction transaction={true} />
        </Flex>
        <Flex
          width="100%"
          justify="center"
          align="center"
          gap="5px"
          direction="column"
        >
          {isLoading ? (
            <Spinner />
          ) : transactions?.length! > 0 ? (
            transactions?.map((transaction, i) => (
              <TransactionCard
                key={transaction.id}
                transactionId={transaction.id}
                amount={parseInt(transaction.amount)}
                categoryId={transaction.categoryId}
                date={transaction.date.seconds}
                Icon={FaPlus}
                transactionType={transaction.transactionType}
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
      </Flex>
      {transactions && <TransactionsFooter transactions={transactions} />}
      {isError && error instanceof Error && <Text>{error.message}</Text>}
    </Flex>
  );
}

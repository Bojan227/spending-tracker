"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import AddTranstaction from "../components/transactions/AddTransaction";
import { FaPlus } from "react-icons/fa";
import TransactionCard from "../components/transactions/TransactionCard";
import SpendingFilter from "../components/SpendingFilter";
import TransactionsFooter from "../components/transactions/TransactionsFooter";
import { useTransactionsStore } from "@/store/transactions-store";
import useGetTotal from "@/hooks/useGetTotal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDoc } from "../components/PdfDoc";
import { useFilterStore } from "@/store/filter-store";

export default function Transactions() {
  const { transactions } = useTransactionsStore();
  const { total } = useGetTotal();

  const { currentPeriod } = useFilterStore();

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
        <Box
          width="65%"
          justifyItems="center"
          alignItems="center"
          flexDirection="column"
          maxHeight="550px"
          overflowY="auto"
          scrollBehavior="smooth"
          mt={6}
          p={4}
        >
          {transactions?.length! > 0 ? (
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
        </Box>
      </Flex>

      <TransactionsFooter />
    </Flex>
  );
}

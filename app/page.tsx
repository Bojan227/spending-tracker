"use client";
import { Box, Flex, Progress } from "@chakra-ui/react";
import InfoBox from "./components/spendings/InfoBox";
import SpendingFilter from "./components/SpendingFilter";
import SwitchAccount from "./components/spendings/SwitchAccountModal";
import AddTranstaction from "./components/transactions/AddTransaction";
import { useTransactionsStore } from "@/store/TransactionsStore";
import useGetTotal from "@/hooks/useGetTotal";

export default function Home() {
  const { transactions } = useTransactionsStore();
  const total = useGetTotal();

  const balance = Math.abs(total.income - total.expense);
  const totalSum = total.income + total.expense;
  const incomeTransactionsTotal = transactions.reduce(
    (acc, curr) =>
      (acc += curr.transactionType === "income" ? parseInt(curr.amount) : 0),
    0
  );
  const percentage = (incomeTransactionsTotal / totalSum) * 100;

  return (
    <Flex
      fontSize="1.5rem"
      minHeight="100vh"
      align="center"
      padding="6rem"
      direction="column"
      fontFamily="EraserDust"
    >
      <Flex align="center" pb={6} justify="space-around" w="50%">
        <SpendingFilter />
        <SwitchAccount iconColor="skyblue" />
      </Flex>
      <Box w="50%">
        <Progress
          colorScheme="green"
          size="lg"
          value={totalSum === 0 ? 50 : percentage}
          backgroundColor="red"
          isAnimated
          borderRadius={4}
          border="1px solid white"
          mb={4}
        />
        <InfoBox label="Income" value={total.income} color="green" />
      </Box>
      <Box w="50%" borderBottom="1px dashed white">
        <InfoBox label="Expense" value={total.expense} color="red" />
        <Flex py={4} pl={6} fontSize="1.2rem">
          <InfoBox width="100%" label="Entertaiment" value={0} color="white" />
        </Flex>
      </Box>
      <InfoBox
        flex={1}
        width="50%"
        label="Balance"
        value={balance}
        color="skyblue"
      />
      <Flex color="white" justify="center" pb={6} gap={10} w="50%">
        <AddTranstaction transaction={true} isSpendingsScreen={true} />
        <AddTranstaction transaction={false} isSpendingsScreen={true} />
      </Flex>
    </Flex>
  );
}

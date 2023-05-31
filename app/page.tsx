"use client";
import { Box, Flex, Progress } from "@chakra-ui/react";
import InfoBox from "./components/spendings/InfoBox";
import SpendingFilter from "./components/SpendingFilter";
import SwitchAccount from "./components/spendings/SwitchAccountModal";
import AddTranstaction from "./components/transactions/AddTransaction";
import useGetTotal from "@/hooks/useGetTotal";
import { getCategoryById } from "@/hooks/useGetCategoryById";
import { useEffect, useMemo, useState } from "react";
import { Category } from "@/types";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { total, percentage, balance, totalSum, expenses } = useGetTotal();

  const expensesTotal = useMemo(() => {
    return expenses.reduce<{ [key: string]: number }>((acc, curr) => {
      const categoryName = categories.find(
        (category) => curr.categoryId === category.id
      )?.name!;

      if (!acc[categoryName]) {
        acc[categoryName] = 0;
      }

      acc[categoryName] += parseInt(curr.amount);

      return acc;
    }, {});
  }, [expenses]);

  useEffect(() => {
    async function getCategories() {
      const categoires = await Promise.all(
        expenses?.map(({ categoryId }) => {
          return getCategoryById(categoryId);
        })
      );

      setCategories(categoires);
    }

    if (expenses) {
      getCategories();
    }
  }, [expenses.length]);

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
        <Flex direction="column" py={4} pl={6} fontSize="1.2rem">
          {Object.keys(expensesTotal).map((key) => (
            <InfoBox
              key={key}
              width="100%"
              label={key}
              value={expensesTotal[key]}
              color="white"
            />
          ))}
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

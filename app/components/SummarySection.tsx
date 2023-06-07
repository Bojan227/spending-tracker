"use client";

import useGetTotal from "@/hooks/useGetTotal";
import { Box, Flex, Progress } from "@chakra-ui/react";
import InfoBox from "./spendings/InfoBox";
import { useEffect, useMemo, useState } from "react";
import { Category } from "@/types";
import { getCategoryById } from "@/hooks/useGetCategoryById";

export default function SummarySection() {
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
  }, [expenses, categories]);

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
  }, [expenses]);

  return (
    <>
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
    </>
  );
}

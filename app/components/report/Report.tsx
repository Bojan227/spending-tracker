"use client";

import { getCategoryById } from "@/hooks/useGetCategoryById";
import { Category } from "@/types";
import { useEffect, useRef, useState } from "react";
import { useTransactionsStore } from "@/store/transactions-store";
import { Divider, Flex, Text } from "@chakra-ui/react";
import SelectTransactionType from "./SelectTransactionType";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import SpendingFilter from "../SpendingFilter";
import { useFilterStore } from "@/store/filter-store";
import ReportTable from "./Table";

export default function ReportPage() {
  const { transactions } = useTransactionsStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionType, setTransactionType] = useState("expense");
  const inputRef = useRef<HTMLDivElement | null>(null);
  const { currentPeriod } = useFilterStore();

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.transactionType === transactionType
  );

  useEffect(() => {
    async function getCategories() {
      const categoires = await Promise.all(
        filteredTransactions?.map(({ categoryId }) => {
          return getCategoryById(categoryId);
        })
      );

      setCategories(categoires);
    }

    if (transactions) {
      getCategories();
    }
  }, [transactions, transactionType]);

  return (
    <Flex direction="column" align="center" w="100%" gap="35px" padding={8}>
      <Flex justify="space-around" w="100%" align="center" gap={6}>
        <SelectTransactionType {...{ transactionType, setTransactionType }} />
        <SpendingFilter />
      </Flex>
      <Divider />
      <Flex
        direction="column"
        gap={14}
        ref={inputRef}
        backgroundColor="#262626"
        align="center"
        p={4}
        fontSize="1.4rem"
        w={["100%", "100%", "90%", "70%"]}
      >
        <Flex color="#f59e0b" alignSelf="center" gap={6}>
          <Text>Transactions Overview</Text>
          <Text>Period: {currentPeriod}</Text>
        </Flex>

        <ReportTable transactions={filteredTransactions} />

        <Divider />
        <BarChart transactions={filteredTransactions} categories={categories} />
        <Divider />
        {filteredTransactions && (
          <PieChart
            transactions={filteredTransactions}
            categories={categories}
          />
        )}
      </Flex>
    </Flex>
  );
}

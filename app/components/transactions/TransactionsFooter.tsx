"use client";
import { getNextDateInSeconds } from "@/utils/getNextDateInSeconds";
import { useFilterStore } from "@/store/filter-store";
import { Flex, Icon } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ExportModal from "./ExportModal";
import { TransactionResponse } from "@/types";
import SwitchAccount from "../spendings/SwitchAccountModal";
import FilterCategory from "./FilterCategoryModal";

export default function TransactionsFooter({
  transactions,
}: {
  transactions: TransactionResponse[];
}) {
  const { filterType, dateInSeconds, setPeriod, setDateInSeconds } =
    useFilterStore();

  const handleNext = () => {
    const currentDate = new Date(dateInSeconds * 1000);
    const nextDateInSeconds = getNextDateInSeconds(currentDate, filterType, 1);

    setDateInSeconds(nextDateInSeconds);
    setPeriod(filterType, nextDateInSeconds);
  };

  const handlePrev = () => {
    const currentDate = new Date(dateInSeconds * 1000);
    const prevDateInSeconds = getNextDateInSeconds(currentDate, filterType, -1);

    setDateInSeconds(prevDateInSeconds);
    setPeriod(filterType, prevDateInSeconds);
  };

  return (
    <Flex backgroundColor="#44403c" width="100%" py={4} justify="space-around">
      <Flex cursor="pointer" gap={6}>
        <Icon
          onClick={handlePrev}
          color="#f59e0b"
          as={FaArrowLeft}
          w={6}
          h={6}
        />
        <Icon
          onClick={handleNext}
          as={FaArrowRight}
          color="#f59e0b"
          w={6}
          h={6}
        />
      </Flex>
      <Flex gap={6} cursor="pointer">
        <ExportModal transactions={transactions} />
        <FilterCategory />
        <SwitchAccount iconColor="#f59e0b" />
      </Flex>
    </Flex>
  );
}

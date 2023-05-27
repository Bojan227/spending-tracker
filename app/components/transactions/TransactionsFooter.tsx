"use client";
import { getNextDateInSeconds } from "@/utils/getNextDateInSeconds";
import { useFilterStore } from "@/store/filter-store";
import { Flex, Icon } from "@chakra-ui/react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFileExport,
  FaFilter,
  FaUser,
} from "react-icons/fa";
export default function TransactionsFooter() {
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
        <Icon as={FaFileExport} color="#f59e0b" w={6} h={6} />
        <Icon as={FaFilter} color="#f59e0b" w={6} h={6} />
        <Icon as={FaUser} color="#f59e0b" w={6} h={6} />
      </Flex>
    </Flex>
  );
}

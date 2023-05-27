"use client";
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

    if (filterType === "weekly") {
      const nextWeekStartDate = new Date(currentDate);
      nextWeekStartDate.setDate(currentDate.getDate() + 7);

      const nextWeekStartInSeconds =
        new Date(nextWeekStartDate).getTime() / 1000;

      setDateInSeconds(nextWeekStartInSeconds);
      setPeriod(filterType, nextWeekStartInSeconds);
    } else if (filterType === "daily") {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + 1);

      const nextDayInSeconds = new Date(nextDay).getTime() / 1000;
      setDateInSeconds(nextDayInSeconds);
      setPeriod(filterType, nextDayInSeconds);
    } else if (filterType === "monthly") {
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(currentDate.getMonth() + 1);

      const nextMonthInSeconds = new Date(nextMonth).getTime() / 1000;
      setDateInSeconds(nextMonthInSeconds);
      setPeriod(filterType, nextMonthInSeconds);
    } else if (filterType === "yearly") {
      const nextYear = new Date(currentDate);
      nextYear.setFullYear(currentDate.getFullYear() + 1);

      const nextYearInSeconds = new Date(nextYear).getTime() / 1000;
      setDateInSeconds(nextYearInSeconds);
      setPeriod(filterType, nextYearInSeconds);
    }
  };

  return (
    <Flex backgroundColor="#44403c" width="100%" py={4} justify="space-around">
      <Flex cursor="pointer" gap={6}>
        <Icon color="#f59e0b" as={FaArrowLeft} w={6} h={6} />
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

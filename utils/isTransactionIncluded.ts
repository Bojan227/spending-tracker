import { TransactionResponse } from "@/types";
import {
  endOfWeek,
  isSameDay,
  isSameMonth,
  isSameYear,
  isWithinInterval,
  startOfWeek,
} from "date-fns";

export function isTransactionIncluded(
  transaction: TransactionResponse,
  filterType: string,
  currentDate: Date
) {
  const transactionDate = new Date(transaction.date.seconds * 1000);

  switch (filterType) {
    case "monthly":
      return isSameMonth(currentDate, transactionDate);
    case "daily":
      return isSameDay(currentDate, transactionDate);
    case "weekly":
      const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
      const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
      return isWithinInterval(transactionDate, {
        start: startOfCurrentWeek,
        end: endOfCurrentWeek,
      });
    case "yearly":
      return isSameYear(currentDate, transactionDate);
    default:
      return false;
  }
}

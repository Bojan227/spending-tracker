import { create } from "zustand";
import { UserType } from "@/types";
import { format, startOfWeek, addDays } from "date-fns";
import getYear from "date-fns/getYear";

const currentDate = new Date();
const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });

const generateCurrentWeek = () => {
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const formattedDate = format(addDays(startOfCurrentWeek, i), "dd MMM");
    weekDates.push(formattedDate);
  }

  const formattedWeek = `${weekDates[0]}-${weekDates[6]} ${format(
    new Date(),
    "yyyy"
  )}`;

  return formattedWeek;
};

type FilterStore = {
  currentPeriod: string;
  setPeriod: (period: "monthly" | "daily" | "weekly" | "yearly") => void;
};

function getPeriod(period: "monthly" | "daily" | "weekly" | "yearly") {
  switch (period.toLocaleLowerCase()) {
    case "monthly":
      return format(new Date(), "MMMM");
    case "yearly":
      return format(currentDate, "yyyy");
    case "daily":
      return format(new Date(), "iii, d LLL");
    case "weekly":
      return generateCurrentWeek();
  }
}

export const useFilterStore = create<FilterStore>((set) => ({
  currentPeriod: format(new Date(), "MMMM"),
  setPeriod: (period) =>
    set((state) => ({ ...state, currentPeriod: getPeriod(period) })),
}));

import { create } from "zustand";
import { format, startOfWeek, addDays } from "date-fns";

const currentDate = new Date();

const generateCurrentWeek = (seconds: number) => {
  const startOfCurrentWeek = startOfWeek(new Date(seconds * 1000), {
    weekStartsOn: 1,
  });
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
  filterType: "monthly" | "daily" | "weekly" | "yearly";
  dateInSeconds: number;
  setPeriod: (
    period: "monthly" | "daily" | "weekly" | "yearly",
    seconds: number
  ) => void;
  setDateInSeconds: (seconds: number) => void;
};

function getPeriod(
  period: "monthly" | "daily" | "weekly" | "yearly",
  seconds: number
) {
  switch (period) {
    case "monthly":
      return format(new Date(seconds * 1000), "MMMM");
    case "yearly":
      return format(new Date(seconds * 1000), "yyyy");
    case "daily":
      return format(new Date(seconds * 1000), "iii, d LLL");
    case "weekly":
      return generateCurrentWeek(seconds);
  }
}

export const useFilterStore = create<FilterStore>((set) => ({
  currentPeriod: format(new Date(), "MMMM"),
  filterType: "monthly",
  dateInSeconds: new Date().getTime() / 1000,
  setDateInSeconds: (seconds) =>
    set((state) => ({ ...state, dateInSeconds: seconds })),
  setPeriod: (period, seconds) =>
    set((state) => ({
      ...state,
      currentPeriod: getPeriod(period, seconds),
      filterType: period,
    })),
}));

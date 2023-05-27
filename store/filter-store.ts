import { create } from "zustand";
import { format } from "date-fns";
import { getPeriod } from "@/utils/getPeriod";

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

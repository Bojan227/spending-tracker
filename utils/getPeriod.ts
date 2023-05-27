import { format } from "date-fns";
import { generateWeek } from "./generateWeek";

export function getPeriod(
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
      return generateWeek(seconds);
  }
}

import { addDays, format, startOfWeek } from "date-fns";

export const generateWeek = (seconds: number) => {
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

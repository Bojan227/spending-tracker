export const getNextDateInSeconds = (
  currentDate: Date,
  filterType: string,
  increment: number
) => {
  const nextDate = new Date(currentDate);

  if (filterType === "weekly") {
    nextDate.setDate(currentDate.getDate() + increment * 7);
  } else if (filterType === "daily") {
    nextDate.setDate(currentDate.getDate() + increment);
  } else if (filterType === "monthly") {
    nextDate.setMonth(currentDate.getMonth() + increment);
  } else if (filterType === "yearly") {
    nextDate.setFullYear(currentDate.getFullYear() + increment);
  }

  return new Date(nextDate).getTime() / 1000;
};

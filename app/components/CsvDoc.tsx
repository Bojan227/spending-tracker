import { Category, TransactionResponse } from "@/types";
import { format } from "date-fns";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Category", key: "category" },
  { label: "Price", key: "price" },
  { label: "Period", key: "period" },
  { label: "Note", key: "note" },
];

export default function CsvDoc({
  transactions,
  currentPeriod,
  categories,
}: {
  transactions: TransactionResponse[];
  currentPeriod: string;
  categories: Category[];
}) {
  const groupData = transactions.map((transaction) => {
    const category = categories.find(
      (category) => category.id === transaction.categoryId
    );

    return {
      category: category?.name,
      price: `$${transaction.amount}`,
      period: format(new Date(transaction.date.seconds * 1000), "dd-MMM-yyyy"),
      note: transaction.note,
    };
  });

  console.log(groupData);

  return (
    <CSVLink
      data={groupData}
      headers={headers}
      filename={`expenses-overview-${currentPeriod}.csv`}
    >
      CSV
    </CSVLink>
  );
}

"use client";

import { Category, TransactionResponse } from "@/types";
import { format } from "date-fns";
import { Td, Tr } from "@chakra-ui/react";

export default function TableContent({
  transactions,
  categories,
}: {
  transactions: TransactionResponse[];
  categories: Category[];
}) {
  return (
    <>
      {transactions
        ? transactions.map((transaction, i) => (
            <Tr key={transaction.id}>
              <Td>{categories[i]?.name}</Td>
              <Td>${transaction.amount}</Td>
              <Td>
                {" "}
                {format(
                  new Date(transaction.date.seconds * 1000),
                  "d/LLL/yyyy"
                )}
              </Td>
              <Td>{transaction.note}</Td>
            </Tr>
          ))
        : null}
    </>
  );
}

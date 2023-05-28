"use client";

import { Category, TransactionResponse } from "@/types";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import { getCategoryById } from "@/hooks/useGetCategoryById";

const styles = StyleSheet.create({
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 12,
    color: "whitesmoke",
  },
});

export default function TableContent({
  transactions,
}: {
  transactions: TransactionResponse[];
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      const categoires = await Promise.all(
        transactions?.map(({ categoryId }) => {
          return getCategoryById(categoryId);
        })
      );

      setCategories(categoires);
    }

    if (transactions) {
      getCategories();
    }
  }, [transactions]);

  return (
    <>
      {transactions
        ? transactions.map((transaction, i) => (
            <View key={transaction.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{categories[i]?.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text
                  style={{
                    ...styles.tableCell,
                    color:
                      transaction.transactionType === "expense"
                        ? "red"
                        : "green",
                    fontSize: 15,
                  }}
                >
                  ${transaction.amount}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {format(
                    new Date(transaction.date.seconds * 1000),
                    "d/LLL/yyyy"
                  )}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{transaction.note}</Text>
              </View>
            </View>
          ))
        : null}
    </>
  );
}

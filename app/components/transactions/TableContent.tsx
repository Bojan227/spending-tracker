"use client";

import { Category, TransactionResponse } from "@/types";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import useGetCategoryById, {
  getCategoryById,
} from "@/hooks/useGetCategoryById";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,

    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
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
    fontSize: 10,
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
                <Text style={styles.tableCell}>{transaction.amount}</Text>
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

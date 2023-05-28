import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

import { TransactionResponse } from "@/types";
import TableHeader from "./transactions/TableHeader";
import TableContent from "./transactions/TableContent";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#44403c",
    padding: 10,
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
    color: "#f59e0b",
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
});

// Create Document Component
export const PdfDoc = ({
  transactions,
  currentPeriod,
}: {
  transactions: TransactionResponse[];
  currentPeriod: string;
}) => {
  return (
    <Document title="Transactions Overview">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Transactions Overview</Text>
          <Text>Period: {currentPeriod}</Text>
        </View>
        <View style={styles.table}>
          <TableHeader />
          <TableContent transactions={transactions} />
        </View>
      </Page>
    </Document>
  );
};

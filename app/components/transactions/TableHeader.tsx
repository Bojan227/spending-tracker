import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

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
    fontSize: 10,
  },
});

export default function TableHeader() {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>Category</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>Price</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>Period</Text>
      </View>
      <View style={styles.tableCol}>
        <Text style={styles.tableCell}>Note</Text>
      </View>
    </View>
  );
}

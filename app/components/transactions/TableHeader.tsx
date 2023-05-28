import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    backgroundColor: "skyblue",
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

import { Category, TransactionResponse } from "@/types";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

export default function ReportTable({
  transactions,
  categories,
}: {
  transactions: TransactionResponse[];
  categories: Category[];
}) {
  return (
    <TableContainer w="100%">
      <Table color="white">
        <TableHeader />
        <Tbody>
          <TableContent {...{ transactions, categories }} />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

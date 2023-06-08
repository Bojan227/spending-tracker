import { TransactionResponse } from "@/types";
import { Table, TableContainer, Tbody } from "@chakra-ui/react";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

export default function ReportTable({
  transactions,
}: {
  transactions: TransactionResponse[];
}) {
  return (
    <TableContainer w="100%">
      <Table color="white">
        <TableHeader />
        <Tbody>
          <TableContent {...{ transactions }} />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

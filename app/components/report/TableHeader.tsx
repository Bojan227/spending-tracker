import { Thead, Tr, Th } from "@chakra-ui/react";

export default function TableHeader() {
  return (
    <Thead>
      <Tr textColor="white">
        <Th>Category</Th>
        <Th>Price</Th>
        <Th>Period</Th>
        <Th>Note</Th>
      </Tr>
    </Thead>
  );
}

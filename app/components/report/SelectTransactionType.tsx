import { Flex, Icon } from "@chakra-ui/react";
import { SetStateAction } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function SelectTransactionType({
  transactionType,
  setTransactionType,
}: {
  transactionType: string;
  setTransactionType: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <Flex
      alignSelf="flex-start"
      border="1px solid whitesmoke"
      borderRadius={5}
      cursor="pointer"
    >
      <Icon
        backgroundColor={transactionType === "expense" ? "teal.500" : "inherit"}
        onClick={() => setTransactionType("expense")}
        color="whitesmoke"
        as={FaMinus}
        w={6}
        h={6}
        padding={2}
      />
      <Icon
        backgroundColor={transactionType === "income" ? "teal.500" : "inherit"}
        onClick={() => setTransactionType("income")}
        color="whitesmoke"
        as={FaPlus}
        w={6}
        h={6}
        padding={2}
      />
    </Flex>
  );
}

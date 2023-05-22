import {
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus } from "react-icons/fa";
import CategoryField from "../categories/CategoryField";

import useGetUsers from "@/hooks/useGetUsers";
import { useUserStore } from "@/store";
import useGetCategories from "@/hooks/useGetCategories";
import useAddTransaction from "@/hooks/useAddTransaction";

export default function AddTranstaction({
  transaction,
  isSpendingsScreen,
}: {
  transaction: boolean;
  isSpendingsScreen?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState(new Date());
  let [note, setNote] = useState("");
  const [currentTransaction, setTransaction] = useState(transaction);
  const [categoryId, setCategoryId] = useState("");
  const [accountId, setAccountId] = useState("");

  console.log(categoryId);

  const { isLoading, isError, error, data: users } = useGetUsers();
  const { currentUser } = useUserStore();

  const {
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
    data: categories,
  } = useGetCategories(
    currentUser?.id!,
    currentTransaction ? "expense" : "income"
  );

  const { addMutation } = useAddTransaction();

  return (
    <>
      {isSpendingsScreen ? (
        <Text onClick={onOpen} cursor="pointer" px={2} border="1px solid white">
          + {transaction ? "Expense" : "Income"}
        </Text>
      ) : (
        <Icon
          onClick={onOpen}
          cursor="pointer"
          as={FaPlus}
          w={8}
          h={8}
          color="#f59e0b"
        />
      )}
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#44403c" color="white">
          <ModalHeader>Add Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flex="1" justify="center">
              <CategoryField
                {...{ currentTransaction, setTransaction, label: "EXPENSE" }}
              />
              <CategoryField
                currentTransaction={!currentTransaction}
                {...{ setTransaction, label: "INCOME" }}
              />
            </Flex>

            <Flex
              width="100%"
              direction="column"
              mt={2}
              align="center"
              justify="center"
              gap={2}
            >
              <Text> Select Date</Text>
              <DatePicker
                className="date-picker"
                selected={date}
                onChange={(date) => setDate(date!)}
              />
            </Flex>

            <Flex
              width="100%"
              mt={4}
              align="center"
              justify="space-around"
              gap={4}
            >
              <Text>Category</Text>
              <Select
                width="50%"
                variant="flushed"
                placeholder="Not Selected"
                size="md"
                color="black"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Flex>

            <Flex
              width="100%"
              mt={2}
              align="center"
              justify="space-around"
              gap={4}
            >
              <Text>Amount</Text>
              <Input
                color="black"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                size="sm"
                w="50%"
                type="number"
              />
            </Flex>

            <Flex
              width="100%"
              mt={2}
              align="center"
              justify="space-around"
              gap={4}
            >
              <Text>Account</Text>
              <Select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                color="black"
                width="50%"
                variant="flushed"
                placeholder="Not Selected"
                size="md"
              >
                {users?.map(({ id, userName }) => (
                  <option key={id} value={id}>
                    {userName}
                  </option>
                ))}
              </Select>
            </Flex>

            <Textarea
              mt={2}
              value={note}
              onChange={(e) => setNote(e.target.value!)}
              placeholder="No Note Entered"
              size="sm"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() =>
                addMutation.mutate({
                  categoryId,
                  accountId,
                  note,
                  date,
                  amount,
                  transactionType: currentTransaction ? "expense" : "income",
                })
              }
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button colorScheme="orange" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

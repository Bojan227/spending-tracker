import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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

export default function AddTranstaction({
  transaction,
  isSpendingsScreen,
}: {
  transaction: boolean;
  isSpendingsScreen?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  let [note, setNote] = React.useState("");
  const [currentTransaction, setTransaction] = useState(transaction);

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
              >
                <option value="option1">Fuel</option>
                <option value="option2">General</option>
                <option value="option3">Kids</option>
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
                onChange={(e) => setAmount(parseInt(e.target.value))}
                placeholder="Name"
                size="sm"
                w="50%"
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
                color="white"
                width="50%"
                variant="flushed"
                placeholder="Bojan"
                size="md"
              >
                <option value="option1">Bojan</option>
                <option value="option2">Personal</option>
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
            <Button colorScheme="blue" mr={3}>
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

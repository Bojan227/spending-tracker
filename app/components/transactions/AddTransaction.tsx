import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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
} from "@chakra-ui/react";

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddTranstaction({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const initialRef = React.useRef(null);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  let [note, setNote] = React.useState("");

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="#44403c" color="white">
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody justifyItems="center">
          <Flex alignItems="center" justify="space-between" gap={4}>
            <Text>Select Date</Text>
            <DatePicker
              className="date-picker"
              selected={date}
              onChange={(date) => setDate(date!)}
            />
          </Flex>

          <Flex mt={2} alignItems="center" gap={4}>
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

          <Flex mt={2} alignItems="center" gap={4}>
            <Text>Amount</Text>
            <Input
              color="white"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              placeholder="Name"
              size="sm"
              w="50%"
            />
          </Flex>

          <Flex mt={2} alignItems="center" gap={4}>
            <Text>Account</Text>
            <Select
              color="black"
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
  );
}

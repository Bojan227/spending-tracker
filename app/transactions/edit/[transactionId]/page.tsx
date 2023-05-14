"use client";

import CategoryField from "@/app/components/categories/CategoryField";
import { Flex, Text, Input, Button, Select, Textarea } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";

export default function EditTransaction() {
  const pathname = usePathname();
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [currentTransaction, setTransaction] = useState(true);
  const [amount, setAmount] = useState(20);

  return (
    <Flex
      direction="column"
      align="center"
      width="100%"
      minH="100vh"
      padding="6rem"
      gap={4}
      color="whiteAlpha.700"
    >
      <Flex justify="center">
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

      <Flex width="100%" mt={4} align="center" justify="space-around" gap={4}>
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

      <Flex width="100%" mt={2} align="center" justify="space-around" gap={4}>
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

      <Flex width="100%" mt={2} align="center" justify="space-around" gap={4}>
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
        width="50%"
        color="white"
      />
      <Button backgroundColor="#f59e0b" color="white">
        Edit
      </Button>
    </Flex>
  );
}

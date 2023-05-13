"use client";

import { Flex, Text, Input, Button, Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditUser() {
  const pathname = usePathname();

  const [date, setDate] = useState(new Date());

  console.log(date);

  console.log(pathname.split("/")[3]);
  return (
    <Flex
      direction="column"
      align="center"
      width="100%"
      minH="100vh"
      p={2}
      gap={4}
    >
      <Text>Transaction Details</Text>

      <Box>
        <Text>Select Date</Text>
        <DatePicker
          className="date-picker"
          selected={date}
          onChange={(date) => setDate(date!)}
        />
      </Box>

      <Input placeholder="Name" size="md" w="25%" />

      <Button backgroundColor="#f59e0b" color="white">
        Confirm Changes
      </Button>
    </Flex>
  );
}

"use client";

import { Flex, Text, Input, Button, Box, Icon } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "@chakra-ui/react";
import AddTranstaction from "../components/transactions/AddTransaction";
import { FaPlus } from "react-icons/fa";

export default function EditUser() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Flex
      direction="column"
      align="center"
      width="100%"
      minH="100vh"
      padding="6rem"
      gap={4}
    >
      <Icon
        onClick={() => setIsOpen(true)}
        cursor="pointer"
        as={FaPlus}
        w={8}
        h={8}
        color="#f59e0b"
      />

      <AddTranstaction {...{ onClose, isOpen, currentCategory: "expense" }} />
      <Text p={12} border="1px solid  #fca5a5" borderRadius={8} color="#fca5a5">
        Press the '+' icon to add your first transaction
      </Text>
    </Flex>
  );
}

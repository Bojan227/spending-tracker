"use client";
import { Flex, Icon } from "@chakra-ui/react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaFileExport,
  FaFilter,
  FaUser,
} from "react-icons/fa";
export default function TransactionsFooter() {
  return (
    <Flex backgroundColor="#44403c" width="100%" py={4} justify="space-around">
      <Flex cursor="pointer" gap={6}>
        <Icon color="#f59e0b" as={FaArrowLeft} w={6} h={6} />
        <Icon as={FaArrowRight} color="#f59e0b" w={6} h={6} />
      </Flex>
      <Flex gap={6} cursor="pointer">
        <Icon as={FaFileExport} color="#f59e0b" w={6} h={6} />
        <Icon as={FaFilter} color="#f59e0b" w={6} h={6} />
        <Icon as={FaUser} color="#f59e0b" w={6} h={6} />
      </Flex>
    </Flex>
  );
}

"use client";

import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  CardFooter,
  Button,
  Icon,
  Flex,
} from "@chakra-ui/react";

import Link from "next/link";

import { IconType } from "react-icons/lib";

export default function TransactionCard({
  categoryName,
  date,
  amount,
  Icon,
}: {
  categoryName: string;
  amount: number;
  date: string;
  Icon: IconType;
}) {
  return (
    <Link href={`/transactions/edit/${1}`} style={{ width: "65%" }}>
      <Card
        align="center"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        px={4}
        backgroundColor="#44403c"
        color="#f1f5f9"
        cursor="pointer"
      >
        <Icon />
        <Flex direction="column" flex={1}>
          <CardBody>
            <Text py="2">{categoryName}</Text>
            <Text py="2">{date}</Text>
          </CardBody>
        </Flex>
        <Text fontSize="1.5rem" color="red">
          ${amount}
        </Text>
      </Card>
    </Link>
  );
}

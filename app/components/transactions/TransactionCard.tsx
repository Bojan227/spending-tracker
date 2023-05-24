"use client";

import format from "date-fns/format";
import { Card, CardBody, Text, Flex } from "@chakra-ui/react";

import Link from "next/link";

import { IconType } from "react-icons/lib";
import useGetCategoryById from "@/hooks/useGetCategoryById";

export default function TransactionCard({
  categoryId,
  date,
  amount,
  Icon,
  transactionId,
  transactionType,
}: {
  categoryId: string;
  amount: number;
  date: number;
  transactionId: string;
  Icon: IconType;
  transactionType: string;
}) {
  const {
    isLoading,
    isError,
    error,
    data: category,
  } = useGetCategoryById(categoryId);

  return (
    <Link
      prefetch={false}
      href={`/transactions/edit/${transactionId}`}
      style={{ width: "65%" }}
    >
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
            {category && <Text py="2">{category.name}</Text>}
            <Text py="2">{format(new Date(date * 1000), "EEEE/do-MMM")}</Text>
          </CardBody>
        </Flex>
        <Text
          fontSize="1.5rem"
          color={transactionType === "expense" ? "red" : "green"}
        >
          ${amount}
        </Text>
      </Card>
    </Link>
  );
}

"use client";

import { Card, CardBody, Stack, Text, Icon } from "@chakra-ui/react";

import Link from "next/link";

import { FaUser } from "react-icons/fa";

export default function AccountCard({
  id,
  userName,
  color,
}: {
  userName: string;
  color: string;
  id: string;
}) {
  return (
    <Link
      prefetch={false}
      href={`/accounts/edit/${id}`}
      style={{ width: "50%" }}
    >
      <Card
        align="center"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        p={2}
        backgroundColor="#44403c"
        color="#f1f5f9"
        cursor="pointer"
      >
        <Icon as={FaUser} w={6} h={6} color={color} />
        <Stack>
          <CardBody>
            <Text py="2">{userName}</Text>
          </CardBody>
        </Stack>
      </Card>
    </Link>
  );
}

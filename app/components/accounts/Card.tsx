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
} from "@chakra-ui/react";

import Link from "next/link";

import { FaUser } from "react-icons/fa";

export default function AccountCard({
  userName,
  color,
}: {
  userName: string;
  color: string;
}) {
  return (
    <Link href={`/accounts/edit/${1}`} style={{ width: "50%" }}>
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

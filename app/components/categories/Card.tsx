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

import { IconType } from "react-icons/lib";

export default function CategoryCard({
  label,
  chartColor,
  Icon,
  categoryId,
}: {
  label: string;
  chartColor: string;
  categoryId: string;
  Icon: IconType;
}) {
  return (
    <Link href={`/categories/edit/${categoryId}`} style={{ width: "50%" }}>
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
        <Icon />
        <Stack>
          <CardBody>
            <Text py="2">{label}</Text>
          </CardBody>
        </Stack>
      </Card>
    </Link>
  );
}

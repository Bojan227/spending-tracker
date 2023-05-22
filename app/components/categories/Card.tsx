"use client";

import { Card, CardBody, Stack, Text, Icon } from "@chakra-ui/react";

import useDeleteCategory from "@/hooks/useDeleteCategory";
import Link from "next/link";

import { IconType } from "react-icons/lib";
import { FaTrash } from "react-icons/fa";

export default function CategoryCard({
  label,
  chartColor,
  categoryId,
}: {
  label: string;
  chartColor: string;
  categoryId: string;
}) {
  const { deleteMutation } = useDeleteCategory();

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
        <Stack flex="1">
          <CardBody>
            <Text py="2">{label}</Text>
          </CardBody>
        </Stack>
        <Icon
          as={FaTrash}
          onClick={(e) => {
            e.preventDefault();
            deleteMutation.mutate(categoryId);
          }}
          w={6}
          h={6}
          color="red.400"
        />
      </Card>
    </Link>
  );
}

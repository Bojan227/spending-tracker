"use client";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import CategoryField from "../components/categories/CategoryField";

export default function Categories() {
  const [currentCategory, setCategory] = useState(true);

  return (
    <Container>
      <Flex justify="center" align="center" p={4}>
        <CategoryField
          {...{ currentCategory, setCategory, label: "EXPENSE" }}
        />
        <CategoryField
          currentCategory={!currentCategory}
          {...{ setCategory, label: "INCOME" }}
        />
      </Flex>
    </Container>
  );
}

"use client";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import CategoryField from "../components/categories/CategoryField";
import CategoryCard from "../components/categories/Card";

import { FaUser } from "react-icons/fa";
import AddCategory from "../components/categories/AddCategoryModal";

export default function Categories() {
  const [currentTransaction, setTransaction] = useState(true);

  return (
    <Container minH="100vh">
      <Flex justify="center" align="center" p={4}>
        <Flex flex="1">
          <CategoryField
            {...{ currentTransaction, setTransaction, label: "EXPENSE" }}
          />
          <CategoryField
            currentTransaction={!currentTransaction}
            {...{ setTransaction, label: "INCOME" }}
          />
        </Flex>
        <AddCategory
          {...{
            currentTransaction: currentTransaction ? "expense" : "income",
          }}
        />
      </Flex>
      <CategoryCard label="Fuel" chartColor="blue" Icon={FaUser} />
    </Container>
  );
}

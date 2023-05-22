"use client";
import { Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import CategoryField from "../components/categories/CategoryField";
import CategoryCard from "../components/categories/Card";

import { FaUser } from "react-icons/fa";
import AddCategory from "../components/categories/AddCategoryModal";
import useGetCategories from "@/hooks/useGetCategories";
import { useUserStore } from "@/store";

export default function Categories() {
  const [currentTransaction, setTransaction] = useState(true);
  const { currentUser } = useUserStore();

  const {
    isLoading,
    isError,
    error,
    data: categories,
  } = useGetCategories(
    currentUser?.id!,
    currentTransaction ? "expense" : "income"
  );

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
      {isLoading ? (
        <Spinner size="md" />
      ) : (
        categories?.map(({ id, chartColor, name, type, userId }) => (
          <CategoryCard
            key={id}
            categoryId={id}
            label={name}
            chartColor={chartColor}
          />
        ))
      )}
      {isError && <Text>{error instanceof Error && error.message}</Text>}
    </Container>
  );
}

"use client";
import { Box, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import CategoryField from "../components/categories/CategoryField";
import CategoryCard from "../components/categories/Card";

import AddCategory from "../components/categories/AddCategoryModal";
import useGetCategories from "@/hooks/useGetCategories";
import { useAccountStore } from "@/store/account-store";

export default function Categories() {
  const [currentTransaction, setTransaction] = useState(true);
  const { currentAccount } = useAccountStore();

  const {
    isLoading,
    isError,
    error,
    data: categories,
  } = useGetCategories(
    currentAccount?.id!,
    currentTransaction ? "expense" : "income"
  );

  return (
    <Container minH="100vh" overflow="hidden">
      <Flex
        justify="center"
        align="center"
        p={4}
        gap={6}
        direction={{ base: "column", sm: "row" }}
      >
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
      <Box
        width="100%"
        justifyItems="center"
        alignItems="center"
        flexDirection="column"
        maxHeight="550px"
        overflowY="auto"
        scrollBehavior="smooth"
        mt={6}
        p={4}
      >
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
      </Box>
      {isError && <Text>{error instanceof Error && error.message}</Text>}
    </Container>
  );
}

"use client";

import useGetCategories from "@/hooks/useGetCategories";
import { useAccountStore } from "@/store/account-store";
import { Flex, Select, Text } from "@chakra-ui/react";

export default function CategoriesSelect({
  categoryId,
  setCategoryId,
  currentTransaction,
}: {
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  currentTransaction: boolean;
}) {
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
    <Flex width="100%" mt={4} align="center" justify="space-around" gap={4}>
      <Text>Category</Text>
      <Select
        width="50%"
        variant="flushed"
        placeholder="Not Selected"
        size="md"
        color="black"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Flex>
  );
}

"use client";
import { Container, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import CategoryField from "../components/categories/CategoryField";
import CategoryCard from "../components/categories/Card";

import { Icon } from "@chakra-ui/react";

import { FaUser, FaPlus } from "react-icons/fa";
import AddCategory from "../components/categories/AddCategoryModal";

export default function Categories() {
  const [currentCategory, setCategory] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Container minH="100vh">
      <Flex justify="center" align="center" p={4}>
        <Flex flex="1">
          <CategoryField
            {...{ currentCategory, setCategory, label: "EXPENSE" }}
          />
          <CategoryField
            currentCategory={!currentCategory}
            {...{ setCategory, label: "INCOME" }}
          />
        </Flex>
        <Icon
          onClick={() => setIsOpen(true)}
          cursor="pointer"
          as={FaPlus}
          w={8}
          h={8}
          color="#f59e0b"
        />
      </Flex>
      <CategoryCard label="Fuel" chartColor="blue" Icon={FaUser} />
      <AddCategory
        {...{
          isOpen,
          onClose,
          currentCategory: currentCategory ? "expense" : "income",
        }}
      />
    </Container>
  );
}

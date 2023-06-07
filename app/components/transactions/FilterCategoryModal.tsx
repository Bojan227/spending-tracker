import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import { FaFilter } from "react-icons/fa";
import useGetCategories from "@/hooks/useGetCategories";
import { useFilterStore } from "@/store/filter-store";
import { useAccountStore } from "@/store/account-store";

export default function FilterCategory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const { currentAccount } = useAccountStore();
  const { categoryFilter, setCategoryFilter } = useFilterStore();

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetCategories(currentAccount?.id!, "all");

  console.log(categoryFilter);

  return (
    <>
      <Icon onClick={onOpen} as={FaFilter} color="#f59e0b" w={6} h={6} />
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#44403c" color="white">
          <ModalHeader>Category Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup
              onChange={setCategoryFilter}
              value={categoryFilter}
              onClick={onClose}
            >
              <Stack direction="column">
                <Radio value="all">All Categories</Radio>
                {categories?.map((category) => (
                  <Radio key={category.id} value={category.id}>
                    {category.name}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

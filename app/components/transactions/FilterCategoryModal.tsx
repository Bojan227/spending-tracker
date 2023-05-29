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

import React, { useState } from "react";
import { useUserStore } from "@/store";

import { FaFilter } from "react-icons/fa";
import useGetCategories from "@/hooks/useGetCategories";

export default function FilterCategory({
  handleFilterByCategory,
}: {
  handleFilterByCategory: (value: string) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const [value, setValue] = useState("all");

  const { currentUser } = useUserStore();

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetCategories(currentUser?.id!, "all");

  function handleSelectFilter(value: string) {
    setValue(value);
    handleFilterByCategory(value);
  }

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
          <ModalHeader>Switch Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup
              onClick={onClose}
              onChange={handleSelectFilter}
              value={value}
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

import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";

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

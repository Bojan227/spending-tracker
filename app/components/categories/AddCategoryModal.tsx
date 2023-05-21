import {
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";

import useAddCategory from "@/hooks/useAddCategory";
import { useUserStore } from "@/store";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FaPlus } from "react-icons/fa";

export default function AddCategory({
  currentTransaction,
}: {
  currentTransaction: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [categoryName, setCategoryName] = useState("");
  const [chartColor, setChartColor] = useState("");

  const { addMutation } = useAddCategory();
  const { currentUser } = useUserStore();

  return (
    <>
      <Icon
        onClick={onOpen}
        cursor="pointer"
        as={FaPlus}
        w={8}
        h={8}
        color="#f59e0b"
      />
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#44403c" color="white">
          <ModalHeader>Add new Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyItems="center">
            <FormControl>
              <FormLabel>Category Name</FormLabel>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Chart Color</FormLabel>
              <HexColorPicker onChange={(color) => setChartColor(color)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() =>
                addMutation.mutate({
                  name: categoryName,
                  chartColor,
                  userId: currentUser?.id!,
                  type: currentTransaction,
                })
              }
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button colorScheme="orange" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
          {addMutation.isError &&
            addMutation.error instanceof Error &&
            addMutation.error.message}
        </ModalContent>
      </Modal>
    </>
  );
}

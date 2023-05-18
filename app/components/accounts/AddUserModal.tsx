"use client";

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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FaPlus } from "react-icons/fa";
import useAddUser from "@/app/hooks/useAddUser";

export default function AddUserModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUsername] = useState("");
  const [color, setColor] = useState("#000000");

  const { addMutation } = useAddUser();

  return (
    <>
      <Icon onClick={onOpen} as={FaPlus} w={8} h={8} color="#f59e0b" />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="#44403c" color="white">
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Color</FormLabel>
              <HexColorPicker
                defaultValue="#000000"
                onChange={(color) => setColor(color)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter alignSelf="center">
            <Button
              onClick={() => {
                addMutation.mutate({ userName, color });
                setUsername("");
                setColor("#000000");
              }}
              colorScheme="blue"
              mr={3}
            >
              {addMutation.isLoading ? "Loading..." : "Save"}
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => {
                onClose();
                setUsername("");
                setColor("#000000");
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
          {addMutation.isError && (
            <Text textAlign="center" py={2}>
              {addMutation.error instanceof Error && addMutation.error.message}
            </Text>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

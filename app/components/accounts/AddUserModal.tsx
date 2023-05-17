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
import { useAddUser } from "@/app/hooks/useAddUser";

export default function AddUserModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUsername] = useState("");
  const [color, setColor] = useState("#000000");

  const { addUser, isLoading, error, setError } = useAddUser();

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
                addUser(userName, color);
                setUsername("");
                setColor("#000000");
              }}
              colorScheme="blue"
              mr={3}
            >
              {isLoading ? "Loading..." : "Save"}
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => {
                onClose();
                setError("");
                setUsername("");
                setColor("#000000");
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
          {error && (
            <Text textAlign="center" py={2}>
              {error}
            </Text>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

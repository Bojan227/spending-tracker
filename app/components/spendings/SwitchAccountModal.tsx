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

import { FaUser } from "react-icons/fa";

export default function SwitchAccount() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [value, setValue] = useState("");

  return (
    <>
      <Icon onClick={onOpen} as={FaUser} color="skyblue" cursor="pointer" />
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
            <RadioGroup onClick={onClose} onChange={setValue} value={value}>
              <Stack direction="column">
                <Radio value="all">All accounts</Radio>
                <Radio value="Bojan">Bojan</Radio>
                <Radio value="Personal">Personal</Radio>
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

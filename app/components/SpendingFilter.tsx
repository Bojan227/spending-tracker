import {
  Button,
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
import { useState } from "react";

export default function SpendingFilter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("Monthly");

  return (
    <>
      <Button
        backgroundColor="inherit"
        border="1px solid #f59e0b"
        color="#f59e0b"
        onClick={onOpen}
      >
        {value}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="#44403c" color="white">
          <ModalHeader>Show Spending</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="column">
                <Radio value="Daily">Daily</Radio>
                <Radio value="Weekly">Weekly</Radio>
                <Radio value="Monthly">Monthly</Radio>
                <Radio value="Yearly">Yearly</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              backgroundColor="inherit"
              border="1px solid #f59e0b"
              color="#f59e0b"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

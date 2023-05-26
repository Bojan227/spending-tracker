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
import { useFilterStore } from "@/store/filter-store";

export default function SpendingFilter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setDateInSeconds, currentPeriod, setPeriod } = useFilterStore();
  const [value, setValue] = useState("Monthly");

  return (
    <>
      <Button
        backgroundColor="inherit"
        border="1px solid #f59e0b"
        color="#f59e0b"
        onClick={onOpen}
      >
        {currentPeriod}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="#44403c" color="white">
          <ModalHeader>Show Spending</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup
              onChange={(text) => {
                setValue(text);
                setPeriod(
                  text as "monthly" | "daily" | "weekly" | "yearly",
                  new Date().getTime() / 1000
                );
                setDateInSeconds(new Date().getTime() / 1000);
                onClose();
              }}
              value={value}
            >
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

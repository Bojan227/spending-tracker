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

import React, { useEffect, useState } from "react";
import useGetUsers from "@/hooks/useGetUsers";

import { FaUser } from "react-icons/fa";
import { useAccountStore } from "@/store/account-store";

export default function SwitchAccount({ iconColor }: { iconColor: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  const { currentAccount, switchAccount } = useAccountStore();
  const { data: users, isLoading, isError, error } = useGetUsers();

  const [value, setValue] = useState("");

  useEffect(() => {
    if (currentAccount?.id) {
      setValue(currentAccount.id);
    }
  }, [currentAccount?.id]);

  const handleSwitch = (value: string) => {
    const user = users?.find((user) => user.id === value);
    switchAccount(user);
    setValue(user?.id!);
  };

  return (
    <>
      <Icon
        onClick={onOpen}
        as={FaUser}
        color={iconColor}
        cursor="pointer"
        w={6}
        h={6}
      />
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
            <RadioGroup onClick={onClose} onChange={handleSwitch} value={value}>
              <Stack direction="column">
                {users?.map((user) => (
                  <Radio key={user.id} value={user.id}>
                    {user.userName}
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

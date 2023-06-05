"use client";

import { Card, CardBody, Stack, Text, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { Checkbox } from "@chakra-ui/react";
import { FaUser, FaTrash } from "react-icons/fa";
import useDeleteUser from "@/hooks/useDeleteUser";
import { UserType } from "@/types";
import { useAccountStore } from "@/store/account-store";

export default function AccountCard({ id, userName, color }: UserType) {
  const { currentAccount, switchAccount } = useAccountStore();
  const { deleteUserMutation } = useDeleteUser();

  return (
    <Link
      prefetch={false}
      href={`/accounts/edit/${id}`}
      style={{ width: "50%" }}
    >
      <Card
        align="center"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        p={2}
        backgroundColor="#44403c"
        color="#f1f5f9"
        cursor="pointer"
      >
        <Icon as={FaUser} w={6} h={6} color={color} />
        <Stack flex={1}>
          <CardBody>
            <Text py="2">{userName}</Text>
          </CardBody>
        </Stack>
        <Stack
          onClick={(e) => e.stopPropagation()}
          cursor="pointer"
          align="center"
          gap="25px"
        >
          <Checkbox
            onChange={() => switchAccount({ id, userName, color })}
            size="md"
            colorScheme="green"
            isChecked={currentAccount?.id === id}
          ></Checkbox>
          <Icon
            as={FaTrash}
            onClick={(e) => {
              e.preventDefault();
              deleteUserMutation.mutate(id!);
              currentAccount?.id === id && switchAccount(undefined);
            }}
            w={6}
            h={6}
            color="red.400"
          />
        </Stack>
      </Card>
    </Link>
  );
}

"use client";

import { Card, CardBody, Stack, Text, Icon, Flex } from "@chakra-ui/react";
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
      style={{ width: "100%" }}
    >
      <Card
        align="center"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        alignSelf="center"
        p={2}
        mt={4}
        backgroundColor="#44403c"
        color="#f1f5f9"
        cursor="pointer"
        w={["100%", "100%", "75%", "35%"]}
        mx="auto"
      >
        <Flex align="center" justify="flex-start">
          <Icon as={FaUser} w={6} h={6} color={color} />
          <Stack flex={1}>
            <CardBody>
              <Text py="2">{userName}</Text>
            </CardBody>
          </Stack>
        </Flex>
        <Flex
          onClick={(e) => e.stopPropagation()}
          cursor="pointer"
          align="center"
          gap="25px"
          justify={{ base: "space-between", sm: "flex-end" }}
          width="100%"
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
        </Flex>
      </Card>
    </Link>
  );
}

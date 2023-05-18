"use client";

import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Spinner } from "@chakra-ui/react";
import useEditUserInfo from "@/hooks/editUser";
import useGetUserById from "@/hooks/getUserById";

export default function EditUser() {
  const pathname = usePathname();

  const { editMutation } = useEditUserInfo();

  const { isLoading, isError, data, error } = useGetUserById(
    pathname.split("/")[3]
  );

  const [color, setColor] = useState("");
  const [userName, setUsername] = useState("");

  useEffect(() => {
    if (data) {
      setColor(data.color);
      setUsername(data.userName);
    }
  }, [data?.color]);

  if (isLoading)
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />;

  return (
    <Flex
      direction="column"
      align="center"
      width="100%"
      minH="100vh"
      p={2}
      gap={4}
      color="whiteAlpha.700"
    >
      <Text>Account Details</Text>
      <Input
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Name"
        size="md"
        w="25%"
      />
      <Flex direction="column" align="center" justify="space-between" gap={4}>
        <Text>Color</Text>
        <HexColorPicker
          defaultValue={color}
          color={color}
          onChange={setColor}
        />
      </Flex>
      <Button
        onClick={() => {
          if (!userName || !color) return;
          editMutation.mutate({ id: pathname.split("/")[3], userName, color });
        }}
        backgroundColor="#f59e0b"
        color="white"
      >
        {editMutation.isLoading ? "Loading..." : "Confirm Changes"}
      </Button>
      {isError && <Text>{error as string}</Text>}
    </Flex>
  );
}

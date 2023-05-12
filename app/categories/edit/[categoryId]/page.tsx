"use client";

import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function EditCategory() {
  const pathname = usePathname();
  const [color, setColor] = useState("#aabbcc");

  console.log(pathname.split("/")[3]);
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
      <Text>Category Details</Text>
      <Input placeholder="Category Name" size="md" w="25%" />
      <Flex direction="column" align="center" justify="space-between" gap={4}>
        <Text>Chart Color</Text>
        <HexColorPicker color={color} onChange={setColor} />
      </Flex>
      <Button backgroundColor="#f59e0b" color="white">
        Confirm Changes
      </Button>
    </Flex>
  );
}

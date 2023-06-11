"use client";

import { Flex } from "@chakra-ui/react";
import SpendingFilter from "./SpendingFilter";
import SwitchAccount from "./spendings/SwitchAccountModal";

export default function FilterBox() {
  return (
    <Flex
      align="center"
      pb={6}
      justify="space-between"
      w={["100%", "85%", "55%", "35%"]}
    >
      <SpendingFilter />
      <SwitchAccount iconColor="skyblue" />
    </Flex>
  );
}

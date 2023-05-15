"use client";
import { Box, Flex, Progress, Stack, Text, Icon } from "@chakra-ui/react";
import InfoBox from "./components/spendings/InfoBox";
import SpendingFilter from "./components/SpendingFilter";
import SwitchAccount from "./components/spendings/SwitchAccountModal";
import AddTranstaction from "./components/transactions/AddTransaction";

export default function Home() {
  return (
    <Flex
      fontSize="1.5rem"
      minHeight="100vh"
      align="center"
      padding="6rem"
      direction="column"
      fontFamily="EraserDust"
    >
      <Flex align="center" pb={6} justify="space-around" w="50%">
        <SpendingFilter />
        <SwitchAccount />
      </Flex>
      <Box w="50%">
        <Progress
          colorScheme="green"
          size="lg"
          value={80}
          backgroundColor="red"
          isAnimated
          borderRadius={4}
          border="1px solid white"
          mb={4}
        />
        <InfoBox label="Income" value={0} color="green" />
      </Box>
      <Box w="50%" borderBottom="1px dashed white">
        <InfoBox label="Expense" value={0} color="red" />
        <Flex py={4} pl={6} fontSize="1.2rem">
          <InfoBox width="100%" label="Entertaiment" value={0} color="white" />
        </Flex>
      </Box>
      <InfoBox flex={1} width="50%" label="Balance" value={0} color="skyblue" />
      <Flex color="white" justify="center" pb={6} gap={10} w="50%">
        <AddTranstaction transaction={true} isSpendingsScreen={true} />
        <AddTranstaction transaction={false} isSpendingsScreen={true} />
      </Flex>
    </Flex>
  );
}

"use client";

import { Text } from "@chakra-ui/react";
import { SetStateAction } from "react";

export default function CategoryField({
  currentTransaction,
  setTransaction,
  label,
}: {
  currentTransaction: boolean;
  setTransaction: React.Dispatch<SetStateAction<boolean>>;
  label: string;
}) {
  return (
    <Text
      backgroundColor={currentTransaction ? "#f1f5f9" : ""}
      cursor="pointer"
      color={currentTransaction ? "#475569" : "#f1f5f9"}
      p={2}
      px={6}
      border="1px solid #f1f5f9"
      onClick={() => setTransaction((prevState) => !prevState)}
    >
      {label}
    </Text>
  );
}

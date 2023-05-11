"use client";

import { Text } from "@chakra-ui/react";
import { SetStateAction } from "react";

export default function CategoryField({
  currentCategory,
  setCategory,
  label,
}: {
  currentCategory: boolean;
  setCategory: React.Dispatch<SetStateAction<boolean>>;
  label: string;
}) {
  return (
    <Text
      backgroundColor={currentCategory ? "#f1f5f9" : ""}
      cursor="pointer"
      color={currentCategory ? "#475569" : "#f1f5f9"}
      p={2}
      px={6}
      border="1px solid #f1f5f9"
      onClick={() => setCategory((prevState) => !prevState)}
    >
      {label}
    </Text>
  );
}

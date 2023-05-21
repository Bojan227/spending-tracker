"use client";

import { Flex, Text, Input, Button } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import useEditCategory from "@/hooks/useEditCategory";

export default function EditCategory() {
  const pathname = usePathname();

  const { editMutation } = useEditCategory();
  const { isError, data, error } = useGetCategoryById(pathname.split("/")[3]);

  const [chartColor, setChartColor] = useState("#aabbcc");
  const [name, setName] = useState("");

  useEffect(() => {
    if (data) {
      setChartColor(data.chartColor);
      setName(data.name);
    }
  }, [data?.chartColor]);

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
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        size="md"
        w="25%"
      />
      <Flex direction="column" align="center" justify="space-between" gap={4}>
        <Text>Chart Color</Text>
        <HexColorPicker color={chartColor} onChange={setChartColor} />
      </Flex>
      <Button
        onClick={() =>
          editMutation.mutate({ id: pathname.split("/")[3], name, chartColor })
        }
        backgroundColor="#f59e0b"
        color="white"
      >
        {editMutation.isLoading ? "Loading..." : "Confirm Changes"}
      </Button>
      {isError && error instanceof Error && <Text>{error.message}</Text>}
      {editMutation.isError && editMutation.error instanceof Error && (
        <Text>{editMutation.error.message}</Text>
      )}
    </Flex>
  );
}

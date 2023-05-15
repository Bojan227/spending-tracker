import { Flex, Text } from "@chakra-ui/react";

export default function InfoBox({
  color,
  value,
  label,
  width,
  flex,
}: {
  color: string;
  value: number;
  label: string;
  width?: string;
  flex?: number;
}) {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Flex flex={flex} w={width} justify="space-between">
      <Text color="white">{label}</Text>
      <Text color={color}>{USDollar.format(value)}</Text>
    </Flex>
  );
}

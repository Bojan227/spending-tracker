import { Flex, Text } from "@chakra-ui/react";

export default function InfoBox({
  color,
  value,
  label,
  width,
}: {
  color: string;
  value: number;
  label: string;
  width?: string;
}) {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Flex w={width} justify="space-between">
      <Text color="white">{label}</Text>
      <Text color={color}>{USDollar.format(value)}</Text>
    </Flex>
  );
}

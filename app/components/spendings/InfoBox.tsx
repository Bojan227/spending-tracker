import useGetTotal from "@/hooks/useGetTotal";
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
  const total = useGetTotal();

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const isZero = Math.abs(total.expense - total.income) === 0 ? true : false;
  const isNegative = total.income - total.expense < 0 ? true : false;

  return (
    <Flex flex={flex} w={width} justify="space-between">
      <Text color="white">{label}</Text>
      <Text color={color}>
        {label === "Balance" && (isZero ? null : isNegative ? "-" : "+")}
        {USDollar.format(value)}
      </Text>
    </Flex>
  );
}

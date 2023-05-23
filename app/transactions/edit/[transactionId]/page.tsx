"use client";

import CategoryField from "@/app/components/categories/CategoryField";
import { Flex, Text, Input, Button, Select, Textarea } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import useGetTransactionById from "@/hooks/useGetTransactionById";
import CategoriesSelect from "@/app/components/transactions/CategoriesSelect";
import "react-datepicker/dist/react-datepicker.css";
import UsersSelect from "@/app/components/transactions/Users";
import useEditTransaction from "@/hooks/useEditTransaction";

export default function EditTransaction() {
  const pathname = usePathname();
  const [categoryId, setCategoryId] = useState("");
  const [accountId, setAccountId] = useState("");

  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [currentTransaction, setTransaction] = useState(true);
  const [amount, setAmount] = useState("");

  const {
    isLoading,
    isError,
    error,
    data: transaction,
  } = useGetTransactionById(pathname.split("/")[3]);

  const { editMutation } = useEditTransaction();

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount);
      setTransaction(transaction.transactionType === "expense" ? true : false);
      setDate(new Date(transaction.date.seconds * 1000));
      setNote(transaction.note);
      setCategoryId(transaction.categoryId);
      setAccountId(transaction.accountId);
    }
  }, [transaction?.amount]);

  return (
    <Flex
      direction="column"
      align="center"
      width="100%"
      minH="100vh"
      padding="6rem"
      paddingInline="14rem"
      gap={4}
      color="whiteAlpha.700"
    >
      <Flex justify="center">
        <CategoryField
          {...{ currentTransaction, setTransaction, label: "EXPENSE" }}
        />
        <CategoryField
          currentTransaction={!currentTransaction}
          {...{ setTransaction, label: "INCOME" }}
        />
      </Flex>

      <Flex
        width="100%"
        direction="column"
        mt={2}
        align="center"
        justify="center"
        gap={2}
      >
        <Text> Select Date</Text>
        <DatePicker
          className="date-picker"
          selected={date}
          onChange={(date) => setDate(date!)}
        />
      </Flex>

      <CategoriesSelect
        {...{ categoryId, setCategoryId, currentTransaction }}
      />

      <Flex width="100%" mt={2} align="center" justify="space-around" gap={4}>
        <Text>Amount</Text>
        <Input
          color="white"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Name"
          size="sm"
          w="50%"
        />
      </Flex>

      <UsersSelect {...{ accountId, setAccountId }} />

      <Textarea
        mt={2}
        value={note}
        onChange={(e) => setNote(e.target.value!)}
        placeholder="No Note Entered"
        size="sm"
        width="50%"
        color="white"
      />
      <Button
        onClick={() =>
          editMutation.mutate({
            id: pathname.split("/")[3],
            note,
            amount,
            categoryId,
            accountId,
            transactionType: currentTransaction ? "expense" : "income",
            date,
          })
        }
        backgroundColor="#f59e0b"
        color="white"
      >
        {editMutation.isLoading ? "Loading...." : "Edit"}
      </Button>
      {editMutation.isError && editMutation.error instanceof Error && (
        <Text>{editMutation.error.message}</Text>
      )}
    </Flex>
  );
}

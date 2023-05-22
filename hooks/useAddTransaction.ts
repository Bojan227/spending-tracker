import { db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../app/constants/queryClient";
import { Transaction } from "@/types";

const addTransaction = async (newTransaction: Omit<Transaction, "id">) => {
  if (
    !newTransaction.categoryId ||
    !newTransaction.amount ||
    !newTransaction.date ||
    !newTransaction.accountId ||
    !newTransaction.transactionType
  )
    throw new Error("All Fields must be filled");

  await addDoc(collection(db, "transactions"), newTransaction);
};

export default function useAddTransaction() {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (newTransaction: Omit<Transaction, "id">) => {
      return addTransaction(newTransaction);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        title: "Transaction added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return { addMutation: mutation };
}

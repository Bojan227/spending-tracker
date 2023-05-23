import { db } from "@/app/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { queryClient } from "../app/constants/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Transaction, UserType } from "@/types";

export const editTransaction = async (
  transactionId: string,
  updatedData: Omit<Transaction, "id">
) => {
  const userRef = doc(db, "transactions", transactionId);

  try {
    await updateDoc(userRef, updatedData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default function useEditTransaction() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (transaction: Transaction) => {
      return editTransaction(transaction.id, transaction);
    },
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["transactions", variables.id],
      });
      router.back();
    },
  });

  return { editMutation: mutation };
}

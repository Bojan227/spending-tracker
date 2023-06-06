import { db } from "@/app/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { queryClient } from "../app/constants/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UserType } from "@/types";

export const editUserById = async (
  accountId: string,
  updatedData: Omit<UserType, "id">
) => {
  const userRef = doc(db, "accounts", accountId);

  try {
    await updateDoc(userRef, updatedData);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default function useEditUserInfo() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (account: UserType) => {
      return editUserById(account.id!, {
        userName: account.userName,
        color: account.color,
      });
    },
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["accounts", variables.id],
      });
      router.back();
    },
  });

  return { editMutation: mutation };
}

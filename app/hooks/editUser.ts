import { db } from "@/app/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { queryClient } from "../constants/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const editUserById = async (
  userId: string,
  updatedData: { userName: string; color: string }
) => {
  const userRef = doc(db, "users", userId);

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
    mutationFn: async (user: {
      id: string;
      userName: string;
      color: string;
    }) => {
      return editUserById(user.id, {
        userName: user.userName,
        color: user.color,
      });
    },
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
      router.back();
    },
  });

  return { editMutation: mutation };
}

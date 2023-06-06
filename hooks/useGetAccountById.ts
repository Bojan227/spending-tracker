import { db } from "@/app/firebase";
import { UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";

export const getAccountById = async (accountId: string) => {
  const userRef = doc(db, "accounts", accountId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return { ...userDoc.data(), id: userDoc.id } as UserType;
  } else {
    throw new Error("Transaction not found");
  }
};

export default function useGetAccountById(accountId: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["accounts", accountId],
    queryFn: async () => getAccountById(accountId),
    enabled: Boolean(accountId),
  });

  return { isLoading, isError, error, data };
}

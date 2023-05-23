import { db } from "@/app/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";

const getTransactionById = async (transactionId: string) => {
  const userRef = doc(db, "transactions", transactionId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("Transaction not found");
  }
};

export default function useGetTransactionById(transactionId: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["transactions", transactionId],
    queryFn: async () => getTransactionById(transactionId),
    enabled: Boolean(transactionId),
  });

  return { isLoading, isError, error, data };
}

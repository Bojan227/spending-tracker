import { db } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import { getDoc, doc } from "firebase/firestore";

const getUserById = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error("User not found");
  }
};

export default function useGetUserById(userId: string) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => getUserById(userId),
    enabled: Boolean(userId),
  });

  return { isLoading, isError, error, data };
}

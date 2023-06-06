import { db } from "@/app/firebase";
import { useUserStore } from "@/store/user-store";
import { UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

const getAccounts = async (userId: string) => {
  const collectionRef = collection(db, "accounts");

  const querySnapshot = await getDocs(
    query(collectionRef, where("userId", "==", userId))
  );
  let accounts: UserType[] = [];

  querySnapshot.forEach((doc) => {
    const account = {
      id: doc.id,
      ...(doc.data() as Omit<UserType, "id">),
    };

    accounts.push(account);
  });

  return accounts as UserType[];
};

export default function useGetAccounts() {
  const { currentUser } = useUserStore();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["accounts", currentUser],
    queryFn: async () => getAccounts(currentUser!),
    enabled: Boolean(currentUser),
  });

  return { isLoading, isError, error, data };
}

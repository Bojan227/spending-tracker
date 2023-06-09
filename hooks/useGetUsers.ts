import { db } from "@/app/firebase";
import { UserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

async function getUsers() {
  const collectionRef = collection(db, "users");
  const querySnapshot = await getDocs(collectionRef);

  const users = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return users as UserType[];
}

export default function useGetUsers() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => getUsers(),
  });

  return { isLoading, isError, error, data };
}

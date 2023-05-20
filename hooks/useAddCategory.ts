import { db } from "@/app/firebase";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../app/constants/queryClient";
import { Category } from "@/types";

const addCategory = async (newCategory: Category) => {
  console.log(newCategory);

  if (
    !newCategory.name ||
    !newCategory.chartColor ||
    !newCategory.userId ||
    !newCategory.type
  )
    throw new Error("All Fields must be filled");

  const querySnapshot = await getDocs(
    query(collection(db, "categories"), where("name", "==", newCategory.name))
  );

  if (!querySnapshot.empty) {
    throw new Error("Category already exists");
  }

  await addDoc(collection(db, "categories"), newCategory);
};

export default function useAddcategory() {
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (newCategory: Category) => {
      return addCategory(newCategory);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({
        title: "Category added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return { addMutation: mutation };
}

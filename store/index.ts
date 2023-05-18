import { create } from "zustand";
import { UserType } from "@/types";

type UserStore = {
  currentUser: UserType | undefined;
  switchUser: (user: UserType) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: undefined,
  switchUser: (user) => set((state) => ({ ...state, currentUser: user })),
}));

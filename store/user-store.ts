import { create } from "zustand";

type UserStore = {
  currentUser: string | undefined;
  switchUser: (userId: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: undefined,
  switchUser: (userId) => set((state) => ({ ...state, currentUser: userId })),
}));

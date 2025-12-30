import { create } from "zustand";
import { persist } from "zustand/middleware";

type UsernameStore = {
  username: string;
  setUsername: (username: string) => void;
  resetUsername: () => void;
};

export const useUsernameStore = create<UsernameStore>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (username) => set({ username }),
      resetUsername: () => set({ username: "" }),
    }),
    { name: "username-storage" }
  )
);

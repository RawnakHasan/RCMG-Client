import { create } from "zustand";

type RoomIdStore = {
  roomId: string;
  setRoomId: (roomId: string) => void;
};

export const useRoomIdStore = create<RoomIdStore>((set) => ({
  roomId: "",
  setRoomId: (roomId: string) => set({ roomId }),
}));

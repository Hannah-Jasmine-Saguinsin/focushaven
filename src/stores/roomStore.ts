import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomState {
  wallColor: string;
  floorColor: string;
  furnitureColor: string;
  chairColor: string;
  lampOn: boolean;

  setWallColor: (color: string) => void;
  setFloorColor: (color: string) => void;
  setFurnitureColor: (color: string) => void;
  setChairColor: (color: string) => void;
  toggleLamp: () => void;
  resetRoom: () => void;
}

const defaults = {
  wallColor: "#f5e8c5",
  floorColor: "#d9ba8c",
  furnitureColor: "#bd9564",
  chairColor: "#625e55",
  lampOn: true,
};

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      ...defaults,

      setWallColor: (color) =>
        set({ wallColor: color }),

      setFloorColor: (color) =>
        set({ floorColor: color }),

      setFurnitureColor: (color) =>
        set({ furnitureColor: color }),

      setChairColor: (color) =>
        set({ chairColor: color }),

      toggleLamp: () =>
        set((state) => ({
          lampOn: !state.lampOn,
        })),

      resetRoom: () => set(defaults),
    }),
    {
      name: "focushaven-room",
    }
  )
);
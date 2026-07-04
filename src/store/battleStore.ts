import { create } from "zustand";

type BattleStore = {
  leadDriver: string;
  chaseDriver: string;

  setLeadDriver: (driver: string) => void;
  setChaseDriver: (driver: string) => void;
};

export const useBattleStore = create<BattleStore>((set) => ({
  leadDriver: "",
  chaseDriver: "",

  setLeadDriver: (driver) =>
    set({
      leadDriver: driver,
    }),

  setChaseDriver: (driver) =>
    set({
      chaseDriver: driver,
    }),
}));
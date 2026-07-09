import { create } from "zustand";
import type { Driver } from "../../modules/drivers/types/Driver";


type BattleStore = {

  leadDriver: Driver | null;

  chaseDriver: Driver | null;


  setLeadDriver:
    (driver: Driver) => void;


  setChaseDriver:
    (driver: Driver) => void;


  clearBattle:
    () => void;

};


export const useBattleStore = create<BattleStore>((set) => ({

  leadDriver: null,

  chaseDriver: null,


  setLeadDriver: (driver) =>
    set({
      leadDriver: driver,
    }),


  setChaseDriver: (driver) =>
    set({
      chaseDriver: driver,
    }),


  clearBattle: () =>
    set({
      leadDriver: null,
      chaseDriver: null,
    }),

}));
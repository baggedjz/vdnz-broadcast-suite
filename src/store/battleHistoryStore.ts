import { create } from "zustand";
import type { Battle } from "./battleQueueStore";
import type { Driver } from "../modules/drivers/types/Driver";


export interface BattleResult {

  id: string;

  battle: Battle;

  winner: Driver;

  completedAt: string;

}



interface BattleHistoryStore {


  history: BattleResult[];


  addResult:
    (
      battle: Battle,
      winner: Driver
    ) => void;


  clearHistory:
    () => void;


}



export const useBattleHistoryStore =
create<BattleHistoryStore>((set) => ({


  history: [],



  addResult: (
    battle,
    winner
  ) =>


    set((state) => ({

      history: [

        {

          id: crypto.randomUUID(),

          battle,

          winner,

          completedAt:
            new Date()
              .toLocaleString(),

        },

        ...state.history,

      ],

    })),




  clearHistory: () =>

    set({

      history: [],

    }),


}));
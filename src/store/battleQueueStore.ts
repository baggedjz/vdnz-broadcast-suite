import { create } from "zustand";
import type { Driver } from "../modules/drivers/types/Driver";


export interface Battle {

  id: string;

  round: string;

  leadDriver: Driver;

  chaseDriver: Driver;

  status:
    | "READY"
    | "LIVE"
    | "COMPLETE";


  winner?: Driver;

}



interface BattleQueueStore {

  battles: Battle[];

  currentBattle: Battle | null;


  loadBattle:
    (battle: Battle) => void;


  completeBattle:
    (winner: Driver) => void;


  nextBattle:
    () => void;


  addBattle:
    (battle: Battle) => void;


}



export const useBattleQueueStore =
create<BattleQueueStore>((set) => ({


  battles: [],


  currentBattle: null,



  loadBattle: (battle) =>
    set({
      currentBattle: {
        ...battle,
        status: "LIVE",
      },
    }),




  completeBattle: (winner) =>
    set((state) => ({

      currentBattle: state.currentBattle
        ? {
            ...state.currentBattle,
            status: "COMPLETE",
            winner,
          }
        : null

    })),




  nextBattle: () =>
    set((state) => {


      const next =
        state.battles.find(
          (battle) =>
            battle.status === "READY"
        );


      return {

        currentBattle:
          next ?? null,

        battles:
          state.battles.filter(
            (battle) =>
              battle.id !== next?.id
          )

      };


    }),





  addBattle: (battle) =>
    set((state) => ({

      battles: [
        ...state.battles,
        battle,
      ]

    }))


}));
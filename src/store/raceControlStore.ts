import { create } from "zustand";


export type RaceStatus =
  | "READY"
  | "LIVE"
  | "FINISHED";


interface RaceControlStore {

  status: RaceStatus;

  timer: number;

  winner: "LEAD" | "CHASE" | null;


  startBattle: () => void;

  finishBattle: () => void;

  setWinner: (
    winner: "LEAD" | "CHASE"
  ) => void;

  resetBattle: () => void;

}



export const useRaceControlStore =
create<RaceControlStore>((set) => ({

  status: "READY",

  timer: 0,

  winner: null,


  startBattle: () =>
    set({
      status: "LIVE",
      timer: 0,
      winner: null,
    }),



  finishBattle: () =>
    set({
      status: "FINISHED",
    }),



  setWinner: (winner) =>
    set({
      winner,
    }),



  resetBattle: () =>
    set({
      status: "READY",
      timer: 0,
      winner: null,
    }),


}));
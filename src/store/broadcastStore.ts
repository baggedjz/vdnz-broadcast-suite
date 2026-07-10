import { create } from "zustand";


export type GraphicType =
  | "NONE"
  | "VS"
  | "LOWER_THIRD"
  | "WINNER"
  | "STANDINGS"
  | "REPLAY";


interface BroadcastStore {


  activeGraphic: GraphicType;

  driverOne: string;

  driverTwo: string;

  winner: string;


  showGraphic:
    (graphic: GraphicType) => void;


  setDrivers:
    (
      driverOne: string,
      driverTwo: string
    ) => void;


  setWinner:
    (winner: string) => void;


  clearGraphic:
    () => void;

}



export const useBroadcastStore =
create<BroadcastStore>((set) => ({


  activeGraphic: "NONE",

  driverOne: "",

  driverTwo: "",

  winner: "",



  showGraphic: (graphic) =>
    set({
      activeGraphic: graphic,
    }),



  setDrivers: (
    driverOne,
    driverTwo
  ) =>
    set({
      driverOne,
      driverTwo,
    }),



  setWinner: (winner) =>
    set({
      winner,
    }),



  clearGraphic: () =>
    set({
      activeGraphic: "NONE",
    }),


}));
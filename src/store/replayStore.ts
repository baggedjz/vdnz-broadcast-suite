import { create } from "zustand";


export type ReplayType =
  | "BATTLE_START"
  | "HIGHLIGHT"
  | "REPLAY"
  | "WINNER";


export interface ReplayMarker {

  id: string;

  type: ReplayType;

  timestamp: string;

  description: string;

}



interface ReplayStore {


  markers: ReplayMarker[];


  addMarker:
    (
      type: ReplayType,
      description: string
    ) => void;


  clearMarkers:
    () => void;


}



export const useReplayStore =
create<ReplayStore>((set) => ({


  markers: [],



  addMarker:
    (
      type,
      description
    ) =>

      set((state) => ({

        markers: [

          {

            id:
              crypto.randomUUID(),

            type,

            timestamp:
              new Date()
              .toLocaleTimeString(),

            description,

          },

          ...state.markers,

        ],

      })),




  clearMarkers: () =>
    set({

      markers: [],

    }),


}));
import { create } from "zustand";


export type TelemetryAlert =
  | "NONE"
  | "TANDEM_LOCKED"
  | "HIGH_PRESSURE"
  | "REPLAY";


interface TelemetryBroadcastStore {

  alert: TelemetryAlert;

  setAlert:
    (alert: TelemetryAlert) => void;

  clearAlert:
    () => void;

}



export const useTelemetryBroadcastStore =
create<TelemetryBroadcastStore>((set) => ({

  alert: "NONE",


  setAlert: (alert) =>
    set({
      alert,
    }),



  clearAlert: () =>
    set({
      alert: "NONE",
    }),


}));
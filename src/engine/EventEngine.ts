import { create } from "zustand";
import type { EventState } from "./EventTypes";

interface Engine extends EventState {
  setEvent: (event: EventState) => void;

  nextBattle: () => void;

  startBattle: () => void;

  finishBattle: () => void;
}

export const useEventEngine = create<Engine>((set) => ({
  eventName: "Winter Drift Series",

  stage: "Top 32",

  currentBattle: 0,

  battles: [],

  setEvent: (event) => set(event),

  nextBattle: () =>
    set((state) => ({
      currentBattle: state.currentBattle + 1,
    })),

  startBattle: () =>
    set((state) => ({
      battles: state.battles.map((battle, index) =>
        index === state.currentBattle
          ? {
              ...battle,
              status: "live",
            }
          : battle
      ),
    })),

  finishBattle: () =>
    set((state) => ({
      battles: state.battles.map((battle, index) =>
        index === state.currentBattle
          ? {
              ...battle,
              status: "finished",
            }
          : battle
      ),
    })),
}));
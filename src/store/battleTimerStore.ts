import { create } from "zustand";

type BattleTimerStore = {
  seconds: number;
  running: boolean;

  start: () => void;
  stop: () => void;
  reset: () => void;
  tick: () => void;
};

export const useBattleTimerStore = create<BattleTimerStore>((set) => ({
  seconds: 0,
  running: false,

  start: () =>
    set({
      running: true,
    }),

  stop: () =>
    set({
      running: false,
    }),

  reset: () =>
    set({
      seconds: 0,
      running: false,
    }),

  tick: () =>
    set((state) => ({
      seconds: state.seconds + 1,
    })),
}));
import { create } from "zustand";
import type { Competition, CompetitionStage } from "../types/Competition";
import type { Battle } from "../types/Battle";

type CompetitionStore = {
  competition: Competition;
  battleQueue: Battle[];

  setStage: (stage: CompetitionStage) => void;
  setCurrentBattle: (battle: number) => void;
  setTotalBattles: (total: number) => void;
  setCurrentRun: (run: number) => void;
  setJudgesReady: (ready: boolean) => void;

  addBattle: (battle: Battle) => void;
  nextBattle: () => void;
  setBattleLive: (id: string) => void;
};

export const useCompetitionStore = create<CompetitionStore>((set) => ({
  competition: {
    stage: "Top32",
    currentBattle: 1,
    totalBattles: 16,
    currentRun: 1,
    judgesReady: false,
  },

  battleQueue: [
    {
      id: "1",
      leadDriverId: "1",
      chaseDriverId: "2",
      leadDriverName: "Dylan Whareaitu",
      chaseDriverName: "Matt Howell",
      leadCar: "Nissan Silvia S14",
      chaseCar: "Mazda RX-7",
      status: "Live",
    },
    {
      id: "2",
      leadDriverId: "3",
      chaseDriverId: "4",
      leadDriverName: "Josh Smith",
      chaseDriverName: "Ben Taylor",
      leadCar: "Toyota JZX100",
      chaseCar: "Nissan 350Z",
      status: "Queued",
    },
    {
      id: "3",
      leadDriverId: "5",
      chaseDriverId: "6",
      leadDriverName: "Luke Brown",
      chaseDriverName: "Tyler Jones",
      leadCar: "BMW E46",
      chaseCar: "Nissan S15",
      status: "Queued",
    },
  ],

  setStage: (stage) =>
    set((state) => ({
      competition: {
        ...state.competition,
        stage,
      },
    })),

  setCurrentBattle: (currentBattle) =>
    set((state) => ({
      competition: {
        ...state.competition,
        currentBattle,
      },
    })),

  setTotalBattles: (totalBattles) =>
    set((state) => ({
      competition: {
        ...state.competition,
        totalBattles,
      },
    })),

  setCurrentRun: (currentRun) =>
    set((state) => ({
      competition: {
        ...state.competition,
        currentRun,
      },
    })),

  setJudgesReady: (judgesReady) =>
    set((state) => ({
      competition: {
        ...state.competition,
        judgesReady,
      },
    })),

  addBattle: (battle) =>
    set((state) => ({
      battleQueue: [...state.battleQueue, battle],
    })),

  nextBattle: () =>
    set((state) => ({
      competition: {
        ...state.competition,
        currentBattle: state.competition.currentBattle + 1,
      },
    })),

  setBattleLive: (id) =>
    set((state) => ({
      battleQueue: state.battleQueue.map((battle) => ({
        ...battle,
        status: battle.id === id ? "Live" : "Queued",
      })),
    })),
}));
import { create } from "zustand";
import type { Event } from "../types/Event";

type EventStore = {
  currentEvent: Event;
  updateEvent: (event: Partial<Event>) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  currentEvent: {
    id: crypto.randomUUID(),
    name: "",
    series: "",
    round: 1,
    venue: "",
    date: "",
    format: "Top32",
    judges: ["", "", ""],
    sponsors: [],
    replayEnabled: true,
    obsSceneCollection: "",
  },

  updateEvent: (event) =>
    set((state) => ({
      currentEvent: {
        ...state.currentEvent,
        ...event,
      },
    })),
}));
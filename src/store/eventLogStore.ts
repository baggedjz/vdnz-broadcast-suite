import { create } from "zustand";

export type EventType =
  | "OBS"
  | "Broadcast"
  | "Competition"
  | "Judge"
  | "Replay"
  | "System";

export interface EventLogItem {
  id: string;
  time: string;
  type: EventType;
  message: string;
}

type EventLogStore = {
  events: EventLogItem[];

  addEvent: (type: EventType, message: string) => void;

  clear: () => void;
};

export const useEventLogStore = create<EventLogStore>((set) => ({
  events: [],

  addEvent: (type, message) =>
    set((state) => ({
      events: [
        {
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString(),
          type,
          message,
        },
        ...state.events,
      ],
    })),

  clear: () =>
    set({
      events: [],
    }),
}));
import { create } from "zustand";

export type EventLogEntry = {
  id: string;
  time: string;
  message: string;
};

type EventStore = {
  logs: EventLogEntry[];
  addLog: (message: string) => void;
  clearLogs: () => void;
};

export const useEventStore = create<EventStore>((set) => ({
  logs: [],

  addLog: (message) =>
    set((state) => ({
      logs: [
        {
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString(),
          message,
        },
        ...state.logs,
      ],
    })),

  clearLogs: () => set({ logs: [] }),
}));
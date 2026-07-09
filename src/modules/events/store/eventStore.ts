import { create } from "zustand";
import type { Event } from "../types/Event";


interface EventStore {

  events: Event[];

  activeEvent: Event | null;


  createEvent:
    (event: Event) => void;


  setActiveEvent:
    (event: Event) => void;


  clearActiveEvent:
    () => void;

}


export const useEventStore = create<EventStore>((set) => ({

  events: [],

  activeEvent: null,


  createEvent: (event) =>
    set((state) => ({
      events: [
        ...state.events,
        event,
      ],
    })),


  setActiveEvent: (event) =>
    set({
      activeEvent: event,
    }),


  clearActiveEvent: () =>
    set({
      activeEvent: null,
    }),

}));
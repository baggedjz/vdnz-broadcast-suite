import { create } from "zustand";

import type {
  HealthStatus,
  TimelineEvent,
} from "./types";

interface DashboardStore {
  systems: HealthStatus[];
  timeline: TimelineEvent[];
}

export const useDashboardStore =
create<DashboardStore>(() => ({
  systems: [
    { name: "OBS", connected: true },
    { name: "SQLite", connected: false },
    { name: "Assetto", connected: false },
    { name: "Discord", connected: false },
  ],

  timeline: [
    {
      id: "1",
      time: "12:41:03",
      message: "Race Control Ready",
      level: "success",
    },
  ],
}));
import { create } from "zustand";

export type ConnectionStatus =
  | "CONNECTED"
  | "CONNECTING"
  | "DISCONNECTED";

interface AppStore {
  appVersion: string;
  currentEvent: string;
  currentUser: string;

  obsStatus: ConnectionStatus;
  assettoStatus: ConnectionStatus;
  databaseStatus: ConnectionStatus;
  discordStatus: ConnectionStatus;

  setCurrentEvent: (event: string) => void;
  setCurrentUser: (user: string) => void;

  setOBSStatus: (status: ConnectionStatus) => void;
  setAssettoStatus: (status: ConnectionStatus) => void;
  setDatabaseStatus: (status: ConnectionStatus) => void;
  setDiscordStatus: (status: ConnectionStatus) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  appVersion: "1.0.0-alpha",

  currentEvent: "No Event Loaded",
  currentUser: "Operator",

  obsStatus: "DISCONNECTED",
  assettoStatus: "DISCONNECTED",
  databaseStatus: "CONNECTED",
  discordStatus: "DISCONNECTED",

  setCurrentEvent: (currentEvent) => set({ currentEvent }),
  setCurrentUser: (currentUser) => set({ currentUser }),

  setOBSStatus: (obsStatus) => set({ obsStatus }),
  setAssettoStatus: (assettoStatus) => set({ assettoStatus }),
  setDatabaseStatus: (databaseStatus) => set({ databaseStatus }),
  setDiscordStatus: (discordStatus) => set({ discordStatus }),
}));
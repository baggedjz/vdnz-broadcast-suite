import { create } from "zustand";
import type { OBSScene } from "../types/OBS";

import {
  connectOBS,
  disconnectOBS,
  getCurrentScene,
  getProgramScreenshot,
  getScenes,
  isConnected,
  setScene,
} from "../services/obs";

type OBSStore = {
  connected: boolean;
  currentScene: string;
  recording: boolean;
  streaming: boolean;
  preview: string | null;
  scenes: OBSScene[];

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refresh: () => Promise<void>;
  loadScenes: () => Promise<void>;
  changeScene: (scene: string) => Promise<void>;

  setConnected: (connected: boolean) => void;
  setCurrentScene: (scene: string) => void;
  setRecording: (active: boolean) => void;
  setStreaming: (active: boolean) => void;
  setPreview: (image: string | null) => void;
  setScenes: (scenes: OBSScene[]) => void;
};

export const useOBSStore = create<OBSStore>((set) => ({
  connected: false,
  currentScene: "",
  recording: false,
  streaming: false,
  preview: null,
  scenes: [],

  connect: async () => {
    const ok = await connectOBS();

    if (!ok) return;

    const scene = await getCurrentScene();
    const scenes = await getScenes();
    const preview = await getProgramScreenshot();

    set({
      connected: isConnected(),
      currentScene: scene ?? "",
      scenes,
      preview,
    });
  },

  disconnect: async () => {
    await disconnectOBS();

    set({
      connected: false,
      currentScene: "",
      preview: null,
      scenes: [],
    });
  },

  refresh: async () => {
    if (!isConnected()) return;

    const scene = await getCurrentScene();
    const preview = await getProgramScreenshot();

    set({
      connected: true,
      currentScene: scene ?? "",
      preview,
    });
  },

  loadScenes: async () => {
    if (!isConnected()) return;

    const scenes = await getScenes();

    set({ scenes });
  },

  changeScene: async (scene: string) => {
    await setScene(scene);

    set({
      currentScene: scene,
    });
  },

  setConnected: (connected) => set({ connected }),
  setCurrentScene: (currentScene) => set({ currentScene }),
  setRecording: (recording) => set({ recording }),
  setStreaming: (streaming) => set({ streaming }),
  setPreview: (preview) => set({ preview }),
  setScenes: (scenes) => set({ scenes }),
}));
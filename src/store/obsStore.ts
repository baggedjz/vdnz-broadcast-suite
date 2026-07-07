import { create } from "zustand";
import {
  connectOBS,
  disconnectOBS,
  getCurrentScene,
  getScenes,
  isConnected,
  setScene,
} from "../services/obs";

type OBSScene = {
  sceneIndex: number;
  sceneName: string;
  sceneUuid: string;
};

type OBSStore = {
  connected: boolean;
  currentScene: string;
  scenes: OBSScene[];

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refresh: () => Promise<void>;
  loadScenes: () => Promise<void>;
  changeScene: (scene: string) => Promise<void>;
};

export const useOBSStore = create<OBSStore>((set) => ({
  connected: false,
  currentScene: "",
  scenes: [],

  connect: async () => {
    const success = await connectOBS();

    if (!success) return;

    const scene = await getCurrentScene();
    const scenes = await getScenes();

    set({
      connected: true,
      currentScene: scene ?? "",
      scenes,
    });
  },

  disconnect: async () => {
    await disconnectOBS();

    set({
      connected: false,
      currentScene: "",
      scenes: [],
    });
  },

  refresh: async () => {
    if (!isConnected()) return;

    const scene = await getCurrentScene();

    set({
      currentScene: scene ?? "",
    });
  },

  loadScenes: async () => {
    if (!isConnected()) return;

    const scenes = await getScenes();

    set({
      scenes,
    });
  },

  changeScene: async (scene: string) => {
    await setScene(scene);

    const currentScene = await getCurrentScene();

    set({
      currentScene: currentScene ?? scene,
    });
  },
}));
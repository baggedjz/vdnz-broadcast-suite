import { create } from "zustand";
import type { OBSScene } from "../types/OBS";

import {
  connectOBS,
  disconnectOBS,
  getCurrentScene,
  getScenes,
  getProgramScreenshot,
  setScene,
  onCurrentSceneChanged,
  onRecordStateChanged,
  onStreamStateChanged,
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

  updatePreview: () => Promise<void>;


  setConnected: (connected: boolean) => void;

  setCurrentScene: (scene: string) => void;

  setRecording: (active: boolean) => void;

  setStreaming: (active: boolean) => void;

  setPreview: (image: string | null) => void;
};


export const useOBSStore = create<OBSStore>((set) => ({

  connected: false,

  currentScene: "",

  recording: false,

  streaming: false,

  preview: null,

  scenes: [],



  connect: async () => {
    const success = await connectOBS();


    if (!success) {
      set({
        connected: false,
      });

      return;
    }


    const currentScene = await getCurrentScene();

    const scenes = await getScenes();

    const preview = await getProgramScreenshot();


    set({
      connected: true,

      currentScene: currentScene ?? "",

      scenes,

      preview,
    });



    // OBS LIVE EVENTS

    onCurrentSceneChanged((sceneName) => {
      set({
        currentScene: sceneName,
      });
    });



    onRecordStateChanged((active) => {
      set({
        recording: active,
      });
    });



    onStreamStateChanged((active) => {
      set({
        streaming: active,
      });
    });
  },



  disconnect: async () => {

    await disconnectOBS();


    set({

      connected: false,

      currentScene: "",

      recording: false,

      streaming: false,

      preview: null,

      scenes: [],

    });

  },



  refresh: async () => {

    const currentScene = await getCurrentScene();

    const scenes = await getScenes();

    const preview = await getProgramScreenshot();



    set({

      currentScene: currentScene ?? "",

      scenes,

      preview,

    });

  },



  loadScenes: async () => {

    const scenes = await getScenes();


    set({

      scenes,

    });

  },



  changeScene: async (scene: string) => {

    await setScene(scene);


    set({

      currentScene: scene,

    });

  },



  updatePreview: async () => {

    const image = await getProgramScreenshot();


    set({

      preview: image,

    });

  },



  setConnected: (connected) =>
    set({
      connected,
    }),



  setCurrentScene: (currentScene) =>
    set({
      currentScene,
    }),



  setRecording: (recording) =>
    set({
      recording,
    }),



  setStreaming: (streaming) =>
    set({
      streaming,
    }),



  setPreview: (preview) =>
    set({
      preview,
    }),


}));
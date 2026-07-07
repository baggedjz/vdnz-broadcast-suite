import OBSWebSocket from "obs-websocket-js";
import type { OBSScene } from "../types/OBS";

const obs = new OBSWebSocket();

let connected = false;

export async function connectOBS(): Promise<boolean> {
  if (connected) return true;

  try {
    await obs.connect(
      "ws://127.0.0.1:4455",
      import.meta.env.VITE_OBS_PASSWORD
    );

    connected = true;
    console.log("✅ Connected to OBS");

    return true;
  } catch (error) {
    console.error("❌ Failed to connect to OBS", error);
    connected = false;
    return false;
  }
}

export async function disconnectOBS() {
  if (!connected) return;

  await obs.disconnect();
  connected = false;
}

export function isConnected() {
  return connected;
}

export async function getCurrentScene(): Promise<string | null> {
  if (!connected) return null;

  const response = await obs.call("GetCurrentProgramScene");
  return response.currentProgramSceneName;
}

export async function getScenes(): Promise<OBSScene[]> {
  if (!connected) return [];

  const response = await obs.call("GetSceneList");
  return response.scenes as OBSScene[];
}

export async function setScene(scene: string) {
  if (!connected) return;

  await obs.call("SetCurrentProgramScene", {
    sceneName: scene,
  });
}

export async function startRecording() {
  if (!connected) return;

  await obs.call("StartRecord");
}

export async function stopRecording() {
  if (!connected) return;

  await obs.call("StopRecord");
}

export async function getProgramScreenshot(): Promise<string | null> {
  if (!connected) return null;

  const scene = await getCurrentScene();

  if (!scene) return null;

  const response = await obs.call("GetSourceScreenshot", {
    sourceName: scene,
    imageFormat: "png",
    imageWidth: 1280,
    imageHeight: 720,
    imageCompressionQuality: 80,
  });

  return response.imageData;
}

/* ---------- Events ---------- */

export function onCurrentSceneChanged(
  callback: (sceneName: string) => void
) {
  obs.on("CurrentProgramSceneChanged", (event) => {
    callback(event.sceneName);
  });
}

export function onRecordStateChanged(
  callback: (active: boolean) => void
) {
  obs.on("RecordStateChanged", (event) => {
    callback(event.outputActive);
  });
}

export function onStreamStateChanged(
  callback: (active: boolean) => void
) {
  obs.on("StreamStateChanged", (event) => {
    callback(event.outputActive);
  });
}

export default obs;
import OBSWebSocket from "obs-websocket-js";
import type { OBSScene } from "../types/OBS";

const obs = new OBSWebSocket();

let connected = false;

export type BattleStage =
  | "top32"
  | "top16"
  | "great8"
  | "final4"
  | "final";

const BATTLE_STAGE_INPUT = "VDNZ Battle Stage";
let battleStageTimer: ReturnType<typeof setTimeout> | null = null;

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

function buildBattleStageUrl(
  stage: BattleStage,
  round: number | string,
  eventName: string,
  seriesName: string
) {
  const url = new URL("/overlay/stage", window.location.origin);

  url.searchParams.set("stage", stage);
  url.searchParams.set("round", String(round));
  url.searchParams.set("event", eventName);
  url.searchParams.set("series", seriesName);
  url.searchParams.set("v", String(Date.now()));

  return url.toString();
}

async function findSceneItemId(
  sceneName: string,
  sourceName: string
): Promise<number | null> {
  try {
    const response = await obs.call("GetSceneItemId", {
      sceneName,
      sourceName,
    });

    return response.sceneItemId;
  } catch {
    return null;
  }
}

async function ensureBattleStageSource(sceneName: string, url: string) {
  const inputList = await obs.call("GetInputList", {
    inputKind: "browser_source",
  });

  const inputExists = inputList.inputs.some(
    (input) => input.inputName === BATTLE_STAGE_INPUT
  );

  let sceneItemId: number | null = null;

  if (!inputExists) {
    const created = await obs.call("CreateInput", {
      sceneName,
      inputName: BATTLE_STAGE_INPUT,
      inputKind: "browser_source",
      inputSettings: {
        url,
        width: 1920,
        height: 1080,
        shutdown: false,
        restart_when_active: false,
        reroute_audio: false,
      },
      sceneItemEnabled: true,
    });

    sceneItemId = created.sceneItemId;
  } else {
    await obs.call("SetInputSettings", {
      inputName: BATTLE_STAGE_INPUT,
      inputSettings: {
        url,
        width: 1920,
        height: 1080,
      },
      overlay: true,
    });

    sceneItemId = await findSceneItemId(sceneName, BATTLE_STAGE_INPUT);

    if (sceneItemId === null) {
      const created = await obs.call("CreateSceneItem", {
        sceneName,
        sourceName: BATTLE_STAGE_INPUT,
        sceneItemEnabled: true,
      });

      sceneItemId = created.sceneItemId;
    }
  }

  await obs.call("SetSceneItemTransform", {
    sceneName,
    sceneItemId,
    sceneItemTransform: {
      positionX: 0,
      positionY: 0,
      scaleX: 1,
      scaleY: 1,
      alignment: 5,
    },
  });

  await obs.call("SetSceneItemEnabled", {
    sceneName,
    sceneItemId,
    sceneItemEnabled: true,
  });

  return sceneItemId;
}

export async function showBattleStage(
  stage: BattleStage,
  options?: {
    round?: number | string;
    eventName?: string;
    seriesName?: string;
    durationMs?: number;
  }
): Promise<boolean> {
  if (!connected) return false;

  const sceneName = await getCurrentScene();
  if (!sceneName) return false;

  const round = options?.round ?? 2;
  const eventName = options?.eventName || "ESDA Barbagallo 2025";
  const seriesName = options?.seriesName || "VDNZ PRO DEVELOPMENT";
  const durationMs = options?.durationMs ?? 5000;

  const url = buildBattleStageUrl(stage, round, eventName, seriesName);

  await ensureBattleStageSource(sceneName, url);

  if (battleStageTimer) {
    clearTimeout(battleStageTimer);
  }

  if (durationMs > 0) {
    battleStageTimer = setTimeout(() => {
      void hideBattleStage(sceneName);
    }, durationMs);
  }

  return true;
}

export async function hideBattleStage(sceneName?: string): Promise<boolean> {
  if (!connected) return false;

  if (battleStageTimer) {
    clearTimeout(battleStageTimer);
    battleStageTimer = null;
  }

  const targetScene = sceneName || (await getCurrentScene());
  if (!targetScene) return false;

  const sceneItemId = await findSceneItemId(targetScene, BATTLE_STAGE_INPUT);
  if (sceneItemId === null) return false;

  await obs.call("SetSceneItemEnabled", {
    sceneName: targetScene,
    sceneItemId,
    sceneItemEnabled: false,
  });

  return true;
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
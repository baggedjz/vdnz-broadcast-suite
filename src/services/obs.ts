import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

let connected = false;

export async function connectOBS() {
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

export async function getCurrentScene() {
  if (!connected) return null;

  const response = await obs.call("GetCurrentProgramScene");
  return response.currentProgramSceneName;
}

export async function getScenes() {
  if (!connected) return [];

  const response = await obs.call("GetSceneList");
  return response.scenes;
}

export async function getRecordStatus() {
  if (!connected) return null;

  return await obs.call("GetRecordStatus");
}

export async function getStreamStatus() {
  if (!connected) return null;

  return await obs.call("GetStreamStatus");
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

export default obs;
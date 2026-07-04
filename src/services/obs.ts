import OBSWebSocket from "obs-websocket-js";

const obs = new OBSWebSocket();

let connected = false;

export async function connectOBS(password: string) {
  try {
    await obs.connect("ws://127.0.0.1:4455", password);

    connected = true;

    return {
      success: true,
      version: obs.identified
    };
  } catch (error) {
    connected = false;

    return {
      success: false,
      error,
    };
  }
}

export function isOBSConnected() {
  return connected;
}

export { obs };
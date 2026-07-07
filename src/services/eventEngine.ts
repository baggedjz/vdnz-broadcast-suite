import { setScene, startRecording, stopRecording } from "./obs";

export async function showVS() {
  await setScene("VS Overlay");
}

export async function showWinner() {
  await setScene("Winner");
}

export async function showReplay() {
  await setScene("Replay");
}

export async function showCommentary() {
  await setScene("Commentary");
}

export async function beginRecording() {
  await startRecording();
}

export async function endRecording() {
  await stopRecording();
}
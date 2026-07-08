import {
  setScene,
  startRecording,
  stopRecording,
} from "./obs";

import { useBattleTimerStore } from "../store/battleTimerStore";
import { useCompetitionStore } from "../store/competitionStore";
import { useEventLogStore } from "../store/eventLogStore";

/* ---------------- Broadcast ---------------- */

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

/* ---------------- Battle Workflow ---------------- */

export async function startBattle() {
  await showVS();

  useBattleTimerStore.getState().start();

  useEventLogStore
    .getState()
    .addEvent("Competition", "Battle Started");
}

export async function finishBattle() {
  useBattleTimerStore.getState().stop();

  useEventLogStore
    .getState()
    .addEvent("Competition", "Battle Finished");
}

export async function loadNextBattle() {
  useBattleTimerStore.getState().reset();

  useCompetitionStore
    .getState()
    .nextBattle();

  useEventLogStore
    .getState()
    .addEvent("Competition", "Loaded Next Battle");
}
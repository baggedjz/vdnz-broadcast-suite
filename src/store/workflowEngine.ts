import { setScene } from "./obs";
import { useBattleTimerStore } from "../store/battleTimerStore";
import { useCompetitionStore } from "../store/competitionStore";
import { useEventLogStore } from "../store/eventLogStore";

export async function startBattleWorkflow() {
  // Switch OBS
  await setScene("VS Overlay");

  // Start timer
  useBattleTimerStore.getState().start();

  // Log event
  useEventLogStore
    .getState()
    .addEvent("Competition", "Battle Started");

  console.log("🏁 Battle Started");
}

export async function finishBattleWorkflow() {
  useBattleTimerStore.getState().stop();

  useEventLogStore
    .getState()
    .addEvent("Competition", "Battle Finished");

  console.log("🏁 Battle Finished");
}

export async function nextBattleWorkflow() {
  useBattleTimerStore.getState().reset();

  useCompetitionStore
    .getState()
    .nextBattle();

  useEventLogStore
    .getState()
    .addEvent("Competition", "Next Battle Loaded");

  console.log("➡ Next Battle");
}
import { useBattleQueueStore } from "../store/battleQueueStore";
import { useBattleStore } from "../store/battleStore";
import { useRaceControlStore } from "../store/raceControlStore";
import { useBattleHistoryStore } from "../store/battleHistoryStore";


export function loadNextBattle() {

  const {
    nextBattle,
  } = useBattleQueueStore.getState();


  nextBattle();


  const updatedBattle =
    useBattleQueueStore.getState().currentBattle;



  if (!updatedBattle) {
    return false;
  }



  useBattleStore.getState().setLeadDriver(
    updatedBattle.leadDriver
  );


  useBattleStore.getState().setChaseDriver(
    updatedBattle.chaseDriver
  );


  useRaceControlStore.getState().resetBattle();


  return true;

}



export function completeCurrentBattle(
  winner: "LEAD" | "CHASE"
) {

  const {
    currentBattle,
    completeBattle,
  } = useBattleQueueStore.getState();


  if (!currentBattle) {
    return false;
  }


  const winningDriver =
    winner === "LEAD"
      ? currentBattle.leadDriver
      : currentBattle.chaseDriver;


  completeBattle(
    winningDriver
  );


  useBattleHistoryStore
    .getState()
    .addResult(
      currentBattle,
      winningDriver
    );


  return true;

}
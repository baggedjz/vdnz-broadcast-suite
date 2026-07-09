import { useOBSStore } from "../store/obsStore";
import { useBattleTimerStore } from "../store/battleTimerStore";
import { useEventLogStore } from "../store/eventLogStore";
import { broadcastScenes } from "../config/broadcastScenes";


export async function startBattleWorkflow() {

  const obs = useOBSStore.getState();
  const timer = useBattleTimerStore.getState();
  const log = useEventLogStore.getState();


  await obs.changeScene(
    broadcastScenes.battle
  );


  timer.start();


  log.addEvent(
    "Competition",
    "Battle Started"
  );

}



export async function finishBattleWorkflow() {

  const obs = useOBSStore.getState();
  const timer = useBattleTimerStore.getState();
  const log = useEventLogStore.getState();


  timer.stop();


  await obs.changeScene(
    broadcastScenes.winner
  );


  log.addEvent(
    "Competition",
    "Battle Finished"
  );

}



export async function loadNextBattleWorkflow() {

  const timer = useBattleTimerStore.getState();
  const log = useEventLogStore.getState();


  timer.reset();


  log.addEvent(
    "Competition",
    "Loaded Next Battle"
  );

}
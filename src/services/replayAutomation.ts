import {
  useReplayStore,
} from "../store/replayStore";



export function createReplayMarker(
  type:
    | "BATTLE_START"
    | "HIGHLIGHT"
    | "REPLAY"
    | "WINNER",
  description: string
) {


  useReplayStore
    .getState()
    .addMarker(
      type,
      description
    );


}



export function battleStarted() {


  createReplayMarker(
    "BATTLE_START",
    "Battle Started"
  );


}



export function highlightMoment(
  description: string
) {


  createReplayMarker(
    "HIGHLIGHT",
    description
  );


}



export function replayTrigger(
  description: string
) {


  createReplayMarker(
    "REPLAY",
    description
  );


}



export function winnerMoment(
  driver: string
) {


  createReplayMarker(
    "WINNER",
    `${driver} Winner`
  );


}
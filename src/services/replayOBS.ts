import { setScene } from "./obs";


export async function playReplay() {

  await setScene(
    "Replay"
  );

}



export async function returnLive() {

  await setScene(
    "Live"
  );

}



export async function showReplayHighlight(
  description: string
) {

  console.log(
    "Playing replay:",
    description
  );


  await playReplay();

}
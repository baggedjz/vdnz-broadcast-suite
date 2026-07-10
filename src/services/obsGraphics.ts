import { setScene } from "./obs";


export async function showVSOverlay() {

  await setScene(
    "VS Overlay"
  );

}



export async function showWinnerOverlay() {

  await setScene(
    "Winner"
  );

}



export async function showStandingsOverlay() {

  await setScene(
    "Standings"
  );

}



export async function hideGraphics() {

  await setScene(
    "Live"
  );

}
import { setScene } from "./obs";


export async function startBattleBroadcast() {

  try {

    await setScene("VS Overlay");

    console.log(
      "🎬 Battle started - VS Overlay"
    );

  } catch (error) {

    console.error(
      "Failed to start battle broadcast",
      error
    );

  }

}



export async function finishBattleBroadcast() {

  try {

    await setScene("Scores");

    console.log(
      "📊 Battle finished - Scores"
    );

  } catch (error) {

    console.error(
      "Failed to finish battle broadcast",
      error
    );

  }

}



export async function showWinnerBroadcast(
  winnerName: string
) {

  try {

    await setScene("Winner");


    console.log(
      `🏆 Winner: ${winnerName}`
    );


  } catch (error) {

    console.error(
      "Failed to show winner broadcast",
      error
    );

  }

}
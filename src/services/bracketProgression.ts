import type { Battle } from "../store/battleQueueStore";
import type { Driver } from "../modules/drivers/types/Driver";


export function createNextRound(
  winners: Driver[],
  round: string
): Battle[] {


  const battles: Battle[] = [];


  for (
    let i = 0;
    i < winners.length;
    i += 2
  ) {


    const lead = winners[i];

    const chase = winners[i + 1];


    if (!lead || !chase) {
      continue;
    }



    battles.push({

      id: crypto.randomUUID(),

      round,

      leadDriver: lead,

      chaseDriver: chase,

      status: "READY",

    });


  }


  return battles;

}
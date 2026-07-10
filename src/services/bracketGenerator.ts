import type { Driver } from "../modules/drivers/types/Driver";
import type { Battle } from "../store/battleQueueStore";


export function generateTop32Bracket(
  drivers: Driver[]
): Battle[] {


  const battles: Battle[] = [];


  const seededDrivers = [...drivers]
    .slice(0, 32);



  for (
    let i = 0;
    i < seededDrivers.length / 2;
    i++
  ) {


    const lead =
      seededDrivers[i];


    const chase =
      seededDrivers[
        seededDrivers.length - 1 - i
      ];



    battles.push({

      id: crypto.randomUUID(),

      round: "TOP 32",

      leadDriver: lead,

      chaseDriver: chase,

      status: "READY",

    });


  }



  return battles;

}
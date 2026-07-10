import type { Driver } from "../modules/drivers/types/Driver";


export interface ChampionshipEntry {

  driver: Driver;

  points: number;

  wins: number;

  podiums: number;

}



export function calculatePoints(
  position: number
): number {


  const pointsTable: Record<number, number> = {

    1: 100,

    2: 80,

    3: 65,

    4: 55,

    5: 50,

    6: 45,

    7: 40,

    8: 35,

  };


  return pointsTable[position] ?? 0;

}
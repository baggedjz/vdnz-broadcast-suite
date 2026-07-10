import type { Driver } from "../modules/drivers/types/Driver";

import { generateTop32Bracket } from "./bracketGenerator";

import { useBattleQueueStore } from "../store/battleQueueStore";


export function createTop32Bracket(
  drivers: Driver[]
) {


  const battles =
    generateTop32Bracket(drivers);



  const {
    addBattle,
  } = useBattleQueueStore.getState();



  battles.forEach((battle) => {

    addBattle(battle);

  });


  return battles.length;

}
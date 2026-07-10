import type { Driver } from "../modules/drivers/types/Driver";
import type { BattleResult } from "../store/battleHistoryStore";


export interface DriverStats {

  driver: Driver;

  battles: number;

  wins: number;

  losses: number;

  winRate: number;

}



export function calculateDriverStats(
  driver: Driver,
  history: BattleResult[]
): DriverStats {


  const battles =
    history.filter(
      (result) =>
        result.battle.leadDriver.id === driver.id ||
        result.battle.chaseDriver.id === driver.id
    );



  const wins =
    history.filter(
      (result) =>
        result.winner.id === driver.id
    );



  const totalBattles =
    battles.length;



  return {

    driver,

    battles: totalBattles,

    wins: wins.length,

    losses:
      totalBattles - wins.length,

    winRate:
      totalBattles === 0
        ? 0
        : Math.round(
            (wins.length / totalBattles) * 100
          ),

  };

}
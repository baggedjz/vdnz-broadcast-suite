import { BBSButton, BBSCard } from "../ui";

import { useRaceControlStore } from "../../store/raceControlStore";
import { useBattleStore } from "../../store/battleStore";

import {
  startBattleBroadcast,
  finishBattleBroadcast,
  showWinnerBroadcast,
} from "../../services/broadcastWorkflow";

import {
  completeCurrentBattle,
  loadNextBattle,
} from "../../services/battleQueueWorkflow";


export default function BattleControlCard() {


  const {
    status,
    winner,
    startBattle,
    finishBattle,
    setWinner,
    resetBattle,
  } = useRaceControlStore();



  const {
    leadDriver,
    chaseDriver,
  } = useBattleStore();




  const handleStart = async () => {

    startBattle();

    await startBattleBroadcast();

  };




  const handleFinish = async () => {

    finishBattle();

    await finishBattleBroadcast();

  };




  const handleLeadWinner = async () => {

    setWinner("LEAD");


    completeCurrentBattle(
      "LEAD"
    );


    await showWinnerBroadcast(
      leadDriver?.firstName ?? "Lead Driver"
    );


    loadNextBattle();

  };




  const handleChaseWinner = async () => {

    setWinner("CHASE");


    completeCurrentBattle(
      "CHASE"
    );


    await showWinnerBroadcast(
      chaseDriver?.firstName ?? "Chase Driver"
    );


    loadNextBattle();

  };




  return (

    <BBSCard title="Battle Control">


      <div className="space-y-6">



        <div className="flex justify-between">

          <span className="text-zinc-400">
            Status
          </span>


          <span className="font-bold text-amber-400">
            {status}
          </span>


        </div>





        <div className="grid grid-cols-3 gap-3">


          <BBSButton

            disabled={!leadDriver || !chaseDriver}

            onClick={handleStart}

          >

            🟢 Start Battle

          </BBSButton>





          <BBSButton

            variant="secondary"

            onClick={handleFinish}

          >

            🏁 Finish Battle

          </BBSButton>





          <BBSButton

            onClick={resetBattle}

          >

            Reset

          </BBSButton>



        </div>






        <div className="grid grid-cols-2 gap-3">



          <BBSButton

            variant={
              winner === "LEAD"
                ? "success"
                : "secondary"
            }

            onClick={handleLeadWinner}

          >

            🏆 Lead Winner

          </BBSButton>






          <BBSButton

            variant={
              winner === "CHASE"
                ? "success"
                : "secondary"
            }

            onClick={handleChaseWinner}

          >

            🏆 Chase Winner

          </BBSButton>




        </div>


      </div>


    </BBSCard>

  );

}